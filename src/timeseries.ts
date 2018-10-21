
import { Series } from './series';
import { Dimension } from './dimension';


export const TIME_DIMENSION_ID: string = 'TIME';

export const timeDimension: Dimension = new Dimension(TIME_DIMENSION_ID);


type Type<T> = { new(...args: any[]): T };

export function TimeSeriesMixin<T extends Type<Series>>(Base: T) {

  abstract class TimeSeriesImpl extends Base {

    readonly isTimeSeries: true = true;

    readonly timeDimensionIdx: number;


    constructor(...args: any[]) {
      super(...args);
      if (!this.hasDimension(timeDimension)) {
        throw new Error('No time dimension.');
      }
      this.timeDimensionIdx = this.indices[TIME_DIMENSION_ID];
    }


    get startTime(): number {
      return this.value(0, this.timeDimensionIdx);
    }


    get endTime(): number {
      return this.value(this.length - 1, this.timeDimensionIdx);
    }


    get duration(): number {
      return this.endTime - this.startTime;
    }


    // TODO: Define behavior for times outside range.
    atTime(t: number, dimensions?: Dimension[]): any[] {
      const locator = this.locatorForTime(t);
      return this.at(locator, dimensions);
    }


    // TODO: Define behavior for times outside range.
    locatorForTime(t: number): number {
      // TODO: Use binary search.
      let idx = 0;
      while (idx < this.length - 1) {
        const tNext = this.value(idx + 1, this.timeDimensionIdx);
        if (tNext <= t) {
          idx += 1;
        } else {
          break;
        }
      }
      if (idx === this.length - 1) {
        return idx;
      }
      const t1 = this.value(idx, this.timeDimensionIdx);
      const t2 = this.value(idx + 1, this.timeDimensionIdx);
      const dt = t2 - t1;
      const fraction = (t - t1) / dt;
      return idx + fraction;
    }

  }

  return TimeSeriesImpl;
}
