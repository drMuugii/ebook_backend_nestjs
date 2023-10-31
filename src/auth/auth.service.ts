import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return {
      mgs: 'i have sign in',
    };
  }

  signup() {
    return {
      mgs: 'i have sign up',
    };
  }
}
