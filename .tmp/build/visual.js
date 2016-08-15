var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            /**
             * Gets property value for a particular object.
             *
             * @function
             * @param {DataViewObjects} objects - Map of defined objects.
             * @param {string} objectName       - Name of desired object.
             * @param {string} propertyName     - Name of desired property.
             * @param {T} defaultValue          - Default value of desired property.
             */
            function getValue(objects, objectName, propertyName, defaultValue) {
                if (objects) {
                    var object = objects[objectName];
                    if (object) {
                        var property = object[propertyName];
                        if (property !== undefined) {
                            return property;
                        }
                    }
                }
                return defaultValue;
            }
            visual.getValue = getValue;
            /**
             * Gets property value for a particular object in a category.
             *
             * @function
             * @param {DataViewCategoryColumn} category - List of category objects.
             * @param {number} index                    - Index of category object.
             * @param {string} objectName               - Name of desired object.
             * @param {string} propertyName             - Name of desired property.
             * @param {T} defaultValue                  - Default value of desired property.
             */
            function getCategoricalObjectValue(category, index, objectName, propertyName, defaultValue) {
                var categoryObjects = category.objects;
                if (categoryObjects) {
                    var categoryObject = categoryObjects[index];
                    if (categoryObject) {
                        var object = categoryObject[objectName];
                        if (object) {
                            var property = object[propertyName];
                            if (property !== undefined) {
                                return property;
                            }
                        }
                    }
                }
                return defaultValue;
            }
            visual.getCategoricalObjectValue = getCategoricalObjectValue;
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var Visual = (function () {
                function Visual(options) {
                    console.log('Visual constructor', options);
                    this.target = options.element;
                    this.updateCount = 0;
                }
                Visual.prototype.update = function (options) {
                    this.dataView = options.dataViews[0];
                    console.log('Visual update', options);
                    console.log(options.dataViews);
                    this.target.innerHTML = "<p>Update count: <em>" + (this.updateCount++) + "</em></p>";
                };
                Visual.prototype.destroy = function () {
                    //TODO: Perform any cleanup tasks here
                };
                Visual.prototype.enumerateObjectInstances = function (options) {
                    var instances = [];
                    switch (options.objectName) {
                        case 'settings':
                            var settings = {
                                objectName: 'settings',
                                displayName: 'Settings',
                                selector: null,
                                properties: {
                                    baseUri: visual.getValue(this.dataView.metadata.objects, 'settings', 'baseUri', "http://"),
                                    show: visual.getValue(this.dataView.metadata.objects, 'settings', 'show', false),
                                }
                            };
                            instances.push(settings);
                            break;
                    }
                    return instances;
                };
                return Visual;
            }());
            visual.Visual = Visual;
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
//# sourceMappingURL=visual.js.map