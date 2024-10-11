'use client';

import { Gem } from 'lucide-react';
import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import Plans from '../pricing/Plans';

export default function Pricing() {
  const [payAnnually, setPayAnnually] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row items-center gap-12 max-lg:flex-col">
        <div className="flex w-1/3 flex-col gap-4 max-lg:w-full">
          <h1 className="text-3xl font-extrabold text-black sm:text-3xl md:text-6xl">
            Get started with a 7-day free
            {' '}
            <Gem className="inline-block size-9" />
            {' '}
            trial
          </h1>
          <p className="text-muted-foreground text-lg">
            <span className="text-2xl font-bold text-orange-600">( </span>
            Or try out the
            free plan with NO credit card required. Paid plans can be cancelled anytime
            <span className="text-2xl font-bold text-orange-600"> )</span>
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Switch
              id="pay-annually"
              onCheckedChange={setPayAnnually}
              className="data-[state=checked]:bg-blue-500"
            />
            <Label htmlFor="pay-annually" className="text-md">
              Pay annually and save!
            </Label>
          </div>
        </div>
        <div className="w-2/3 max-lg:w-full">
          <Plans payAnnually={payAnnually} />
        </div>
      </div>
    </>
  );
}
