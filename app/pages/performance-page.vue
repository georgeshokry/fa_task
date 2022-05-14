<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      <search-date-input @dateInputs="dateInputs"/>
    </div>
    <div class="c-dashboard__header">
      <performance-chart-component :startData="startData" :endDate="endDate"/>
    </div>
  </div>
</template>

<script>
import PerformanceChartComponent from "../components/vue-components/performance-chart.vue";
import SearchDateInput from "../components/vue-components/search-date-input.vue";
export default {
  name: "AboutPageComponent",
  components: {
    PerformanceChartComponent,
    SearchDateInput
  },
  data() {
    return {
      startData: '',
      endDate: '',
    };
  },
  methods:{
    dateInputs(startData, endDate) {
      this.startData = startData;
      this.endDate = endDate;
    },
  }
};
</script>
