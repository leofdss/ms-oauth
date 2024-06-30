import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(accessToken: string): Promise<any> {
    const { data } = await axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  }

  async login(user: any) {
    const payload = { username: user.userPrincipalName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
