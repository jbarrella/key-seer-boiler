import { currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/lib/DB';
import { userUsageDaily } from '@/models/Schema';

import { ErrorType } from '../components/global/types';

const dailyLimits = {
  KEYWORDS_LOOKUP: 100,
  KEYWORD_BREAKDOWN: 100,
} as const;

export async function checkUsage(feature: keyof typeof dailyLimits) {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found');
  }

  const usage = await db.select()
    .from(userUsageDaily)
    .where(
      and(
        eq(userUsageDaily.userId, user.id),
        eq(userUsageDaily.feature, feature),
      ),
    )
    .execute();

  if (usage.length > 0 && usage[0].usage >= dailyLimits[feature]) {
    throw new Error(ErrorType.USAGE_LIMIT_EXCEEDED);
  }
}

export async function incrementUsage(feature: keyof typeof dailyLimits) {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found');
  }

  console.log(feature);
  // await db.insert(userUsageDaily)
  //   .values({
  //     userId: user.id,
  //     feature,
  //     usage: 1,
  //   })
  //   .onConflictDoUpdate({
  //     target: [userUsageDaily.userId, userUsageDaily.feature],
  //     set: {
  //       usage: userUsageDaily.usage + 1,
  //     },
  //   })
  //   .execute();
}
