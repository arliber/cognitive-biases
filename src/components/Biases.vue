<template>
  <el-col :span="12">
      <el-menu default-active="2" id="biases-selector" @select="selectBias" unique-opened>
        <el-submenu :index="currentSelection.category + '-' + key" v-for="(item, key) in biases.children[currentSelection.category].children" :key="item.name">
          <template slot="title">{{item.name}}</template>
          <el-menu-item :index="currentSelection.category + '-' + key + '-'+ biasKey" v-for="(bias, biasKey) in item.children" :key="bias.name">{{bias.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
  </el-col>
</template>

<script>
export default {
  name: 'biases',
  computed: {
    biases () {
      return this.$store.getters.biases
    },
    currentSelection () {
      return this.$store.getters.currentSelection
    }
  },
  methods: {
    selectBias (menuIndex) {
      const selection = menuIndex.split('-').map((index) => Number(index))
      this.$store.dispatch('setActiveSubCategory', selection[1])
      this.$store.dispatch('setActiveBias', selection[2])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#biases-selector .el-submenu__title {
  white-space: normal;
  line-height: normal;
  display: flex;
  align-items: center;
  padding-right: 40px;
}
</style>
