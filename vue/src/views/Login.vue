<template>
  <div class="login-main">
    <h1>Login</h1>
    <b-field :label="'Username'"
             :type="{'is-danger': failedLogin}">
      <b-input placeholder="Id"
               type="text"
               icon="icon fas fa-user"
               v-model="form.userId">
      </b-input>
    </b-field>
    <b-field :label="'Password'"
             :type="{'is-danger': failedLogin}">
      <b-input placeholder="Password"
               type="password"
               icon="icon fas fa-lock"
               v-model="form.password">
      </b-input>
    </b-field>
    <p v-if="failedLogin" class="has-text-danger">You have entered an invalid Id or password</p>
    <b-button @click.native="login()" type="is-primary" icon-left="icon fas fa-sign-in-alt">Login</b-button>
  </div>
</template>

<script>
  import BField from "buefy/src/components/field/Field";
  import BInput from "buefy/src/components/input/Input";
  import BButton from "buefy/src/components/button/Button";
  import axios from 'axios'
  import {mapActions} from 'vuex'

  export default {
    name: "Login",
    components: {BButton, BInput, BField},
    data() {
      return {
        form: {
          userId: '',
          password: ''
        },
        failedLogin: false
      }
    },
    methods: {
      ...mapActions(['getMessages']),
      login() {
        this.$store.commit('TOGGLE_LOADER')
        axios.post('/login', this.form)
          .then((response) => {
            this.$store.commit('TOGGLE_LOADER')
            this.$store.commit('SET_USER', response.data)
            this.getMessages()
            this.$router.push({name: 'Home'})
          }).catch(() => {
          this.$store.commit('TOGGLE_LOADER')
          this.failedLogin = true
        })
      },
    }
  }
</script>

<style lang='sass'>
  .login-main
    padding: 20px
    max-width: 400px

    h1
      font-size: 1.4em
      padding: 0 0 0.5rem

    p
      padding: 0 0 1rem

    button
      margin-top: 1rem

</style>