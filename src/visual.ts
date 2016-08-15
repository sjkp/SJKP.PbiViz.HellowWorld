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

module powerbi.extensibility.visual {
    export class Visual implements IVisual {
        private target: HTMLElement;
        private updateCount: number;
        private dataView: DataView;
        constructor(options: VisualConstructorOptions) {
            console.log('Visual constructor', options);
            this.target = options.element;
            this.updateCount = 0;
        }

        public update(options: VisualUpdateOptions) {
            this.dataView = options.dataViews[0];
            var model = this.transform(this.dataView);
            console.log('Visual update', options);           
            console.log(options.dataViews); 
            var htmlString = `<p>Update count: <em>${(this.updateCount++)}</em>
            <img src="${getValue<string>(this.dataView.metadata.objects, 'settings', 'baseUri', "http://")}"/>"
            </p>`;
             
            
            this.target.innerHTML = htmlString + this.render(model);
        }

        public destroy(): void {
            //TODO: Perform any cleanup tasks here
        } 

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            var instances: VisualObjectInstance[] = [];
            switch (options.objectName) {
                case 'settings':
                    var settings: VisualObjectInstance = {
                        objectName: 'settings',
                        displayName: 'Settings',
                        selector: null,
                        properties: {
                            baseUri: getValue<string>(this.dataView.metadata.objects, 'settings', 'baseUri', "http://"),
                            toggle: getValue<boolean>(this.dataView.metadata.objects, 'settings', 'toggle', true),
                            show: getValue<boolean>(this.dataView.metadata.objects, 'settings', 'show', false),
                        }
                    };
                    instances.push(settings);
                    break;
            }

            return instances;
        }  

        private transform(data: DataView) : any
        {

            var model = [];
            data.categorical.categories.forEach((value, i) => {
                
                value.values.forEach((header, i) => {
                    model.push({'header': header, 'values': []});
                });
                
            });

            data.categorical.values.forEach((value) => {
                value.values.forEach((v,i) => {
                    model[i].values.push(v);
                });
            });

            return model;
        }

        private render(model)
        {

            var html = "<table><thead>";
            model.forEach((category, i) => {
                html += `<th>${category.header}</th>`;
                
            });
            html += "</thead><tbody>";

            for(var i=0; i< model[0].values.length;i++)
            {
                html+= "<tr>";
                model.forEach((category)=> {
                    html += `<td>${category.values[i]}</td>`;
                });
                html+= "</tr>";
            }

            html += '</tbody></table>';
            debugger;

            return html;
        }
    }
}