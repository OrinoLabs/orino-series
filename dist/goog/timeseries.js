/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
goog.module('timeseries');
var module = module || { id: 'timeseries.ts' };
const tsickle_forward_declare_1 = goog.forwardDeclare("series");
const tsickle_forward_declare_2 = goog.forwardDeclare("dimension");
var dimension_1 = goog.require('dimension');
/** @type {string} */
exports.TIME_DIMENSION_ID = 'TIME';
/** @type {!tsickle_forward_declare_2.Dimension<number>} */
exports.timeDimension = new dimension_1.Dimension(exports.TIME_DIMENSION_ID);
/**
 * @template T
 * @param {T} Base
 * @return {?}
 */
function TimeSeriesMixin(Base) {
    /**
     * @abstract
     */
    class TimeSeriesImpl extends Base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            this.isTimeSeries = true;
            if (!this.hasDimension(exports.timeDimension)) {
                throw new Error('No time dimension.');
            }
            this.timeDimensionIdx = this.indices[exports.TIME_DIMENSION_ID];
        }
        /**
         * @return {number}
         */
        get startTime() {
            return this.value(0, this.timeDimensionIdx);
        }
        /**
         * @return {number}
         */
        get endTime() {
            return this.value(this.length - 1, this.timeDimensionIdx);
        }
        /**
         * @return {number}
         */
        get duration() {
            return this.endTime - this.startTime;
        }
        /**
         * @param {number} idx
         * @return {?}
         */
        time(idx) {
            return this.value(idx, this.timeDimensionIdx);
        }
        // TODO: Define behavior for times outside range.
        /**
         * @param {number} t
         * @param {!Array<!tsickle_forward_declare_2.Dimension<number>>=} dimensions
         * @return {!Array<?>}
         */
        atTime(t, dimensions) {
            /** @type {number} */
            const locator = this.locatorForTime(t);
            return this.at(locator, dimensions);
        }
        // TODO: Define behavior for times outside range.
        /**
         * @param {number} t
         * @return {number}
         */
        locatorForTime(t) {
            /** @type {number} */
            let left = 0;
            /** @type {number} */
            let right = this.length - 1;
            /** @type {number} */
            let middle = Math.floor((left + right) / 2);
            while (left !== middle) {
                /** @type {?} */
                const tm = this.time(middle);
                if (t < tm) {
                    right = middle;
                }
                else {
                    left = middle;
                }
                middle = Math.floor((left + right) / 2);
            }
            /** @type {number} */
            const idx = (this.time(right) <= t) ? right : left;
            if (idx === this.length - 1) {
                return idx;
            }
            else {
                /** @type {?} */
                const t1 = this.time(idx);
                /** @type {?} */
                const t2 = this.time(idx + 1);
                /** @type {number} */
                const dt = t2 - t1;
                /** @type {number} */
                const fraction = (t - t1) / dt;
                return idx + fraction;
            }
        }
    }
    if (false) {
        /** @type {boolean} */
        TimeSeriesImpl.prototype.isTimeSeries;
        /** @type {number} */
        TimeSeriesImpl.prototype.timeDimensionIdx;
    }
    return TimeSeriesImpl;
}
exports.TimeSeriesMixin = TimeSeriesMixin;
