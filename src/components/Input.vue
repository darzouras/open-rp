<template>
    <label v-bind:class="{ error: error }">
        {{ label }}
        <input type="text" :name="name" :id="name" :placeholder="placeholder">
    </label>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    label {
        font-size: .8rem;
        font-weight: 100;
        
        input {
            display: block;
            width: calc(100% - 1rem - 2px);
            border: 1px solid $lightblue;
            border-radius: 5px;
            padding: .5rem;
            font-size: 1rem;
            color: $darkblue;
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
    placeholder: String
  }
}
</script>