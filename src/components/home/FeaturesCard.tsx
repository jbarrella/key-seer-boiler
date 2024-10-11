'use client';

import { ArrowRight, SquareCheckBig } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Button } from '../ui/button';

export default function FeaturesCard() {
  const [selectedFeature, setSelectedFeature] = useState<string>('productValidation');

  const images: Record<string, string> = {
    productValidation: '/landing-page/ls-overview.png',
    keywordResearch: '/landing-page/ls-top-searches.png',
    competitorAnalysis: '/landing-page/ls-interest-by-region.png',
    domainMonitoring: '/landing-page/ls-top-searches.png',
  };

  const features = [
    {
      key: 'productValidation',
      image: '/landing-page/ls-overview.png',
      title: 'Product Validation',
      description: 'Validate your product ideas with real market data and insights.',
      items: ['Measure market demand', 'Analyze competitors', 'Track shifts'],
    },
    {
      key: 'keywordResearch',
      image: '/landing-page/ls-top-searches.png',
      title: 'Keyword Research',
      description:
        'Explore and discover top ranking keywords to extend your reach to larger audiences.',
      items: [
        'Keyword difficulty',
        'Keyword relevance',
        'Discover long-tail keywords',
        '12-month historical trends',
      ],
    },
    {
      key: 'competitorAnalysis',
      image: '/landing-page/ls-interest-by-region.png',
      title: 'Competitor Analysis',
      description:
        'Track your competitors&apos; performance and stay ahead of the curve.',
      items: ['View changes'],
    },
    {
      key: 'domainMonitoring',

      title: 'Domain Monitoring',
      description: 'Monitor your domain&apos;s performance over time.',
      items: ['Domain ranking', 'Backlink checker', 'Site audit'],
    },
  ];

  return (
    <div className="mt-16 flex flex-row gap-12  rounded-lg bg-white p-12">
      <Accordion
        type="single"
        defaultValue="productValidation"
        onValueChange={value => setSelectedFeature(value)}
        className="w-1/3 max-md:w-full"
      >
        {features.map(feature => (
          <AccordionItem key={feature.key} value={feature.key}>
            <AccordionTrigger className="text-2xl font-semibold">
              {feature.title}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <span className="text-gray-500">{feature.description}</span>
              <ul className="flex flex-col gap-2">
                {feature.items.map((item, index) => (
                  <li className="flex flex-row items-center gap-2" key={index}>
                    <SquareCheckBig className="inline-block size-4 stroke-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/pricing">
                <Button>
                  Try
                  {' '}
                  {feature.title}
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="my-auto ml-auto h-fit w-2/3 rounded-lg bg-gray-300 p-1 shadow-lg max-md:hidden">
        <Image
          src={images[selectedFeature]}
          alt="Interest by Region Screenshot"
          width={800}
          height={400}
          className="mx-auto h-auto w-full rounded-lg"
        />
      </div>
    </div>
  );
}
