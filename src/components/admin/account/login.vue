<template>
  <div class="accounttmpl">
    <!-- 头部 -->
    <div class="el-header">
      <img src="/static/imgs/login-header.png" alt="">
      <div class="top">知识分享系统</div>
    </div>
    <el-row>
      <el-col :span="6" :offset="7">
        <img src="/static/imgs/login.png" alt="">
      </el-col>
      <el-col :span="5" :offset="1">
        <div class="border-form">
          <!-- 登录表单 -->
          <el-form :model="myform" :rules="rules" ref="myform" class="demo-ruleForm">
            <!-- title -->
            <div class="el-title">
              <el-row>
                <el-col :span="12" class="et">
                  <router-link to="javascript:;">快速登录</router-link>
                </el-col>
                <el-col :span="12" class="et">
                  <router-link to="javascript:;">账号密码登录</router-link>
                </el-col>
              </el-row>
            </div>
            <div class="login-btn">
              <!-- 用户名 -->
              <el-form-item prop="uname">
                <el-input v-model="myform.uname" placeholder="账号"></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="upwd">
                <el-input type="password" v-model="myform.upwd" placeholder="密码"></el-input>
              </el-form-item>
              <el-checkbox v-model="myform.checked">下次自动登录</el-checkbox>
              <!-- 登录按钮 -->
              <el-form-item>
                <el-button type="primary" @click="submitForm('myform')" size="large" class="el-button--use">登录</el-button>
                <!-- <el-button type="info" @click="resetForm('myform')">重置</el-button> -->
              </el-form-item>
              <el-row>
                <el-col :span="16" :offset="8">
                  <div class="vt-upwd">
                    <a href="javascript:;">忘了密码？</a>
                    <span>|</span>
                    <a href="javascript:;">注册新帐号</a>
                    <span>|</span>
                    <a href="javascript:;">意见反馈</a>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        myform: {
          uname: '',
          upwd: '',
          checked: 'true',
        },
        rules: {
          uname: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }, ],
          upwd: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }, ]
        }
      };
    },
    methods: {
      //登录
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //成功处理
            this.$http.post("/admin/account/login", this.myform).then(res => {
              if (res.data.status == 1) {
                this.$message.error(res.data.message);
                return;
              }
              this.$router.push({
                name: "layout"
              });
              this.$message.success("登录成功");
            }).catch(err => {
              this.$notify.error({
                title: '异常',
                message: 'Network Error'
              });
            });
          } else {
            return false;
          }
        });
      },

      //重置
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // }
    }
  };

</script>
<style>
  .el-header {
    position: relative;
  }

  .top {
    height: 60px;
    line-height: 60px;
    color: #333;
    background: #eff4fa;
    width: 300px;
    position: absolute;
    top: 0px;
    left: 0px;
    padding-left: 50px;
    font-size: 20px;
    font-weight: 900;
    z-index: 999;
  }

  .border-form {
    border: 1px solid #a0b1c4;
    border-radius: 5px;
    width: 336px;
  }

  .el-title {
    border-bottom: 1px solid #c0cdd9;
    height: 50px;
    line-height: 50px;
  }

  .et {
    text-align: center;
  }

  .et a {
    color: #333;
  }

  .login-btn {
    padding: 30px 25px 25px;
    box-sizing: border-box;
  }

  .el-input__inner {
    border-radius: 3px;
  }

  .el-button--use {
    width: 286px;
    background: #5a98de;
    margin-top: 18px;
  }

  .el-button--use:hover {
    background: #5591d1;
  }

  .vt-upwd {
    font-size: 12px;
    color: #225592;
    padding-top: 60px;
  }

  .vt-upwd span {
    color: #ccc;
  }

</style>
