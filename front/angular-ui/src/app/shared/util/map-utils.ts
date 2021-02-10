export class MapUtils {

  static async sort<T extends Map<number | string, any>>(map: T): Promise<T> {
    const keys: Array<number | string> = [];
    await map.forEach((value, key) => keys.push(key));
    keys.sort();

    const sortedMap = new Map();
    await keys.forEach(mapIndex => sortedMap.set(mapIndex, map.get(mapIndex)));

    return sortedMap as T;
  }
}
