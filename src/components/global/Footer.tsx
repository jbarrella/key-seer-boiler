'use client';

import { Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

import FullLogo from './header/FullLogo';

export default function Footer() {
  const pathname = usePathname();

  let topPadding = 'pt-8';
  if (pathname === '/') {
    topPadding = 'pt-16';
  }

  return (
    <footer className={`bg-black pb-6 text-center text-sm text-gray-500 ${topPadding}`}>
      <div className="mb-4 max-sm:scale-90">
        <a
          href="mailto:support@keyseer.com"
          className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
        >
          <Mail className="mr-2" />
          Contact Us
        </a>
      </div>
      <div className="flex items-center justify-center gap-4 max-sm:flex-col max-sm:gap-2">
        <span className="text-white max-sm:scale-75">
          <FullLogo whiteMode />
        </span>
        © 2024 KeySeer, GloStream Limited. All rights reserved
      </div>
    </footer>
  );
}
