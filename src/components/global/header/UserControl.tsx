import { SignedIn, SignedOut } from '@clerk/nextjs';

import CustomUserButton from './CustomUserButton';
import LoginOrSignup from './LoginOrSignup';

export default function UserControl({ whiteMode = false }: { whiteMode?: boolean }) {
  return (
    <>
      <SignedIn>
        <CustomUserButton />
      </SignedIn>
      <SignedOut>
        <LoginOrSignup whiteMode={whiteMode} />
      </SignedOut>
    </>
  );
}
