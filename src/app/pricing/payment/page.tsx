'use client';

// import PayPalButtons from '@/components/payment/PayPalButtons';
// import { plans } from '@/components/pricing/constants';
// import { LockClosedIcon } from '@radix-ui/react-icons';
// import { useSearchParams } from 'next/navigation';

export default function PaymentPage() {
  // const searchParams = useSearchParams();
  // const plan = searchParams.get('plan');
  // const term = searchParams.get('term');

  return (
    <div className="margined flex w-full flex-row items-center justify-center gap-20 max-sm:flex-col max-sm:gap-12">
      <aside className="flex flex-col gap-4 text-center sm:w-1/2">
        {/* <h1>Let&apos;s finalize payment and you&apos;ll be all set.</h1> */}
        <h1>Thanks for signin up. We will let you know when we launch!</h1>
      </aside>
      {/* <div className="sm:w-1/2 max-w-md p-8 bg-white rounded-md shadow-md border">
        <h1 className="text-2xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            {plan?.charAt(0).toUpperCase() + plan?.slice(1)}
          </span>{' '}
          7-day free trial
        </h1>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Billing: <span className="font-bold">Monthly</span>
          </p>
        </div>
        <div className="mt-6 mb-8">
          <p className="text-sm text-gray-600">Today&apos;s charge</p>
          <p className="text-lg font-bold mb-2">$0.00 (incl. Tax)</p>
          <p className="text-sm text-gray-500">
            First charge:{' '}
            {
              plans.find((p) => p.name.toLowerCase() === plan)?.price[
                term === 'annual' ? 'annual' : 'month'
              ]
            }
            (incl. Tax)
          </p>
          <p className="text-sm text-gray-500">First charge date: Oct 5, 2024</p>
          <p className="text-xs text-gray-500 mt-2">
            All prices are in US dollars and include tax.
          </p>
        </div>
        <PayPalButtons plan={plan} term={term} />
        <div className="mt-6 flex items-center text-sm text-gray-600">
          <LockClosedIcon className="w-6 h-6 mr-2 stroke-green-300" />
          <p>Your data is secure. We use SSL encryption and are PCI DSS-compliant.</p>
        </div>
      </div> */}
    </div>
  );
}
