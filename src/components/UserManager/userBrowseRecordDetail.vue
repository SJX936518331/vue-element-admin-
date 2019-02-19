<template>
  <div class="user-container">
    <div class="user-box">
      <div class="box-center fl">
        <div class="tips">
          <span>{{c17}}</span>
          <span>{{c15}}</span>
          <span>{{c16}}</span>
        </div>
        <div class="cont">
          <div class="table-box">
            <div class="t1">
              <div class="title">{{title1}}</div>
              <div class="table">
                <el-table :data="list1" border style="width: 100%" ref="table">
                  <el-table-column prop="userName" label="账号" width="150" align="center"></el-table-column>
                  <el-table-column prop="isVip" label="是否会员" width="100" align="center"></el-table-column>
                  <el-table-column prop="nickName" label="默认姓名" width="150" align="center"></el-table-column>
                  <el-table-column prop="phone" label="默认电话" width="150" align="center"></el-table-column>
                  <el-table-column prop="address" label="默认收件地址" width="300" align="center"></el-table-column>
                </el-table>
              </div>
            </div>
            <div class="t2">
              <div class="title">{{title2}}</div>
              <div class="table">
                <el-table :data="list2" border style="width: 100%" ref="table">
                  <el-table-column prop="productName" label="商品名称" width="600" align="center"></el-table-column>
                  <el-table-column prop="price" label="金额" width="150" align="center"></el-table-column>
                  <el-table-column prop="viewDate" label="浏览时间" width="200" align="center"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div style="margin-bottom:150px;" class="return" @click="turn">{{returnHome}}</div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "user",
  data() {
    return {
      c1: "用户管理",
      c2: "商品管理",
      c3: "商家管理",
      c4: "营销管理",
      c5: "文章管理",
      txt: "！",
      c6: "系统",
      c7: "admin",
      c8: "资料",
      c9: "订单管理",
      c10: "用户购物车",
      c11: "用户收货地址",
      c12: "用户店铺收藏",
      c13: "用户商品收藏",
      c14: "用户浏览记录",
      c15: "用户浏览足迹/",
      c16: "查看详情",
      c17: "用户管理/",
      title1: "用户信息",
      title2: "浏览足迹",
      returnHome: "返回",
      list1: [],
      list2: []
    };
  },
  components: {},
  methods: {
    turn() {
      this.$router.push("/user/userBrowseRecord");
      $(".el-scrollbar__view .active").hide();
    },
    getData() {
      let memberId = this.$route.params.memberId;
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/member/historyDetail?memberId=" +
            memberId +
            ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            var address =
              response.data.data.defaultAddress == null
                ? null
                : response.data.data.defaultAddress.area +
                  response.data.data.defaultAddress.specificAddress;
            this.list1.push({
              userName: response.data.data.userName,
              isVip: response.data.data.isVip == true ? "是" : "否",
              nickName: response.data.data.nickName,
              phone: response.data.data.phone,
              address: address
            });

            var dataArr = response.data.data.historyProductVos;
            for (var i = 0; i < dataArr.length; i++) {
              var money =
                response.data.data.ecoin == 0
                  ? "￥" +
                    (Number.parseInt(dataArr[i].maxPrice) -
                      Number.parseInt(dataArr[i].minPrice))
                  : "￥" +
                    (Number.parseInt(dataArr[i].maxPrice) -
                      Number.parseInt(dataArr[i].minPrice)) +
                    "+" +
                    dataArr[i].ecoin +
                    "生豆";
              this.list2.push({
                productName: dataArr[i].productName,
                price: money,
                viewDate: dataArr[i].viewDate
              });
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      $(".el-scrollbar__view .active").show();
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
  padding: 20px 30px 20px 20px;
  margin-bottom: 20px;
}

.cont {
  font-size: 18px;
}

.cont div {
  margin: 20px 0px;
}

.color {
  color: #00cc99;
}

.table-box {
  font-family: "微软雅黑";
  font-size: 20px;
  color: #563e33;
  margin: 10px 0px 10px 0px;
}

.table-box .t1 {
  width: 100%;
}

.table-box .t2 {
  width: 100%;
}

.table-box .t1 .title,
.table-box .t2 .title {
  padding: 15px 10px 15px 20px;
  background: #f2f2f2;
  width: 50%;
}

.table {
  margin-top: 10px;
}

.return {
  width: 5%;
  padding: 12px 0px;
  text-align: center;
  background: #e9e9e9;
  color: #666;
  font-weight: bold;
  border-radius: 2px;
  border: 1px solid #ccc;
  cursor: pointer;
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
