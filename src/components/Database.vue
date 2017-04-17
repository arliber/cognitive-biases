<template>
  <el-row>
    <bias-categories></bias-categories>
    <biases></biases>
    <bias></bias>
  </el-row>
</template>

<script>
import biasCategories from '@/components/BiasCategories'
import Biases from '@/components/Biases'
import Bias from '@/components/Bias'

export default {
  name: 'database',
  components: {
    biasCategories,
    Biases,
    Bias
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
