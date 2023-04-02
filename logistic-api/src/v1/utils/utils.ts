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
) {
  const res = orderByDistance(point, points);

  if (!res) return false;

  return res;
}
