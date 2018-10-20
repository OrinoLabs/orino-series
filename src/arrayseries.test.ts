
import { expect } from 'chai';

import { Dimension, ArraySeries, ArrayTimeSeries } from './index';
import { timeDimension } from './timeseries';


const gnaDim = new Dimension('GNA');
const fuDim = new Dimension('FU');
const testData = [[0, 100], [1, 101], [2, 102]];


describe('ArraySeries', () => {

  it('should construct', () => {
    const series = new ArraySeries([gnaDim, fuDim], testData);

    expect(series instanceof ArraySeries).to.equal(true);
  });

  describe('#nth', () => {

    it('should return all values for index', () => {
      const data = [[0, 100], [1, 101], [2, 102]];
      const series = new ArraySeries([gnaDim, fuDim], data);

      expect(series.nth(0)).to.deep.equal([0, 100]);
      expect(series.nth(1)).to.deep.equal([1, 101]);
      expect(series.nth(2)).to.deep.equal([2, 102]);
    });

    it('should return only values for specified dimensions', () => {
      const series = new ArraySeries([gnaDim, fuDim], testData);

      expect(series.nth(0, [])).to.deep.equal([]);

      expect(series.nth(0, [gnaDim])).to.deep.equal([0]);
      expect(series.nth(1, [gnaDim])).to.deep.equal([1]);

      expect(series.nth(1, [fuDim])).to.deep.equal([101]);
      expect(series.nth(2, [fuDim])).to.deep.equal([102]);
    });

  });

  describe('#single', () => {

    it('should return single value', () => {
      const series = new ArraySeries([gnaDim, fuDim], testData);

      expect(series.single(0, gnaDim)).to.equal(0);
      expect(series.single(1, gnaDim)).to.equal(1);
      expect(series.single(2, gnaDim)).to.equal(2);

      expect(series.single(0, fuDim)).to.equal(100);
      expect(series.single(1, fuDim)).to.equal(101);
      expect(series.single(2, fuDim)).to.equal(102);
    });

  });

});


describe('ArrayTimeSeries', () => {

  it('should construct', () => {
    const series = new ArrayTimeSeries([timeDimension, gnaDim], testData);

    expect(series instanceof ArrayTimeSeries).to.equal(true);
    expect(series.isTimeSeries).to.equal(true);
  });

  it('should not construct without time dimension', () => {
    expect(() => new ArrayTimeSeries([gnaDim, fuDim], testData))
      .to.throw(Error);
  });

});
