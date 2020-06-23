<template>
  <div>
    <Title type="h1" title="Roadmap" />

    <BigMessage>
        This project is only just getting started, here are some of functionality goals for the future.
    </BigMessage>

    <ul>
        <li>
          <s>Character creation beneath a single user profile, ability to manage and switch between active characters</s> <br />Completed 6/19/20!
        </li>
        <li>
          <s>Public user and character pages where profile information, (public) post history can be shared</s> <br />Completed 6/20/20!
        </li>
        <li>
          <s>Public RP rooms where people can jump in with their characters and join an RP</s> <br />Completed 6/23/20!
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