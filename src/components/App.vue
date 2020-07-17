<template>
  <div id="app">
    <Toast/>
    <div id="mainHeader">
        <img id="mainHeaderImageLeft" src="../assets/coder.png"/>
        <span id="mainHeaderCodeImg">public static void main(String[] args)<br/>System.out.println(Math.random());<br/>for(int i=0; i arr.length; i++) <br/>System.out.println("Hello World");<br/>
        int width = 10;<br/>
        System.err.println(width);
        <br/></span>
        <div id="authorNameBackground"></div>
      </div>
      <div id="header" v-bind:style="{ position: compHeaderPosition, marginTop: compHeaderMargin + 'px'}">
        <div id="links-container">
          <router-link v-on:click.native="onExitClick(this)" class="route-link-btn" to="/">{{compAuthLinkText}}</router-link>
          <router-link v-if="this.isLogIn" class="route-link-btn" to="/profile" >Профили</router-link>
        </div>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import router from '../router'
import Toast from 'primevue/toast';
export default {
    data: function() {
        return {
            headerPos: 'static',
            headerMargin: 0
        }
    },
    components: {
        Toast
    },
    methods:{
        ...mapActions(["logOut"]),
        onScroll: function(event) {
            const scrolled = window.scrollY;
            let headerHeight = document.querySelector('#mainHeader').clientHeight;
            if(scrolled >= headerHeight){
                this.headerPos = 'fixed';
                this.headerMargin = -headerHeight;
            }
            else{
                this.headerPos = 'static';
                this.headerMargin = 0;
            }
        },

        onExitClick: function (event) {
            console.log('exiting')
            this.logOut(this);
        }

    },
    computed: {
        ...mapGetters(["authToken", "isLogIn"]),

        compHeaderPosition: function () {
            return this.headerPos;
        },
        compHeaderMargin: function () {
            return this.headerMargin;
        },
        compAuthLinkText: function () {
            if(this.isLogIn){
                return 'Выход';
            }else{
                return 'Вход';
            }
        }

    },
    created: function() {
        window.addEventListener('scroll', this.onScroll, true);
    },
    mounted: function () {
        if(this.authToken && router.currentRoute.name != 'Profile'){
            router.push({path: '/profile'})
        }
    }
}
</script>

<style>
#mainHeader{
    width: 100%;
    height: 10vh;
    display: flex;
    background: var(--primary-light);
    overflow: hidden;
    justify-content: space-between;
}

#mainHeaderImageLeft{
    margin-top: -4vh;
    margin-left: -2%;
    width: calc((10vh * 1.8) + 2%);
    height: calc(10vh * 1.8);
    opacity: 0.4;
}

#mainHeaderCodeImg{
    display: block;
    justify-self: flex-end;
    align-self: center;
    transform: rotate(10deg);
    font-size: 25px;
    font-weight: bold;
    margin-top: 2%;
    margin-right: 5%;
    font-family: Consolas;
    opacity: 0.3;
    color: white;
}

#authorNameBackground{
    display: block;
    height: 10vh;
    width: calc(20%);
    color: var(--text-on-primary);
    text-shadow: 2px 2px 10px gray;
    position: absolute;
    margin-left: 80%;
    text-align: center;
    font-size: calc(100vh / 27);
    font-family: var(--default-font);
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), var(--primary-light));
}

#loginDisplay{
    width: 100%;
    height: 4vh;
    background: var(--primary-dark);
    padding-left: 30px;
    overflow-x: auto;
}

#header{
    width: 100%;
    height: 4vh;
    background: var(--primary-color);
    z-index: 100;
    box-shadow: 5px 5px 10px grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
}

#links-container{
    display: flex;
}

.usernameText{
    height: 70%;
    font-size: 2.6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2%;
    text-decoration: none;
    color: var(--text-on-primary);
    font-family: var(--default-font)
}

.route-link-btn{
    width: height;
    height: 70%;
    font-size: 2.6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    margin-left: 20px;
    text-decoration: none;
    color: var(--text-on-primary);
    font-family: var(--default-font)
}

.menuButton img{
    height: 100%;
    width: inherit;
    cursor: pointer;
}

#footer{
    height: 10vh;
    width: 100%;
    background-color: var(--primary-light);
    padding: 2%;
    font-size: x-large;
    font-family: var(--default-font-light);
}
</style>
