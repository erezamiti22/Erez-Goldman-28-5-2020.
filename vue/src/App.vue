<template>
  <div id="app">
    <div class="main-container">
      <app-header/>
      <div class="content-main">
        <side-bar/>
        <div class="router-container">
          <router-view/>
        </div>
      </div>
    </div>
    <b-loading :active="loader"></b-loading>
  </div>
</template>

<script>
  import AppHeader from "./views/AppHeader";
  import {mapActions, mapGetters} from 'vuex'
  import SideBar from "./components/SideBar";
  import BLoading from "buefy/src/components/loading/Loading";

  export default {
    name: 'App',
    components: {BLoading, SideBar, AppHeader},
    methods: {
      ...mapActions(['getMessages']),
      init() {
        if (localStorage.getItem('auth')) {
          this.$store.commit('SET_USER', JSON.parse(localStorage.getItem('auth')))
          this.getMessages()
        } else {
          if (this.$router.currentRoute.name !== 'Login') {
            this.$router.push({name: 'Login'})
          }
        }
      }
    },
    computed: {
      ...mapGetters(['loader', 'alertMessage'])
    },
    created() {
      this.init()
    },
    watch: {
      alertMessage(val){
        if(val){
          this.$buefy.toast.open(val)
          this.$store.commit('ALERT', '')
        }
      }
    }
  }
</script>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap')
  @import "assets/bulma.scss"

  html, body, #app
    width: 100%
    height: 100%

  #app
    justify-content: center
    display: flex
    background: #453f49

    .main-container
      background: #fff
      flex-grow: 1
      height: inherit
      max-width: 1400px
      display: flex
      flex-direction: column

      .content-main
        display: flex
        flex-grow: 1

        .router-container
          flex-grow: 1


</style>
