<template>
  <div class="c-chart__container">
    <v-chart ref="chart" :option="chartOptions" />
  </div>
</template>

<script>
import moment from "moment";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  MarkAreaComponent,
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  MarkAreaComponent
]);

export default {
  name: "PerformanceChartComponent",
  props:{
    startData: String,
    endDate: String,
  },
  components: {
    VChart,
  },

  data() {
    return {

    };
  },

  computed: {
    initOptions() {
      return {
        width: "auto",
        height: "300px",
      };
    },

    chartOptions() {
      return {
        title: {
          text: "Team Performance Index",
          left: "center",
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 0,
        },
        grid: {
          left: "30px",
          right: "12px",
          bottom: "2px",
          top: "6px",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            cursor: "default",
            lineStyle: {
              width: 2,
            },
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: [
                [
                  {
                    xAxis: this.convertedStartDate
                  },
                  {
                    xAxis: this.convertedEndDate
                  }
                ],
              ]
            }
          },
        ],
      };
    },

    xAxisData() {
      return this.getPerformanceData.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return this.getPerformanceData.map((item) => +item.performance * 100);
    },
    convertedStartDate(){
      return this.startData ? this.formatDate(this.startData) : '';
    },
    convertedEndDate(){
      return this.endDate ? this.formatDate(this.endDate) : '';
    },
    getPerformanceData(){
      return this.$store.state.performanceData;
    }
  },
  mounted(){
    this.$store.dispatch('fetchPerformanceChartData');
  },
  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
    
  },
};
</script>
