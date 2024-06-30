import { Injectable } from '@nestjs/common';
import { ConfidentialClientApplication, Configuration } from '@azure/msal-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private msalConfig: Configuration;
  private cca: ConfidentialClientApplication;

  constructor(private configService: ConfigService) {
    this.msalConfig = {
      auth: {
        clientId: this.configService.get<string>('AZURE_CLIENT_ID'),
        authority: `https://login.microsoftonline.com/${this.configService.get<string>('AZURE_TENANT_ID')}`,
        clientSecret: this.configService.get<string>('AZURE_CLIENT_SECRET'),
      }
    };
    this.cca = new ConfidentialClientApplication(this.msalConfig);
  }

  async getToken(): Promise<string> {
    const result = await this.cca.acquireTokenByClientCredential({
      scopes: [this.configService.get<string>('AZURE_SCOPES')],
    });
    return result.accessToken;
  }
}
