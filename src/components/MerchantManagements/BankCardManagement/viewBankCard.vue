<template>
  <div class="user-container">
    <!-- <div class="user_head">
      <img class="logo" src="@/assets/404_images/404.png" alt>
      <div class="hd">
        <ul>
          <li class="fl">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c1}}</div>
          </li>
          <li class="fl">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c2}}</div>
          </li>
          <li class="fl">
            <div class="logo_ choose fl">{{txt}}</div>
            <div class="text text_chose fl">{{c3}}</div>
          </li>
          <li class="fl">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c4}}</div>
          </li>
          <li class="fl">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c5}}</div>
          </li>
          <li class="fl">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c6}}</div>
          </li>
          <li class="fl">
            <svg-icon class="logo_admin fl" icon-class="admin"/>
            <div class="text fl">{{c7}}</div>
          </li>
          <li class="fl">
            <div class="text fl">{{c8}}</div>
            <svg-icon class="logo_admin fl" icon-class="logout"/>
          </li>
          <div class="clear"></div>
        </ul>
      </div>
    </div>-->
    <div class="user-box">
      <!-- <div class="user_aside fl">
        <ul>
          <li class="border-first">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c9}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c10}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c11}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c12}}</div>
            <div class="ps"></div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c13}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c14}}</div>
            <div class="clear"></div>
          </li>
        </ul>
      </div>-->
      <div class="box-center fl">
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
        </div>
        <div class="foot">
          <div class="btn" @click="turn">{{btnTxt}}</div>
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
      reason: "",
      btnTxt: "返回",
      btnTxt1: "拒绝",
      btnTxt2: "返回",
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
      c15: "商家银行卡管理/",
      c16: "编辑商家银行卡",
      c17: "商家管理/",
      c18: "商家",
      c19: "林夕",
      c20: "联系电话",
      c21: "13800138000",
      c22: "银行",
      c23: "中国银行",
      c24: "银行卡号",
      c25: "6582145698545215",
      c26: "所属支行",
      c27: "广州市天河区珠江新城支行",
      c28: "绑定电话",
      c29: "13800138000",
      list1: [],
      list2: []
    };
  },
  components: {},
  methods: {
    turn() {
      this.$router.push("/storeManagement/bankCardManagement");
    },
    getData() {
      var id = this.$route.params.id;
      this.$http
        .get(
          "" + this.URL.url + "/api/admin/MerchantBankCard/info?id=" + id + ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("查看商家银行卡信息成功");
              console.log("数据", response.data.data);
              console.log("数据", id);
              this.c19 = response.data.data.userName;
              this.c21 = response.data.data.phone;
              this.c23 = response.data.data.bank;
              this.c25 = response.data.data.cardNumber;
              this.c27 = response.data.data.subBranch;
              this.c29 = response.data.data.bindPhone;
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      // console.log(this.dataArr_.username);
    }
  },
  created: function() {
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

.btn {
  width: 10%;
  margin-top: 20px;
  padding: 12px 30px;
  background: #fff;
  color: #666;
  font-weight: bold;
  border: 1px solid #565656;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
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
