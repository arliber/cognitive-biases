<template>
  <el-col :span="12">
    <el-card class="box-card">
      <div slot="header">
        <span style="line-height: 36px;">{{currentBias.name}}</span>
        <el-button type="primary" icon="star-off" style="float: right;"></el-button>
      </div>
      <div class="text item">{{biasDefinition}}</div>
    </el-card>
  </el-col>
</template>

<script>
import wiki from 'wikijs'

export default { /* eslint-disable */
  name: 'bias', /* eslint-disable */
  data () {
    return {
      biasDefinition: ''
    }
  },
  computed: { /* eslint-disable */
    biases () {
        return this.$store.getters.biases
      },
      currentBias () {
        return this.$store.getters.currentBias
      }
    },
    mounted () {
      // Load first bias
      this.biasDefinition = 'Loading..'
      wiki().page(this.currentBias.name)
        .then(page => page.summary())
        .then(summary => {
          this.biasDefinition = summary
        })

      // Watch for changes
      this.$store.watch((state, getters) => {
          return getters.currentBias
      }, () => {
        this.biasDefinition = 'Loading..'
        return wiki().page(this.currentBias.name)
          .then(page => page.summary())
          .then(summary => {
            this.biasDefinition = summary
          })
      })
    }
}
</script>

<style scoped>
  .box-card {
    margin: 10px;
  }
</style>
