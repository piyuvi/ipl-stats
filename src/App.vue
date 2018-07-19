<template>
  <div id="app">
    <Navbar></Navbar>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar/Navbar.vue'
export default {
  name: 'App',
  components:{
    Navbar
  }
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css?family=Merienda'); */
#app {
font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.navbar{
  margin-top:-60px;
  background-color:#5E1A7C !important;
}
.modal-footer{
  display: none !important;
}
</style>
