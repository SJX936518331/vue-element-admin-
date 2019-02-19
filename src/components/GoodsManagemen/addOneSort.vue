<template>
  <div class="user-container">
    <div class="user-box">
      <div class="box-center fl">
        <div class="tips">
          <span>{{c17}}</span>
          <span>{{c15}}</span>
          <span>{{c16}}</span>
        </div>
        <div class="cont fl">
          <el-form :model="formItem" ref="formItem" :rules="ruleInline" :label-width="label_width">
            <el-form-item label="分类名称" prop="sortName">
              <div class="input">
                <el-input
                  style="width:70%;"
                  type="text"
                  name="sortName"
                  v-model="formItem.sortName"
                />
              </div>
            </el-form-item>
            <el-form-item prop="listPic" label="分类图片">
              <div class="input">
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
            <el-form-item label="佣金比例" prop="commissionRate">
              <div class="input">
                <el-input
                  style="width:70%;"
                  type="text"
                  name="commissionRate"
                  v-model="formItem.commissionRate"
                  @keyup.native="number"
                />
              </div>
            </el-form-item>
            <!-- <el-form-item label="设置" prop="setIndexShow">
              <div class="align">
                <div class="align_">
                  <el-checkbox v-model="isShow">{{this.setIndexShow}}</el-checkbox>
                </div>
              </div>
            </el-form-item>-->
            <div class="btn-1" @click="addData">{{submit}}</div>
          </el-form>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {Form, Input, Button, FormItem} from "antd";
import pagination from "@/components/Page";
import $ from "jquery";
import UploadList from "@/components/UploadList/uploadList";
export default {
  name: "user",
  data() {
    const validateSortName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入分类名"));
      } else {
        callback();
      }
    };
    const validateCommissionRate = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入佣金比例"));
      } else {
        callback();
      }
    };
    const validateListPic = (rule, value, callback) => {};
    return {
      label_width: "80",
      sortName: "分类名称",
      submit: "提交",
      sortImg: "分类图片",
      ImigUrl: "",
      setIndexShow: "是否首页显示",
      isShow: false,
      commissionRate: "佣金比例",
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
      c15: "商品分类/",
      c16: "添加一级分类",
      c17: "商品管理/",
      permissionBeans: [
        {
          id: 1,
          name: "是否首页显示",
          checked: false
        }
      ],
      ruleInline: {
        sortName: [
          { required: true, trigger: "blur", validator: validateSortName }
        ],
        commissionRate: [
          { required: true, trigger: "blur", validator: validateCommissionRate }
        ],
        listPic: [
          { required: true, trigger: "blur", validator: validateListPic }
        ]
      },
      formItem: {
        sortName: "",
        sortImg: "",
        commissionRate: "",
        setIndexShow: "",
        listPic: ""
      }
    };
  },
  components: {
    UploadList
  },
  methods: {
    number() {
      this.formItem.commissionRate = this.formItem.commissionRate.replace(
        /[^\.\d]/g,
        ""
      );
      this.formItem.commissionRate = this.formItem.commissionRate.replace(
        ".",
        ""
      );
    },
    getListPic(pic) {
      this.formItem.listPic = pic;
    },
    showCk() {
      $("#fileToUpload").click();
    },
    showPage() {
      $("#cont").css("display", "block");
      var imgUrl = window.localStorage.getItem("imgUrl");
      $(".showImg").attr("src", imgUrl);
    },
    getObjectURL(file) {
      var url = null;
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    changeimage(event) {
      // 调用上面的方法
      var objurl = this.getObjectURL(event.target.files[0]);
      this.ImigUrl = objurl;
      window.localStorage.setItem("imgUrl", this.ImigUrl);
      console.log(objurl);
      $("#myimg").attr("src", objurl);
    },
    addData() {
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/productCategory/add",
          "commission=" +
            this.formItem.commissionRate +
            "&image=" +
            this.formItem.listPic +
            "&show=" +
            this.isShow +
            "&name=" +
            this.formItem.sortName +
            ""
        )
        .then(
          response => {
            if (response.data.errmsg == null) {
              this.$notify.success("添加一级分类成功");
              this.$router.push({ path: "/goodsManage/goodsSort" });
            } else {
              this.$Message.error("添加一级分类失败");
            }

            console.log("请求成功", response.data);
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      // $(".el-scrollbar__view .router-link-active").hide();
    }
  },
  created() {
    // $(".el-scrollbar__view .router-link-active").show();
  }
};
</script>

<style type="text/css">
.el-form-item__content .el-form-item__error {
  left: 443px;
}
.avatar-uploader .el-upload {
  position: unset;
  top: 0;
  margin-left: 1px;
}
</style>
<style type="text/css" scoped>
* {
  padding: 0;
  margin: 0;
}

.align {
  padding: 0px 0px 0px 42px;
  /* margin: 20px 0px 20px 0px; */
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

.input span {
  color: #333333;
  font-weight: bold;
}

.input span {
  margin-right: 9px;
  display: inline-block;
  vertical-align: top;
  margin-top: 2px;
}

.input el-input {
  border: 1px solid #a9a9a9;
  height: 40px;
}

.input el-input:focus {
  border-radius: 2px;
  outline: none;
  border: 2px solid #39a4f9;
}

.img {
}

.cont {
  width: 40%;
}

.cont .btn-1 {
  display: inline-block;
  padding: 12px 30px;
  background: #00cc00;
  color: #fff;
  border-radius: 2px;
  margin-left: 17.7%;
  margin-top: 10px;
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
