import { customType } from 'drizzle-orm/pg-core';

export interface PointLocation {
  lng: number;
  lat: number;
}

export const geometryPoint = customType<{ data: PointLocation; driverData: string }>({
  dataType() {
    return 'geometry(Point, 4326)';
  },
  toDriver(value: PointLocation): string {
    return `ST_SetSRID(ST_MakePoint(${value.lng}, ${value.lat}), 4326)`;
  },
  fromDriver(value: string | any): PointLocation {
    if (typeof value === 'object' && value !== null && 'lng' in value && 'lat' in value) {
      return value as PointLocation;
    }
    if (typeof value === 'string' && value.startsWith('POINT')) {
      const coords = value.replace('POINT(', '').replace(')', '').split(' ');
      return { lng: parseFloat(coords[0]), lat: parseFloat(coords[1]) };
    }
    return { lng: 0, lat: 0 };
  },
});
