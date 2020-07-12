import Vue from 'vue'

Vue.mixin({
    methods: {
        checkSanitized: function(value) {
            console.log('inside sanitize check: ' + value)
            if (value === '') return ''
            if (value === null) return ''
            
            value = this.$sanitize(value)
            if (value === 'undefined' || value === 'null') return ''
            else return value
        }
    }
})