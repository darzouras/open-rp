<template>
    <div class="box-shadow">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../public/scss/global.scss';

    .box-shadow {
        border: 2px solid $gray;
        box-shadow: 4px 4px $gray;
        border-radius: 15px;
        padding: 1rem;
        width: calc(100% - 2rem - 4px);
        margin: 1rem 0;
    }
</style>