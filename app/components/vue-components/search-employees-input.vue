<template>
  <div class="c-dashboard__header ">
      <input placeholder="Search name or address or about..." type="text" v-model="serachValue" @input="handleTyping" >
      <button  class="c-button" @click="resetSearchInput">
          Clear
      </button>
  </div>
</template>

<script>
export default {
  name: "searchEmployeesInput",
  props:{
    searchValueProp: String
  },
  data() {
    return {
        serachValue: ""
    };
  },
  watch:{
      searchValueProp:{
          handler(newVal){
              this.serachValue = newVal;
          },
          immediate: true
      }
  },
  methods: {
    handleTyping() {
        this.$emit('search-input', this.serachValue);
    },
    resetSearchInput(){
        this.serachValue = "";
        this.$emit('reset-search-input');
    }
  },
};
</script>