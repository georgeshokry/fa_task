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
    startDate: String,
    endDate: String,
  },
  components: {
    VChart,
  },

  data() {
    return {
      calculatedXAxisData: []
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
          formatter: (params) => {
              return this.drawChartTooltip(params);
          },
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
          data: this.calculatedXAxisData,
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
            }
          },
        ],
        // allow line category on chart
        visualMap: {
          right: 0,
          top: 60,
          pieces: [
            {
              gt: 80,
              lt: 100,
              color: 'green'
            },
            {
              gt: 50,
              lt: 80,
              color: 'yellow'
            },
            {
              gt: 0,
              lt: 50,
              color: 'red'
            }
          ]
        },
      };
    },

    xAxisData() {
      return this.getPerformanceData.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return this.getPerformanceData.map((item) => +item.performance * 100);
    },
    getPerformanceData(){
      return this.$store.state.performanceData;
    }
  },
  watch:{
    startDate:{
      handler(newVal){
        this.searchInDateRange(newVal, this.endDate);
      }
    },
    endDate:{
      handler(newVal){
        this.searchInDateRange(this.startDate, newVal);
      }
    },
    xAxisData(xAxisData){
      this.calculatedXAxisData = xAxisData;
    }
  },
  created(){
    this.$store.dispatch('fetchPerformanceChartData');
  },
  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
    formatPerformance(performance){
      return +performance * 100;
    },
    searchInDateRange(startDate, endDate) {
      if(startDate  && endDate){
        let dateComparison = moment(this.formatDate(startDate)).isBefore(this.formatDate(endDate));
        let dateRange = this.dateRange(startDate, endDate);
        if(dateComparison){
          let finalData = [];
          this.getPerformanceData.forEach((item)=>{
            if(dateRange.includes(this.formatDate(item.date_ms))){
              finalData.push(this.formatDate(item.date_ms))
            }
          })
          this.calculatedXAxisData = finalData;
        }
      } else{
        this.calculatedXAxisData = this.xAxisData;
      }
    },
    dateRange(startDate, endDate) {
      let dateArray = [];
      let currentDate = new Date(startDate);
      while (currentDate <= new Date(endDate)) {
        dateArray.push(this.formatDate(new Date(currentDate)));
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      }
      return dateArray;
    },
    drawChartTooltip(params){
      return `
      <div class="c-chart-tooltip__container">
        <div class="c-chart-tooltip__title">${params[0].axisValue}</div>
        <div class="c-chart-tooltip__value">
          ${params[0].marker}
          Team Performance Index: ${params[0].value}%
        </div>
      </div>
      `
    }
  },
};
</script>
