import { Loader2 } from 'lucide-react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

import { calculateProjectionConfig, getFileName } from './utils';

export default function WorldMapLoading({ countryName }: { countryName: string }) {
  const geoUrl = getFileName(countryName);

  const { center, scale } = calculateProjectionConfig(countryName);

  return (
    <div className="relative">
      <div className="blur-sm">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale, center }}
          height={450}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="white"
                    stroke="#B0B0B4"
                    strokeWidth={0.75}
                  />
                );
              })}
          </Geographies>
        </ComposableMap>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="size-12 animate-spin text-blue-500" />
      </div>
    </div>
  );
}
