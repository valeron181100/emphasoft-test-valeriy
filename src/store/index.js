import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import createPersistedState from "vuex-persistedstate"
import router from '../router'

Vue.use(Vuex)
const api_base_url = "http://emphasoft-test-assignment.herokuapp.com/api/v1/users"
const api_auth_url = "http://emphasoft-test-assignment.herokuapp.com/api-token-auth/"
export default new Vuex.Store({
  actions: {
    auth({commit, getters}, {vm, credentials}){
      console.log('auth');
      
      Axios.post(api_auth_url, JSON.stringify(credentials), {
        headers: {'Content-Type': 'application/json'}
      })
      .then((resp) => {
        let token = resp.data.token;
        
        commit('setAuthToken', token);
        commit('setIsLogIn', true);
        router.push({path: '/profile'});
      }).catch((e)=>{
        if(e.response && e.response.data.non_field_errors && e.response.data.non_field_errors[0] == "Unable to log in with provided credentials."){
          vm.$toast.add({severity:'error', summary: 'Ошибка', detail:'Неправильный логин или пароль', life: 2000});
        }else{
          vm.$toast.add({severity:'error', summary: 'Ошибка', detail:'Упс, что-то пошло не так!', life: 2000});
        }
        console.log(e);
      });
    },

    loadProfiles({commit, getters}, vm){
      commit('clearProfiles');
      Axios.get(api_base_url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + getters.authToken
        }
      }).then(resp => {
        for (const profile in resp.data) {
          if (resp.data.hasOwnProperty(profile)) {
            const element = resp.data[profile];
            commit('addProfile', element);
          }
        }
      }).catch((e)=>{
        vm.$toast.add({severity:'error', summary: 'Ошибка', detail:'Упс, что-то пошло не так!', life: 2000});
        console.log(e);
      }); 
    },

    logOut({commit}, vm){
        commit('setAuthToken', '');
        commit('setIsLogIn', false);
        commit('clearProfiles');
        vm.$toast.add({severity:'success', summary: 'Успешно', detail:'Вы вышли из системы', life: 2000});
    }

  },  
  state: {
    authToken: '',
    isLogIn: false,
    profiles: [],
    unsortedProfiles: [],
    origProfiles: [],
    isSorted: false
  },
  getters: {
    allProfiles(state){
      return state.profiles;
    },
    authToken(state){
      return state.authToken;
    },
    isLogIn(state){
      return state.isLogIn;
    }
  },
  mutations: {
    setAuthToken(state, nToken){
      state.authToken = nToken;
    },
    setIsLogIn(state, nIsLogIn){
      state.isLogIn = nIsLogIn; 
    },
    addProfile(state, profile){
      state.profiles.unshift(profile);
      state.unsortedProfiles.unshift(profile);
      state.origProfiles.unshift(profile);
      
    },
    clearProfiles(state){
      state.profiles = []
      state.unsortedProfiles = []
      state.origProfiles = []
    },
    sortProfiles(state, canSort){
      if(canSort){
        state.profiles.sort(dynamicSort('id'));
        state.isSorted = true;
      }else{
        state.profiles = [];
        state.profiles.push(...state.unsortedProfiles);
        state.isSorted = false;
      }
    },
    filterProfiles(state, filterVal){
      let filtered = state.origProfiles.filter(p => {
        return p.username.toLowerCase().startsWith(filterVal.toLowerCase());
      });

      state.profiles = [];
      state.profiles.push(...filtered);
      state.unsortedProfiles = [];
      state.unsortedProfiles.push(...state.profiles);
      console.log(state.isSorted)
      if(state.isSorted){
        state.profiles.sort(dynamicSort('id'));
      }else{
        state.profiles = [];
        state.profiles.push(...state.unsortedProfiles);
      }
    }
  },
  plugins: [createPersistedState()]
})
