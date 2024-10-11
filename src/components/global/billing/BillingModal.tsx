'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { updateUserMetadata } from '@/components/payment/actions';
import { Button } from '@/components/ui/button';
import { getUserActivePlan } from '@/utils/userclient';

import {
  cancelSubscription,
  changeSubscriptionPlan,
  getSubscriptionDetails,
} from './actions';
import { formatBillingDate } from './utils';

export default function BillingModal() {
  const [loading, setLoading] = useState(true);
  const [changingPlan, setChangingPlan] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);

  const { user } = useUser();
  const activePlan = getUserActivePlan(user);

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      // Fetch subscription details from your backend or PayPal API
      const subscriptionDetails = await getSubscriptionDetails(
        user?.publicMetadata?.subscriptionId as string,
      );
      // Set subscriptionDetails state
      setSubscriptionDetails(subscriptionDetails);
      setLoading(false);
    };

    if (activePlan !== 'free') {
      fetchSubscriptionDetails();
    } else {
      setLoading(false);
    }
  }, [activePlan, user.publicMetadata?.subscriptionId]);

  async function handleCancelSubscription() {
    // The subscription is canceled (deleted) on PayPal immediately
    try {
      await cancelSubscription(subscriptionDetails.id);
      await updateUserMetadata(user.id, {
        // This key is effectively deleted.
        subscriptionId: null,
        cancellationDate: subscriptionDetails?.billing_info?.next_billing_time,
      });
      // setSubscriptionDetails(null);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  }

  const handleChangePlan = async (newPlan: string) => {
    // The subscription is changed on PayPal immediately
    if (!subscriptionDetails) {
      return;
    }
    try {
      await changeSubscriptionPlan(subscriptionDetails.id, newPlan);
      await updateUserMetadata(user.id, {
        plan: newPlan,
      });
      // setSubscriptionDetails({ ...subscriptionDetails, plan_id: newPlan });
    } catch (error) {
      console.error('Error changing subscription plan:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Only renders if the user has an active plan.
  const subscriptionStatus = user.publicMetadata?.cancellationDate
    ? 'Cancelled'
    : 'Active';

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-4 text-xl font-bold">Current Subscription</h2>
      {activePlan !== 'free'
        ? (
            <div>
              <p>
                Plan:
                {' '}
                <span className="rounded-md bg-gray-100 px-2">{activePlan}</span>
                {' '}
                {subscriptionStatus === 'Active'
                  ? (
                      <span className="ml-1 rounded-md border-2 border-green-500 px-2 text-green-500">
                        {subscriptionStatus}
                      </span>
                    )
                  : (
                      <span className="ml-1 rounded-md border-2 border-yellow-500 px-2 text-yellow-500">
                        {subscriptionStatus}
                      </span>
                    )}
              </p>
              <p>
                {subscriptionStatus === 'Active'
                  ? (
                      <span>
                        Next Billing Date:
                        {' '}
                        <span className="font-bold">
                          {formatBillingDate(
                            subscriptionDetails?.billing_info?.next_billing_time,
                          )}
                        </span>
                      </span>
                    )
                  : (
                      <span>
                        Access until:
                        {' '}
                        <span className="font-bold">
                          {formatBillingDate(user.publicMetadata?.cancellationDate as string)}
                        </span>
                      </span>
                    )}
              </p>
              <div className="mt-4 flex flex-row gap-2">
                <Button
                  onClick={() => setChangingPlan(!changingPlan)}
                  className="mt-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
                  variant="secondary"
                  disabled={subscriptionStatus === 'Cancelled'}
                >
                  Change Plan
                </Button>
                {changingPlan && (
                  <div className="mt-4">
                    <Button
                      onClick={() => handleChangePlan('standard')}
                      className="rounded-md"
                      variant="secondary"
                    >
                      Standard Plan
                    </Button>
                    <Button
                      onClick={() => handleChangePlan('pro')}
                      className="rounded-md"
                      variant="secondary"
                    >
                      Pro Plan
                    </Button>
                  </div>
                )}
                <Button
                  onClick={handleCancelSubscription}
                  className="mt-2 rounded-md border-red-500 text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                  variant="secondary"
                  disabled={subscriptionStatus === 'Cancelled'}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )
        : (
            <div className="flex flex-col gap-4">
              <p>No active subscription found.</p>
              <Link
                href="/pricing"
                onClick={() => (window as any).Clerk.closeUserProfile()}
              >
                <Button
                  variant="secondary"
                  className="w-fit rounded-md bg-purple-500 text-white"
                >
                  Upgrade
                </Button>
              </Link>
            </div>
          )}
    </div>
  );
}
