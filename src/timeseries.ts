
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

  }

  return TimeSeriesImpl;
}
