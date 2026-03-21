import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { prisma } from '../index';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.post('/register', async (req, res) => {
  const { email, password, name, tenantName } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create tenant first
    const tenant = await prisma.tenant.create({
      data: { name: tenantName || `${name}'s Org` }
    });

    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword, 
        name,
        tenantId: tenant.id
      }
    });
    
    const token = jwt.sign({ id: user.id, role: user.role, tenantId: user.tenantId }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, tenantId: user.tenantId } });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user || !user.password) return res.status(401).json({ error: 'Invalid credentials' });
  
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT for the authenticated user
    const user: any = req.user;
    const token = jwt.sign(
      { userId: user.id, tenantId: user.tenantId },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
  }
);

export default router;
