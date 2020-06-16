<template>
    <label v-bind:class="{ error: error }" class="roboto">
        {{ label }}
        <input
            :type="type"
            :name="name"
            :id="name"
            :placeholder="placeholder"
            :required="required"
            :autofocus="autofocus"
            :value="value"
            @input="updateInput($event)" />
    </label>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    label {
        display: block;
        font-size: 1rem;
        font-weight: 100;
        margin-bottom: 1.5rem;
        
        input {
            display: block;
            width: calc(100% - 1rem - 2px);
            border: 1px solid $lightblue;
            border-radius: 5px;
            padding: .5rem;
            font-size: 1rem;
            color: $lightblue;
            margin-top: .25rem;
        }

        &.error {
            input {
                border-color: $red;
            }
        }
    }
    
</style>

<script>
export default {
    name: 'Input',
    props: {
        label: String,
        name: String,
        placeholder: String,
        type: String,
        required: String,
        autofocus: String,
        link: String,
        value: null,
    },
    data() {
        return {
            error: null,
        }
    },
    methods: {
        updateInput(event) {
            this.$emit('input', event.target.value);
        }
    }
}
</script>