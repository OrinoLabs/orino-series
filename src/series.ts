
import { Dimension } from './dimension';



export abstract class Series {

  /**
   * 
   */
  readonly dimensions: Dimension[];

  /**
   * Dimension indices by dimension id.
   */
  protected indices: {[id: string]: number};


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


  dimensionIndex(dimension: Dimension<any>): number {
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
   * The series' length.
   */
  abstract get length(): number;


  /**
   * Returns a single value.
   * @param idx - Point index.
   * @param dimIndex - Dimension index.
   */
  abstract value(idx: number, dimIndex: number): any;


  /**
   * Reurns a single value, interpolating if necessary.
   * @param idx 
   * @param fraction 
   * @param dimIdx
   */
  valueAt(idx: number, fraction: number, dimIdx): any {
    if (fraction === 0) {
      return this.value(idx, dimIdx);
    } else {
      return this.dimensions[dimIdx].valueAt(this, idx, fraction, dimIdx);
    }
  }


  /**
   * Returns a single value.
   * @param idx 
   * @param dimension 
   */
  single<T>(idx: number, dimension: Dimension<T>): T {
    return this.value(idx, this.dimensionIndex(dimension));
  }


  /**
   * Returns the nth data point.
   * Optionally only returning the specified dimensions.
   * @param idx - The index.
   * @param [dimensions] - The dimensions to return (optional).
   * @return The requested dimension values.
   */
  nth(idx: number, dimensions?: Dimension[]): any[][] {
    if (!dimensions) {
      dimensions = this.dimensions;
    }
    let indices = this.dimensionIndices(dimensions);
    return indices.map((dimIdx) => this.value(idx, dimIdx));
  }


  at(locator: number, dimensions?: Dimension[]): any[] {
    const idx = Math.floor(locator);
    const fraction = locator - idx;
    const indices = this.dimensionIndices(dimensions || this.dimensions);
    return indices.map((dimIdx) => this.valueAt(idx, fraction, dimIdx));
  }

}
