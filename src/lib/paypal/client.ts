import axios from 'axios';

export default class PaypalClient {
  private baseUrl = 'https://api-m.paypal.com/v1';
  private clientId: string;
  private clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  private async fetchAccessToken() {
    const encodedCredentials = Buffer.from(
      `${this.clientId}:${this.clientSecret}`,
    ).toString('base64');
    const response = await axios.post(
      `${this.baseUrl}/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${encodedCredentials}`,
        },
      },
    );
    return response.data.access_token;
  }

  private async makeRequest(method: string, path: string, data?: any) {
    const accessToken = await this.fetchAccessToken();
    const response = await axios({
      method,
      url: `${this.baseUrl}${path}`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data,
    });
    return response.data;
  }

  async getSubscription(subscriptionId: string) {
    return this.makeRequest('GET', `/billing/subscriptions/${subscriptionId}`);
  }

  async cancelSubscription(subscriptionId: string) {
    return this.makeRequest('POST', `/billing/subscriptions/${subscriptionId}/cancel`, {
      reason: 'Not satisfied with the service',
    });
  }

  async changeSubscriptionPlan(subscriptionId: string, newPlanId: string) {
    return this.makeRequest('POST', `/billing/subscriptions/${subscriptionId}/revise`, {
      plan_id: newPlanId,
    });
  }
}
