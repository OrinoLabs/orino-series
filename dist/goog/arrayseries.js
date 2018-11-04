/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
goog.module('arrayseries');
var module = module || { id: 'arrayseries.ts' };
const tsickle_forward_declare_1 = goog.forwardDeclare("dimension");
const tsickle_forward_declare_2 = goog.forwardDeclare("series");
const tsickle_forward_declare_3 = goog.forwardDeclare("timeseries");
var series_1 = goog.require('series');
var timeseries_1 = goog.require('timeseries');
/** @enum {number} */
const DataOrder = {
    BY_INDEX: 1,
    BY_DIMENSION: 2,
};
DataOrder[DataOrder.BY_INDEX] = 'BY_INDEX';
DataOrder[DataOrder.BY_DIMENSION] = 'BY_DIMENSION';
/**
 * @record
 */
function ArraySeriesOptions() { }
exports.ArraySeriesOptions = ArraySeriesOptions;
if (false) {
    /** @type {DataOrder} */
    ArraySeriesOptions.prototype.dataOrder;
}
class ArraySeries extends series_1.Series {
    /**
     * @param {!Array<!tsickle_forward_declare_1.Dimension<number>>} dimensions
     * @param {!Array<!Array<?>>} data
     * @param {!ArraySeriesOptions=} opts
     */
    constructor(dimensions, data, opts) {
        super(dimensions);
        this.data = data;
        this.opts = Object.assign({}, ArraySeries.defaultOpts, opts);
        if (this.opts.dataOrder === DataOrder.BY_DIMENSION) {
            this.value = this.valueDimensionFirst;
        }
    }
    /**
     * @return {number}
     */
    get length() {
        return this.opts.dataOrder === DataOrder.BY_INDEX ?
            this.data.length :
            this.dimensions.length && this.data[0].length || 0;
    }
    /**
     * @param {number} idx
     * @param {number} dimIdx
     * @return {?}
     */
    value(idx, dimIdx) {
        return this.data[idx][dimIdx];
    }
    /**
     * @param {number} idx
     * @param {number} dimIdx
     * @return {?}
     */
    valueDimensionFirst(idx, dimIdx) {
        return this.data[dimIdx][idx];
    }
}
ArraySeries.DataOrder = DataOrder;
ArraySeries.defaultOpts = {
    dataOrder: DataOrder.BY_INDEX,
};
exports.ArraySeries = ArraySeries;
if (false) {
    /** @type {?} */
    ArraySeries.DataOrder;
    /** @type {!ArraySeriesOptions} */
    ArraySeries.defaultOpts;
    /**
     * @type {!Array<!Array<?>>}
     * @private
     */
    ArraySeries.prototype.data;
    /**
     * @type {!ArraySeriesOptions}
     * @private
     */
    ArraySeries.prototype.opts;
}
/** @type {?} */
exports.ArrayTimeSeries = timeseries_1.TimeSeriesMixin(ArraySeries);
