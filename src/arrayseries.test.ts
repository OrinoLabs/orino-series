
import { expect } from 'chai';

import { Dimension, ArraySeries, ArrayTimeSeries } from './index';
import { timeDimension } from './timeseries';


const gnaDim = new Dimension('GNA');
const fuDim = new Dimension('FU');
const testData = [[0, 100], [1, 101], [2, 102]];


describe('ArraySeries', () => {

  it('should construct', () => {
    const series = new ArraySeries([gnaDim, fuDim], testData);

    expect(series).to.be.instanceOf(ArraySeries);
    expect(series.length).to.equal(3);
  });

  it('#valueAt', () => {
    const data = [[0, 100], [1, 110], [2, 120]];
    const series = new ArraySeries([gnaDim, fuDim], data);

    expect(series.valueAt(0, 0, 0)).to.equal(0);
    expect(series.valueAt(0, 0, 1)).to.equal(100);

    expect(series.valueAt(1, 0, 0)).to.equal(1);
    expect(series.valueAt(1, 0, 1)).to.equal(110);

    expect(series.valueAt(1, 0.5, 0)).to.equal(1.5);
    expect(series.valueAt(1, 0.5, 1)).to.equal(115);
    expect(series.valueAt(1, 0.7, 0)).to.equal(1.7);
    expect(series.valueAt(1, 0.7, 1)).to.equal(117);

    expect(series.valueAt(2, 0, 0)).to.equal(2);
    expect(series.valueAt(2, 0, 1)).to.equal(120);
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

  describe('#at', () => {

    it('should return all values for locator', () => {
      const data = [[0, 100], [1, 110], [2, 120]];
      const series = new ArraySeries([gnaDim, fuDim], data);

      expect(series.at(0  )).to.deep.equal([0,   100]);
      expect(series.at(0.3)).to.deep.equal([0.3, 103]);
      expect(series.at(0.7)).to.deep.equal([0.7, 107]);
      expect(series.at(1  )).to.deep.equal([1,   110]);
      expect(series.at(1.5)).to.deep.equal([1.5, 115]);
      expect(series.at(2  )).to.deep.equal([2,   120]);
    });

    it('should return only values for specified dimensions', () => {
      const data = [[0, 100], [1, 110], [2, 120]];
      const series = new ArraySeries([gnaDim, fuDim], data);

      expect(series.at(0, [])).to.deep.equal([]);

      expect(series.at(0,   [gnaDim])).to.deep.equal([0]);
      expect(series.at(0.3, [gnaDim])).to.deep.equal([0.3]);
      expect(series.at(1,   [gnaDim])).to.deep.equal([1]);

      expect(series.at(1,   [fuDim])).to.deep.equal([110]);
      expect(series.at(1.7, [fuDim])).to.deep.equal([117]);
      expect(series.at(2,   [fuDim])).to.deep.equal([120]);
    });

  });

});


describe('ArrayTimeSeries', () => {

  it('should construct', () => {
    const series = new ArrayTimeSeries([timeDimension, gnaDim], testData);

    expect(series).to.be.instanceOf(ArrayTimeSeries);
    expect(series.isTimeSeries).to.equal(true);
  });

  it('should not construct without time dimension', () => {
    expect(() => new ArrayTimeSeries([gnaDim, fuDim], testData))
      .to.throw(Error);
  });

  it('should have correct start/end-time and duration', () => {
    let series = new ArrayTimeSeries([timeDimension], [[0], [1], [2]]);

    expect(series.startTime).to.equal(0);
    expect(series.endTime).to.equal(2);
    expect(series.duration).to.equal(2);

    series = new ArrayTimeSeries([timeDimension], [[10], [13], [17]]);

    expect(series.startTime).to.equal(10);
    expect(series.endTime).to.equal(17);
    expect(series.duration).to.equal(7);
  })
});
