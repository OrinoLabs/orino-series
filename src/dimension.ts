
import { Series } from './series';


/**
 * Interpolation function.
 */
type Interpolator<T> = (
  series: Series, idx: number, fraction: number, dimIdx: number
) => T;


/**
 * Linear interpolation function.
 */
const lerp: Interpolator<number> = (
  series: Series, idx: number, fraction: number, dimIdx: number
) => {
  const a = series.value(idx, dimIdx);
  if (idx + 1 === series.length) {
    return a;
  } else {
    const b = series.value(idx + 1, dimIdx);
    return a + fraction * (b - a);
  }
};



export class Dimension<T = number> {

  readonly id: string;

  interpolator: Interpolator<T>;


  constructor(id: string) {
    this.id = id;

    this.interpolator = <any> lerp;
  }


  valueAt(series: Series, idx: number, fraction: number, dimIdx: number): T {
    return this.interpolator(series, idx, fraction, dimIdx);
  }

}
