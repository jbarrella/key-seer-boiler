import { SignedOut } from '@clerk/nextjs';
import { X } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';

import { Button } from '../../ui/button';
import FullLogo from './FullLogo';
import LoginOrSignup from './LoginOrSignup';
import NavbarItems from './NavbarItems';

export default function HamburgerMenu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}) {
  function handleLinkClick() {
    setIsMenuOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white p-4 pt-[23px] sm:max-md:px-10">
      <div className="flex flex-row">
        <FullLogo onLinkClick={handleLinkClick} />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <X className="size-7" />
        </Button>
      </div>
      <SignedOut>
        <div className="mt-4 flex flex-col items-center justify-center">
          <LoginOrSignup onLinkClick={handleLinkClick} />
          <Separator className="mt-4 w-3/5" />
        </div>
      </SignedOut>
      <div className="mt-4 flex justify-center">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="ml-0 flex w-full flex-col items-stretch">
            <NavbarItems onLinkClick={handleLinkClick} />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
