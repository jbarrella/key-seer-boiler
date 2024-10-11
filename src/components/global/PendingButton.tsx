import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

interface PendingButtonProps {
  label?: React.ReactNode;
  className?: string;
}

export default function PendingButton({
  label = 'Search',
  className,
}: PendingButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={`text-md h-[40px] grow bg-purple-600 text-white disabled:bg-gray-400 ${className}`}
      disabled={pending}
    >
      {pending ? 'Loading...' : label}
    </Button>
  );
}
