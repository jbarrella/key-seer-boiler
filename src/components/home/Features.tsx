import { PackageOpen } from 'lucide-react';

import FeaturesCard from './FeaturesCard';

export default function Features() {
  return (
    <>
      <h1 className="text-3xl font-extrabold text-white sm:text-3xl md:text-6xl">
        Packed
        {' '}
        <PackageOpen className="inline-block size-9 stroke-orange-600" />
        {' '}
        with
        features
      </h1>
      <FeaturesCard />
      <p className="mt-8 text-2xl text-white">
        <span className="text-orange-600">&</span>
        {' '}
        much more...
      </p>
    </>
  );
}
