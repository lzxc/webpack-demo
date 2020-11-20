<template>
  <div class="test-compose">
    <hoc />
  </div>
</template>

<script>
import hoc from './components/withLog'

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
