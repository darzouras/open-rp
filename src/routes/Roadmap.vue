<template>
  <div>
    <Title type="h1" title="Roadmap" />

    <BigMessage>
        This project is only just getting started, here are some of functionality goals for the future.
    </BigMessage>

    <ul>
        <li>
            Character creation beneath a single user profile, ability to manage and switch between active characters
        </li>
        <li>
            Public RP rooms where people can jump in with their characters and join a themed RP
        </li>
        <li>
            Private rooms where specific user characters are invited to join a themed RP
        </li>
        <li>
            Community creation that can be assigned managing accounts.
        </li>
    </ul>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import BigMessage from '@/components/BigMessage.vue'

export default {
  name: 'Roadmap',
  components: {
    Title,
    BigMessage
  }
}
</script>