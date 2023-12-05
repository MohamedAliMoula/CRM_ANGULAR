import { Component, Input, OnInit } from '@angular/core';
import { DashService } from 'src/app/pages/service/dash.service';
import { getCSSVariableValue } from '../../../../../kt/_utils';
@Component({
  selector: 'app-mixed-widget7',
  templateUrl: './mixed-widget7.component.html',
})
export class MixedWidget7Component implements OnInit {
  @Input() chartColor: string = '';
  @Input() chartHeight: string;

  realise:number;

  chartOptions: any = {};

  constructor(private dash:DashService) {}
  tach:any
  ngOnInit(): void {
    this.chartOptions = this.getChartOptions(this.chartHeight, this.chartColor);

    
  }
   getChartOptions(chartHeight: string, chartColor: string) {
    const baseColor = getCSSVariableValue('--bs-' + chartColor);
    const lightColor = getCSSVariableValue('--bs-light-' + chartColor);
    const labelColor = getCSSVariableValue('--bs-gray-700');
    return {
      series: [70],
      chart: {
        fontFamily: 'inherit',
        height: chartHeight,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '65%',
          },
          dataLabels: {
            name: {
              show: false,
              fontWeight: '700',
            },
            value: {
              color: labelColor,
              fontSize: '30px',
              fontWeight: '700',
              offsetY: 12,
              show: true,
              formatter: function (val: number) {
                return val + '%';
              },
            },
          },
          track: {
            background: lightColor,
            strokeWidth: '100%',
          },
        },
      },
      colors: [baseColor],
      stroke: {
        lineCap: 'round',
      },
      labels: ['Progress'],
    };
  }
}


