<template>
  <div class="user-container">
    <div class="user-box">
      <div class="box-center">
        <div class="tips">
          <span>{{c17}}</span>
          <span>{{c15}}</span>
          <span>{{c16}}</span>
        </div>
        <div class="cont">
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c18}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c19}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c20}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c1">{{c21}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c22}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c23}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c24}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c25}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c26}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <img class="c2 img" :src="img_src" alt>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c27}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <img class="c2 img" :src="identy_img" alt>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c28}}</span>
            </div>
            <div class="license_img" style="display: inline-block;text-align: left;width: 60%;"></div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c29}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c30}}</span>
            </div>
          </div>
          <div class="con" id="enable">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c31}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <el-checkbox v-model="isShow" @change="changeStatus">{{this.setIndexShow}}</el-checkbox>
            </div>
          </div>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <span>{{dialogTxt}}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="foot">
          <el-button id="return" style="display:none;" class="btn" @click="turn">{{btnTxt}}</el-button>
          <el-button id="submit" type="primary" class="bn" @click="submitData">{{submitTxt}}</el-button>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
  <!-- </div> -->
</template>
<script>
import $ from "jquery";
export default {
  name: "userInfoDetail",
  data() {
    return {
      isStop: false,
      submitTxt: "提交",

      dialogTxt:
        "如果禁用商家，该商家的店铺都为禁用状态，商家的所有商品都为下架状态",
      dialogVisible: false,
      isShow: false,
      imgStr: "",
      img_src: "",
      license_images: "",
      identy_img: "",
      c1: "用户管理",
      c2: "商品管理",
      c3: "商家管理",
      c4: "营销管理",
      c5: "文章管理",
      c5_: "用户信息",
      txt: "！",
      c6: "系统",
      c7: "admin",
      c8: "资料",
      c9: "商家管理",
      c10: "店铺管理",
      c11: "商家提现管理",
      c12: "商家银行卡管理",
      c13: "退货地址管理",
      c14: "配送模板管理",
      c15: "商家管理/",
      c16: "查看商家",
      c17: "商家管理/",
      c18: "姓名",
      c19: "",
      c20: "电话",
      c21: "",
      c22: "邮箱",
      c23: "",
      c24: "公司地址",
      c25: "",
      c26: "头像",
      c27: "身份证照片",
      c28: "营业执照副本",
      c29: "审核状态",
      c30: "",
      c31: "是否禁用",
      setIndexShow: "是",
      time: "最近登录时间",
      t_c: "",
      btnTxt: "返回",
      list1: [],
      list2: []
    };
  },
  components: {},
  methods: {
    submitData() {
      var id = this.$route.params.id;
      var show = !this.isShow;
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/merchant/update",
          "id=" +
            id +
            "&address=" +
            this.c25 +
            "&identityImage=" +
            this.identy_img +
            "&image=" +
            this.img_src +
            "&isEnable=" +
            show +
            "&licenseImages=" +
            this.license_images +
            "&mail=" +
            this.c23 +
            "&phone=" +
            this.c21 +
            "&userName=" +
            this.c19 +
            ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("商家管理信息更新成功");
              this.$router.push({ path: "/storeManagement/storeManagement" });
              $(".el-scrollbar__view .active").hide();
            } else {
              this.$Message.error("商家管理信息更新失败");
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    handleClose() {
      this.dialogVisible = false;
      this.isShow = false;
    },
    confirm() {
      this.dialogVisible = false;
    },

    cancel() {
      this.dialogVisible = false;
      this.isShow = false;
    },
    changeStatus(value) {
      if (value == true) {
        this.dialogVisible = true;
      }
    },
    turn() {
      this.$router.push("/storeManagement/storeManagement");
    },
    getData() {
      var id = this.$route.params.id;
      this.$http
        .post("" + this.URL.url + "/api/admin/merchant/edit", "id=" + id + "")
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("查看商家管理信息成功");
              console.log("数据", response.data.data);
              console.log("数据", id);
              this.c19 = response.data.userName;
              this.c21 = response.data.phone;
              this.c23 = response.data.mail;
              this.c25 = response.data.address;
              this.c30 =
                response.data.auditStatus == "Pass"
                  ? "通过"
                  : response.data.auditStatus == "UnPass"
                  ? "未通过"
                  : response.data.auditStatus == "Auditing"
                  ? "待审核"
                  : response.data.auditStatus;
              this.img_src = response.data.image;
              this.identy_img = response.data.identityImage;
              this.license_images = response.data.licenseImages;
              this.isStop = response.data.isEnable;
              this.isShow = !this.isStop;
              for (var i = 0; i < response.data.licenseImages.length; i++) {
                this.imgStr +=
                  '<img  class="c2 img" src="' +
                  response.data.licenseImages[i] +
                  '" alt/>';
              }
              $(".license_img").append(this.imgStr);
              if (response.data.auditStatus == "Pass") {
                $("#return").hide();
                $("#submit").show();
                $("#enable").show();
              } else {
                $("#return").show();
                $("#submit").hide();
                $("#enable").hide();
              }
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      $(".el-scrollbar__view .active").show();
    }
  },
  mounted: function() {
    this.getData();
  }
};
</script>
<style>
.cont .con .img {
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: middle;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin: 0px;
  margin-right: 10px;
}
</style>

<style type="text/css" scoped>
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

.cont {
  font-family: "微软雅黑";
  font-size: 18px;
  color: black;
}

.cont .con {
  margin-bottom: 20px;
}

.cont .con .c1 {
  height: 40px;
  line-height: 40px;
  margin: 5px 10px;
  font-weight: bold;
  text-align: left;
}

.cont .con .c2 {
  margin: 5px 10px;
}

.align {
  margin: 0px 10px;
}

.cont .con .img {
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: middle;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin: 0px;
}

.btn {
  /* width: 10%; */
  margin-top: 20px;
  /* padding: 12px 30px; */
  background: #fff;
  color: #1e1e1e;
  font-weight: bold;
  border: 1px solid #565656;
  border-radius: 2px;
}

.bn {
  margin-top: 20px;
  border-radius: 2px;
}

.foot {
  font-size: 18px;
  margin: 20px 0px 0px 10px;
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
