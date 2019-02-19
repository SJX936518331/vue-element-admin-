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
              <div class="input fl" v-show=" this.dataArr.length >=1">
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
              <div
                class="input fl"
                v-show=" this.dataArr.length >=2"
                style="padding: 8px 0px 10px 10px;"
              >
                <el-form ref="baseForm" :model="baseForm" size class="base-form">
                  <uploadList1
                    v-model="baseForm.listPic1"
                    :max-length="1"
                    label="广告图片"
                    prop="listPic1"
                    @getListPic1="getListPic1"
                  />
                </el-form>
              </div>
              <div
                class="input fl"
                v-show=" this.dataArr.length >=3"
                style="padding: 8px 0px 10px 10px;"
              >
                <el-form ref="baseForm" :model="baseForm" size class="base-form">
                  <uploadList2
                    v-model="baseForm.listPic2"
                    :max-length="1"
                    label="广告图片"
                    prop="listPic2"
                    @getListPic2="getListPic2"
                  />
                </el-form>
              </div>
            </el-form-item>
            <el-form-item prop="link">
              <div class="input fl">
                <span>{{linkRate}}</span>
              </div>
              <div class="input input1 fl" v-show=" this.dataArr.length >=1">
                <input type="text" name="link" v-model="formItem.link">
              </div>
              <div
                class="input fl"
                v-show=" this.dataArr.length >=2"
                style="padding: 8px 0px 10px 10px;"
              >
                <input type="text" name="link" v-model="formItem.link1">
              </div>
              <div
                class="input fl"
                v-show=" this.dataArr.length >=3"
                style="padding: 8px 0px 10px 10px;"
              >
                <input type="text" name="link" v-model="formItem.link2">
              </div>
            </el-form-item>

            <el-form-item prop="setIndexShow">
              <div class="align fl">
                <span>{{setIndexShow}}</span>
              </div>
              <div class="align align1 fl">
                <input class="ck" type="checkbox" value="是否首页显示" v-model="isShow">
                <label for>是否显示</label>
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
import UploadList from "@/components/UploadListItem/uploadList6";
import UploadList1 from "@/components/UploadListItem/uploadList6_1";
import UploadList2 from "@/components/UploadListItem/uploadList6_2";
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
      dataArr: [],
      baseForm: {
        listPic: "",
        listPic1: "",
        listPic2: ""
      },
      sortName: "分类名称",
      submit: "提交",
      sortImg: "分类图片",
      ImigUrl: "src/assets/addImg.png",
      setIndexShow: "设置",
      isShow: false,
      linkRate: "链接",
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
      c16: "编辑一级分类",
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
        link1: "",
        link2: "",
        setIndexShow: ""
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
      this.baseForm.listPic = pic;
    },
    getListPic1(pic) {
      this.baseForm.listPic1 = pic;
    },
    getListPic2(pic) {
      this.baseForm.listPic2 = pic;
    },
    updateData() {
      var id = this.$route.params.id;
      this.dataArr = [];
      if (this.baseForm.listPic != "") {
        this.dataArr.push({
          image: this.baseForm.listPic,
          url: this.formItem.link
        });
      }
      if (this.baseForm.listPic1 != "") {
        this.dataArr.push({
          image: this.baseForm.listPic1,
          url: this.formItem.link1
        });
      }
      if (this.baseForm.listPic2 != "") {
        this.dataArr.push({
          image: this.baseForm.listPic2,
          url: this.formItem.link2
        });
      }
      var img_url = JSON.stringify(this.dataArr);
      console.log("dataArr", this.dataArr);
      this.$http
        .post(
          " " + this.URL.url + "/api/admin/memberProductCategory/update",
          "&id=" +
            id +
            "&icon=" +
            this.baseForm.listPic +
            "&isShow=" +
            this.isShow +
            "&name=" +
            this.formItem.sortName +
            // "&parentId=" +
            // parentId +
            "&imageUrl=" +
            img_url +
            ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$notify.success("更新用户商品一级分类成功");
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
              this.$Message.success("编辑用户商品一级分类成功");
              console.log("数据", response.data.data);
              // console.log("数据", id);
              this.formItem.sortName = response.data.data.name;
              this.isShow = response.data.data.show;
              var dataArr = response.data.data.imageUrl;
              this.dataArr = response.data.data.imageUrl;
              for (var i = 0; i < dataArr.length; i++) {
                if (i == 0) {
                  this.formItem.link = dataArr[i].url;
                  this.baseForm.listPic = dataArr[i].image;
                } else if (i == 1) {
                  this.formItem.link1 = dataArr[i].url;
                  this.baseForm.listPic1 = dataArr[i].image;
                } else if (i == 2) {
                  this.formItem.link2 = dataArr[i].url;
                  this.baseForm.listPic2 = dataArr[i].image;
                }
              }
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    }
  },
  created: function() {
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
.align1 {
  padding: 0px 0px 0px 78px;
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
  padding: 8px 0px 10px 68px;
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
  width: 40%;
}

.cont .btn-1 {
  display: inline-block;
  padding: 12px 30px;
  background: #00cc00;
  color: #fff;
  border-radius: 2px;
  margin-left: 31.7%;
  cursor: pointer;
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
