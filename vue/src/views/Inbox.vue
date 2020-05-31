<template>
  <div class="message-box-main">
      <b-input placeholder="Search for User ID..."
               type="text"
               icon="icon fas fa-search"
               v-model="searchedUserId">
      </b-input>
    <div class="toggles">
      <a @click="inboxActive = true" :class="{'active': inboxActive}">Inbox</a>
      <a @click="inboxActive = false" :class="{'active': !inboxActive}">Sent</a>
    </div>
    <message v-for="message in filteredMessages" :key="message.subject" :message="message"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Message from "../components/ListMessage";
  import BInput from "buefy/src/components/input/Input";

  export default {
    name: "Inbox",
    data() {
      return {
        inboxActive: true,
        searchedUserId: ''
      }
    },
    components: {BInput, Message},
    computed: {
      ...mapGetters(['listMessages', 'currentUser']),
      filteredMessages() {
        return this.listMessages
          .filter((message) => this.searchedUserId ?
            message.receiver === parseInt(this.searchedUserId) || message.sender === parseInt(this.searchedUserId) : true)
          .filter((message) => this.inboxActive ? message.sender !== this.currentUser.id
            : message.sender === this.currentUser.id)
      }
    }
  }
</script>

<style lang='sass'>
  .message-box-main
    display: flex
    flex-direction: column

    .toggles
      display: flex
      border-bottom: 1px solid #bfbfbf

      a
        flex-grow: 1
        text-align: center
        padding: 1rem 0
        color: #4a4a4a

        &:hover
          background-color: rgba(247, 243, 248, 0.46)

        &:first-child
          border-right: 1px solid #dee5ec

        &.active
          background-color: #e6e6e6

</style>