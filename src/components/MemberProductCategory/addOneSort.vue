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
            <el-form-item label="分类轮播图" prop="sortImg">
              <div class="input img">
                <img
                  style="vertical-align: middle; cursor: pointer;"
                  src="@/assets/add.png"
                  alt
                  @click="showCk"
                >
                <div id="img_show0" style="display:none;">
                  <div style="padding:30px 10px;border:1px solid #ccc;margin:30px 0px;">
                    <div style="margin-bottom:10px;">
                      <span>图片</span>
                      <el-button style="padding:10px 5px;" type="primary" @click="click_img">上传图片</el-button>
                      <img id="myimg" style="vertical-align: middle;" :src="formItem.listPic0" alt>
                      <img
                        id="remove"
                        style="vertical-align: middle;margin-left:10px;display:none;cursor: pointer;"
                        src="@/assets/remove.png"
                        alt
                        @click="remove"
                      >
                    </div>
                    <div>
                      <span>链接</span>
                      <el-input
                        style="width:70%;"
                        type="text"
                        name="sortName"
                        v-model="formItem.link0"
                      />
                    </div>
                  </div>
                </div>
                <div id="img_show1" style="display:none;">
                  <div style="padding:30px 10px;border:1px solid #ccc;margin:30px 0px;">
                    <div style="margin-bottom:10px;">
                      <span>图片</span>
                      <el-button style="padding:10px 5px;" type="primary" @click="click_img1">上传图片</el-button>
                      <img id="myimg1" style="vertical-align: middle;" :src="formItem.listPic1" alt>
                      <img
                        id="remove1"
                        style="vertical-align: middle;margin-left:10px;display:none;cursor: pointer;"
                        src="@/assets/remove.png"
                        alt
                        @click="remove1"
                      >
                    </div>
                    <div>
                      <span>链接</span>
                      <el-input
                        style="width:70%;"
                        type="text"
                        name="sortName"
                        v-model="formItem.link1"
                      />
                    </div>
                  </div>
                </div>
                <div id="img_show2" style="display:none;">
                  <div style="padding:30px 10px;border:1px solid #ccc;margin:30px 0px;">
                    <div style="margin-bottom:10px;">
                      <span>图片</span>
                      <el-button style="padding:10px 5px;" type="primary" @click="click_img2">上传图片</el-button>
                      <img id="myimg2" style="vertical-align: middle;" :src="formItem.listPic2" alt>
                      <img
                        id="remove2"
                        style="vertical-align: middle;margin-left:10px;display:none;cursor: pointer;"
                        src="@/assets/remove.png"
                        alt
                        @click="remove2"
                      >
                    </div>
                    <div>
                      <span>链接</span>
                      <el-input
                        style="width:70%;"
                        type="text"
                        name="sortName"
                        v-model="formItem.link2"
                      />
                    </div>
                  </div>
                </div>
                <div id="fileToUpload">
                  <UploadList
                    style="display:inline-block;"
                    v-model="formItem.listPic0"
                    :max-length="1"
                    label="分类图片"
                    prop="listPic"
                    @getListPic="getListPic"
                  />
                </div>
                <div id="fileToUpload1">
                  <UploadList1
                    style="display:inline-block;"
                    v-model="formItem.listPic1"
                    :max-length="1"
                    label="分类图片"
                    prop="listPic1"
                    @getListPic1="getListPic1"
                  />
                </div>
                <div id="fileToUpload2">
                  <UploadList2
                    style="display:inline-block;"
                    v-model="formItem.listPic2"
                    :max-length="1"
                    label="分类图片"
                    prop="listPic2"
                    @getListPic2="getListPic2"
                  />
                </div>
                <!-- <input
                  type="file"
                  name="fileToUpload"
                  id="fileToUpload"
                  @change="changeimage($event)"
                >-->
              </div>
            </el-form-item>
            <el-form-item label="设置" prop="setIndexShow">
              <div class="align">
                <div class="align_">
                  <el-checkbox v-model="isShow">{{this.setIndexShow}}</el-checkbox>
                </div>
              </div>
            </el-form-item>
            <div class="btn-1" @click="request">{{submit}}</div>
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
import UploadList from "@/components/UploadList/uploadList";
import UploadList1 from "@/components/UploadList/uploadList1";
import UploadList2 from "@/components/UploadList/uploadList2";
import $ from "jquery";
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
    const validateLink = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入链接"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: [],
      i: 0,
      uploadActionUrl: "" + this.URL.url + "/api/admin/productCategory/add",
      label_width: "80",
      sortName: "分类名称",
      submit: "提交",
      sortImg: "分类轮播图",
      setIndexShow: "是否显示",
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
      c15: "用户端商品分类/",
      c16: "添加用户端商品一级分类",
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
        link: [{ required: true, trigger: "blur", validator: validateLink }]
      },
      formItem: {
        sortName: "",
        sortImg: "",
        commissionRate: "",
        setIndexShow: "",
        link0: "",
        link1: "",
        link2: "",
        listPic0: "",
        listPic1: "",
        listPic2: ""
      }
    };
  },
  components: {
    UploadList,
    UploadList1,
    UploadList2
  },
  methods: {
    getListPic(pic) {
      this.formItem.listPic0 = pic;
      console.log("listPic0", this.formItem.listPic0);
      this.imageUrl.push(this.formItem.listPic0);
      $("#remove").show();
      $("#myimg").show();
    },
    getListPic1(pic) {
      this.formItem.listPic1 = pic;
      console.log("listPic1", this.formItem.listPic1);
      this.imageUrl.push(this.formItem.listPic1);
      $("#remove1").show();
      $("#myimg1").show();
    },
    getListPic2(pic) {
      this.formItem.listPic2 = pic;
      console.log("listPic2", this.formItem.listPic2);
      this.imageUrl.push(this.formItem.listPic2);
      $("#remove2").show();
      $("#myimg2").show();
    },
    remove() {
      $("#myimg").hide();
      if (this.formItem.listPic0 != "") {
        this.$Message.success("图片删除成功");
        this.formItem.listPic0 = "";
      } else {
        return;
      }
    },
    remove1() {
      $("#myimg1").hide();
      if (this.formItem.listPic1 != "") {
        this.$Message.success("图片删除成功");
        this.formItem.listPic1 = "";
      } else {
        return;
      }
    },
    remove2() {
      $("#myimg2").hide();
      if (this.formItem.listPic2 != "") {
        this.$Message.success("图片删除成功");
        this.formItem.listPic2 = "";
      } else {
        return;
      }
    },
    click_img() {
      console.log("为啥没反应");
      $("#fileToUpload .el-upload").click();
    },
    click_img1() {
      console.log("el-upload1");
      $("#fileToUpload1 .el-upload").click();
    },
    click_img2() {
      console.log("el-upload2");
      $("#fileToUpload2 .el-upload").click();
    },
    showCk() {
      $("#img_show" + this.i + "").css("display", "block");
      this.i++;
    },
    request() {
      var igArr = [];
      if (this.formItem.listPic0 != "") {
        igArr.push({ image: this.formItem.listPic0, url: this.formItem.link0 });
      }
      if (this.formItem.listPic1 != "") {
        igArr.push({ image: this.formItem.listPic1, url: this.formItem.link1 });
      }
      if (this.formItem.listPic2 != "") {
        igArr.push({ image: this.formItem.listPic2, url: this.formItem.link2 });
      }
      var s_imgUrl = JSON.stringify(igArr);
      var show = this.isShow;
      console.log("imageUrl", igArr);
      this.$http
        .post(
          " " + this.URL.url + "/api/admin/memberProductCategory/add",
          "&imageUrl=" +
            s_imgUrl +
            "&isShow=" +
            show +
            "&name=" +
            this.formItem.sortName +
            "&icon=" +
            this.formItem.listPic0 +
            ""
        )
        .then(
          response => {
            if (response.data.errmsg == null) {
              this.$notify.success("添加用户商品一级分类成功");
              this.$router.push({ path: "/goodsManage/memberProductCategory" });
            } else {
              this.$Message.error("添加用户商品一级分类失败");
            }
            console.log("请求成功", response.data);
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    }
  }
};
</script>
<style type="text/css">
.el-form-item__content .el-form-item__error {
  left: 203px;
}
#myimg {
  margin-left: 20px;
}
.el-input_inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 36px;
  line-height: 36px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
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
  display: none;
  margin: 30px 0px;
}

#fileToUpload1 {
  display: none;
  margin: 30px 0px;
}
#fileToUpload2 {
  display: none;
  margin: 30px 0px;
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
