declare module 'passport-google-oauth20' {
    import { Strategy as PassportStrategy } from 'passport';
    import { Request } from 'express';
  
    interface Profile {
      provider: string;
      id: string;
      displayName: string;
      name: {
        familyName: string;
        givenName: string;
      };
      emails: Array<{ value: string; verified?: boolean }>;
      photos: Array<{ value: string }>;
      _raw: string;
      _json: any;
    }
  
    interface VerifyOptions {
      message: string;
    }
  
    type VerifyCallback = (error: any, user?: any, info?: VerifyOptions) => void;
  
    interface StrategyOptions {
      clientID: string;
      clientSecret: string;
      callbackURL: string;
      passReqToCallback?: false;
    }
  
    interface StrategyOptionsWithRequest {
      clientID: string;
      clientSecret: string;
      callbackURL: string;
      passReqToCallback: true;
    }
  
    type VerifyFunction = (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => void;
  
    type VerifyFunctionWithRequest = (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => void;
  
    class Strategy extends PassportStrategy {
      constructor(
        options: StrategyOptions,
        verify: VerifyFunction
      );
      constructor(
        options: StrategyOptionsWithRequest,
        verify: VerifyFunctionWithRequest
      );
  
      name: string;
      authenticate(req: Request, options?: object): void;
    }
  }
  