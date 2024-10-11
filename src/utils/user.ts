'use server';

import { auth } from '@clerk/nextjs/server';

export type ActivePlan = 'free' | 'standard' | 'pro';

export async function getUserActivePlan(): Promise<ActivePlan> {
  const { sessionClaims } = auth();

  console.log('sessionClaims', sessionClaims);

  const cancellationDate = sessionClaims?.publicMetadata?.cancellationDate as
    | string
    | null;
  if (cancellationDate && new Date(cancellationDate) < new Date()) {
    return 'free';
  }

  if (!sessionClaims?.publicMetadata?.plan) {
    return 'free';
  }

  return sessionClaims?.publicMetadata?.plan as ActivePlan;
}
