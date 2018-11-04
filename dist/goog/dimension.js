/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
goog.module('dimension');
var module = module || { id: 'dimension.ts' };
const tsickle_forward_declare_1 = goog.forwardDeclare("series");
/**
 * Linear interpolation function.
 * @type {function(!tsickle_forward_declare_1.Series, number, number, number): number}
 */
const lerp = (series, idx, fraction, dimIdx) => {
    /** @type {?} */
    const a = series.value(idx, dimIdx);
    if (idx + 1 === series.length) {
        return a;
    }
    else {
        /** @type {?} */
        const b = series.value(idx + 1, dimIdx);
        return a + fraction * (b - a);
    }
};
/**
 * @template T
 */
class Dimension {
    /**
     * @param {string} id
     */
    constructor(id) {
        this.id = id;
        this.interpolator = (/** @type {?} */ (lerp));
    }
    /**
     * @param {!tsickle_forward_declare_1.Series} series
     * @param {number} idx
     * @param {number} fraction
     * @param {number} dimIdx
     * @return {T}
     */
    valueAt(series, idx, fraction, dimIdx) {
        return this.interpolator(series, idx, fraction, dimIdx);
    }
}
exports.Dimension = Dimension;
if (false) {
    /** @type {string} */
    Dimension.prototype.id;
    /** @type {function(!tsickle_forward_declare_1.Series, number, number, number): T} */
    Dimension.prototype.interpolator;
}
