
import { expect } from 'chai';

import { Dimension, Series } from './index';


describe('Series', () => {

  class ConcreteSeries extends Series {
    nth: any;
  }

  it('should manage dimensions', () => {
    const dimA = new Dimension('A');
    const dimB = new Dimension('B');
    const dimC = new Dimension('C');
    const series = new ConcreteSeries([dimA, dimB]);

    expect(series.hasDimension(dimA)).to.be.true;
    expect(series.hasDimension(dimB)).to.be.true;
    expect(series.hasDimension(dimC)).to.be.false;

    expect(series.dimensionIndex(dimA)).to.equal(0);
    expect(series.dimensionIndex(dimB)).to.equal(1);
    expect(() => series.dimensionIndex(dimC)).to.throw(Error);

    expect(series.dimensionIndices([dimA])).to.deep.equal([0]);
    expect(series.dimensionIndices([dimA, dimB])).to.deep.equal([0, 1]);
    expect(() => series.dimensionIndices([dimC])).to.throw(Error);
  });

});
