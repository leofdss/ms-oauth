import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService
    ) {}

  @Get('login')
  async login(@Res() res: Response) {
    const redirectUrl = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/authorize?client_id=${process.env.AZURE_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&response_mode=query&scope=${process.env.SCOPES}`;
    res.redirect(redirectUrl);
  }

  @Get('callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    const tokenResponse = await this.httpService.post(`https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`, new URLSearchParams({
      client_id: process.env.AZURE_CLIENT_ID,
      scope: process.env.SCOPES,
      code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code',
      client_secret: process.env.AZURE_CLIENT_SECRET,
    })).toPromise()

    console.log('access_token', tokenResponse.data.access_token)
    console.log('refresh_token', tokenResponse.data.refresh_token)

    const user = await this.authService.validateUser(tokenResponse.data.access_token);

    console.log('user', user)
    const jwt = await this.authService.login(user);
    res.redirect(`http://localhost:4200/auth-callback?token=${jwt.access_token}`);
  }
}
