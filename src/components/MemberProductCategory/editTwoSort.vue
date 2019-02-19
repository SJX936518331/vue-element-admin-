<template>
  <div class="user-container">
    <div class="user-box">
      <div class="box-center">
        <div class="tips">
          <span>{{c17}}</span>
          <span>{{c15}}</span>
          <span>{{c16}}</span>
        </div>
        <div class="cont fl">
          <el-form :model="formItem" ref="formItem" :rules="ruleInline" :label-width="label_width">
            <el-form-item prop="sortName">
              <div class="input fl">
                <span>{{sortName}}</span>
              </div>
              <div class="input fl">
                <input type="text" name="sortName" v-model="formItem.sortName">
              </div>
            </el-form-item>
            <el-form-item prop="sortImg">
              <div class="input fl">
                <span>{{sortImg}}</span>
              </div>
              <div class="input fl">
                <el-form ref="baseForm" :model="baseForm" size class="base-form">
                  <uploadList
                    v-model="baseForm.listPic"
                    :max-length="1"
                    label="广告图片"
                    prop="listPic"
                    @getListPic="getListPic"
                  />
                </el-form>
              </div>
            </el-form-item>
            <el-form-item prop="mb_sort">
              <div class="input fl">
                <span>{{mpSort}}</span>
              </div>
              <div class="input input1 fl">
                <el-checkbox
                  class="ml"
                  v-for="(item,index) in bind_cate"
                  :key="index"
                  v-model="item.check"
                  @change="changeStatus(item.id,item.check,item.index)"
                >{{item.name}}</el-checkbox>
              </div>
            </el-form-item>
            <el-form-item prop="setIndexShow">
              <div class="align fl">
                <span>{{setIndexShow}}</span>
              </div>
              <div class="align align1 fl">
                <input class="ck" type="checkbox" value="是否首页显示" v-model="isShow">
                <label for>是否首页显示</label>
              </div>
            </el-form-item>
            <div class="btn-1" @click="updateData">{{submit}}</div>
          </el-form>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/Page";
