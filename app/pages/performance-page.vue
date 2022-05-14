<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      <search-date-input @dateInputs="dateInputs"/>
    </div>
    <div class="c-dashboard__header">
      <performance-chart-component :startDate="startDate" :endDate="endDate"/>
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
      startDate: '',
      endDate: '',
    };
  },
  methods:{
    dateInputs(startDate, endDate) {
      this.startDate = startDate;
      this.endDate = endDate;
    },
  }
};
</script>
