import type { UserResource } from '@clerk/types';

export type ActivePlan = 'free' | 'standard' | 'pro';

export function getUserActivePlan(user: UserResource): ActivePlan {
  const cancellationDate = user?.publicMetadata?.cancellationDate as string | null;
  if (cancellationDate && new Date(cancellationDate) < new Date()) {
    return 'free';
  }

  if (!user?.publicMetadata?.plan) {
    return 'free';
  }

  return user?.publicMetadata?.plan as ActivePlan;
}
