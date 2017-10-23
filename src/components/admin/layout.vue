<template>
  <div class="layout">
    <el-row>
      <!-- 左侧导航部分 -->
      <!-- <el-col :span="leftCol" v-bind="{style:(leftCol==1?'width:64px;':'')}"> -->
      <el-col :span="leftCol">
        <div class="layout menu">
          <h1 v-if="!isTiele">知识分享系统</h1>
          <h2 style="height:95px;" v-if="isTiele"></h2>
          <el-menu default-active="5-1" class="el-menu-vertical-demo" :collapse="isCollapse">
            <!-- 学员问题汇总 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-picture"></i>
                <!-- <span v-if="!isCollapse">学员问题汇总</span> -->
                <span>学员问题汇总</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <i class="el-icon-star-off"></i>内容管理</el-menu-item>
                <el-menu-item index="1-2">
                  <i class="el-icon-star-off"></i>类别管理</el-menu-item>
                <el-menu-item index="1-3">
                  <i class="el-icon-star-off"></i>评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 前端常用功能 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-view"></i>
                <span v-if="!isCollapse">前端常用功能</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">
                  <i class="el-icon-star-off"></i>内容管理</el-menu-item>
                <el-menu-item index="2-2">
                  <i class="el-icon-star-off"></i>类别管理</el-menu-item>
                <el-menu-item index="2-3">
                  <i class="el-icon-star-off"></i>评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 重难点专区 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-information"></i>
                <span v-if="!isCollapse">重难点专区</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">
                  <i class="el-icon-star-off"></i>内容管理</el-menu-item>
                <el-menu-item index="3-2">
                  <i class="el-icon-star-off"></i>类别管理</el-menu-item>
                <el-menu-item index="3-3">
                  <i class="el-icon-star-off"></i>评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 资源下载 -->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-upload"></i>
                <span v-if="!isCollapse">资源下载</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">
                  <i class="el-icon-star-off"></i>内容管理</el-menu-item>
                <el-menu-item index="4-2">
                  <i class="el-icon-star-off"></i>类别管理</el-menu-item>
                <el-menu-item index="4-3">
                  <i class="el-icon-star-off"></i>评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 购物商城 -->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-loading"></i>
                <span v-if="!isCollapse">购物商城</span>
              </template>
              <el-menu-item-group>
                <router-link to="/admin/goodslist">
                  <el-menu-item index="5-1">
                    <i class="el-icon-star-off"></i>内容管理</el-menu-item>
                </router-link>
                <router-link to="/admin/goodscatelist">
                  <el-menu-item index="5-2">
                    <i class="el-icon-star-off"></i>类别管理</el-menu-item>
                </router-link>
                <el-menu-item index="5-3">
                  <i class="el-icon-star-off"></i>评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 订单管理 -->
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-star-on"></i>
                <span v-if="!isCollapse">订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="6-1">
                  <i class="el-icon-star-off"></i>订单列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <!-- 右侧部分 -->
      <el-col :span="rightCol">
        <!-- 顶部 -->
        <div class="topbg">
          <el-row>
            <el-col :span="1">
              <i class="layout el-icon-menu area" @click="toogle"></i>
            </el-col>
            <el-col :span="23">
              <span>欢迎，Hero登录</span>
              <el-dropdown>
                <el-button @click="logout" class="btn-icon">
                  更多
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>预览网站</el-dropdown-item>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item>注销登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col>
            <!-- 内容 -->
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isTiele: false,
        isCollapse: false, //控制左侧展开与收缩
        leftCol: 4, //左侧默认占列
        rightCol: 20, //右侧默认占列
      };
    },
    methods: {
      //注销登录
      logout() {
        var url = '/admin/account/logout';
        this.$http.get(url).then(res => {
          if (res.data.status == 1) {
            this.$message.error(res.data.message);
          }
          this.$router.push({
            name: "login"
          });
          this.$message.success("退出成功！");
        }).catch(err => {
          this.$notify.error({
            title: '异常',
            message: 'Network Error'
          });
        });
      },
      toogle() {
        this.isCollapse = !this.isCollapse;
        if (this.isCollapse) {
          setTimeout(() => {
            this.isTiele = !this.isTiele;
            this.leftCol = 1;
            this.rightCol = 23;
          }, 350)
        } else {
          setTimeout(() => {
            this.isTiele = !this.isTiele;
          }, 350)

          this.leftCol = 4;
          this.rightCol = 20;
        }
      }
    }
  };

</script>
<style scoped>
  .menu h1 {
    color: #fff;
    font-size: 26px;
    padding: 30px 0;
    text-align: center;
  }


  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
  }

  .btn-icon {
    background: #48576a;
    color: #fff;
  }

</style>
