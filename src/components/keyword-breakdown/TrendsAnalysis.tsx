import { BarChart } from '@/components/charts/BarChat';

import InterestBarChartLoading from './InterestBarChartLoading';
import WorldMap from './map/WorldMap';
import WorldMapLoading from './map/WorldMapLoading';
import type { TrendsData } from './types';

interface TrendsAnalysisProps {
  data: TrendsData | null;
  countryName: string;
}

export default function TrendsAnalysis({ data, countryName }: TrendsAnalysisProps) {
  console.log('rendering TrendsAnalysis');

  let yAxisWidth;
  if (data) {
    yAxisWidth = Math.max(
      ...data.interestByRegion.map(region =>
        region.geoName
          .split(' ')
          .map(word => word.length)
          .reduce((a, b) => Math.max(a, b), 0),
      ),
    );
  }

  return (
    <div className="flex w-full flex-row gap-6 max-lg:flex-col">
      <div className="w-full rounded-xl bg-white pt-8">
        <h2 className="mb-4 text-center text-2xl font-bold capitalize">
          Interest by Region
        </h2>
        <div className="w-full">
          {data
            ? (
                <WorldMap data={data.interestByRegion} countryName={countryName} />
              )
            : (
                <WorldMapLoading countryName={countryName} />
              )}
        </div>
      </div>
      {data
        ? (
            <BarChart
              className="rounded-xl bg-white p-8 text-xl max-lg:h-[450px] lg:h-auto lg:max-w-[25%]"
              data={data.interestByRegion
                .sort((a, b) => b.interest - a.interest)
                .slice(0, 10)}
              index="geoName"
              layout="vertical"
              categories={['interest']}
              showLegend={false}
              xAxisLabel="Relative Interest"
              yAxisWidth={yAxisWidth * 6.5}
            />
          )
        : (
            <InterestBarChartLoading />
          )}
    </div>
  );
}
