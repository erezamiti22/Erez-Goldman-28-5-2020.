<template>
    <nav class="is-hidden-mobile">
      <ul>
        <template v-if="Object.keys(currentUser).length">
          <li>
            <i class="fas fa-envelope"></i>
            <a @click="$router.push({name: 'Home'})">Message Box</a>
          </li>
          <li>
            <i class="fas fa-edit"></i>
            <a @click="$router.push({name: 'NewMessage'})">New Message</a>
          </li>
          <li>
            <i class="fas fa-sign-out-alt"></i>
            <a @click="logout()">Logout</a>
          </li>
        </template>
        <template v-else>
          <li>
            <i class="fas fa-sign-out-alt"></i>
            <a>Login</a>
          </li>
        </template>
      </ul>
    </nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: "SideBar",
    methods: {
      ...mapActions(['logout']),
    },
    computed: {
      ...mapGetters(['currentUser'])
    },
  }
</script>

<style lang='sass'>
  nav
    width: 250px
    background-color: #fff
    padding: 20px
    border-right: 1px solid #bfbfbf

    *
      color: #4a4a4a

    li
      padding: 0 0 0.75em

      a
        padding-left: 8px
        color: #4a4a4a

</style>