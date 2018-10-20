
import { Dimension } from './dimension';



export abstract class Series {

  /**
   * 
   */
  readonly dimensions: Dimension[];

  /**
   * Dimension indices by dimension id.
   */
  private indices: {[id: string]: number};


  constructor(dimensions: Dimension[]) {
    this.dimensions = dimensions;

    this.indices = {};
    this.dimensions.forEach((dim, idx) => {
      this.indices[dim.id] = idx;
    });
  }


  hasDimension(dimension: Dimension): boolean {
    return dimension.id in this.indices;
  }


  dimensionIndex(dimension: Dimension): number {
    if (!(dimension.id in this.indices)) {
      throw new Error(`No such dimension: ${dimension.id}`);
    }
    return this.indices[dimension.id];
  }


  dimensionIndices(dimensions?: Dimension[]): number[] {
    if (!dimensions) {
      dimensions = this.dimensions;
    }
    return dimensions.map((dim) => this.dimensionIndex(dim));
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
