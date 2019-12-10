<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="50rem">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" block dark v-on="on">Nueva publicación</v-btn>
            </template>
            <v-card>
                <div>
                    <v-card-title>
                        <span class="headline">Públicar</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field
                                    outline
                                    v-model="publicacion.marca"
                                    label="Marca"
                            ></v-text-field>
                            <v-text-field
                                    outline
                                    v-model="publicacion.modelo"
                                    label="Modelo"
                            ></v-text-field>
                            <v-text-field
                                    outline
                                    v-model.numeric="publicacion.precio"
                                    type="number"
                                    label="Precio"
                            ></v-text-field>
                            <v-select :items="monedas"
                                      v-model="publicacion.moneda"
                                      item-text="state"
                                      item-value="abbr"
                                      outline
                                      label="Moneda"
                            ></v-select>
                            <v-textarea
                                    outline
                                    v-model="publicacion.descripcion"
                                    label="Descripción"
                            ></v-textarea>
                            <v-text-field
                                    placeholder="Seleccione o capture una imagen"
                                    @click='pickFile'
                                    v-model='imageName'
                                    single-line
                                    outline
                                    readonly
                            ></v-text-field>
                            <input type="file"
                                   style="display: none"
                                   ref="inputImage"
                                   accept="image/*"
                                   capture="camera"
                                   @change="onFilePicked"
                            >
                            <!--<img :src="imageUrl" height="150"/>-->
                        </v-form>
                        <span>Posición actual</span>
                        <br>
                        <span>Latitud: {{publicacion.latitude}}</span>
                        <br>
                        <span>Longitud: {{publicacion.longitude}}</span>
                        <google-map
                                :center="center"
                                :zoom="13"
                                @click="mapRclicked"
                                style="width: 100%; height: 25rem">
                            <google-marker v-for="m in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></google-marker>
                        </google-map>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="dialog = false">Close</v-btn>
                        <v-btn color="primary" @click="addPublicacion">Save</v-btn>
                    </v-card-actions>
                </div>
                <!--<div > Todo: este codigo es para el uso de la camra en tiempo real o en la propia pagina
                    <v-btn @click="startCamera" style="z-index: 4">
                        Tomar Fotografía
                    </v-btn>-->
                    <!--<div id="overlay">Advertisement</div>
                    <div id="video-controls" class="controls" data-state="hidden">
                        <video  @click="capturar" id="video_1">
                            <p>Your browser doesn't support HTML5 video. Here is
                                a <a href="myVideo.mp4">link to the video</a> instead.</p>
                        </video>
                        <button id="playpause" type="button" data-state="play">Play/Pause</button>
                        <button id="stop" type="button" data-state="stop">Stop</button>
                        <div class="progress">
                            <progress id="progress" value="0" min="0">
                                <span id="progress-bar"></span>
                            </progress>
                        </div>
                        <button id="mute" type="button" data-state="mute">Mute/Unmute</button>
                        <button id="volinc" type="button" data-state="volup">Vol+</button>
                        <button id="voldec" type="button" data-state="voldown">Vol-</button>
                        <button id="fs" type="button" data-state="go-fullscreen">Fullscreen</button>
                        <button id="subtitles" type="button" data-state="subtitles">CC</button>
                    </div>
                </div>-->
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    // import axios from 'axios';
    // import Publicacion from '../models/Publicacion';
    import Publicacion from '@/models/Publicacion';
    import {mapState} from 'vuex';
    import * as faker from 'faker';
    import {db} from '@/main';
    import firebase from 'firebase';
    import {
        VCard,
        VTextField,
        VTextarea,
        VLayout,
        VDialog,
        VForm,
        VCardTitle,
        VCardText,
        VCardActions,
    } from 'vuetify/lib';
    // import Camera from '../models/Camera';

    export default {
        components:{
            VTextarea,
            VCard,
            VTextField,
            VLayout,
            VDialog,
            VForm,
            VCardTitle,
            VCardText,
            VCardActions,
        },
        data: () => ({
            snackbar: false,
            color: '',
            mode: '',
            timeout: 6000,
            text: 'Hello, I\'m a snackbar',
            // lastId:1,
            center: {
                lat: -19.0349,
                lng: -65.2558336
            },
            markers: [],
            // view
            imageName: '',
            // imageUrl: '',
            imageFile: '',
            valid: false,
            dialog: false,
            rules: {
                tipos_accesorios: [
                    v => !!v || 'Accesorio es requerido',
                    /*v => (v && v.length <= 10) || 'Name must be less than 10 characters'*/
                ],
            },
            monedas: [
                {state: 'Bolivianos', abbr: 'bob'},
                {state: 'Dolares', abbr: 'usd'},
            ],
            // model
            publicacion : new Publicacion(),
        }),
        mounted(){
            this.currentLocationUser();
        },
        computed:{
            ...mapState(['user'])
        },
        methods:{
            mapRclicked(mouseArgs) {
                const createdMarker = this.addMarker();
                this.publicacion.latitude=createdMarker.position.lat = mouseArgs.latLng.lat();
                this.publicacion.longitude=createdMarker.position.lng = mouseArgs.latLng.lng();

            },
            currentLocationUser(){
                let options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };

                const success = (pos) => {
                    let crd = pos.coords;
                    const createdMarker = this.addMarker();
                    this.publicacion.latitude = createdMarker.position.lat = crd.latitude;
                    this.publicacion.longitude = createdMarker.position.lng = crd.longitude;
                    console.log('Your current position is:');
                    console.log('Latitude : ' + crd.latitude);
                    console.log('Longitude: ' + crd.longitude);
                    console.log('More or less ' + crd.accuracy + ' meters.');
                };

                function error(err) {
                    console.warn('ERROR(' + err.code + '): ' + err.message);
                };

                navigator.geolocation.getCurrentPosition(success, error, options);
            },
            addMarker() {
                // this.lastId++;
                this.markers=[];
                this.markers.push({
                    // id: this.lastId,
                    position: {
                        lat: 48.8538302,
                        lng: 2.2982161
                    },
                    opacity: 1,
                    draggable: true,
                    enabled: true,
                    clicked: 0,
                    rightClicked: 0,
                    dragended: 0,
                    ifw: true,
                    ifw2text: 'This text is bad please change me :( '
                });
                return this.markers[this.markers.length - 1];
            },
            pickFile () {
                this.$refs.inputImage.click();
            },
            onFilePicked (e) {
                const files = e.target.files;
                if(files[0] !== undefined) {
                    this.imageName = files[0].name;
                    /* if(this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ();
                    fr.readAsDataURL(files[0]);
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result;
                        this.imageFile = files[0]; // this is an image file that can be sent to server...
                    })*/
                } else {
                    this.imageName = '';
                    this.imageFile = '';
                    // this.imageUrl = '';
                }
            },
            addPublicacion(){

                if (this.$refs.form.validate()) {
                    // this.publicacion.id= faker.random.alphaNumeric(16);
                    this.publicacion.uid= this.user.uid;
                    const publicacion=Object.assign({},this.publicacion );
                    /*delete publicacion.id;
                    console.log(publicacion);*/
                    db.collection('publicaciones').add(publicacion
                    ).then(response=>{
                        this.addFile(response.id);
                        console.log(response);
                    })
                }
            },
            addFile(idPublicacion){
                this.snackbar=true;
                if(this.$refs.inputImage.files[0]){
                    const storageRef= firebase.storage().ref();
                    const idFile= faker.random.alphaNumeric(16);
                    console.log(this.$refs.inputImage.files);
                    const uploadFile=storageRef.child('publicaciones/'+idPublicacion+'/'+Date.now()).put(this.$refs.inputImage.files[0]);
                }
            },
            /*
            openDialog() {
                this.accesorio.equipo_id=this.idEquipo;
                this.getAccesoriosEquiposById(this.idEquipo);
                this.dialog = true;
            },
            getAccesoriosEquiposById(idEquipo){
                axios.get(this.$urlApi.resourcesAccesorio+'/'+idEquipo
                ).then( response => {
                    this.dataTable.accesorios=response.data;
                }).catch( errors => {
                    console.log('error servidor')
                });
            }*/
        }
    }
</script>

<style>
    /*video::-webkit-media-controls {
        display:none !important;
    }
    video {
        position: fixed;
        left: 0;
        top: 0;
        z-index: -1;
    }
    #overlay {
        display: inline-block;
        position: relative;
        top: 0;
        z-index: 2147483647;
    }
    :-webkit-full-screen{
        background: transparent;
    }*/
    /*video::-webkit-media-controls {
        display:none !important;
    }
    video::-webkit-media-controls-enclosure {
        display:none !important;
    }*/

    /*
    video::-webkit-media-controls-enclosure {
        display:none !important;
    }

    video{
        width: 100%;
        height: 100%;
    }

    video::-webkit-media-controls-fullscreen-button
    {
        display: none !important;
    }
    #controls {
        z-index: 2147483647;
        position: absolute;
        width: 100%;
        background: silver;
        display: flex;
        bottom: 0;
        left: 0;
    }*/

</style>
