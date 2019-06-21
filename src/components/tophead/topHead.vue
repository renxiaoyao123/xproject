<template>
  <el-row>
    <el-col :span="4">
      <div>
        <img src="../../assets/images/logo.png" alt>
      </div>
    </el-col>
    <el-col :span="16">
      <div>
        <h1>电商后台管理系统</h1>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="right">
        <a href="#" @click.prevent="logout">退出</a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    //退出登录
    logout() {
      this.$confirm("是否退出系统", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        window.localStorage.removeItem("token");
        this.$router.push({ name: "login" });
        this.$message({
          type: "success",
          message: "退出成功!"
        });
      });
    }
  }
};
</script>

<style>
</style>
