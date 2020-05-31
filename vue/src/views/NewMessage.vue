<template>
  <div class="new-message-main">
    <h1>New Message</h1>
    <div class="users">
      <b-field :label="'From'">
        <b-input :placeholder="currentUser.id"
                 type="text"
                 icon="icon fas fa-user"
                 disabled>
        </b-input>
      </b-field>
      <b-field :label="'To'"
               :type="{'is-danger': validationMessages.receiver}"
               :message="validationMessages.receiver">
        <b-input placeholder="Id"
                 type="text"
                 icon="icon fas fa-user"
                 v-model="form.receiver">
        </b-input>
      </b-field>
    </div>
    <b-field :label="'Subject'"
             :type="{'is-danger': validationMessages.subject}"
             :message="validationMessages.subject">
      <b-input placeholder="Subject"
               type="text"
               icon="icon fas fa-heading"
               v-model="form.subject">
      </b-input>
    </b-field>
    <b-field :label="'Message'"
             :type="{'is-danger': validationMessages.message}"
             :message="validationMessages.message">
      <b-input placeholder="Type your message here"
               type="textarea"
               v-model="form.message">
      </b-input>
    </b-field>
    <div class="actions">
      <b-button @click="$router.push({name: 'Home'})" class="back" icon-left="icon fas fa-chevron-left">back</b-button>
      <b-button @click.native="send()" type="is-primary" icon-left="icon fas fa-paper-plane">Send Message</b-button>
    </div>
  </div>
</template>

<script>
  import BField from "buefy/src/components/field/Field";
  import BInput from "buefy/src/components/input/Input";
  import BButton from "buefy/src/components/button/Button";
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "NewMessage",
    components: {BButton, BInput, BField},
    data() {
      return {
        form: {
          receiver: '',
          subject: '',
          message: '',
        },
        validationMessages: {
          receiver: '',
          subject: '',
          message: '',
        }
      }
    },
    computed: {
      ...mapGetters(['currentUser'])
    },
    methods: {
      ...mapActions(['sendMessage']),
      allnumeric(str) {
        const reg = /^[0-9]+$/
        return str.match(reg)
      },
      empty(str) {
        return str.length > 0
      },
      validate() {
        let validated = true
        if (!this.allnumeric(this.form.receiver)) {
          this.validationMessages.receiver = 'Must contain only numbers'
          validated = false
        }
        Object.keys(this.form).forEach(key => {
          if (!this.empty(this.form[key]) && !this.validationMessages[key]) {
            this.validationMessages[key] = 'Cannot be empty'
            validated = false
          }
        })

        return validated
      },
      send() {
        if (this.validate()) {
          const created = Math.round((new Date).getTime() / 1000)
          const message = {...this.form, created}
          this.sendMessage(message)
        }
      }
    }
  }
</script>

<style lang='sass'>
  .new-message-main
    max-width: 600px
    padding: 20px

    h1
      font-size: 1.4em
      padding-bottom: 0.5rem

    .users
      display: flex

      .field
        flex-grow: 1

        &:first-child
          margin-right: 10px

    .actions
      padding-top: 1rem
      display: flex
      justify-content: space-between

</style>