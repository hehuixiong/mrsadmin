<template>
  <div class="arttmpl">
    <!-- 面包屑 -->
    <div class="abread bt-line">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>购物商城</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
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
        <!-- 搜索框 -->
        <el-col :span="4">
          <el-input placeholder="请输入搜索内容" icon="search" v-model="searchvalue" @change="getList">
          </el-input>
        </el-col>
      </el-row>
    </div>
    <!-- 内容展示区 -->
    <el-table v-loading="loading" element-loading-text="拼命加载中" ref="multipleTable" :data="dataList" border stripe style="width: 100%" @selection-change="getrow">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <!-- 标题 -->
      <el-table-column label="标题">
        <template slot-scope="scope">
          <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">
            {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>
      <!-- 所属类别 -->
      <el-table-column prop="categoryname" label="所属类别" width="120">
      </el-table-column>
      <!-- 库存 -->
      <el-table-column prop="stock_quantity" label="库存" width="100">
      </el-table-column>
      <!-- 市场价 -->
      <el-table-column prop="market_price" label="市场价" width="100">
      </el-table-column>
      <!-- 销售价 -->
      <el-table-column prop="sell_price" label="销售价" width="100">
      </el-table-column>
      <!-- 属性 -->
      <el-table-column label="属性" width="120">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="轮播图" placement="bottom" :open-delay="300">
            <span v-bind="{class:scope.row.is_slide == 1 ? 'el-icon-picture ls imgactive' : 'el-icon-picture ls'}"></span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="置顶" placement="bottom" :open-delay="300">
            <span v-bind="{class:scope.row.is_top == 1 ? 'el-icon-upload ls imgactive' : 'el-icon-upload ls'}"></span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="推荐" placement="bottom" :open-delay="300">
            <span v-bind="{class:scope.row.is_hot == 1 ? 'el-icon-star-on ls imgactive' : 'el-icon-star-on ls'}"></span>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- 发布时间、发布人 -->
      <el-table-column label="发布时间 / 发布人" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.add_time | addTime }}</span> /
          <span style="color:#4383cc;">{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">
            <el-button type="success" size="mini">修改</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block" style="padding:10px;">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize" layout="total,sizes, prev, pager, next,jumper" :total="totalcount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchvalue: "", //搜索框的双向数据绑定
        dataList: [], //表单的数据数组
        totalcount: 0, //总条数
        loading: true, //加载更多图片控制
        currentPage: 1, //当前页数
        pageSize: 10, //显示条数
        ids: 0,
      };
    },
    created() { //生命周期函数
      this.getList();
    },
    methods: {
      //全选
      checkAll() {
        var rows = this.dataList;
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      /* 获取数据渲染 */
      getList() {
        var url = "/admin/goods/getlist?pageIndex=" + this.currentPage + "&pageSize=" + this.pageSize + "&searchvalue=" +
          this.searchvalue + "";
        this.$http.get(url).then(res => {
          // 异常的情况执行
          if (res.data.status == 1) {
            this.$message({
              type: "info",
              message: res.data.message
            });
          } else {
            // 正常的时候执行
            console.log(res.data.message)
            this.dataList = res.data.message;
            this.totalcount = res.data.totalcount;
            //控制加载更多图片
            setTimeout(() => {
              this.loading = false;
            }, 300);
          }
        }).catch(err => {
          this.$notify.error({
            title: '异常',
            message: 'Network Error'
          });
        });
      },
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
        console.log(this.ids)
      },
      /* 选择显示条数 */
      sizeChange(sizeIndex) {
        this.loading = true;
        this.pageSize = sizeIndex;
        this.currentPage = 1;
        this.getList();
      },
      /* 页数 */
      currentChange(pageIndex) {
        this.loading = true;
        this.currentPage = pageIndex;
        this.getList();
      },
      //点击删除事件
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
      }
    }
  };

</script>
<style scoped>


</style>