import UploadList from "@/components/UploadListItem/uploadList7";
import $ from "jquery";
export default {
  name: "user",
  data() {
    const validateSortName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      check: false,
      baseForm: {
        listPic: ""
      },
      arr1: [],
      bind_cate: [],
      label_width: "80",
      sortName: "分类名称",
      submit: "提交",
      sortImg: "分类图片",
      ImigUrl: "src/assets/addImg.png",
      setIndexShow: "设置",
      isShow: false,
      mpSort: "商家商品分类",
      changeImg: "更换图片",
      c1: "用户管理",
      c2: "商品管理",
      c3: "商家管理",
      c4: "营销管理",
      c5: "文章管理",
      c5_: "商品分类",
      txt: "！",
      c6: "系统",
      c7: "admin",
      c8: "资料",
      c9: "商品规格",
      c10: "商品列表",
      c11: "商品评论",
      c15: "用户端商品分类/",
      c16: "编辑用户商品二级分类",
      c17: "商品管理/",
      sortName: "分类名称",
      ruleInline: {
        sortName: [
          { required: true, trigger: "blur", validator: validateSortName }
        ]
      },
      formItem: {
        sortName: "",
        sortImg: "",
        link: "",
        setIndexShow: ""
      }
    };
  },
  components: {
    UploadList
  },
  methods: {
    changeStatus(value, check, index) {
      if (check == false) {
        this.$confirm("请尽量不要取消反选");
        var ix =
          index % this.arr1.length == 0
            ? Number.parseInt(index / this.arr1.length)
            : Number.parseInt(index / this.arr1.length) + 1;
        var ixs = ix == 0 ? this.arr1.length - 1 : ix;
        this.arr1.splice(ixs, 1);
        console.log("当前元素的值", value);
        console.log("原始index", index);
        console.log("index", ixs);
      } else {
        this.arr1.push(value);
      }
      console.log("改变了", this.arr1);
    },
    getListPic(pic) {
      this.baseForm.listPic = pic;
    },

    getProductCategoryData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/memberProductCategory/getAllCategoryLv3"
        )
        .then(
          response => {
            this.$Message.success("获取商家分类成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data;
            for (var i = 0; i < dataArr.length; i++) {
              this.bind_cate.push({
                name: dataArr[i].name,
                id: dataArr[i].id,
                index: i,
                check: false
              });
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },

    updateData() {
      var id = this.$route.params.id;
      var parentId = this.$route.params.parentId;
      console.log("idArr", this.arr1);
      this.$http
        .post(
          " " + this.URL.url + "/api/admin/memberProductCategory/update",
          "&id=" +
            id +
            "&isShow=" +
            this.isShow +
            "&name=" +
            this.formItem.sortName +
            "&icon=" +
            this.baseForm.listPic +
            "&productCategoryId=" +
            this.arr1 +
            "&parentId=" +
            parentId +
            ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$notify.success("更新用户端商品二级分类成功");
              this.$router.push({ path: "/goodsManage/memberProductCategory" });
              console.log("数据", response.data.data);
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    getData() {
      var id = this.$route.params.id;
      var isShow = this.$route.params.isShow;
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/memberProductCategory/edit?id=" +
            id +
            ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("编辑用户商品二级分类成功");
              console.log("数据", response.data.data);
              this.formItem.sortName = response.data.data.category.name;
              this.baseForm.listPic = response.data.data.category.icon;
              this.isShow = isShow;
              var categoryLv3 = response.data.data.category.categoryLv3;
              for (var i = 0; i < this.bind_cate.length; i++) {
                for (var j = 0; j < categoryLv3.length; j++) {
                  if (this.bind_cate[i].id == categoryLv3[j].id) {
                    this.bind_cate[i].check = true;
                    this.arr1.push(this.bind_cate[i].id);
                    console.log("有数据", this.arr1.length + "条数据");
                  }
                }
              }
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      // console.log(this.dataArr_.username);
    }
  },
  mounted: function() {
    this.getProductCategoryData();
    this.getData();
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  position: unset;
  top: 0;
  margin-left: 1px;
}
.ml {
  margin-left: 30px;
}
</style>

<style type="text/css" scoped>
* {
  padding: 0;
}

.align {
  padding: 0px 0px 0px 42px;
  margin: 20px 0px 20px 0px;
}
.align1 {
  padding: 0px 0px 0px 84px;
}

.align_ {
  display: inline-block;
  margin-left: 5%;
}

.user-container {
  font-family: "微软雅黑";
  padding: 0;
  margin: 0;
}

.user_head {
  width: 100%;
  margin: 25px 0px 40px 50px;
}

.logo {
  border: 2px solid #ccc;
  border-radius: 50%;
  width: 80px;
  height: 80px;
}

.hd {
  display: inline-block;
  word-break: break-all;
  overflow: auto;
}

.hd ul {
  list-style: none;
  padding: 0;
}

.hd ul li {
  margin-left: 26px;
}

.fl {
  float: left;
}

.logo_ {
  font-size: 20px;
  width: 40px;
  height: 40px;
  border: 1px solid #666;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  color: #666;
  background: #ddd;
  font-weight: bold;
}

.logo_admin {
  display: block;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  padding-left: 20px;
  padding-bottom: 5px;
}

.choose {
  border: 1px solid red;
  color: #fff;
  background: red;
}

.text {
  height: 40px;
  font-size: 18px;
  color: #666666;
  text-align: center;
  line-height: 40px;
  margin-left: 12px;
  font-weight: bold;
}

.text_chose {
  color: red;
}

.user_aside {
  width: 230px;
  font-size: 18px;
  color: #666;
}

.user_aside ul {
  width: 100%;
  list-style: none;
}

.user_aside ul li {
  padding: 20px 0px 20px 10px;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.border-first {
  position: relative;
  border-top: 1px solid #ccc;
}

.box-center {
  width: 100%;
  font-family: "微软雅黑";
  color: #333333;
  font-size: 18px;
  margin: 15px 0px 0px 50px;
}

.tips {
  width: 50%;
  background: #f2f2f2;
  padding: 20px 30px 20px 30px;
  margin-bottom: 20px;
}

.input {
  padding: 8px 0px 10px 42px;
}

.input1 {
  width: 90%;
  text-align: left;
  padding: 8px 0px 10px 19px;
}

.input span {
  color: #333333;
  font-weight: bold;
}

.input span {
  margin-right: 9px;
}

.input input {
  border: 1px solid #a9a9a9;
  height: 40px;
}

.input input:focus {
  border-radius: 2px;
  outline: none;
  border: 2px solid #39a4f9;
}

.img {
}

.cont {
  width: 100%;
}

.cont .btn-1 {
  display: inline-block;
  padding: 12px 30px;
  background: #00cc00;
  color: #fff;
  border-radius: 2px;
  margin-left: 31.7%;
  cursor: pointer;
  margin-bottom: 150px;
}

.btn-2 {
  padding: 5px 15px;
  background: #ffb800;
  border-radius: 2px;
  margin-left: 10px;
  cursor: pointer;
}

.ck {
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
}

#fileToUpload {
  /*visibility: hidden;*/
  display: none;
}

.ps {
  width: 5px;
  height: 45px;
  background: red;
  position: absolute;
  top: 20px;
  right: 0;
}

.clear {
  clear: both;
}
</style>
