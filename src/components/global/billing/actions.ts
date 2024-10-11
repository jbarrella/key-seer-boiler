'use server';

import PaypalClient from '@/lib/paypal/client';

const paypalClient = new PaypalClient(
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_CLIENT_SECRET!,
);

export async function cancelSubscription(subscriptionId: string) {
  await paypalClient.cancelSubscription(subscriptionId);
}

export async function changeSubscriptionPlan(subscriptionId: string, newPlan: string) {
  await paypalClient.changeSubscriptionPlan(subscriptionId, newPlan);
}

export async function getSubscriptionDetails(subscriptionId: string) {
  return await paypalClient.getSubscription(subscriptionId);
}
