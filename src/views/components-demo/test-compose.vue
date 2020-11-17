<template>
  <div class="test-compose">
    <hoc />
  </div>
</template>

<script>
import hoc from './components/withPromise'

export default {
  name: 'TestCompose',
  components: { hoc },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped lang='less'>
</style>
