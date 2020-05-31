<template>
  <div class="list-message-main">
    <div @click="$router.push({name: 'ViewMessage', params: { id: message.id }})" style="flex-grow: 1">
      <h3>{{message.subject}}</h3>
      <h5>{{(message.sender === currentUser.id ? 'To ' + message.receiver : 'From ' + message.sender)}}</h5>
    </div>
    <div>
      <h4>{{moment.unix(message.created).format('YYYY/MM/DD')}}</h4>
      <div @click.prevent="confirmDelete()">
        <i class="fas fa-trash has-text-danger"></i>
      </div>
    </div>
  </div>
</template>

<script>

  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "ListMessage",
    props: {
      message: Object
    },
    computed: {
      ...mapGetters(['currentUser'])
    },
    methods: {
      ...mapActions(['deleteMessage']),
      confirmDelete() {
        this.$buefy.dialog.confirm({
          message: 'Are you sure?',
          onConfirm: () => this.deleteMessage(this.message.id)
        })
      }
    }
  }
</script>

<style lang='sass'>
  .list-message-main
    padding: 10px 20px
    border-bottom: 1px solid #dee5ec
    display: flex
    justify-content: space-between

    &:hover
      background-color: rgba(226, 226, 226, 0.22)

    h5
      font-size: 0.8em
      color: #898989


</style>