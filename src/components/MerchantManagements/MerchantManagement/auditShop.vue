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
              <!-- <img class="c2 img" src="@/assets/404_images/404.png" alt="">-->
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
              <span class="c2">{{c27}}</span>
            </div>
            <!--    <div style="display: inline-block;text-align: left;width: 60%;">
              <img class="c2 img" src="@/assets/404_images/404.png" alt="">
            </div>-->
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c28}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c29}}</span>
            </div>
            <!--    <div style="display: inline-block;text-align: left;width: 60%;">
              <img class="c2 img" src="@/assets/404_images/404.png" alt="">
            </div>-->
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c30}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <img class="c2 img" :src="logo" alt>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c31}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c32}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c33}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c34}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c35}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c36}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c37}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c38}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c39}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c40}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c41}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c42}}</span>
            </div>
          </div>
        </div>
        <div class="foot">
          <el-button style="margin-bottom:150px;" type="primary" round @click="pass">{{btnTxt}}</el-button>
          <el-button style="margin-bottom:150px;" type="danger" round @click="unPass">{{btnTxt1}}</el-button>
          <el-button style="margin-bottom:150px;" round @click="turn">{{btnTxt2}}</el-button>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
export default {
  name: "userInfoDetail",
  data() {
    return {
      logo: "",
      btnTxt: "通过",
      btnTxt1: "不通过",
      btnTxt2: "取消",
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
      c15: "店铺管理/",
      c16: "审核店铺",
      c17: "商家管理/",
      c18: "店铺编号",
      c19: "",
      c20: "店铺名称",
      c21: "",
      c22: "商家",
      c23: "",
      c24: "店铺认证",
      c25: "",
      c26: "主营类目",
      c27: "",
      c28: "佣金提成",
      c29: "",
      c30: "店铺LOGO",
      c31: "店铺详情",
      c32: "",
      c33: "入驻人电话",
      c34: "",
      c35: "入驻人邮箱",
      c36: "",
      c37: "紧急联系人",
      c38: "",
      c39: "紧急联系人电话",
      c40: "",
      c41: "审核状态",
      c42: "",
      list1: [],
      list2: []
    };
  },
  components: {},
  methods: {
    turn() {
      this.$router.push("/storeManagement/merchantManagement");
    },
    getData() {
      var id = this.$route.params.id;
      this.$http
        .get("" + this.URL.url + "/api/admin/shop/info?id=" + id + "")
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("查看店铺管理信息成功");
              console.log("数据", response.data.data);
              this.c19 = response.data.data.code;
              this.c21 = response.data.data.shopName;
              this.c23 = response.data.data.merchantName;
              this.c25 = response.data.data.identification;
              this.c27 = response.data.data.categoryName;
              this.c29 = response.data.data.commission + "%";
              this.c32 = response.data.data.detail;
              this.c34 = response.data.data.phone;
              this.c36 = response.data.data.mail;
              this.c38 = response.data.data.emergencyName;
              this.c40 = response.data.data.emergencyPhone;
              this.c42 = response.data.data.auditStatus;
              this.logo = response.data.data.logo;
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      // console.log(this.dataArr_.username);
    },
    pass() {
      var id = this.$route.params.id;
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/shop/audit",
          "id=" + id + "&status=Entered"
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$notify.success("审核通过");
              this.turn();
              console.log("数据", response.data.data);
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    unPass() {
      var id = this.$route.params.id;
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/shop/audit",
          "id=" + id + "&status=UnPass"
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$notify.error("审核不通过");
              this.turn();
              console.log("数据", response.data.data);
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    }
  },
  created() {
    this.getData();
  }
};
</script>


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

.btn,
.btn-1,
.btn-2 {
  width: 10%;
  margin-top: 20px;
  padding: 12px 30px;
  background: #ff7c45;
  color: #1e1e1e;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-right: 20px;
}

.btn-1 {
  width: 12%;
  background: #ffff00;
}

.btn-2 {
  background: #ffffff;
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
