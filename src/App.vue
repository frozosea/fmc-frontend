<template>
  <FmcHeader/>
<!--&lt;!&ndash;  <nav-bar/>&ndash;&gt;-->
  <router-view/>
  <FmcFooter/>
</template>

<script>

// import NavBar from "@/components/navBar";
import FmcHeader from "@/components/header"
import FmcFooter from "@/components/footer"

export default {
  name: 'App',
  components: {
    // NavBar,
    FmcHeader,
    FmcFooter
  }
}
</script>

<style>
@import "@/assets/style.css";
</style>
