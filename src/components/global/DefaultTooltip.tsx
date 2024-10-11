'use client';

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function DefaultTooltip({ content }: { content: string }) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onTouchStart={() => setOpen(!open)}
            onKeyDown={(e) => {
              e.preventDefault();
              e.key === 'Enter' && setOpen(!open);
            }}
          >
            <QuestionMarkCircledIcon />
          </button>
        </TooltipTrigger>
        <TooltipContent
          className={`${
            !content ? 'hidden' : ''
          } w-full max-w-[80vw] text-wrap md:max-w-[600px]`}
        >
          <span className="inline-block break-words">{content}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
