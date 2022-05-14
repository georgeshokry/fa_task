import { mount } from '@vue/test-utils';
import PerformanceChartComponent from "../app/components/vue-components/performance-chart.vue";

describe('Mounted component', () => {
    const wrapper = mount(PerformanceChartComponent);
  
    test('does a wrapper exist', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })