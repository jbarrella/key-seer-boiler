import { Lightbulb, Trees, Zap } from 'lucide-react';
import Image from 'next/image';

export default function Overview() {
  return (
    <>
      <h1 className="text-3xl font-extrabold text-black sm:text-3xl md:text-6xl">
        From concept to conversion
      </h1>
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <h3 className="flex flex-row items-center gap-2 text-2xl font-semibold">
            <span className="text-3xl text-orange-600">1. </span>
            Ideate
            {' '}
            <Lightbulb className="inline-block size-8" />
          </h3>
          <p className="text-muted-foreground">
            Use our powerful tools to uncover untapped markets, validate product ideas,
            and come out ahead of your competition. Any vertical. Any idea.
          </p>
          <div className="mx-auto mt-8 h-auto w-fit rounded-lg bg-gray-300 p-1 shadow-lg">
            <Image
              src="/landing-page/ls-overview.png"
              alt="Interest by Region Screenshot"
              width={800}
              height={400}
              className="mx-auto size-auto rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="flex flex-row items-center gap-2 text-2xl font-semibold">
            <span className="text-3xl text-orange-600">2. </span>
            Execute
            {' '}
            <Zap className="inline-block size-8" />
          </h3>
          <p className="text-muted-foreground">
            Launch with confidence, stay adaptive, and create an optimized content
            strategy from day one.
          </p>
          <div className="mx-auto mt-8 h-auto w-fit rounded-lg bg-gray-300 p-1 shadow-lg">
            <div className="bg-white pt-3">
              <Image
                src="/landing-page/ls-interest-by-region.png"
                alt="Interest by Region Screenshot"
                width={800}
                height={400}
                className="mx-auto size-auto rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="flex flex-row items-center gap-2 text-2xl font-semibold">
            <span className="text-3xl text-orange-600">3. </span>
            Scale
            {' '}
            <Trees className="inline-block size-8" />
          </h3>
          <p className="text-muted-foreground">
            Generate more traffic, leads, and sales with our powerful SEO suite.
          </p>
          <div className="mx-auto mt-8 h-auto w-fit rounded-lg bg-gray-300 p-1">
            <Image
              src="/landing-page/ls-top-searches.png"
              alt="Interest by Region Screenshot"
              width={800}
              height={400}
              className="mx-auto size-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
