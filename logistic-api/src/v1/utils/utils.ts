import { findNearest, orderByDistance } from "geolib";

export function getMoreDistanceLocal(
  point: { latitude: number; longitude: number },
  points: { latitude: number; longitude: number }[]
) {
  const res = orderByDistance(point, points).pop();
  if (!res) return false;
  return res;
}

export function getMoreNeareastDeliverys(
  point: { latitude: number; longitude: number },
  points: { latitude: number; longitude: number; id: number }[]
): { id: number; latitude: number; longitude: number }[] | false {
  const res = orderByDistance(point, points);


  if (!res) return false;

  // @ts-ignore
  return res;
}
