<template>
  <div class="c-dashboard__header ">
    <span class="c-search-date-input__label">Start date:</span> 
      <input type="date" placeholder="dd/mm/yyy" v-model="startDate" @input="emitDateInputs">
    <span class="c-search-date-input__label">End date:</span> 
      <input type="date" placeholder="dd/mm/yyy" v-model="endDate" @input="emitDateInputs">
  </div>
</template>

<script>
export default {
  name: "SearchDateInput",
  data() {
    return {
      startDate: '',
      endDate: '',
    };
  },
  mounted(){
  },
  methods: {
    emitDateInputs(){
      this.$emit('dateInputs', this.startDate, this.endDate);
    },
  },
};
</script>
