<template>
  <div class="user-container">
    <!-- <div class="user_head">
      <img class="logo" src="@/assets/404_images/404.png" alt="">
      <div class="hd">
        <ul>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl ">{{c1}}</div>
          </li>
          <li class="fl">
            <div class="logo_ choose fl">{{txt}}</div>
            <div class="text fl text_chose">{{c2}}</div>
          </li>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c3}}</div>
          </li>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c4}}</div>
          </li>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c5}}</div>
          </li>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c6}}</div>
          </li>
          <li class="fl">
            <svg-icon class="logo_admin fl" icon-class="admin" />
            <div class="text fl">{{c7}}</div>
          </li>
          <li class="fl">
            <div class="text fl">{{c8}}</div>
            <svg-icon class="logo_admin fl" icon-class="logout" />
          </li>
          <div class="clear"></div>
        </ul>
      </div>
    </div>-->
    <div class="user-box">
      <!-- <div class="user_aside fl">
        <ul>
          <li class="border-first">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c5_}}</div>
            <div class="ps"></div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c10}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c11}}</div>
            <div class="clear"></div>
          </li>
        </ul>
      </div>-->
      <div class="box-center">
        <div class="tips">
          <span>{{c17}}</span>
          <span>{{c15}}</span>
          <span>{{c16}}</span>
        </div>
        <div class="cont fl">
          <el-form :model="formItem" ref="formItem" :rules="ruleInline" :label-width="label_width">
            <el-form-item prop="nextSort">
              <div class="input">
                <span>{{nextSort}}</span>
                <span style="font-weight: normal;">{{nextSortVal}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="sortName">
              <div class="input">
                <span>{{sortName}}</span>
                <input type="text" name="sortName" v-model="formItem.sortName">
              </div>
            </el-form-item>
            <el-form-item prop="listPic">
              <div class="input">
                <span>分类图片</span>
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
            <div class="btn-1" @click="request">{{submit}}</div>
          </el-form>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/Page";
import $ from "jquery";
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
      label_width: "80",
      nextSort: "上级分类",
      nextSortVal: "生鲜",
      sortName: "分类名称",
      submit: "提交",
      sortImg: "分类图片",
      ImigUrl: "",
      isShow: false,
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
      c16: "添加二级分类",
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
        nextSortVal: "生鲜",
        listPic: ""
      }
    };
  },
  components: {
    UploadList
  },
  methods: {
    getListPic(pic) {
      this.formItem.listPic = pic;
    },
    request() {
      let parentId = this.$route.params.parentId;
      let commissionRate = this.$route.params.commission;
      this.$http
        .post(
          " " + this.URL.url + "/api/admin/productCategory/add",
          "commission=" +
            commissionRate +
            "&image=" +
            this.formItem.listPic +
            "&show=" +
            this.isShow +
            "&name=" +
            this.formItem.sortName +
            "&parentId=" +
            parentId +
            ""
        )
        .then(
          response => {
            if (response.data.errmsg == null) {
              this.$notify.success("添加二级分类成功");
              this.$router.push({ path: "/goodsManage/goodsSort" });
            } else {
              this.$Message.error("添加二级分类失败");
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
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  position: unset;
  top: 0;
}
</style>

<style type="text/css" scoped>
* {
  padding: 0;
  margin: 0;
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

.input span {
  color: #333333;
  font-weight: bold;
}

.input span {
  font-size: 18px;
  margin-right: 9px;
  display: inline-block;
  vertical-align: top;
  margin-top: 2px;
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
  width: 40%;
}

.cont .btn-1 {
  display: inline-block;
  padding: 12px 30px;
  background: #00cc00;
  color: #fff;
  border-radius: 2px;
  margin-left: 30.7%;
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
