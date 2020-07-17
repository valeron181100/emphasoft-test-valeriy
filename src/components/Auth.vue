<template>
  <div class="authContent">
    <span id="logInLabel">Вход</span>
    <br><br><br>
    <form class="log-inputs" @submit.prevent="onSubmit">
        <h3>Логин:</h3>
        <input id="username" type="text"  v-model="username" :class="{ invalid: ($v.username.$dirty && !$v.username.required) || ($v.username.$dirty && !$v.username.minLength) 
        || ($v.username.$dirty && !$v.username.username)}">
        <p-message v-if=" $v.username.$dirty && !$v.username.required" severity="error">Поле не должно быть пустым</p-message>
        <p-message v-if=" $v.username.$dirty && !$v.username.username" severity="error">Использованы запрещенные символы</p-message>
        <br>
        <h3>Пароль:</h3>
        <input type="password" v-model="password" :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.password) }"/>
        <p-message v-if="$v.password.$dirty && !$v.password.required" severity="error">Поле не должно быть пустым</p-message>
        <p-message v-if="$v.password.$dirty && !$v.password.password" severity="error">Пароль должен иметь хотябы одну заглавную букву и быть длины 8</p-message>
        <br>
        <button type="submit" class="themeBtn">Готово</button>
    </form>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
import Message from 'primevue/message';
export default {
  name: 'Auth',
  components: {
    'p-message': Message
  },
  data () {
    return {
      password: '',
      username: ''
    }
  },
  validations: {
    password: {
      required,
      password(password){
        return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
      }
    },
    username: {
      required,
      username(username){
        return /^[\w.@+-]+$/.test(username);
      }
    }
  },
  methods: {
    ...mapActions(["auth"]),
    authClick: function(event){
      
    },
    onSubmit(){
      console.log('submit')
      if(this.$v.$invalid){
        this.$v.$touch();
        return;
      }else{
        let credentials = {
          'username': this.username,
          'password': this.password
        }
        this.auth({vm: this, credentials: credentials});
      }
    }

  }
}
</script>
<style>
p-message{
  display: inline-block;
}

.authContent{
    display: flex;
    align-items: center;
    justify-content: top;
    flex-direction: column;
    padding-top: 5%;
    height: 100vh;
    font-family: var(--default-font);
}

#logInLabel{
    font-size: 6rem;
    display: block;
}

.log-inputs{
    display: flex;
    flex-direction: column;
    font-size: x-large;
    font-family: var(--default-font-light);
}

.log-inputs > input{
    font-size: x-large;
    height: 2em;
    width: 20vw;
    margin-top: 16px;
    padding: 10px;
}

.themeBtn {
    background-color: var(--secondary-color);
    font-size: x-large;
    padding: 10px;
    border-radius: 10px;
}

.themeBtn:hover{
    background-color: var(--secondary-light) !important;
}

@media only screen and (max-width: 870px){
    .log-inputs > input{
        font-size: large;
        width: 70vw;
    }
    #logInLabel{
        font-size: 4rem;
    }

    .log-inputs{
        display: flex;
        flex-direction: column;
        font-size: large;
        font-family: var(--default-font-light);
    }
}
</style>
