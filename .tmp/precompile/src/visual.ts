

module powerbi.extensibility.visual.linechart2722B7D3FF8B443E382E3AD83079C217E  {
    "use strict";
    export class Visual implements IVisual {
        private target: HTMLElement;
        private updateCount: number;
        private settings: VisualSettings;
        private textNode: Text;

        constructor(options: VisualConstructorOptions) {
            console.log('Visual constructor', options);
            this.target = options.element;
            this.updateCount = 0;
            if (typeof document !== "undefined") {
                const new_p: HTMLElement = document.createElement("div");
                const can: HTMLElement = document.createElement("canvas");
                can.setAttribute("id", "canvasId");
                new_p.appendChild(can);
                this.target.appendChild(new_p);
            }
        }

        public update(options: VisualUpdateOptions) {
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            const data = options.dataViews[0].table.rows;
            let country = [];
            let value = [];
            data.forEach(d=>{
                country.push(d[0]);
                value.push(d[1]);
            });
            
            let d = (<any>window).Chart;

            let chart =  new d('canvasId' , {
                type: 'line',
                data: {
                    labels: country,
                    datasets: [
                        {
                            data: value,
                            borderColor: '#3cba9f',
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: true
                        }],
                        yAxes: [{
                            display: true
                        }]
                    }
                }
            });

        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}