<template>
  <div class="login">
    <div class="content">
      <el-form
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :label-position="labelPosition"
        :rules="rules"
        :model="userObj"
      >
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="userObj.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userObj.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="mybtn" @click.prevent="login('userObj')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      userObj: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      //对整个表单进行校验的方法，参数为一个回调函数。
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            // url: "http://localhost:8888/api/private/v1/login",
            url: "login",
            data: this.userObj
          })
            .then(res => {
              let { data, meta } = res.data;
              if (meta.status === 200) {
                this.$message({
                  message: meta.msg,
                  type: "success"
                });
                window.localStorage.setItem("token", data.token);
                this.$router.push("/");
              } else {
                this.$message.error(meta.msg);
              }
            })
            .catch(err => {
              //   console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background-color: #324152;
  position: relative;
}
.content {
  width: 500px;
  height: 356px;
  background-color: #fff;
  padding: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
.mybtn {
  width: 100%;
}
</style>
