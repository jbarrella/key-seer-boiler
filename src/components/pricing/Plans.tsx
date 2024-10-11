import { CheckCircledIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

import { plans } from '@/components/pricing/constants';
import { Button } from '@/components/ui/button';

export default function Plans({ payAnnually }: { payAnnually: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <div key={index} className="flex flex-col rounded-lg border bg-slate-50 p-6">
            {plan.name === 'Pro' && (
              <div className="mx-auto mb-4 flex items-center rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-2 shadow-md">
                <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
                <Sparkles className="ml-2 size-5 text-white" />
              </div>
            )}
            {plan.name === 'Pro' || (
              <h2 className="mb-4 text-center text-2xl font-semibold text-black">
                {plan.name}
              </h2>
            )}
            <p className="mb-6 text-center text-3xl font-bold">
              {payAnnually ? plan.price.annual : plan.price.month}
              <span className="text-sm font-normal">/month</span>
            </p>
            <ul className="mb-8 grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="mb-2 flex items-center text-left">
                  <CheckCircledIcon className="mr-2 size-4 shrink-0 text-green-500" />
                  {feature}
                </li>
              ))}
              {plan.limitations
              && plan.limitations.map((limitation, i) => (
                <li
                  key={i}
                  className="mb-2 flex items-center text-left text-gray-500"
                >
                  <Cross2Icon className="mr-2 size-4 shrink-0 text-red-500" />
                  {limitation}
                </li>
              ))}
            </ul>
            <Link
              href={
                plan.name === 'Free'
                  ? '/sign-up'
                  : `/sign-up?redirect_url=/pricing/payment?plan=${plan.name.toLowerCase()}&term=${
                    payAnnually ? 'annual' : 'month'
                  }`
              }
            >
              <Button className="text-md mx-auto w-full rounded-md bg-black px-4 py-2 text-white transition-colors">
                {plan.name === 'Free' ? 'Create Free Account' : 'Start Free Trial'}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
