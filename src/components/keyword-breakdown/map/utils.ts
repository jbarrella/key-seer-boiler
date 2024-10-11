import { geoBounds, geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

export function getFileName(countryName: string) {
  return countryName
    ? `/maps/${countryName.toLowerCase().replace(' ', '-')}.json`
    : '/world-map.json';
}

export function calculateProjectionConfig(countryName: string): {
  center: [number, number];
  scale: number;
} {
  if (!countryName) {
    // World map is handled as special case.
    return { center: [0, 40], scale: 100 };
  }

  const fileName = getFileName(countryName);

  let topology;
  try {
    topology = require(`../../../../public${fileName}`);
  } catch {
    // Fallback to world map configuration
    return { center: [0, 40], scale: 100 };
  }

  const geojson = feature(topology, topology.objects[Object.keys(topology.objects)[0]]);

  const mapWidth = 800;
  const mapHeight = 450;

  const bounds = geoBounds(geojson);
  const center: [number, number] = [
    (bounds[0][0] + bounds[1][0]) / 2,
    (bounds[0][1] + bounds[1][1]) / 2,
  ];

  const scaleFactor = 125; // Adjust this factor as needed

  const path = geoPath().projection(geoMercator());
  const pathBounds = path.bounds(geojson);
  const width = pathBounds[1][0] - pathBounds[0][0];
  const height = pathBounds[1][1] - pathBounds[0][1];
  const scale = Math.min(
    (scaleFactor * mapWidth) / width,
    (scaleFactor * mapHeight) / height,
  );

  return { center, scale };
}
