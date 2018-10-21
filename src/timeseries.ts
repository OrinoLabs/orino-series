
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


    time(idx: number) {
      return this.value(idx, this.timeDimensionIdx);
    }


    // TODO: Define behavior for times outside range.
    atTime(t: number, dimensions?: Dimension[]): any[] {
      const locator = this.locatorForTime(t);
      return this.at(locator, dimensions);
    }


    // TODO: Define behavior for times outside range.
    locatorForTime(t: number): number {
      let left = 0;
      let right = this.length - 1;
      let middle = Math.floor((left + right) / 2);
      while (left !== middle) {
        const tm  = this.time(middle);
        if (t < tm) {
          right = middle;
        } else {
          left = middle;
        }
        middle = Math.floor((left + right) / 2);
      }
      const idx = (this.time(right) <= t) ? right : left;

      if (idx === this.length - 1) {
        return idx;
      } else {
        const t1 = this.time(idx);
        const t2 = this.time(idx + 1);
        const dt = t2 - t1;
        const fraction = (t - t1) / dt;
        return idx + fraction;  
      }
    }

  }

  return TimeSeriesImpl;
}
