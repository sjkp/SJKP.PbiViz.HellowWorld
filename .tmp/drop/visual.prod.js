var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD;
            (function (PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD) {
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
                PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD.getValue = getValue;
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
                PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD.getCategoricalObjectValue = getCategoricalObjectValue;
            })(PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD = visual.PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD || (visual.PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD = {}));
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
            var PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD;
            (function (PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD) {
                var Visual = (function () {
                    function Visual(options) {
                        console.log('Visual constructor', options);
                        this.target = options.element;
                        this.updateCount = 0;
                    }
                    Visual.prototype.update = function (options) {
                        this.dataView = options.dataViews[0];
                        var model = this.transform(this.dataView);
                        console.log('Visual update', options);
                        console.log(options.dataViews);
                        var htmlString = "<p>Update count: <em>" + (this.updateCount++) + "</em>\n            <img src=\"" + PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD.getValue(this.dataView.metadata.objects, 'settings', 'baseUri', "http://") + "\"/>\"\n            </p>";
                        this.target.innerHTML = htmlString + this.render(model);
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
                                        baseUri: PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD.getValue(this.dataView.metadata.objects, 'settings', 'baseUri', "http://"),
                                        toggle: PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD.getValue(this.dataView.metadata.objects, 'settings', 'toggle', true),
                                        show: PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD.getValue(this.dataView.metadata.objects, 'settings', 'show', false),
                                    }
                                };
                                instances.push(settings);
                                break;
                        }
                        return instances;
                    };
                    Visual.prototype.transform = function (data) {
                        var model = [];
                        data.categorical.categories.forEach(function (value, i) {
                            value.values.forEach(function (header, i) {
                                model.push({ 'header': header, 'values': [] });
                            });
                        });
                        data.categorical.values.forEach(function (value) {
                            value.values.forEach(function (v, i) {
                                model[i].values.push(v);
                            });
                        });
                        return model;
                    };
                    Visual.prototype.render = function (model) {
                        var html = "<table><thead>";
                        model.forEach(function (category, i) {
                            html += "<th>" + category.header + "</th>";
                        });
                        html += "</thead><tbody>";
                        for (var i = 0; i < model[0].values.length; i++) {
                            html += "<tr>";
                            model.forEach(function (category) {
                                html += "<td>" + category.values[i] + "</td>";
                            });
                            html += "</tr>";
                        }
                        html += '</tbody></table>';
                        debugger;
                        return html;
                    };
                    return Visual;
                }());
                PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD.Visual = Visual;
            })(PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD = visual.PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD || (visual.PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD = {}));
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var plugins;
        (function (plugins) {
            plugins.PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD_DEBUG = {
                name: 'PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD_DEBUG',
                displayName: 'SJKP.PbiViz.HellowWorld',
                class: 'Visual',
                version: '1.0.0',
                apiVersion: '1.1.0',
                create: function (options) { return new powerbi.extensibility.visual.PBI_CV_EED04B38_70C9_4723_9C08_538DDC65A5FD.Visual(options); },
                custom: true
            };
        })(plugins = visuals.plugins || (visuals.plugins = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
//# sourceMappingURL=visual.js.map