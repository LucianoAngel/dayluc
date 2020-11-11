<template >
    <div  id="app" class="h-100">
      <div class="row m-0 justify-content-center  align-items-center vh-100">
            <b-card class="col-sm-4 gb-white">
              <h1 >Sesion finalizada</h1>
              <p>
                inicia sesion aquí: 
                <router-link to="/login">
                            <button class="btn btn-light">Login...</button> 
                </router-link>
              </p>
            </b-card>
      </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name:'Logout',
    data(){
        return{
        }
    },
    methods: {
        cerrarSesion(){
        const This = this;
        axios
          .get('http://localhost:4012/api/auth/logout')
          .then((res) => {
            if(res.status==200){
              This.$vToastify.success('Sesion finalizada con exito')
            }else{
              This.$vToastify.error("ha ocurrido un error")
            }})
          .catch((err) => This.$vToastify.error(err))
      }
    },
    created: function(){
      this.cerrarSesion()
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