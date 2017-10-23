<template>
  <div class="goodsadd arttmpl">
    <!-- 面包屑 -->
    <div class="abread bt-line">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/goodslist' }">返回上一层</el-breadcrumb-item>
        <el-breadcrumb-item>购物商城</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>新增数据</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 表单 -->
    <div class="el-boeder">
      <el-row>
        <el-col :span="20">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <!-- 第一行 -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="内容标题" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="副标题" prop="sub_title">
                  <el-input v-model="ruleForm.sub_title"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row>
              <el-col :span="10">
                <el-form-item label="所属类别">
                  <el-select v-model="ruleForm.category_id" placeholder="请选择">
                    <el-option v-for="(cate,index) in categoryList" :key="index" :label="cate.title" :value="cate.category_id">
                      <span v-for="(item,index) in cate.class_layer-1" :key="index">&nbsp;</span>
                      <span v-if="cate.class_layer>1">|-</span>
                      <span v-text="cate.title"></span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否发布">
                  <el-switch v-model="ruleForm.status" on-text="是" off-text="否">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="推荐类型">
                  <el-switch v-model="ruleForm.is_slide" on-text="轮播图" off-text="轮播图" :width="72">
                  </el-switch>
                  <el-switch v-model="ruleForm.is_top" on-text="置顶" off-text="置顶">
                  </el-switch>
                  <el-switch v-model="ruleForm.is_hot" on-text="推荐" off-text="推荐">
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第三行 -->
            <el-row>
              <el-col :span="10">
                <el-form-item label="上传封面">
                  <el-upload class="upload-demo" action="http://157.122.54.189:9095/admin/article/uploadimg" :on-success="imgUploaded" :file-list="ruleForm.imgList"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <span>&nbsp;</span>
                    <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="图片相册">
                  <!-- :on-success="fileUploaded"上传之后成功的回调 -->
                  <el-upload class="upload-demo" action="http://157.122.54.189:9095/admin/article/uploadfile" :on-success="fileUploaded" :file-list="ruleForm.fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <span>&nbsp;</span>
                    <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第四行 -->
            <el-row>
              <el-col :span="6">
                <el-form-item label="商品货号" prop="goods_no">
                  <el-input v-model="ruleForm.goods_no"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="库存数量" class="el-label" prop="stock_quantity">
                  <el-input v-model.number="ruleForm.stock_quantity"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="市场价格" class="el-label" prop="market_price">
                  <el-input v-model.number="ruleForm.market_price"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="销售价格" class="el-label" prop="sell_price">
                  <el-input v-model.number="ruleForm.sell_price"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第五行 -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="内容摘要" prop="zhaiyao">
                  <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 3}" placeholder="请输入内容" v-model="ruleForm.zhaiyao">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第六行 -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="详细内容" prop="content">
                  <quill-editor v-model="ruleForm.content">
                  </quill-editor>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 按钮 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交保存</el-button>
              <router-link to="/admin/goodslist">
                <el-button type="warning">返回上一页</el-button>
              </router-link>
              <el-button type="danger" @click="resetForm('ruleForm')">重置表单</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  //富文本编辑器
  //步骤1：导入
  import {
    quillEditor
  } from 'vue-quill-editor';

  export default {
    components: {
      // 调用富文本
      quillEditor
    },
    data() {
      return {
        //当前商品的分类数组
        categoryList: [],
        //表单绑定
        ruleForm: {
          title: "", //内容标题
          sub_title: "", //副标题
          category_id: "", //所属类别
          status: 0, //是否发布
          is_slide: 0, //轮播图
          is_top: 0, //置顶
          is_hot: 0, //推荐
          goods_no: 0, //商品货号
          stock_quantity: 0, //库存数量
          market_price: 0, //市场价格
          sell_price: 0, //销售价格
          content: "",
          zhaiyao: "",
          fileList: [], //商品相册图片数组
          imgList: [], //商品封面图片对象
        },
        //表单验证--------------------------------
        rules: {
          //内容标题
          title: [{
            required: true,
            message: '请输入内容标题',
            trigger: 'blur'
          }, ],
          //副标题
          sub_title: [{
            required: true,
            message: '请输入副标题',
            trigger: 'blur'
          }, ],
          //所属类别
          category_id: [{
            required: true,
            message: '请选择活动区域',
            trigger: 'change'
          }],
          //内容摘要
          zhaiyao: [{
            required: true,
            message: '请输入内容摘要',
            trigger: 'blur'
          }, ],
          //详细内容
          content: [{
            required: true,
            message: '请输入详细内容',
            trigger: 'blur'
          }, ],
          //商品货号
          goods_no: [{
            required: true,
            message: '请输入商品货号',
            trigger: 'blur'
          }],
          //库存数量
          stock_quantity: [{
            type: 'number',
            message: '必须为数字值'
          }],
          //市场价格
          market_price: [{
            type: 'number',
            message: '必须为数字值'
          }],
          //销售价格
          sell_price: [{
            type: 'number',
            message: '必须为数字值'
          }]
        }
      };
    },
    created() {
      //当页面加载的时候获取商品的分类数组
      this.getCategoryList();
    },
    methods: {
      //上传相册图返回的数据
      fileUploaded(response, file, fileList) {
        this.ruleForm.fileList.push(response);
      },
      //上传封面图返回的数据
      imgUploaded(response, file, fileList) {
        this.ruleForm.imgList = [response];
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //提交时验证表单是否合法
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //此处表示表单合法
            var url = "/admin/goods/add/goods";
            this.$http.post(url, this.ruleForm).then(res => {
              if (res.data.status == 1) {
                this.$message.error(res.data.message);
                return;
              }
              this.$router.push({
                name: "goodslist"
              });
              this.$message.success("新增成功");
            }).catch(err => {
              this.$notify.error({
                title: '异常',
                message: 'Network Error'
              });
            });
            console.log(this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //获取商品分类数据
      getCategoryList() {
        var url = "/admin/category/getlist/goods";
        this.$http.get(url).then(res => {
          //错误判断
          if (res.data.status == 1) {
            this.$message({
              type: "info",
              message: res.data.message
            });
          }
          //正常
          this.categoryList = res.data.message;
        }).catch(err => {
          this.$notify.error({
            title: '获取类别异常',
            message: 'Network Error'
          });
        });
      }
    }
  };

</script>
<style scoped>
  .el-boeder {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
  }

  .el-label {
    padding-left: 10px;
  }

</style>
