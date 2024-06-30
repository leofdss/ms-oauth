import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private authService: AuthService,
    private httpService: HttpService
  ) { }

  private async getHeaders() {
    const token = await this.authService.getToken();
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async createUser(user: any): Promise<any> {
    try {
      const headers = await this.getHeaders();
      const response = await this.httpService.post(
        'https://graph.microsoft.com/v1.0/users',
        user,
        { headers }
      ).toPromise();
      return response.data;

    } catch (error) {
      throw error
    }
  }

  async updateUser(userId: string, user: any): Promise<any> {
    const headers = await this.getHeaders();
    const response = await this.httpService.patch(
      `https://graph.microsoft.com/v1.0/users/${userId}`,
      user,
      { headers }
    ).toPromise();
    return response.data;
  }

  async deleteUser(userId: string): Promise<any> {
    const headers = await this.getHeaders();
    const response = await this.httpService.delete(
      `https://graph.microsoft.com/v1.0/users/${userId}`,
      { headers }
    ).toPromise();
    return response.data;
  }

  async listUsers(): Promise<any> {
    const headers = await this.getHeaders();
    const response = await this.httpService.get(
      'https://graph.microsoft.com/v1.0/users',
      { headers }
    ).toPromise();
    return response.data;
  }

  async getUser(id: string): Promise<any> {
    const headers = await this.getHeaders();
    const response = await this.httpService.get(
      'https://graph.microsoft.com/v1.0/users/' + id + '?$select=employeeType,department',
      { headers }
    ).toPromise();
    return response.data;
  }

  async sub(data: any): Promise<any> {
    try {
      const headers = await this.getHeaders();
      const response = await this.httpService.post(
        'https://graph.microsoft.com/v1.0/subscriptions',
        data,
        { headers }
      ).toPromise();
      return response.data;
    } catch (error) {
      throw error
    }
  }
}
