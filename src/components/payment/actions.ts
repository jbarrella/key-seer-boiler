'use server';

import { clerkClient } from '@clerk/nextjs/server';

export async function updateUserSubscription(
  userId: string,
  plan: string,
  subscriptionId: string,
) {
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      plan,
      subscriptionId,
    },
  });
}

export async function setUserSubscriptionCancellationDate(
  userId: string,
  cancellationDate: string,
) {
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      cancellationDate,
    },
  });
}

export async function updateUserMetadata(
  userId: string,
  metadata: Record<string, string>,
) {
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: metadata,
  });
}
