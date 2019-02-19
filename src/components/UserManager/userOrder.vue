<template>
  <div class="user-container">
    <div class="user-box">
      <div class="box-center fl">
        <div class="tips">
          <span>{{c17}}</span>
          <span>{{c15}}</span>
          <span>{{c16}}</span>
          <span>{{c18}}</span>
          <span>{{count}}</span>
        </div>
        <div class="cont">
          <el-form
            class="fl"
            :model="formItem"
            ref="formItem"
            :rules="ruleInline"
            :label-width="label_width"
          >
            <div class="btn fl" @click="refreshData">{{refresh}}</div>
            <el-form-item class="fl" prop="username">
              <div class="input fl">
                <span>{{userName}}</span>
                <el-input
                  style="width:75%;"
                  type="text"
                  name="username"
                  v-model="formItem.username"
                />
              </div>
            </el-form-item>
            <el-form-item class="fl" prop="phone">
              <div class="input fl" style="padding-left:20px; ">
                <span>{{phoneNum}}</span>
                <el-input style="width:75%;" type="text" name="phone" v-model="formItem.phone"/>
              </div>
            </el-form-item>
            <el-form-item class="fl" prop="isVip" style="padding: 8px 10px;">
              <span style="margin:0px 5px 0px 10px;">{{vip}}</span>
              <el-select
                style="width: 110px;"
                v-model="formItem.columeType"
                placeholder="请选择"
                @change="getVipValue"
              >
                <el-option
                  v-for="(item,index) in columeTypeArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <div class="btn-1 fl" @click="chooseData">{{choose}}</div>
          </el-form>
          <div class="clear"></div>
        </div>
        <div class="table">
          <el-table
            :data="custList"
            border
            style="width: 100%"
            @select="selectionChange"
            ref="table"
          >
            <el-table-column type="selection" width="70" align="center"></el-table-column>
            <el-table-column prop="sn" label="订单号" width="200" align="center"></el-table-column>
            <el-table-column prop="contact" label="收件人信息" width="250" align="center"></el-table-column>

            <el-table-column label="订单商品" width="300" align="center">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.items" :key="index">
                  <p>{{index+1}}.{{item.productName}},{{item.specifications}}克,X{{item.count}},￥{{item.price}}+{{item.ecoin}}生豆</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="订单金额" width="200" align="center">
              <template slot-scope="scope">
                <!-- <div v-for="(item,index) in scope.row.items" :key="index"> -->
                <p>
                  <span>订单金额:{{'￥'+scope.row.actualPay}}</span>
                  <span v-if="scope.row.ecoin != 0">{{'+'+scope.row.ecoin+'生豆'}}</span>
                </p>
                <p>优惠券优惠:{{'￥'+scope.row.discount}}</p>
                <p>运费:{{'￥'+scope.row.postage}}</p>
                <p>支付金额:{{'￥'+scope.row.actualPay}}</p>
                <p v-if="scope.row.ecoin != 0">使用生豆:{{scope.row.ecoin+'生豆'}}</p>
                <!-- </div> -->
              </template>
            </el-table-column>
            <el-table-column prop="createDate" label="下单时间" width="200" align="center"></el-table-column>
            <el-table-column label="付款状态" width="100" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.paymentStatus}}</div>
                <div>
                  <div style="color:#00CC99" v-if="scope.row.type== '普通订单'">{{scope.row.type}}</div>
                  <div style="color:#35A8FF" v-else>{{scope.row.type}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="orderStatus" label="发货状态" width="100" align="center"></el-table-column>
            <el-table-column prop="shopName" label="店铺名称" width="100" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <img
                  style="cursor: pointer;"
                  src="@/assets/search.png"
                  alt
                  @click="edit_redirc(scope.$index)"
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="foot">
          <v-pagination
            style="margin-bottom:150px;"
            :page-no="pageNo"
            :current-no.sync="currentPage"
            @pagination="paginationClick"
          ></v-pagination>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/Page";
export default {
  name: "user",
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (value == "") {
      //   callback(new Error("请输入姓名"));
      // } else {
      //   callback();
      // }
    };

    const validateIsVip = (rule, value, callback) => {};

    const validatePhone = (rule, value, callback) => {
      // if (value.length > 11) {
      //   callback(new Error("电话格式不对"));
      // } else {
      //   if (value == "") {
      //     callback(new Error("电话号码不能为空"));
      //   }
      // }
    };
    return {
      isvip: "",
      count: "",
      col_arr: [],
      label_width: "80",
      saveData: [],
      proChid: null,
      proArr_: [],
      pageNo: 1,
      currentPage: 1,
      // vip_v:'全部',
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
      c16: "列表/",
      c17: "用户管理/",
      c18: "总数",
      c19: "15",
      userName: "姓名",
      refresh: "刷新",
      phoneNum: "电话",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      columeTypeArr: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
        }
      ],
      custList: [],
      ruleInline: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }]
      },
      formItem: {
        username: "",
        phone: "",
        columeType: "全部"
      }
    };
  },
  components: {
    "v-pagination": pagination
  },
  methods: {
    getVipValue(value) {
      this.isvip = value == "是" ? true : value == "否" ? false : value;
    },
    chooseData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/orders/list?pageNum=" +
            this.currentPage +
            "&pageSize=20&isVip=" +
            this.isvip +
            "&userName="+this.formItem.username+""
        )
        .then(
          response => {
            this.$Message.success("筛选成功");
            console.log("请求成功", response.data);
            var custList_ = response.data.data.list;
            this.custList = [];
            var custList_ = response.data.data.list;
            for (var i = 0; i < custList_.length; i++) {
              var contact =
                custList_[i].contact +
                "\n" +
                custList_[i].phone +
                "\n" +
                custList_[i].area +
                custList_[i].specificAddress;
              this.custList.push({
                id: custList_[i].id,
                sn: custList_[i].sn,
                expressNumber: custList_[i].expressNumber,
                contact: contact,
                items: custList_[i].items,
                actualPay: custList_[i].actualPay,
                ecoin: custList_[i].ecoin,
                discount: custList_[i].discount,
                postage: custList_[i].postage,
                type: custList_[i].type,
                createDate: custList_[i].createDate,
                paymentStatus: custList_[i].paymentStatus,
                orderStatus: custList_[i].orderStatus,
                shopName: custList_[i].shopName
              });
              this.col_arr = this.custList[i].items;
            }
            this.currentPage = response.data.data.pageNum;
            this.count = this.custList.length;
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    refreshData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/orders/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            this.$Message.success("刷新成功");
            console.log("请求成功", response.data);
            var custList_ = response.data.data.list;
            this.custList = [];
            var custList_ = response.data.data.list;
            for (var i = 0; i < custList_.length; i++) {
              var contact =
                custList_[i].contact +
                "\n" +
                custList_[i].phone +
                "\n" +
                custList_[i].area +
                custList_[i].specificAddress;
              this.custList.push({
                id: custList_[i].id,
                sn: custList_[i].sn,
                expressNumber: custList_[i].expressNumber,
                contact: contact,
                items: custList_[i].items,
                actualPay: custList_[i].actualPay,
                ecoin: custList_[i].ecoin,
                discount: custList_[i].discount,
                postage: custList_[i].postage,
                type: custList_[i].type,
                createDate: custList_[i].createDate,
                paymentStatus: custList_[i].paymentStatus,
                orderStatus: custList_[i].orderStatus,
                shopName: custList_[i].shopName
              });
              this.col_arr = this.custList[i].items;
            }
            this.currentPage = response.data.data.pageNum;
            this.count = this.custList.length;
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
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
    paginationClick(current) {
      //响应点击后子组件当前页码
      this.currentPage = current;
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/orders/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            this.$Message.success("获取数据成功");
            console.log("请求成功", response.data);
            var custList_ = response.data.data.list;
            this.custList = [];
            for (var i = 0; i < custList_.length; i++) {
              var contact =
                custList_[i].contact +
                "\n" +
                custList_[i].phone +
                "\n" +
                custList_[i].area +
                custList_[i].specificAddress;
              this.custList.push({
                id: custList_[i].id,
                sn: custList_[i].sn,
                expressNumber: custList_[i].expressNumber,
                contact: contact,
                items: custList_[i].items,
                actualPay: custList_[i].actualPay,
                ecoin: custList_[i].ecoin,
                discount: custList_[i].discount,
                postage: custList_[i].postage,
                type: custList_[i].type,
                createDate: custList_[i].createDate,
                paymentStatus: custList_[i].paymentStatus,
                orderStatus: custList_[i].orderStatus,
                shopName: custList_[i].shopName
              });
              this.col_arr = this.custList[i].items;
            }
            this.currentPage = response.data.data.pageNum;
            this.count = this.custList.length;
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      console.log(current);
    },
    edit_redirc(index) {
      this.$router.push({
        path: "/userOrder/edit",
        name: "userOrderDetail",
        params: {
          ordersId: this.custList[index].id,
          sn: this.custList[index].sn
        }
      });
    },
    request() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/orders/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            // this.$Message.success('登录成功')
            console.log("请求成功", response.data);
            var custList_ = response.data.data.list;
            for (var i = 0; i < custList_.length; i++) {
              var contact =
                custList_[i].contact +
                "\n" +
                custList_[i].phone +
                "\n" +
                custList_[i].area +
                custList_[i].specificAddress;
              this.custList.push({
                id: custList_[i].id,
                sn: custList_[i].sn,
                expressNumber: custList_[i].expressNumber,
                contact: contact,
                items: custList_[i].items,
                actualPay: custList_[i].actualPay,
                ecoin: custList_[i].ecoin,
                discount: custList_[i].discount,
                postage: custList_[i].postage,
                type: custList_[i].type,
                createDate: custList_[i].createDate,
                paymentStatus: custList_[i].paymentStatus,
                orderStatus: custList_[i].orderStatus,
                shopName: custList_[i].shopName
              });
              this.col_arr = this.custList[i].items;
            }
            this.currentPage = response.data.data.pageNum;
            this.count = this.custList.length;
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    getPageNo() {
      this.$http
        .get(
          "" + this.URL.url + "/api/admin/orders/list?pageNum=1&pageSize=10000"
        )
        .then(
          response => {
            this.$Message.success("获取数据成功");
            console.log("请求成功", response.data);
            this.pageNo =
              response.data.data.total % 20 == 0
                ? Number.parseInt(response.data.data.total / 20)
                : Number.parseInt(response.data.data.total / 20) + 1;
            console.log("pageNo", this.pageNo);
            this.currentPage = response.data.data.pageNum;
            this.request();
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    }
  },
  created: function() {
    this.getPageNo();
  }
};
</script>
<style type="text/css">
.el-form-item__content .el-form-item__error {
  left: 81px;
}
.el-table .cell {
  white-space: pre-line;
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

.cont .btn {
  padding: 12px 30px;
  background: #ff9900;
  color: #fff;
  font-weight: bold;
  border-radius: 2px;
  cursor: pointer;
}

.cont .btn-1 {
  padding: 12px 30px;
  background: #f2f2f2;
  color: #666;
  border-radius: 2px;
  margin-left: 10px;
  cursor: pointer;
}

.input {
  padding: 2px 0px 2px 42px;
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

.vip {
  width: 60px;
}

.table {
  margin: 10px 0px 10px 0px;
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
