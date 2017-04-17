<template>
  <el-tabs type="card" id="categorySelector" @tab-click="categorySelected">
    <el-tab-pane v-for="(item, key) in biases.children" :index="key.toString()" :key="item.name" :label="item.name | trimNumber"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'bias-categories',
  computed: {
    biases () {
      return this.$store.getters.biases
    }
  },
  filters: {
    trimNumber (title) {
      return title.slice(2)
    }
  },
  methods: {
    categorySelected (tab) {
      this.$store.dispatch('setActiveCategory', tab.index)
    }
  }
}
</script>

<style scoped>
#categorySelector {
  margin-top: 20px
}
</style>
