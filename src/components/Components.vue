<template>
    <div>
        <Title type="h1" title="Components" />
        <article>
            <Title type="h2" title="Big Title" />
        </article>

        <article>
            <Logo />
            <Logo reverse="reverse" />
        </article>

        <article>
            <Input label="This is the label" name="input-name" placeholder="Input placeholder" type="text"/>
        </article>
    </div>
</template>

<style lang="scss" scoped>
    article {
        margin-bottom: 2.5rem;
    }
</style>

<script>
import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import Logo from '@/components/Logo.vue'

export default {
    name: 'Components',
    components: {
        Title,
        Input,
        Logo
    }
}
</script>