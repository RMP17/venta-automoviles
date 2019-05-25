<template>
    <div>
        prueba
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
    import HelloWorld from '../components/HelloWorld';
    import firebase from 'firebase';

    export default {
        components: {
            HelloWorld
        },
        methods: {
            logout: function () {
                firebase.auth().signOut().then(() => {
                    this.$router.replace('login')
                })
            }
        }
    }
</script>
