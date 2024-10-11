'use client';

import { SignedIn } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import CustomUserButton from './CustomUserButton';
import FullLogo from './FullLogo';
import HamburgerMenu from './HamburgerMenu';
import Navbar from './NavbarItems';
import UserControl from './UserControl';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  let bgColor = 'bg-white';
  let textColor = 'text-black';
  let whiteMode = false;
  if (pathname === '/' && !isMenuOpen) {
    bgColor = 'bg-plasma';
    textColor = 'text-white';
    whiteMode = true;
  }

  return (
    <header
      className={`flex items-center p-4 pb-20 pt-5 sm:px-10 md:px-20 lg:px-40 ${bgColor} ${textColor}`}
    >
      <FullLogo whiteMode={whiteMode} />
      <div className="hidden md:flex md:w-full md:items-center">
        <NavigationMenu className="ml-12">
          <NavigationMenuList>
            <Navbar />
          </NavigationMenuList>
        </NavigationMenu>
        <div className="grow"></div>
        <UserControl whiteMode={whiteMode} />
      </div>
      <div className="ml-auto md:hidden">
        <SignedIn>
          <CustomUserButton />
        </SignedIn>
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="size-7" />
        </Button>
      </div>
      {isMenuOpen && <HamburgerMenu setIsMenuOpen={setIsMenuOpen} />}
    </header>
  );
}
