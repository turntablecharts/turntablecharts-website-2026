/**
 * Creates separators with coma in thousands
 * @param {number} num - number to be formatted
 * @param {string?} separator - one of ',' | ','
 * @param returnDefault
 * @return {string}
 */
export const thousandsSeparators = (
  num: number | string,
  separator: string = ",",
  returnDefault?: any
) => {
  if (num) {
    const numParts = num.toString().split(".");
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return numParts.join(".");
  }
  return returnDefault ?? "";
};

export const resolveUserTypeToTableData = <T>(
  data: T[],
  reshape?: (curObject: T, i: number) => T | object
) => {
  if (data?.length) {
    return data.reduce((res: any[], _cur, i) => {
      if (reshape) {
        const overwrite = reshape(_cur, i);
        res.push({ sn: i + 1, ..._cur, ...overwrite });
      } else res.push({ sn: i + 1, ..._cur });
      return res;
    }, []);
  }
  return data;
};

export const calculateReadingTime = (lengthOfText: number) => {
  const wordsPerMinute = 200; // Average case.

  if (lengthOfText > 0) {
    return Math.ceil(lengthOfText / wordsPerMinute);
  }
  return 1;
};

// type NonFunctional<T> = T extends Function ? never : T;

// /**
//  * Helper to produce an array of enum values.
//  * @param enumeration Enumeration object.
//  */
// export function enumToArray<T>(enumeration: T): NonFunctional<T[keyof T]>[] {
//     return Object.keys(enumeration)
//         .filter(key => isNaN(Number(key)))
//         .map(key => enumeration[key])
//         .filter(val => typeof val === "number" || typeof val === "string");
// }
