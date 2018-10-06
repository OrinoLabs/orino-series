
import { Dimension } from "./dimension";
import { Series } from "./series";


export class ArraySeries extends Series {

  private data: any[][];



  constructor(dimensions: Dimension[], data: any[][]) {
    super(dimensions);
  }


  nth(idx: number, dimensions?: Dimension[]): any {
    if (dimensions) {
      let indices = this.getDimensionIndices(dimensions);
      return indices.map((dimIdx) => this.data[idx][dimIdx]);
    } else {
      return this.data[idx];
    }
  }

}