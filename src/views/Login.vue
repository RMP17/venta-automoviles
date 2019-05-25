<template>
  <v-container fluid fill-height>
    <v-flex md4  offset-md4 >
      <v-form>
        <v-text-field
                label="E-mail"
                v-model="email"
                required
        ></v-text-field>
        <v-text-field
                label="Contraseña"
                v-model="password"
                autocomplete="false"
                :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                :type="show1 ? 'text' : 'password'"
                required
                @click:append="show1 = !show1"
        ></v-text-field>
        <v-btn block color="primary" @click="login">Iniciar sesión</v-btn>
      </v-form>

      <p>O registrate con <a @click.prevent="socialLogin"  href="">Google</a></p>
      <p>¿No tienes una cuenta? <router-link to="/sign-up">Crea uno</router-link></p>
    </v-flex>
  </v-container>
</template>

<script>
  import {
    VContainer,
    VFlex,
    VTextField
  } from 'vuetify/lib'
  import { mapActions } from 'vuex';

  export default {
    components: {
      VContainer,
      VFlex,
      VTextField
    },
    data () {
      return {
        show1: false,
        password: 'Password',
        email: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        }
      }
    },
    methods: {
      ...mapActions(['auth']),
      ...mapActions(['socialLogin']),
      login(){
        this.auth([this.email, this.password]);
      }
    }
  }
</script>
