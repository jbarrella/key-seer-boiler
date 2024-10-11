import { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

import type { Region } from '../types';
import { calculateProjectionConfig, getFileName } from './utils';

interface WorldMapProps {
  data: Region[];
  countryName: string;
}

export default function WorldMap({ data, countryName }: WorldMapProps) {
  const [tooltipContent, setTooltipContent] = useState<string>('');
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  // Fixed to 100 by Google Trends
  const maxValue = 100;
  const geoUrl = getFileName(countryName);
  const { center, scale } = calculateProjectionConfig(countryName);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (mapRef.current) {
        const rect = mapRef.current.getBoundingClientRect();
        setTooltipPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-auto w-full" ref={mapRef}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale, center }}
        height={450}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find(s => s.geoName === geo.properties.name);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? `rgba(0, 100, 200, ${d.interest / maxValue})` : '#EEE'}
                  stroke="#B0B0B4"
                  strokeWidth={0.75}
                  onMouseEnter={() => {
                    const { name } = geo.properties;
                    setTooltipContent(`${name}: ${d ? d.interest : 'N/A'}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              );
            })}
        </Geographies>
      </ComposableMap>
      {tooltipContent && (
        <div
          style={{
            position: 'absolute',
            top: `${tooltipPosition.y - 30}px`,
            left: `${tooltipPosition.x + 20}px`,
            padding: '5px',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            pointerEvents: 'none',
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
}
