<template>
    <div id="app">
            <main>
                <div v-if="result">
                    <div class="text-right">
                        <router-link to="/logout">
                            <button class="btn btn-light">Cerrar sesión...</button> 
                        </router-link>
                     </div>
                    <div class="box">
                        <div class="wrap">
                            <div class="transparent-box">
                                <div class="location">Importa tus canciones</div>
                                    <div class="box-content">
                                        <div class="temp">
                                            <form @submit.prevent="enviarSong" action="http://localhost:4012/api/tracks/tracks" method="post" enctype="multipart/form-data" ref="frm">
                                                <b-form-file
                                                name="track"
                                                v-model="file"
                                                placeholder="Sube una cancion"
                                                drop-placeholder="Sube la cancion aquí"
                                                accept="audio/mp3"
                                                class="search-bar mt-3"
                                                >
                                                </b-form-file>
                                                <input type="text" class="search-bar mt-3" :value="b" name="name"  placeholder="nombre de la cancion">
                                                <button type="submit" class="temp">Subir <b-avatar icon="cloud" size="4rem" variant="light"></b-avatar></button> 
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="modal">
                            <b-modal v-model="modalshow" title="Actualiza el nombre de la cancion" @ok="updateSongs(trackId)">
                                <b-form-input v-model="trackName" placeholder="Ingresa el nombre de la canción" required >
                                </b-form-input>
                            </b-modal>
                        </div>
                        <!-- empieza la implementación de la targeta donde aparecen los audios -->
                        <div>
                            <b-card
                            title="Nombre de la targeta"
                            no-body
                            bg-variant="white"
                            header-bg-variant="primary"
                            >
                            <b-card-header>
                                <b-nav card-header tabs>
                                    <b-nav-item @click="getSongsUser">Canciones Propias</b-nav-item>
                                    <b-nav-item @click="getSongs">Todas las canciones</b-nav-item>
                                </b-nav>
                            </b-card-header>
                            <b-card-body class="text-center" >
                                <b-card-text>
                                    <div class="box mt-3" v-for="song of songs">
                                    <div class="search-bar">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <b-card>
                                                <b> Nombre: </b>  {{song.filename}}   <b> Fecha:</b> {{song.uploadDate}}   <b> Autor:</b> {{song.author}}
                                                </b-card>
                                            </div>
                                            <audio controls>
                                            <source :src="'http://localhost:4012/api/tracks/tracks/'+song._id" type="audio/mp3">
                                                el buscador no soporta el audio 
                                            </audio>
                                            <div v-if="song.author == username">
                                                <button class="btn bg-light" @click="deleteSongs(song._id)">Eliminar</button>
                                                <b-button @click="openModal(song._id)">Actualizar</b-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </b-card-text>
                            </b-card-body>
                            </b-card>
                        </div>
                    <!-- <div class="box mt-3" v-for="song of songs">
                        <div class="search-bar">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <b-card>
                                    <b> Nombre: </b>  {{song.filename}}   <b> Fecha:</b> {{song.uploadDate}}   <b> Autor:</b> {{song.author}}
                                    </b-card>
                                </div>
                                <audio controls>
                                <source :src="'http://localhost:4012/api/tracks/tracks/'+song._id" type="audio/mp3">
                                    el buscador no soporta el audio 
                                </audio>
                                <div v-if="song.author == username">
                                    <button class="btn bg-light" @click="deleteSongs(song._id)">Eliminar</button>
                                    <b-button @click="openModal(song._id)">Actualizar</b-button>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
                <div v-if="!result">
                    <div class="h-100">
                        <div class="row m-0 justify-content-center  align-items-center vh-100">
                                <b-card class="col-sm-4 gb-white">
                                    <h1> Necesitas autorización para entrar a este sitio</h1>
                                    <p> Prueba registrandote aquí: <router-link to="/">
                                    Register...
                                    </router-link>
                                    </p>
                                </b-card>
                        </div>
                    </div>
                </div>
            </main>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name:'Inicio',
    data(){
        return{
            file: null,
            songs: '',
            name: '',
            result: '',
            username: '',
            modalshow: false,
            trackName: '',
            trackId: '',
        }
    },
    methods: {
        openModal: function(idSong){
            this.modalshow = !this.modalshow;
            this.trackId= idSong
            console.log(this.trackId)
        },
        changeData: function(data){
            const spliteado= data.split
            this.modalshow = !this.modalshow;
            this.trackId= idSong
            console.log(this.trackId)
        },
        enviarSong: function(){
             if(!this.b.length){
                   return this.$vToastify.info("Debes ingresar un nombre para la canción")
            }
            const This = this
            const frm = this.$refs.frm;
            const formData = new FormData(frm)
           axios
            .post('http://localhost:4012/api/tracks/tracks',formData)
            .then(res => {
                if(res.status == 200){
                        This.$vToastify.info("Canciones subida exitosamente")
                        This.getSongs()
                        This.name= ''
                        // This.updateAuthor(res.data.id)
                    }
                else{
                        This.$vToastify.error("error subiendo la cancion")
                }
                })
            .catch((err) => {
                This.$vToastify.error(err)
                console.log(err)
            })
        },
        getSongs: function(){
            const This = this
           axios
            .get('http://localhost:4012/api/songs')
            .then(res => {
                if(res.status == 200){
                    This.result= 'puedes entrar'
                    This.songs= res.data
                    if(This.songs.length){
                        This.$vToastify.success("Canciones obtenidas exitosamente")
                    }
                }else{
                    This.result= ''
                }
                })
            .catch(err => This.$vToastify.error(err))
        },
        getSongsUser: function(){
            const This = this
           axios
            .get('http://localhost:4012/api/songs/autor')
            .then(res => {
                if(res.status == 200){
                    This.result= 'puedes entrar'
                    This.songs= res.data
                    if(This.songs.length){
                        This.$vToastify.success("Canciones obtenidas exitosamente")
                    }
                }else{
                    This.result= ''
                }
                })
            .catch(err => This.$vToastify.error(err))
        },
        getSession: function(){
            const This = this
           axios
            .get('http://localhost:4012/api/auth/session')
            .then(res => {
                if(res.status == 200){
                    This.username= res.data.username;
                    if(This.username.length){
                        This.$vToastify.success("Datos de session obtenidos exitosamente")
                    }
                }else{
                    This.username= ''
                }
                })
            .catch(err => This.$vToastify.error(err))
        },
         deleteSongs: function(unId){
            const This = this
           axios
            .delete(`http://localhost:4012/api/songs/`+unId)
            .then((songs) => {
                console.log(songs)
                This.$vToastify.success(songs.data)
                This.getSongs()
            })
            .catch((err) => {
                console.log(err)
                This.$vToastify.error(err)
            })
        },
         updateSongs: function(unId){
             console.log(unId)
            const This = this
             console.log(This.trackName)
           axios
            .put(`http://localhost:4012/api/songs/`+unId,{
                trackName: This.trackName
            })
            .then((res) => {
                console.log(res)
                This.$vToastify.success('Cancion actualizada con exito')
                This.getSongs()
                This.trackName= '';
            })
            .catch((err) => {
                console.log(err)
                This.$vToastify.error(err)
            })
        },
    },
    mounted(){
            this.getSongs()
            this.getSession()
    },
    computed: {
        b: function(){
            if(this.file){
                return this.file.name
            }
        }
    }
}
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: "montserrat", sans-serif;
    }

    #app {
        background-image: url("../assets/fondo.png");
        background-size: cover;
        background-position: bottom;
        transition: 0.4s;
    }
    main {
        min-height: 100vh;
        padding: 25px;
        background-image: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75));
    }
    .box {
        width: 100%;
        margin-bottom: 30px;
    }
    .box .search-bar {
        display: block;
        width: 100%;
        padding: 15px;
        color: #313131;
        font-size: 20px;
        appearance: none;
        border: none;
        outline: none;
        background: none;
        box-shadow: 0px 0px 8px rgba(0,0,0,0.25);
        background-color: rgba(255,255,255,0.5);
        border-radius: 0px 16px 0px 16px;
        transition: 0.4s;
    }
    .box .search-bar:focus {
        box-shadow: 0px 0px 16px rgba(0,0,0,0.25);
        background-color: rgba(255,255,255,0.75);
        border-radius: 16px 0px 16px 8px;
    }

    .transparent-box .location {
        color: #ffff;
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        text-shadow: 1px 3px rgba(0,0,0,0.25);
    }
    
    .transparent-box {
        color: #ffff;
        font-weight: 300;
        font-style: italic;
        text-align: center;
    }
    .box-content {
        text-align: center;
    }
    .box-content .temp{
        display: inline-block;
        padding: 10px 25px;
        color: #ffff;
        font-size: 35px;
        font-weight: 900;
        /* text-shadow: 3px 6px rgba(0,0,0,0.25); */
        background-color: rgba(255,255,255,0.25);
        border-radius: 16px;
        margin: 38px 0px;
    }
    .custom-file-input:lang(en) ~ .custom-file-label::after {
        content: 'Buscar';
    }
</style>