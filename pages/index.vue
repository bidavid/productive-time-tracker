<template>
  <div>
    <Tutorial />
  </div>
</template>

<script>
import Vue from 'vue'

// Components
import Tutorial from '@/components/Tutorial'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Tutorial
  },
  methods: {}
})
</script>
