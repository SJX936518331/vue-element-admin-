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
            <el-form-item prop="nextSort">
              <div class="input fl">
                <span>{{nextSort}}</span>
              </div>
              <div class="input fl">{{nextSortVal}}</div>
            </el-form-item>
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
              <div class="input input2 fl">
                <uploadList
                  style="display:inline-block;"
                  v-model="formItem.listPic"
                  :max-length="1"
                  label="分类图片"
                  prop="listPic"
                  @getListPic="getListPic"
                />
              </div>
            </el-form-item>
            <el-form-item prop="bind_cate">
              <div class="input fl">
                <span>{{bind_cate_txt}}</span>
              </div>
              <div class="input input1 fl">
                <el-checkbox
                  class="ml"
                  v-for="item in bind_cate"
                  :key="item.index"
                  v-model="item.check"
                  @change="changeStatus(item.id,item.check)"
                >{{item.name}}</el-checkbox>
              </div>
            </el-form-item>
            <el-form-item prop="set">
              <div class="input fl">
                <span>{{set_txt}}</span>
              </div>
              <div class="input3 fl">
                <el-checkbox v-model="isShow">{{set_val}}</el-checkbox>
              </div>
            </el-form-item>
            <el-button
              class="btn-1"
              type="success"
              style="padding:12px 30px;"
              @click="request"
            >{{submit}}</el-button>
            <el-button type="primary" style="padding:12px 30px;" @click="turn">{{return_txt}}</el-button>
          </el-form>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/Page";
import UploadList from "@/components/UploadList/uploadList";
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
      arr1: [],
      label_width: "80",
      return_txt: "返回",
      set_txt: "设置",
      set_val: "是否首页展示",
      bind_cate_txt: "绑定商家分类",
      bind_cate: [],
      nextSort: "一级分类名称:",
      nextSortVal: "",
      sortName: "二级分类名称:",
      submit: "提交",
      sortImg: "图标",
      ImigUrl: "",
      isShow: false,
      is_show: false,
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
      c16: "添加用户端商品二级分类",
      c17: "商品管理/",
      ruleInline: {
        sortName: [
          { required: true, trigger: "blur", validator: validateSortName }
        ]
      },
      formItem: {
        sortName: "",
        sortImg: "",
        nextSortVal: "",
        listPic: ""
      }
    };
  },
  components: {
    UploadList
  },
  methods: {
    turn() {
      this.$router.push({
        path: "/goodsManage/memberProductCategory"
      });
    },
    getListPic(pic) {
      this.formItem.listPic = pic;
    },
    changeStatus(id, check) {
      if (check == true) {
        this.arr1.push({ id: id });
      }
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
            //  console.log(this.bind_cate);
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    request() {
      let parentId = this.$route.params.parentId;
      let idArr = [];
      for (var i = 0; i < this.arr1.length; i++) {
        idArr.push(this.arr1[i].id);
      }
      console.log("idArr", idArr);

      // let productCategoryId = JSON.stringify([parentId]);
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/memberProductCategory/add",
          // "&image=" +
          // this.ImigUrl +
          "&isShow=" +
            this.isShow +
            "&name=" +
            this.formItem.sortName +
            "&icon=" +
            this.formItem.listPic +
            "&productCategoryId=" +
            idArr +
            "&parentId=" +
            parentId +
            ""
        )
        .then(
          response => {
            if (response.data.errmsg == null) {
              this.$notify.success("添加用户商品二级分类成功");
              this.$router.push({ path: "/goodsManage/memberProductCategory" });
            } else {
              this.$Message.error("添加用户商品二级分类失败");
            }

            console.log("请求成功", response.data);
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    }
  },
  created: function() {
    this.nextSortVal = this.$route.params.name;
    this.getProductCategoryData();
  }
};
</script>
<style>
.ml {
  margin-left: 30px;
}
.avatar-uploader .el-upload {
  position: unset;
  top: 0;
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
  padding: 8px 0px 10px 19px;
  width: 80%;
  text-align: left;
}

.input2 {
  padding: 8px 0px 10px 100px;
  width: 80%;
}

.input3 {
  padding: 8px 0px 10px 103px;
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

.cont {
  width: 100%;
}

.cont .btn-1 {
  display: inline-block;
  padding: 12px 30px;
  background: #00cc00;
  color: #fff;
  border-radius: 2px;
  margin-left: 21%;
  margin-top: 10px;
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
