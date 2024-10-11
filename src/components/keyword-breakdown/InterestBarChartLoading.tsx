import { BarChart } from '@/components/charts/BarChat';

export default function InterestBarChartLoading() {
  const dummyData = [
    {
      geoName: 'United States',
      interest: Math.floor(Math.random() * 101),
    },
    {
      geoName: 'Canada',
      interest: Math.floor(Math.random() * 101),
    },
    {
      geoName: 'United Kingdom',
      interest: Math.floor(Math.random() * 101),
    },
    {
      geoName: 'Australia',
      interest: Math.floor(Math.random() * 101),
    },
    {
      geoName: 'Germany',
      interest: Math.floor(Math.random() * 101),
    },
    {
      geoName: 'France',
      interest: Math.floor(Math.random() * 101),
    },
    {
      geoName: 'Japan',
      interest: Math.floor(Math.random() * 101),
    },
    {
      geoName: 'Brazil',
      interest: Math.floor(Math.random() * 101),
    },
    {
      geoName: 'India',
      interest: Math.floor(Math.random() * 101),
    },
    {
      geoName: 'South Africa',
      interest: Math.floor(Math.random() * 101),
    },
  ];

  return (
    <BarChart
      className="rounded-xl bg-white p-8 text-xl blur-sm max-lg:h-[450px] lg:h-auto lg:max-w-[25%]"
      data={dummyData.sort((a, b) => b.interest - a.interest)}
      index="geoName"
      layout="vertical"
      categories={['interest']}
      showLegend={false}
      xAxisLabel="Relative Interest"
    />
  );
}
