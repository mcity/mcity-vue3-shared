<template>
  <div
  v-if="svg"
  :style="cssProps"
  :class="size"
  v-html="svg"
  />
</template>

<script>
import axios from 'axios'
export default {
  props: {
    color: {
      type: String,
      default: '#00274c',
    },
    url: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  data () {
    return {
      svg: null,
      instance: axios.create(), // Need new instance so Auth header is not attached
    }
  },
  computed: {
    cssProps () {
      return {
        '--fill-color': this.color,
      }
    },
  },
  created () {
    this.instance
      .get(this.url)
      .then(response => (this.svg = response.data))
  },
}
</script>

<style scoped lang='scss'>
div {
  color: var(--fill-color);
  .xxs {
  width: 0.85em;
  }
  .xs {
  width: 1em;
  }
  .sm {
  width: 1.5em;
  }
  .md {
  width: 2em;
  }
  .lg {
  width: 3em;
  }
  .xl {
  width: 4em;
  }
}
</style>
