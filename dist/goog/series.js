/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
goog.module('series');
var module = module || { id: 'series.ts' };
const tsickle_forward_declare_1 = goog.forwardDeclare("dimension");
/**
 * @abstract
 */
class Series {
    /**
     * @param {!Array<!tsickle_forward_declare_1.Dimension<number>>} dimensions
     */
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.indices = {};
        this.dimensions.forEach((dim, idx) => {
            this.indices[dim.id] = idx;
        });
    }
    /**
     * @param {!tsickle_forward_declare_1.Dimension<number>} dimension
     * @return {boolean}
     */
    hasDimension(dimension) {
        return dimension.id in this.indices;
    }
    /**
     * @param {!tsickle_forward_declare_1.Dimension<?>} dimension
     * @return {number}
     */
    dimensionIndex(dimension) {
        if (!(dimension.id in this.indices)) {
            throw new Error(`No such dimension: ${dimension.id}`);
        }
        return this.indices[dimension.id];
    }
    /**
     * @param {!Array<!tsickle_forward_declare_1.Dimension<number>>=} dimensions
     * @return {!Array<number>}
     */
    dimensionIndices(dimensions) {
        if (!dimensions) {
            dimensions = this.dimensions;
        }
        return dimensions.map((dim) => this.dimensionIndex(dim));
    }
    /**
     * Reurns a single value, interpolating if necessary.
     * @param {number} idx
     * @param {number} fraction
     * @param {?} dimIdx
     * @return {?}
     */
    valueAt(idx, fraction, dimIdx) {
        if (fraction === 0) {
            return this.value(idx, dimIdx);
        }
        else {
            return this.dimensions[dimIdx].valueAt(this, idx, fraction, dimIdx);
        }
    }
    /**
     * Returns a single value.
     * @template T
     * @param {number} idx
     * @param {!tsickle_forward_declare_1.Dimension<T>} dimension
     * @return {T}
     */
    single(idx, dimension) {
        return this.value(idx, this.dimensionIndex(dimension));
    }
    /**
     * Returns the nth data point.
     * Optionally only returning the specified dimensions.
     * @param {number} idx - The index.
     * @param {!Array<!tsickle_forward_declare_1.Dimension<number>>=} dimensions
     * @return {!Array<!Array<?>>} The requested dimension values.
     */
    nth(idx, dimensions) {
        if (!dimensions) {
            dimensions = this.dimensions;
        }
        /** @type {!Array<number>} */
        let indices = this.dimensionIndices(dimensions);
        return indices.map((dimIdx) => this.value(idx, dimIdx));
    }
    /**
     * @param {number} locator
     * @param {!Array<!tsickle_forward_declare_1.Dimension<number>>=} dimensions
     * @return {!Array<?>}
     */
    at(locator, dimensions) {
        /** @type {number} */
        const idx = Math.floor(locator);
        /** @type {number} */
        const fraction = locator - idx;
        /** @type {!Array<number>} */
        const indices = this.dimensionIndices(dimensions || this.dimensions);
        return indices.map((dimIdx) => this.valueAt(idx, fraction, dimIdx));
    }
}
exports.Series = Series;
if (false) {
    /**
     *
     * @type {!Array<!tsickle_forward_declare_1.Dimension<number>>}
     */
    Series.prototype.dimensions;
    /**
     * Dimension indices by dimension id.
     * @type {!Object<string,number>}
     * @protected
     */
    Series.prototype.indices;
    /**
     * The series' length.
     * @abstract
     * @return {number}
     */
    Series.prototype.length = function () { };
    /**
     * Returns a single value.
     * @abstract
     * @param {number} idx - Point index.
     * @param {number} dimIndex - Dimension index.
     * @return {?}
     */
    Series.prototype.value = function (idx, dimIndex) { };
}
