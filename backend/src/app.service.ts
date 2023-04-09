import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService { 
  googleLogin(req: { user: any; }) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }  
}
