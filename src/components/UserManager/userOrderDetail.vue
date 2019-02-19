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
          <div class="info">
            <div>{{order_status}}</div>
            <div>发货时间：{{c_time}}</div>
            <div class="color">{{order_type}}</div>
            <div>订单号：{{order_id}}</div>
          </div>
          <div class="table-box">
            <div class="t1">
              <div class="title">{{title1}}</div>
              <div class="table">
                <el-table
                  :data="list1"
                  border
                  style="width: 100%"
                  @select="selectionChange"
                  ref="table"
                >
                  <el-table-column prop="contact" label="姓名" width="80" align="center"></el-table-column>
                  <el-table-column prop="phone" label="电话" width="140" align="center"></el-table-column>
                  <el-table-column prop="area" label="地址" width="300" align="center"></el-table-column>
                </el-table>
              </div>
            </div>
            <div class="t2">
              <div class="title">{{title2}}</div>
              <div class="table">
                <el-table
                  :data="list2"
                  border
                  style="width: 100%"
                  @select="selectionChange"
                  ref="table"
                >
                  <el-table-column prop="sn" label="订单号" width="200" align="center"></el-table-column>
                  <el-table-column prop="totalFee" label="订单总金额" width="140" align="center"></el-table-column>
                  <el-table-column prop="discount" label="优惠金额" width="100" align="center"></el-table-column>
                  <el-table-column prop="postage" label="快递费用" width="100" align="center"></el-table-column>
                  <el-table-column prop="actualPay" label="实付金额" width="100" align="center"></el-table-column>
                  <el-table-column prop="ecoin" label="使用生豆" width="100" align="center"></el-table-column>
                  <el-table-column prop="payDate" label="支付时间" width="100" align="center"></el-table-column>
                </el-table>
              </div>
            </div>
            <div class="t3">
              <div class="title">{{title3}}</div>
              <div class="table">
                <el-table
                  :data="list3"
                  border
                  style="width: 100%"
                  @select="selectionChange"
                  ref="table"
                >
                  <el-table-column prop="expressName" label="快递" width="100" align="center"></el-table-column>
                  <el-table-column prop="expressNumber" label="单号" width="150" align="center"></el-table-column>
                  <el-table-column prop="orderStatus" label="进度" width="200" align="center"></el-table-column>
                </el-table>
              </div>
            </div>
            <div class="t4">
              <div class="title">{{title4}}</div>
              <div class="table">
                <el-table
                  :data="list4"
                  border
                  style="width: 100%"
                  @select="selectionChange"
                  ref="table"
                >
                  <el-table-column label="图片" width="100" align="center">
                    <template slot-scope="scope">
                      <img width="80px" height="80px" :src="scope.row.image" alt>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productName" label="商品名" width="150" align="center"></el-table-column>
                  <el-table-column prop="price" label="单价" width="150" align="center"></el-table-column>
                  <el-table-column prop="specifications" label="规格" width="100" align="center"></el-table-column>
                  <el-table-column prop="count" label="数量" width="50" align="center"></el-table-column>
                  <el-table-column prop="totleCount" label="总金额" width="150" align="center"></el-table-column>
                  <el-table-column prop="type" label="使用优惠券" width="100" align="center"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div style="margin-bottom: 150px;" class="return" @click="turn">{{returnHome}}</div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "userShopCart",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    const validateIsVip = (rule, value, callback) => {};

    const validatePhone = (rule, value, callback) => {
      if (value.length > 11) {
        callback(new Error("电话格式不对"));
      } else {
        if (value == "") {
          callback(new Error("电话号码不能为空"));
        }
      }
    };
    return {
      order_type: "",
      order_status: "",
      c_time: "",
      order_id: "",
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
      c15: "订单管理/",
      c16: "详情",
      c17: "用户管理/",
      title1: "用户信息",
      title2: "订单信息",
      title3: "物流信息",
      title4: "订单商品详情",
      userName: "姓名",
      refresh: "刷新",
      phoneNum: "电话",
      isVip: [],
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      returnHome: "返回",
      list1: [],
      list2: [],
      list3: [],
      list4: []
    };
  },
  components: {},
  methods: {
    selectionChange: function(val, row) {
      vm.selectedObj = val;
      alert(row.cust_id); // 注：这里的val是一个数组的格式，row是选中的数据对象的格式，可以点出属性取值，符合我们的要求
      // 传递两个参数的目的是，如果这里你只传递一个那么默认为val，是不是有点坑。。。
      if (
        $(":checkbox").is(":checked") &&
        vm.selectedIds.indexOf(row.cust_id) == -1
      ) {
        vm.selectedIds.push(row.cust_id);
      } else {
        var ind = vm.selectedIds.indexOf(row.cust_id);
        alert("ind" + ind);
        vm.selectedIds.splice(ind, 1);
      }
    },
    showDetail() {
      this.$router.push("/userOrder/edit");
    },
    turn() {
      this.$router.push("/user/userOrder");
      $(".el-scrollbar__view .active").hide();
    },
    request() {
      let ordersId = this.$route.params.ordersId;
      let sn = this.$route.params.sn;
      this.$http
        .get(
          "" + this.URL.url + "/api/admin/orders/edit?ordersId=" + ordersId + ""
        )
        .then(
          response => {
            this.$Message.success("查看用户订单详情成功");
            console.log("请求成功", response.data);
            this.c_time = response.data.data.sendDate;
            this.order_id = sn;
            this.order_type = response.data.data.type;
            this.order_status = response.data.data.orderStatus;
            this.list1.push({
              contact: response.data.data.contact,
              phone: response.data.data.phone,
              area: response.data.data.area + response.data.data.specificAddress
            });
            var totalFee =
              response.data.data.ecoin == 0
                ? "￥" + response.data.data.totalFee
                : "￥" +
                  response.data.data.totalFee +
                  "+" +
                  response.data.data.ecoin +
                  "生豆";
            this.list2.push({
              sn: response.data.data.sn,
              totalFee: totalFee,
              discount: "￥" + response.data.data.discount,
              postage: "￥" + response.data.data.postage,
              actualPay: "￥" + response.data.data.actualPay,
              ecoin: response.data.data.ecoin + "生豆",
              payDate: response.data.data.payDate
            });
            this.list3.push({
              expressName: response.data.data.expressName,
              expressNumber: response.data.data.expressNumber,
              orderStatus: response.data.data.orderStatus
            });
            var dataArr = response.data.data.items;
            for (var i = 0; i < dataArr.length; i++) {
              var totleCount =
                dataArr[i].ecoin == 0
                  ? "￥" + dataArr[i].price
                  : "￥" + dataArr[i].price + "+" + dataArr[i].ecoin + "生豆";
              this.list4.push({
                image: dataArr[i].image,
                productName: dataArr[i].productName,
                price: "￥" + dataArr[i].price,
                specifications: dataArr[i].specifications,
                count: dataArr[i].count,
                totleCount: totleCount,
                type: dataArr[i].type == "NormalPay" ? "" : dataArr[i].type
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
  created: function() {
    this.request();
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

.table-box .t3 {
  width: 100%;
}

.table-box .t4 {
  width: 100%;
}

.table-box .t1 .title,
.table-box .t2 .title,
.table-box .t3 .title,
.table-box .t4 .title {
  padding: 15px 10px 15px 20px;
  background: #f2f2f2;
}

.table-box .t1 .title,
.table-box .t2 .title,
.table-box .t3 .title,
.table-box .t4 .title {
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
