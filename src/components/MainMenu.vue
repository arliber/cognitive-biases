<template>
   <el-menu theme="dark" default-active="0" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1" @click="goTo('/')"><img src="../assets/logo.png" id="logo"/></el-menu-item>
    <!--<el-menu-item index="2">All</el-menu-item>
    <el-menu-item index="3">Favorites</el-menu-item>-->

     <el-menu-item v-if="!isAuthenticated" @click="goTo('login')" index="4" class="push-right">Login</el-menu-item>
     <el-menu-item v-if="!isAuthenticated" @click="goTo('signup')" index="5" class="push-right">Signup</el-menu-item>

     <el-menu-item v-if="isAuthenticated" index="4" class="push-right" id="avatar-logout" @click="logout">
       <img :src="'https://api.adorable.io/avatars/50/' + user.email" :alt="user.email" class="avatar"/>
       <div>Logout</div>
     </el-menu-item>

     </el-menu-item>

  </el-menu>
</template>

<script>
import auth from '../services/auth'

export default {
  name: 'main-menu',
  computed: {
    isAuthenticated () {
      return this.$store.getters.isUserLoggedin
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    goTo (route) {
      this.$router.push(route)
    },
    logout () {
      auth.logout()
    }
  }
}
</script>

<style scoped>
  .el-menu--horizontal .el-menu-item.push-right {
    float: right;
  }
  #avatar-logout {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #avatar-logout img {
    margin-right: 12px;
    height: 65%;
  }
  #logo {
    padding-top: 15px;
    height: 60%;
  }
</style>
