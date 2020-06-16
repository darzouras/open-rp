<template>
    <component :is="type" class="title-small roboto">
        <slot></slot>
    </component>
</template>

<style lang="scss" scoped>
    .title-small {
        margin: 0;
        padding: 0;
        font-size: 1.2rem;
        font-weight: 700;
    }
</style>

<script>
export default {
    name: 'SmallTitle',
    props: {
        type: String
    }
}
</script>