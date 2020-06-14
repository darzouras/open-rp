<template>
    <button
        :type="type"
        :name="name"
        :id="name"
    >
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    button {
        padding: .5rem 1rem;
        background: white;
        color: $lightblue;
        border: 1px solid $lightblue;
        box-shadow: 3px 3px $lightblue;
        border-radius: 5px;
        transform: .5s all ease;
        text-transform: lowercase;
        font-weight: 550;
        letter-spacing: .05rem;
        cursor: pointer;

        &:hover {
            box-shadow: 0 0;
            background: $lightblue;
            color: white;
        }
    }

</style>

<script>
export default {
    name: 'Button',
    props: {
        type: String,
        name: String
    }
}
</script>