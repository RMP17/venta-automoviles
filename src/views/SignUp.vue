<template>
  <v-container fluid>
    <v-flex md4  offset-md4 >
      <div class="title">Nueva Cuenta de Usuario</div>
      <v-text-field
              label="Nombre completo"
              v-model="name"
              required
      ></v-text-field>
      <v-text-field
              label="Número de celular o teléfono"
              v-model="phone"
              required
      ></v-text-field>
      <v-text-field
              label="E-mail"
              v-model="email"
              required
      ></v-text-field>
      <v-text-field
              label="Contraseña"
              v-model="password"
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              :type="show1 ? 'text' : 'password'"
              required
              @click:append="show1 = !show1"
      ></v-text-field>
      <v-btn block color="primary" @click="signUpLocal">Registrarse</v-btn>
    </v-flex>

  </v-container>
</template>

<script>
  import  {
    VContainer,
    VFlex,
    VTextField
  } from 'vuetify/lib';
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
        password: null,
        name:null,
        phone:null,
        email:null,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        }
      }
    },
    methods:{
      ...mapActions(['signUp']),
      signUpLocal(){
        this.signUp([this.email, this.password]);
      }
    }
  }
</script>

