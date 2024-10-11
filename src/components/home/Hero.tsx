import { SignedIn, SignedOut } from '@clerk/nextjs';
import { ArrowRight, Leaf } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <>
      <div>
        <h1 className="mx-auto text-6xl font-extrabold tracking-tight text-white max-sm:text-4xl sm:max-w-[70%]">
          {/* Validate Product Ideas and Grow Organic Traffic{' '} */}
          Launch Products Positioned For Fast Organic Growth
          {' '}
          <Leaf className="inline-block size-8 stroke-green-300" />
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-white">
          Use data-backed insights to validate new business or product ideas, and
          optimize your content strategy with our easy SEO toolkit.
        </p>
      </div>
      <SignedIn>
        <Link href="/keywords-lookup">
          <Button className="mb-10 mt-8 bg-black p-7 text-xl font-semibold shadow-md transition-all duration-100 hover:scale-105">
            Go to Dashboard
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </Link>
      </SignedIn>
      <SignedOut>
        <Link href="/pricing">
          <Button className="mb-10 mt-8 bg-black p-7 text-xl font-semibold text-white shadow-md transition-all duration-100 hover:scale-105">
            Get Started For Free
            <ArrowRight className="ml-2 size-6" strokeWidth={2.2} />
          </Button>
        </Link>
      </SignedOut>
    </>
  );
}
