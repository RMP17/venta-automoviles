<template>
  <v-app id="inspire">
    <v-toolbar app flat dense class="opacity gradient"  dark >
      <v-toolbar-title>Toolbar Mobile Menu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in menu"
               :key="item.key"
               :to="item.link"
               flat
        ><v-icon left>{{ item.icon}}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn to="login" v-if="!fullNameUser"
               flat
        >Iniciar sesión
        </v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile v-for="item in menu" :key="item.key" :to="item.link">
            <v-list-tile-content>
              <v-list-tile-title><v-icon left>{{ item.icon}}</v-icon>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile  key="login" to="login" v-if="!fullNameUser">
            <v-list-tile-content>
              <v-list-tile-title><v-icon left></v-icon>Iniciar sesión</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu bottom offset-y nudge-bottom="10" v-if="fullNameUser">
        <template v-slot:activator="{ on }">
          <v-btn small color="indigo"
                 icon
                 v-on="on"
          >
            <span class="headline" style="line-height: initial !important;">{{fullNameUser | extractFirstLetter}}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-content>
              <v-list-tile-title>Cerrar Sesión</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="mis-publicaciones">
            <v-list-tile-content>
              <v-list-tile-title>Mis publicaciones</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

  </v-app>
   <!--TODO:para responsive content-->
  <!--<v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex shrink>
          <h1 class="display-1">Vuetify Mobile Navbar using v-menu</h1>
          <p>Quick example of collapsable mobile menu <tt>&lt;v-toolbar&gt;</tt>, with a <tt>&lt;v-menu&gt;</tt> for mobile screens.</p>

          <p>Also shows how to use <tt>.hidden-md-and-up</tt> CSS classes to appropriately hide/show the menu depending upon window width.</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>-->
</template>

<script>
  import {mapState, mapActions} from 'vuex';
export default {
  name: 'App',
  data () {
    return {
      menu: [
        { key:'autos', icon: 'mdi-car', title: 'Automóviles', link:'/'},
        { key:'prueba', icon: '', title: 'Prueba', link:'/prueba'},
      ]
    }
  },
  mounted(){
    this.loggedIn();
  },
  methods: {
    ...mapActions(['logout']),
    ...mapActions(['loggedIn'])
  },
  computed: {
    ...mapState(['fullNameUser'])
  },
}
</script>
<style scoped>
  .opacity{
    opacity: 0.90;
  }
  .gradient{
    background: #3A1C71;
    background: -webkit-linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71);
    background: linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71);
  }
</style>
