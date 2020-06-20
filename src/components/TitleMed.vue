<template>
    <component :is="type" class="title-med roboto">
        <slot></slot>
    </component>
</template>

<style lang="scss" scoped>
    .title-med {
        font-size: 1.75rem;
        font-weight: 700;
    }
</style>

<script>
export default {
    name: 'TitleMed',
    props: {
        type: String
    }
}
</script>