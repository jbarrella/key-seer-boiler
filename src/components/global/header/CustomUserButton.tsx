import { UserButton } from '@clerk/nextjs';
import { CreditCard } from 'lucide-react';

import BillingModal from '../billing/BillingModal';

export default function CustomUserButton() {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Billing"
          open="billing"
          labelIcon={<CreditCard className="size-4" />}
        />
      </UserButton.MenuItems>
      <UserButton.UserProfilePage
        label="Billing"
        url="billing"
        labelIcon={<CreditCard className="size-4" />}
      >
        <BillingModal />
      </UserButton.UserProfilePage>
    </UserButton>
  );
}
