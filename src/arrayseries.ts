
import { Dimension } from "./dimension";
import { Series } from "./series";
import { TimeSeriesMixin } from './timeseries';


/**
 * Ordering of the data.
 * NOTE: Not exported, but can be accessed through ArraySeries.DataOrder
 */
enum DataOrder {
  BY_INDEX = 1,
  BY_DIMENSION = 2,
}


export interface ArraySeriesOptions {
  dataOrder?: DataOrder;
}


export class ArraySeries extends Series {

  static readonly DataOrder: typeof DataOrder = DataOrder;

  static readonly defaultOpts: ArraySeriesOptions = {
    dataOrder: DataOrder.BY_INDEX,
  };

  private data: any[][];

  private opts: ArraySeriesOptions;


  constructor(dimensions: Dimension[], data: any[][], opts?: ArraySeriesOptions) {
    super(dimensions);
    this.data = data;
    this.opts = Object.assign({}, ArraySeries.defaultOpts, opts);

    if (this.opts.dataOrder === DataOrder.BY_DIMENSION) {
      this.value = this.valueDimensionFirst;
    }
  }


  get length(): number {
    return this.opts.dataOrder === DataOrder.BY_INDEX ?
        this.data.length :
        this.dimensions.length && this.data[0].length || 0;
  }


  value(idx: number, dimIdx: number): any {
    return this.data[idx][dimIdx];
  }


  private valueDimensionFirst(idx: number, dimIdx: number): any {
    return this.data[dimIdx][idx];
  }

}



export const ArrayTimeSeries = TimeSeriesMixin(ArraySeries);
