"use strict";
var visualHelpers_1 = require("../../base/spec/visualHelpers");
var chai_1 = require("chai");
var TimeBrushVisual_1 = require("./TimeBrushVisual");
var $ = require("jquery");
describe('TimeBrushVisual', function () {
    var parentEle;
    beforeEach(function () {
        global['d3'] = require("d3");
        global['_'] = require("underscore");
        parentEle = $('<div></div>');
    });
    afterEach(function () {
        if (parentEle) {
            parentEle.remove();
        }
        parentEle = null;
    });
    var createVisual = function () {
        var instance = new TimeBrushVisual_1.default(true);
        var initOptions = visualHelpers_1.Utils.createFakeInitOptions();
        parentEle.append(initOptions.element);
        instance.init(initOptions);
        return {
            instance: instance,
            element: initOptions.element
        };
    };
    it('should load', function () {
        chai_1.expect(createVisual()).to.not.be.undefined;
    });
    describe("coerceDate", function () {
        it("should coerce 2014 as a date object", function () {
            chai_1.expect(TimeBrushVisual_1.default.coerceDate(2014).getFullYear()).to.eq(2014);
        });
        it("should coerce '2014' as a date object", function () {
            chai_1.expect(TimeBrushVisual_1.default.coerceDate('2014').getFullYear()).to.eq(2014);
        });
        it("should coerce iso date '1999-03-16T22:29:03.221Z' as the correct date object", function () {
            var result = TimeBrushVisual_1.default.coerceDate('1999-03-16T22:29:03.221Z');
            chai_1.expect(result.getFullYear()).to.eq(1999);
            chai_1.expect(result.getDate()).to.eq(16);
            chai_1.expect(result.getMonth()).to.eq(2); // Months start at 0
            // TODO: Time??
        });
        it("should coerce day 22", function () {
            var result = TimeBrushVisual_1.default.coerceDate(22);
            chai_1.expect(result.getDate()).to.eq(22);
        });
        it("should coerce a javascript date into itself", function () {
            var myDate = new Date();
            var result = TimeBrushVisual_1.default.coerceDate(myDate);
            chai_1.expect(result).to.eq(myDate);
        });
        it("should coerce epoch dates", function () {
            var myDate = new Date();
            var result = TimeBrushVisual_1.default.coerceDate(myDate.getTime());
            chai_1.expect(result.getTime()).to.eq(myDate.getTime());
        });
        it("should coerce '' as undefined", function () {
            var result = TimeBrushVisual_1.default.coerceDate("");
            chai_1.expect(result).to.be.undefined;
        });
        it("should coerce null as undefined", function () {
            var result = TimeBrushVisual_1.default.coerceDate(null);
            chai_1.expect(result).to.be.undefined;
        });
        it("should coerce undefined as undefined", function () {
            var result = TimeBrushVisual_1.default.coerceDate(undefined);
            chai_1.expect(result).to.be.undefined;
        });
    });
});
