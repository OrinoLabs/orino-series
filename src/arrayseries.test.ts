
import { expect } from 'chai';

import { Dimension, ArraySeries} from './index';


describe('ArraySeries', () => {

  it('should construct', () => {
    const gnaDim = new Dimension('GNA');
    const fuDim = new Dimension('FU');
    const dimensions = [gnaDim, fuDim];
    const data = [[0, 100], [1, 101], [2, 102]];
    const series = new ArraySeries(dimensions, data);

    expect(series instanceof ArraySeries).to.equal(true);
  });

  describe('#nth', () => {

    it('should return all values for index', () => {
      const gnaDim = new Dimension('GNA');
      const fuDim = new Dimension('FU');
      const dimensions = [gnaDim, fuDim];
      const data = [[0, 100], [1, 101], [2, 102]];
      const series = new ArraySeries(dimensions, data);

      expect(series.nth(0)).to.deep.equal([0, 100]);
      expect(series.nth(1)).to.deep.equal([1, 101]);
      expect(series.nth(2)).to.deep.equal([2, 102]);
    });

    it('should return only values for specified dimensions', () => {
      const gnaDim = new Dimension('GNA');
      const fuDim = new Dimension('FU');
      const dimensions = [gnaDim, fuDim];
      const data = [[0, 100], [1, 101], [2, 102]];
      const series = new ArraySeries(dimensions, data);

      expect(series.nth(0, [])).to.deep.equal([]);

      expect(series.nth(0, [gnaDim])).to.deep.equal([0]);
      expect(series.nth(1, [gnaDim])).to.deep.equal([1]);

      expect(series.nth(1, [fuDim])).to.deep.equal([101]);
      expect(series.nth(2, [fuDim])).to.deep.equal([102]);
    });

  });

  describe('#single', () => {

    it('should return single value', () => {
      const gnaDim = new Dimension('GNA');
      const fuDim = new Dimension('FU');
      const dimensions = [gnaDim, fuDim];
      const data = [[0, 100], [1, 101], [2, 102]];
      const series = new ArraySeries(dimensions, data);

      expect(series.single(0, gnaDim)).to.equal(0);
      expect(series.single(1, gnaDim)).to.equal(1);
      expect(series.single(2, gnaDim)).to.equal(2);

      expect(series.single(0, fuDim)).to.equal(100);
      expect(series.single(1, fuDim)).to.equal(101);
      expect(series.single(2, fuDim)).to.equal(102);
    });

  });

});
