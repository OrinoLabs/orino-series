
import { Series } from './series';
import { Dimension } from './dimension';


export const TIME_DIMENSION_ID: string = 'TIME';

export const timeDimension: Dimension = new Dimension(TIME_DIMENSION_ID);


type Type<T> = { new(...args: any[]): T };

export function TimeSeriesMixin<T extends Type<Series>>(Base: T) {

  abstract class TimeSeriesImpl extends Base {

    isTimeSeries: true = true;

    constructor(...args: any[]) {
      super(...args);
      if (!this.hasDimension(timeDimension)) {
        throw new Error('No time dimension.');
      }
    }

  }

  return TimeSeriesImpl;
}
