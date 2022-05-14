import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import store from './store/store';
import PerformancePageComponent from './pages/performance-page.vue';
import PerformanceChartComponent from './components/vue-components/performance-chart.vue';
import SearchEmployeesInputComponent from './components/vue-components/search-employees-input.vue';
import notFound from './components/vue-components/not-found.vue';
angular.module('appModule', [
  'ui.router',
  'ngVue',
  'ngVue.plugins',
]);

angular.module('appModule').directive('vPerformancePage', (createVueComponent) => {
  return createVueComponent(Vue.component('performancePageComponent', PerformancePageComponent));
});

angular.module('appModule').directive('vPerformanceChart', (createVueComponent) => {
  return createVueComponent(Vue.component('performanceChartComponent', PerformanceChartComponent));
});

angular.module('appModule').directive('searchEmployeesInput', (createVueComponent) => {
  return createVueComponent(Vue.component('SearchEmployeesInput', SearchEmployeesInputComponent));
});

angular.module('appModule').config(($ngVueProvider) => {
  $ngVueProvider.setRootVueInstanceProps({
    store: store,
  });
});

angular.module('appModule').directive('vNotFound', (createVueComponent) => {
  return createVueComponent(Vue.component('notFound', notFound));
});
