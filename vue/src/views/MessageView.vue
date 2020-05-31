<template>
  <div class="message-view-main" v-if="currentMessage">
    <h1>{{currentMessage.subject}}</h1>
    <div class="info">
      <h5>{{(currentMessage.sender === 2 ? 'To ' : 'From ') + currentMessage.sender}}</h5>
      <h4>{{moment.unix(currentMessage.created).format('YYYY/MM/DD')}}</h4>
    </div>
    <p>{{currentMessage.message}}</p>
    <div class="actions">
      <b-button @click="$router.push({name: 'Home'})" class="back" icon-left="icon fas fa-chevron-left">back</b-button>
      <b-button @click.native="confirmDelete()" class="is-danger" icon-left="icon fas fa-trash">Delete</b-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import BButton from "buefy/src/components/button/Button";

  export default {
    name: "MessageView",
    components: {BButton},
    computed: {
      ...mapGetters(['currentMessage'])
    },
    methods: {
      ...mapActions(['deleteMessage']),
      confirmDelete() {
        this.$buefy.dialog.confirm({
          message: 'Are you sure?',
          onConfirm: () => this.deleteMessage(this.currentMessage.id)
        })
      },
    }
  }
</script>

<style lang='sass'>
  .message-view-main
    padding: 20px

    h1
      font-size: 1.5em
      font-weight: 600
      padding-bottom: 0.75rem

    .info
      display: flex
      justify-content: space-between
      padding-bottom: 0.75rem
      color: #898989

    p
      border-bottom: 1px solid #F5F5F5
      border-top: 1px solid #F5F5F5
      padding: 0.75rem 0
      white-space: pre-line
      line-height: 1.5em

    .actions
      padding: 1rem 0
      display: flex
      justify-content: space-between

      div
        button
          margin-left: 10px


</style>