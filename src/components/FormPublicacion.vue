<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="50rem">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" block dark v-on="on">Nueva publicación</v-btn>
            </template>
            <v-card>
                <div v-show="!openCamera">
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
                            <v-text-field
                                    outline
                                    v-model="publicacion.descripcion"
                                    label="Descripción"
                            ></v-text-field>
                            <v-text-field
                                    label="Seleccione o capture una imagen"
                                    @click='pickFile'
                                    v-model='imageName'
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
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="dialog = false">Close</v-btn>
                        <v-btn color="primary" >Save</v-btn>
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
    import Publicacion from '../models/Publicacion';
    import {
        VCard,
        VTextField,
        VLayout,
        VDialog,
        VForm,
        VCardTitle,
        VCardText,
        VCardActions
    } from 'vuetify/lib';
    import Camera from '../models/Camera';

    export default {
        components:{
            VCard,
            VTextField,
            VLayout,
            VDialog,
            VForm,
            VCardTitle,
            VCardText,
            VCardActions
        },
        data: () => ({
            // view
            imageName: '',
            // imageUrl: '',
            imageFile: '',
            valid: false,
            dialog: false,
            openCamera:false,
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
        },
        computed:{

        },
        methods:{

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
            }
            /*submit:function () {
                if (this.$refs.formAccesorio.validate()) {
                    axios.post(this.$urlApi.resourcesAccesorio,
                        this.accesorio
                    ).then( response => {
                        this.accesorio = new Accesorio();
                        this.accesorio.equipo_id = this.idEquipo;
                        this.$toastr('success', '','TAREA REALIZADA CON ÉXITO');
                        this.valid=true;
                        this.getAccesoriosEquiposById(this.idEquipo);
                    }).catch( errors => {
                        this.$notifyErrors(errors);
                    });
                }
            },
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