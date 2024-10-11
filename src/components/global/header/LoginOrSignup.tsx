import Link from 'next/link';

import { Button } from '../../ui/button';

interface LoginOrSignupProps {
  onLinkClick?: () => void;
  whiteMode?: boolean;
}

export default function LoginOrSignup({
  onLinkClick,
  whiteMode = false,
}: LoginOrSignupProps) {
  return (
    <div>
      <Link href="/sign-in" className="hover:bg-grey mr-3" onClick={onLinkClick}>
        Log In
      </Link>
      <Link href="/pricing" onClick={onLinkClick}>
        <Button
          className={`border-2 ${whiteMode ? 'border-white' : 'border-black'} text-md`}
          variant="ghost"
        >
          Sign Up
        </Button>
      </Link>
    </div>
  );
}
