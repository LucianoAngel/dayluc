<template>
    <div  id="app" class="container mt-5">
        <div class= "login-box">
            <img src="../assets/logotipo.png" class= "avatar" alt="Inicio DAYLUC">
            <h1> Register </h1>
            <form>
                <input type="text" v-model="nombre" placeholder= "Username...">
                <input type="text"  v-model="email" placeholder= "Mail...">
                <input type="password" v-model="password" placeholder="Password..." >
                <input type="button" value= "Register" @click="enviarDatos">
                <router-link to="/login">
                  Login...
                </router-link>
            </form>
        </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name:'Register',
    data(){
        return{
            nombre: '',
            password: '',
            email: '',
        }
    },
    methods: {
        enviarDatos(){
        const This = this;
        if(!this.nombre.length || !this.password.length || !this.email.length){
          return This.$vToastify.info('Llena todos los datos para continuar')
        }
        var expreg = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
        var resultExpreg= expreg.test(this.email)
        if(!resultExpreg){
          return This.$vToastify.info('Ingresa un correo valido')
        }
        axios
          .post('http://localhost:4012/api/auth/register', {
            username: This.nombre,
            password: This.password,
            email: This.email
          })
          .then((res) => {
            console.log(res)
            if(res.status==200){
              This.$vToastify.success('Registrado con exito, prueba iniciando sesión')
              This.$router.push('/login')
            }else{
              This.$vToastify.error("valida tus datos")
            }})
          .catch((error) => {
            This.$vToastify.error(error)
          })
      }
    },
    created: function(){
    }
}
</script>

<style>
    .login-box {
    width: 320px;
    height: 420px;
    background: rgb(133, 125, 125);
    color: #fff;
    top: 50%;
    left: 50%;
    position: absolute;
    opacity: 0.7;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 60px 30px;
  }
  
  .login-box .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    top: -50px;
    left: calc(50% - 50px);
  }
  
  .login-box h1 {
    margin: 0;
    padding: 0 0 20px;
    text-align: center;
    font-size: 22px;
  }
  
  .login-box label {
    margin: 0;
    padding: 0;
    font-weight: bold;
    display: block;
  }
  
  .login-box input {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .login-box input[type="text"], .login-box input[type="password"] {
    border: none;
    border-bottom: 1px solid rgb(255, 255, 255);
    background: transparent;
    outline: none;
    height: 40px;
    color: #fff;
    font-size: 16px;
  }
  ::placeholder { 
    color: rgb(255, 255, 255);
    opacity: 1; 
  }
  
  .login-box input[type="button"] {
    border: none;
    outline: none;
    height: 40px;
    background: #bdbab6;
    color: rgb(240, 240, 240);
    font-size: 18px;
    border-radius: 20px;
  }
  
  .login-box input[type="button"]:hover {
    cursor: pointer;
    background: #3b3a39;
    color: #000;
  }
  
  .login-box a {
    text-decoration: none;
    font-size: 12px;
    line-height: 20px;
    color: rgb(253, 252, 252);
  }
  
  .login-box a:hover {
    color: #fff;
  }
  
</style>