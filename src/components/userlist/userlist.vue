<template>
  <el-card>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索 -->
    <el-row>
      <div class="search">
        <el-col :span="6">
          <el-input placeholder="请输入内容" clearable v-model="query">
            <el-button slot="append" icon="el-icon-search" @click.prevent="search"></el-button>
          </el-input>
        </el-col>
        <!-- 添加用户 -->
        <el-col :span="2">
          <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
        </el-col>
      </div>
    </el-row>

    <!-- 用户信息表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="40"></el-table-column>
      <el-table-column prop="username" label="姓名" width="160" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="280" align="center"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="280" align="center"></el-table-column>
      <el-table-column label="用户状态" width="80" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-switch
            @change="(val)=>{switchChange(val,scope.row.id)}"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="用户操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click.prevent="editUser(scope.row)"
            icon="el-icon-edit"
            size="mini"
            plain
          ></el-button>
          <el-button
            type="success"
            @click="selectChange(scope.row)"
            icon="el-icon-check"
            size="mini"
            plain
          ></el-button>
          <el-button
            type="danger"
            @click.prevent="deleteuser(scope.row)"
            icon="el-icon-delete"
            size="mini"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currChange"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagenums"
    ></el-pagination>

    <!-- 新增用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="adduser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="adduser.password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="adduser.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="adduser.moblie"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduserFn">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 用户编辑弹窗 -->
    <el-dialog title="修改用户" :visible.sync="flag">
      <el-form :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input autocomplete="off" v-model="edituserdata.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input autocomplete="off" v-model="edituserdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input autocomplete="off" v-model="edituserdata.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flag = false">取 消</el-button>
        <el-button type="primary" @click="editUserFn">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 用户角色分配弹窗 -->
    <el-dialog title="分配角色" :visible.sync="selectFormVisible">
      <el-form>
        <el-form-item label="当前用户" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="selectUser.username"></el-input>
        </el-form-item>
        <el-form-item label="请选择角色" :label-width="selectLabelWidth">
          <el-select v-model="selectUser.rid">
            <el-option label="请选择角色" :value="-1" disabled></el-option>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="selectFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkUser">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 11, message: "长度在 6 到 11 个字符", trigger: "blur" }
        ],
        email: [
          { type: "email", message: "邮箱地址格式不正确", trigger: "blur" }
        ],
        mobile: [{ type: "", message: "请输入用户名", trigger: "blur" }]
      },
      flag: false,
      dialogFormVisible: false,
      selectFormVisible: false,
      formLabelWidth: "80px",
      selectLabelWidth: "100px",
      query: "",
      tableData: [],
      pagenum: 1,
      pagenums: 400, //总条数
      pagesize: 3, //每页的条数
      pagesizes: [3, 6, 9],
      //添加的用户数据
      adduser: {
        username: "",
        password: "",
        email: "",
        moblie: ""
      },
      //编辑的用户数据
      edituserdata: {
        id: "",
        username: "",
        email: "",
        mobile: ""
      },
      //角色状态
      options: [],
      selectUser: {
        username: "",
        roleName: "",
        rid: ""
      }
    };
  },

  methods: {
    //获取用户信息
    gettabledata() {
      this.$http({
        method: "get",
        url: `users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${
          this.query
        }`
      }).then(res => {
        this.tableData = res.data.data.users;
        this.pagenums = res.data.data.total;
      });
    },

    //页容量发生改变时执行
    sizeChange(pagesize) {
      this.pagesize = pagesize;
      this.gettabledata();
    },

    //当前页改变时触发
    currChange(currentPage) {
      this.pagenum = currentPage;
      this.gettabledata();
    },

    //根据关键字查询用户
    search() {
      this.gettabledata();
      this.query = "";
    },

    //添加用户
    adduserFn() {
      this.$http({
        method: "post",
        url: "users",

        data: this.adduser
      }).then(res => {
        if (res.data.meta.status === 201) {
          (this.dialogFormVisible = false), this.gettabledata();
          this.$message({
            type: "success",
            message: res.data.meta.msg
          });
        } else {
          this.$message({
            type: "warning",
            message: res.data.meta.msg
          });
        }
      });
    },
    //用户状态
    switchChange(val, id) {
      this.$http({
        method: "put",
        url: `users/${id}/state/${val}`
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.$message({
            type: "success",
            message: res.data.meta.msg
          });
        } else {
          this.$message({
            type: "warning",
            message: res.data.meta.msg
          });
        }
      });
    },

    //删除用户信息
    deleteuser(user) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            method: "delete",
            url: `users/${user.id}`
          }).then(res => {
            if (res.data.meta.status === 200) {
              this.gettabledata();
              this.$message({
                type: "success",
                message: res.data.meta.msg
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //弹出编辑用户信息框
    editUser(user) {
      this.flag = !this.flag;
      // console.log(user);
      this.edituserdata.username = user.username;
      this.edituserdata.email = user.email;
      this.edituserdata.mobile = user.mobile;
      this.edituserdata.id = user.id;
    },

    //发送编辑用户信息请求
    editUserFn() {
      this.$http({
        method: "put",
        url: `users/${this.edituserdata.id}`,
        data: {
          email: this.edituserdata.email,
          mobile: this.edituserdata.mobile
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.meta.status === 200) {
            this.flag = false;
            this.gettabledata();
            this.$message({
              type: "success",
              message: res.data.meta.msg
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //显示分配角色的对话框
    selectChange(user) {
      (this.selectFormVisible = true), console.log(user);

      this.$http.get(`users/${user.id}`).then(res => {
        this.selectUser = res.data.data;
      });
      this.$http.get("roles").then(res => {
        this.options = res.data.data;
      });
    },
    //分配角色
    checkUser() {
      // this.selectFormVisible = false;
      this.$http({
        method: "put",
        url: `users/${this.selectUser.id}/role`,
        data: {
          rid: this.selectUser.rid
        }
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.selectFormVisible = false;
          this.$message({
            type: "success",
            message: "分配角色成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "分配角色失败"
          });
        }
      });
    }
  },

  //加载组件时获取数据
  mounted() {
    this.gettabledata();
  }
};
</script>

<style>
.search {
  height: 100%;
  margin-top: 20px;
}
</style>
