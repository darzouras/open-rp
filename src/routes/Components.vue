<template>
    <div>
        <Title type="h1" title="Components" />
        <article>
            <Title type="h2" title="Big Title" />
        </article>

        <article>
            <BigMessage>
                This is a big message.
            </BigMessage>

            <BigMessage alert="alert">
                This is a big message that also should get some attention.
            </BigMessage>
        </article>

        <article>
            <SmallTitle type="h2">This is a small title</SmallTitle>
        </article>

        <article>
            <Logo />
            <Logo reverse="reverse" />
        </article>

        <article>
            <Input label="This is the label" name="input-name" placeholder="Input placeholder" type="text"/>
        </article>

        <article>
            <Button type="submit">This is a button</Button>
        </article>

        <article>
            <RouteButton route="/">This is a route button</RouteButton>
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
import SmallTitle from '@/components/SmallTitle.vue'
import BigMessage from '@/components/BigMessage.vue'
import Input from '@/components/Input.vue'
import Logo from '@/components/Logo.vue'
import Button from '@/components/Button.vue'
import RouteButton from '@/components/RouteButton.vue'

export default {
    name: 'Components',
    components: {
        Title,
        SmallTitle,
        BigMessage,
        Input,
        Logo,
        Button,
        RouteButton
    }
}
</script>