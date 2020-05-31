<template>
  <header class="app-header">
    <div @click="$router.push({name: 'NewMessage'})" class="header-link is-hidden-desktop">
      <i class="fas fa-edit"></i>
      <span>New</span>
    </div>
    <h1>Herolo Messenger</h1>
    <div @click="logout()" class="header-link is-hidden-desktop">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </div>
  </header>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "AppHeader",
    data() {
      return {
        route: this.$route
      }
    },
    methods: {
      ...mapActions(['logout']),
    },
    computed: {
      ...mapGetters(['currentUser'])
    },
  }
</script>

<style lang='sass'>

  .app-header
    background: linear-gradient(131deg, #6f42c1 0%, #6610f2 100%)
    color: #fff
    display: flex
    align-items: center
    justify-content: space-between
    font-size: 20px
    padding: 5px 30px

    h1
      text-align: center
      padding: 0.5rem 0 0.75rem


    .header-link
      display: flex
      flex-direction: column
      text-align: center
      align-items: center

      span
        padding-top: 2px
        font-size: 12px

</style>