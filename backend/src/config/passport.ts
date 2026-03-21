import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../index';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'placeholder_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder_secret',
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(new Error('No email found in Google profile'));
        }

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          // In a real app, we might want to handle tenant creation here too
          // Or redirect to a tenant selection page
          user = await prisma.user.create({
            data: {
              email,
              name: profile.displayName,
              password: '', // Password not needed for OAuth
              role: 'AGENT',
              // We'll need a way to assign a tenantId for new OAuth users
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error as any);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
