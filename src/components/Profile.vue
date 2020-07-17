<template>
  <div id="profile-container">
    <div id="profile">
      <div v-for="profile in allProfiles" :key="profile.id" class="profile-card">
        <h3>ID {{profile.id}}</h3>
        <p>Логин: {{profile.username}}</p>
        <p>Имя: {{profile.first_name}}</p>
        <p>Фамилия: {{profile.last_name}}</p>
      </div>
    </div>
    <div class="filter-panel">
      <div class="sort-container">
        <h3>Сортировка по ID</h3>
        <p-switcher v-model="canSort" @click="sortClick"/>
      </div>
      
      <div class="sort-container">
        <h3>Фильтровать по логину</h3>
        <input v-model="filterVal" v-on:input="onFilterTextChanged" class="filter-input" type="text" >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import InputSwitch from 'primevue/inputswitch';
export default {
  name: 'Profile',
  data () {
    return {
      canSort: false,
      filterVal: ''
    }
  },
  components: {
    'p-switcher': InputSwitch
  },
  methods: {
    ...mapActions(['loadProfiles']),
    ...mapMutations(['sortProfiles', 'filterProfiles']),
    sortClick: function (event) {
      this.sortProfiles(!this.canSort);
    },

    onFilterTextChanged: function (event) {
      this.filterProfiles(this.filterVal);
    }
  },
  computed: mapGetters(['allProfiles', 'authToken']),
  created: function(){
    
  },

  mounted: function(){
    this.loadProfiles(this);
  }

}
</script>

<style scoped>

#profile-container{
  display: flex;
}

#profile{
  width: 80%;
  height: 86vh;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, 350px);
  align-items: center;
  justify-content: center;
}
.profile-card{
  width: 280px;
  height: 150px;
  overflow-y: auto;
  background: blueviolet;
  border-radius: 20px;
  margin: 30px 0px 0px 10px;
  padding: 14px;
  padding-left: 30px;
  font-size: 1.2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  align-items: flex-start;
  justify-content: center;
  color: white;
  box-shadow: -1px 10px 33px -12px rgba(0,0,0,0.75);
}
.profile-card h3{
  margin-bottom: 5px;
}
.profile-card p {
  width: 200px;
  overflow-wrap: break-word;
}

.filter-panel{
  height: 86vh;
  width: 20%;
  background: gray;
}

.filter-input{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  padding: 4px;
  width: 60%;
}

.sort-container{
  margin-left: 10px;
  margin-top: 10px;
}

.sort-container h3{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  margin-bottom: 10px;
}

@media only screen and (max-width: 1024px){
  #profile-container{
    flex-direction: column-reverse;
  }

  .filter-panel{
    height: 100%;
    width: 100%;
    padding: 20px;
  }

  #profile{
    width: 100%;
    height: 100%;
    justify-items: center;
  }
}

</style>