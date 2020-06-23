import Vue from 'vue'

Vue.mixin({
    methods: {
        checkSanitized: function(value) {
            if (value == '' || null) return ''
            
            value = this.$sanitize(value)
            if (value === 'undefined') return ''
            else return value
        }
    }
})