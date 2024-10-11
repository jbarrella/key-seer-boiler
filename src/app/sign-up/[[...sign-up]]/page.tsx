import { SignUp } from '@clerk/nextjs';
import { CableCar } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="margined flex w-full flex-row items-center justify-center gap-20 max-sm:flex-col max-sm:gap-12">
      <aside className="flex flex-col gap-4 text-center sm:w-1/2">
        <h1>
          You&apos;re on your way!
          {' '}
          <CableCar className="inline-block size-10" />
        </h1>
        <p className="text-muted-foreground">Let&apos;s create an account first...</p>
      </aside>
      <div className="flex items-center justify-center sm:w-1/2">
        <SignUp
          appearance={{
            elements: {
              logoBox: 'hidden',
              footer: 'hidden',
              headerSubtitle: 'hidden',
              cardBox: 'rounded-lg shadow-md border',
              headerTitle: 'text-2xl max-sm:text-xl font-bold text-gray-800 text-left',
              formFieldInput:
                'rounded-md border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50',
              formButtonPrimary:
                'bg-plasma inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-3 font-medium text-primary-foreground !shadow-none ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              socialButtonsBlockButton: 'h-9 border',
            },
            layout: {
              socialButtonsPlacement: 'bottom',
            },
          }}
        />
      </div>
    </div>
  );
}
