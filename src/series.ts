
import { Dimension } from './dimension';



export abstract class Series {

  /**
   * 
   */
  readonly dimensions: Dimension[];

  /**
   * 
   */
  readonly dimensionIndices: {[id: string]: number};


  constructor(dimensions: Dimension[]) {
    this.dimensions = dimensions;

    this.dimensionIndices = {};
    this.dimensions.forEach((dim, idx) => {
      this.dimensionIndices[dim.id] = idx;
    });
  }


  getDimensionIndex(dimension: Dimension): number {
    return this.dimensionIndices[dimension.id];
  }


  getDimensionIndices(dimensions: Dimension[]): number[] {
    return dimensions.map((dim) => this.dimensionIndices[dim.id]);
  }


  /**
   * Returns the nth data point.
   * @param idx - The index.
   */
  abstract nth(idx: number): any[];


  /**
   * Returns the given dimension values of the nth data point.
   * @param idx - The index.
   * @param dimensions - The dimension values are returned for.
   */
  abstract nth(idx: number, dimensions: Dimension[]): any[];


  /**
   * Returns a single value.
   * @param idx 
   * @param dimension 
   */
  single<T>(idx: number, dimension: Dimension<T>): T {
    return this.nth(idx, [dimension])[0];
  }

}
