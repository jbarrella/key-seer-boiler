'use client';

import { useState } from 'react';

import Plans from '@/components/pricing/Plans';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function PricingPage(): React.ReactElement {
  const [payAnnually, setPayAnnually] = useState(false);

  return (
    <div className="margined mb-48">
      <h1 className="text-center text-5xl font-bold">Choose a plan</h1>
      <p className="text-muted-foreground mb-8 mt-6 text-center">
        Remeber all paid plans include a 7-day free trial and you can
        {' '}
        <span className="font-bold">cancel anytime.</span>
      </p>
      <div className="mb-8 mt-4 flex items-center justify-center gap-2">
        <Switch
          id="pay-annually"
          onCheckedChange={setPayAnnually}
          className="data-[state=checked]:bg-blue-500"
        />
        <Label htmlFor="pay-annually" className="text-md">
          Pay annually for up to
          {' '}
          <span className="rounded-md bg-green-100 px-1 font-bold text-green-500">
            15% off
          </span>
        </Label>
      </div>
      <Plans payAnnually={payAnnually} />
    </div>
  );
}
