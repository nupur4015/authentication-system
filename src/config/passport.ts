import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import prisma from '../client';
import config from './config';
import { TokenType, User as PrismaUser} from '@prisma/client';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    if (payload.type !== TokenType.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await prisma.user.findUnique({
      where: { id: payload.sub }
    });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};
export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

passport.use(new JwtStrategy(jwtOptions, jwtVerify));


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/v1/auth/google/callback"
},
async (accessToken, refreshToken, profile: Profile, done) => {
  try {
    if (profile.emails && profile.emails.length > 0) {
      const email = profile.emails[0].value;
      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name: profile.displayName,
            password: "", // Password is not required for OAuth
            role: "USER"
          }
        });
      }
      done(null, user);
    } else {
      done(new Error('No email found'), false);
    }
  } catch (error) {
    done(error, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id:number, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
