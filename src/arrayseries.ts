
import { Dimension } from "./dimension";
import { Series } from "./series";
import { TimeSeriesMixin } from './timeseries';


export class ArraySeries extends Series {

  private data: any[][];


  constructor(dimensions: Dimension[], data: any[][]) {
    super(dimensions);
    this.data = data;
  }


  get length(): number {
    return this.data.length;
  }


  value(idx: number, dimIdx: number) {
    return this.data[idx][dimIdx];
  }

}



export const ArrayTimeSeries = TimeSeriesMixin(ArraySeries);
