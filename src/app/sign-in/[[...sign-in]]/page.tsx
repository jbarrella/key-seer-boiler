import { SignIn } from '@clerk/nextjs';

import { WavingHand01Icon } from '@/components/ui/icons/WavingHand';

export default function SignInPage() {
  return (
    <div className="margined flex flex-col items-center gap-20 max-sm:gap-12">
      <div className="flex flex-col gap-4 text-center">
        <h1>
          Welcome
          {' '}
          <WavingHand01Icon className="inline-block size-10" />
          {' '}
          Back!
        </h1>
        <p className="text-muted-foreground">Sign in to your account to continue...</p>
      </div>
      <SignIn
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
  );
}
