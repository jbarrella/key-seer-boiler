import { SignedIn, SignedOut } from '@clerk/nextjs';
import { ArrowRight, MessageCircleQuestion } from 'lucide-react';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export default function FAQ() {
  const questions = [
    {
      question: 'Where does your data come from?',
      answer: 'Our data is sourced from Google.',
    },
    {
      question: 'What do I get access to with a paid plan?',
      answer:
        'Our paid plans offer access to all our features, including keyword research, competitor analysis, domain monitoring, and more.',
    },
    {
      question: 'How does KeySeer validate product ideas?',
      answer: 'We use a combination of data to validate product ideas.',
    },
    {
      question: 'What types of product ideas can I validate with KeySeer?',
      answer: 'Any type of product including SaaS, physical products, and more.',
    },
    {
      question: 'How does it work if I want to cancel my subscription?',
      answer:
        'Our paid plans offer access to all our features, including keyword research, competitor analysis, domain monitoring, and more.',
    },
    {
      question: 'Is my data protected?',
      answer:
        'Yes, we take data privacy very seriously. We do not sell or share any of your data with third parties.',
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-extrabold text-white sm:text-3xl md:text-6xl">
        Still have
        {' '}
        <MessageCircleQuestion className="inline-block size-9" />
        {' '}
        questions?
      </h1>

      <Accordion
        collapsible
        type="single"
        className="mx-auto mt-12 w-3/5 rounded-lg bg-white p-10 text-black max-lg:w-full"
      >
        {questions.map((question, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-left text-xl font-semibold">
              {question.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground flex flex-col gap-4 text-left text-lg">
              <p>{question.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-24 flex flex-col items-center justify-center">
        <h3 className="mb-4 text-2xl font-semibold text-white">
          Ready to Elevate Your Strategy?
        </h3>
        <SignedIn>
          <Link href="/keywords-lookup">
            <Button className="rounded-lg bg-black p-6 text-lg text-white shadow-md">
              Explore Your Dashboard
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <Link href="/pricing">
            <Button className="rounded-lg bg-black p-6 text-lg text-white shadow-md">
              Get Started For Free Now
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </Link>
        </SignedOut>
      </div>
    </>
  );
}
