'use client';

import { useUser } from '@clerk/nextjs';
import type {
  PayPalButtonsComponentProps,
  ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { updateUserSubscription } from './actions';

const planIds = {
  // jason@keyseer.com
  standard: 'P-61B24357RV3554513M34BVGY',
  pro: 'P-6BN62975WH218931KM34CGJY',
  standardAnnual: 'P-53D975616G976445SM4CTO3Y',
  proAnnual: 'P-6XL4625485176213UM4CTPMI',
};

interface PaymentPageProps {
  plan: string;
  term: string;
}

export default function PaymentPage({ plan, term }: PaymentPageProps) {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const initialOptions: ReactPayPalScriptOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: 'USD',
    vault: true,
    intent: 'subscription',
  };

  const getPlanId = (plan: string | null): string => {
    switch (plan) {
      case 'standard':
        return term === 'annual' ? planIds.standardAnnual : planIds.standard;
      case 'pro':
        return term === 'annual' ? planIds.proAnnual : planIds.pro;
      default:
        return '';
    }
  };

  const createSubscription: PayPalButtonsComponentProps['createSubscription'] = (
    _,
    actions,
  ) => {
    return actions.subscription.create({
      plan_id: getPlanId(plan),
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        user_action: 'SUBSCRIBE_NOW',
        return_url: window.location.href,
        cancel_url: window.location.href,
      },
      subscriber: {
        email_address: user?.primaryEmailAddress?.emailAddress,
      },
    });
  };

  const onApprove: PayPalButtonsComponentProps['onApprove'] = async (data) => {
    await updateUserSubscription(user?.id, plan, data.subscriptionID);
    router.push('/keyword-breakdown');
  };

  const ButtonWrapper = () => {
    const [{ isPending }] = usePayPalScriptReducer();

    useEffect(() => {
      if (!isPending) {
        setIsLoading(false);
      }
    }, [isPending]);

    if (isLoading) {
      return (
        <>
          <div className="mb-4 h-12 w-full animate-pulse rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
          <div className="mb-4 h-12 w-full animate-pulse rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
        </>
      );
    }

    return (
      <PayPalButtons
        createSubscription={createSubscription}
        onApprove={onApprove}
        style={{ label: 'subscribe', shape: 'pill' }}
      />
    );
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <ButtonWrapper />
    </PayPalScriptProvider>
  );
}
