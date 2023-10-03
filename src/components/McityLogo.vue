<template>
  <div
    class="mcity-logo"
    :style="{ width: width }"
  >
    <a
      v-if="link !== null"
      :href="link"
    >
      <block-m />
    </a>
    <block-m
      v-if="link === null"
    />
  </div>
</template>

<script>
import BlockM from './BlockM.vue'
export default {
  name: 'McityLogo', // component name
  components: {
    'block-m': BlockM,
  },
  props: {
    link: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: '100px',
    },
  },
}
</script>

<style scoped>
  .mcity-logo {
    display: block;
  }
</style>
