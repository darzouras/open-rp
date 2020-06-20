<template>
  <component :is="type" class="title-large roboto">
    {{ title }}
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
    .title-large {
        font-size: 2.5rem;
        font-weight: 900;
    }
</style>

<script>
export default {
  name: 'Title',
  props: {
    type: String,
    title: String
  }
}
</script>