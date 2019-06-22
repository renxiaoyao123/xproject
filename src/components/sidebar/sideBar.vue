<template>
  <el-menu class="el-menu-vertical-demo" :unique-opened="true" :router="true">
    <el-submenu v-for="(role,index) in roles" :key="role.id" :index="index +''">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{role.authName}}</span>
      </template>
      <el-menu-item v-for="subRole in role.children" :key="subRole.id" :index="'/' + subRole.path">
        <i class="el-icon-menu"></i>
        <span>{{ subRole.authName }}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      roles: []
    };
  },
  mounted() {
    this.$http({
      method: "get",
      url: "menus"
    }).then(res => {
      if (res.data.meta.status === 200) {
        this.roles = res.data.data;
      }
    });
  }
};
</script>

<style>
</style>
