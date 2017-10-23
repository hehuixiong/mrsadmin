<template>
  <div class="arttmpl">
    <!-- 面包屑 -->
    <div class="abread bt-line">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>购物商城</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>类别管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 操作区 -->
    <div class="operation">
      <el-row>
        <!-- 功能 -->
        <el-col :span="20">
          <router-link to="/admin/goodsadd">
            <el-button type="success">
              <i class="el-icon-plus"></i> 新增</el-button>
          </router-link>
          <el-button type="warning" @click="checkAll">
            <i class="el-icon-check"></i> 全选</el-button>
          <el-button type="danger" @click="delData">
            <i class="el-icon-delete2"></i> 删除</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 内容展示区 -->
    <el-table v-loading="loading" element-loading-text="拼命加载中" :data="dataList" border stripe style="width: 100%" @selection-change="getrow">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <!-- 编号 -->
      <el-table-column prop="category_id" label="编号" width="80">
      </el-table-column>
      <!-- 类别名称 -->
      <el-table-column label="类别名称">
        <template slot-scope="scope">
          <router-link v-bind="{to:'/admin/goodscatelist/'+scope.row.id}">
            {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>

      <!-- 排序号 -->
      <el-table-column label="排序号" width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sort_id" size="mini"></el-input>
        </template>
      </el-table-column>
      <!-- 层级 -->
      <el-table-column prop="class_layer" label="层级" width="80">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <router-link v-bind="{to:'/admin/goodscatelist/'+scope.row.id}">
            <el-button type="info" size="mini">添加子类</el-button>
            <el-button type="success" size="mini">修改</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <div class="block" style="padding:10px;">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize" layout="total,sizes, prev, pager, next,jumper" :total="totalcount">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        dataList: [],
      };
    },
    created() { //生命周期函数
      this.getList();
    },
    methods: {
      //获取数据并且渲染
      getList() {
        var url = "/admin/category/getlist/goods";
        this.$http.get(url).then(res => {
          if (res.data.status == 1) {
            this.$message.error(res.data.message);
            return;
          }
          this.dataList = res.data.message;
        }).catch(err => {
          this.$notify.error({
            title: '异常',
            message: 'Network Error'
          });
        });
      },
      //删除
      delData() {
        if (this.ids <= 0) {
          this.$message.error("请勾选数据再删除！");
          return;
        }
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {

            //删除逻辑
            var url = "/admin/goods/del/" + this.ids;
            this.$http.get(url).then(res => {
              if (res.data.status == 1) {
                this.$message.error(res.data.message);
              } else {
                this.getList();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            }).catch(err => {
              this.$notify.error({
                title: '异常',
                message: 'Network Error'
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      //全选
      checkAll() {},
      // 点击勾选的时候获取数据，这里得到的是id，传给后台删除数据用的
      getrow(rows) { //rows 点击的时候传过来的参数是一个对象
        this.ids = '';
        var splitchar = ',';
        for (var i = 0; i < rows.length; i++) {
          if (i == rows.length - 1) {
            splitchar = '';
          }
          this.ids += rows[i].id + splitchar;
        }
      },
    }
  };

</script>
<style scoped>


</style>
