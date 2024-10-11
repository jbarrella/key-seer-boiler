// Use type safe message keys with `next-intl`
type Messages = typeof import('../locales/en.json');

declare interface IntlMessages extends Messages {}

export {};

// Clerk custom user object
declare global {
  interface CustomJwtSessionClaims {
    publicMetadata: {
      plan: string;
      subscriptionId: string;
      cancellationDate: string;
    };
  }
}
