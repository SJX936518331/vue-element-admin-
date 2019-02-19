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
          <div class="con">
            <div class="title">{{title1}}</div>
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
            <div style="display: inline-block;text-align: left;width: 60%;">{{productList}}</div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c24}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c1">{{c25}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c26}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c1">{{c27}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c28}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c1">{{c29}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c30}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c1">{{c31}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c32}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c1">{{c33}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c34}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c1">{{c35}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c36}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c1">{{c37}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c38}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c1">{{c39}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c40}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c1">{{c41}}</span>
            </div>
          </div>
          <div class="btn" @click="turn">{{btnTxt}}</div>
        </div>
        <div style="position: relative;" class="table fl">
          <div class="title">{{title2}}</div>
          <el-table
            :data="custList"
            border
            style="width: 100%;"
            @select="selectionChange"
            ref="table"
          >
            <el-table-column prop="couponName" label="优惠券名称" width="100" align="center"></el-table-column>
            <el-table-column prop="shopName" label="店铺名称" width="100" align="center"></el-table-column>
            <el-table-column prop="decrease" label="优惠额度" width="100" align="center"></el-table-column>
            <el-table-column prop="collectName" label="领取人" width="150" align="center"></el-table-column>
            <el-table-column prop="state" label="使用状态" width="100" align="center"></el-table-column>
            <el-table-column prop="exprieTime" label="有效期" width="200" align="center"></el-table-column>
            <el-table-column prop="collectTime" label="领取时间" width="200" align="center"></el-table-column>
          </el-table>
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
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/Page";
export default {
  name: "user",
  data() {
    const validateStoreId = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    return {
      productList: "",
      btnTxt: "返回",
      title1: "优惠券信息",
      title2: "优惠券领取使用明细",
      storeIdTxt: "店铺ID",
      phoneTxt: "电话",
      removeTxt: "删除",
      addTxt: "添加",
      pageNo: 1,
      currentPage: 1,
      spanArr: [],
      rowspan1: 3,
      rowspan2: 1,
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

      c9: "店铺优惠券管理",
      c10: "商品优惠券管理",
      // c11:'限时秒杀管理',
      // c12:'清仓专场管理',
      // c13:'1元抢购管理',
      c14: "轮播图广告管理",
      c9_: "商品广告管理",
      c10_: "普通占位广告管理",

      c15: "商品优惠券管理/",
      c16: "查看商品优惠券",
      c17: "营销管理/",
      c18: "店铺编号",
      c19: "",
      c20: "店铺名称",
      c21: "",
      c22: "适用商品",
      c23: "",
      c24: "优惠券名称",
      c25: "",
      c26: "优惠额度",
      c27: "",
      c28: "优惠券数量",
      c29: "",
      c30: "推广渠道",
      c31: "",
      c32: "开始时间",
      c33: "",
      c34: "有效期",
      c35: "",
      c36: "每人限领",
      c37: "",
      c38: "已领取",
      c39: "",
      c40: "已使用",
      c41: "",
      refresh: "刷新",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      custList: [],
      ruleInline: {
        storeId: [
          { required: true, trigger: "blur", validator: validateStoreId }
        ]
      },
      formItem: {
        storeId: ""
      }
    };
  },
  components: {
    "v-pagination": pagination
  },
  directives: {
    mergerows: {
      // 指令的定义
      inserted: function(el) {
        el.setAttribute("rowspan", 10);
      }
    },
    mergercols: {
      // 指令的定义
      inserted: function(el) {
        el.setAttribute("colspan", 10);
      }
    }
  },

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
    paginationClick(current) {
      //响应点击后子组件当前页码
      this.currentPage = current;
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/productcouponrecord/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            this.$Message.success("获取数据成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            this.custList = [];
            for (var i = 0; i < dataArr.length; i++) {
              this.custList.push({
                couponName: dataArr[i].couponName,
                shopName: dataArr[i].shopName,
                decrease: dataArr[i].decrease,
                collectName: dataArr[i].collectName,
                state: dataArr[i].state == "Unused" ? "未使用" : "使用",
                exprieTime: dataArr[i].exprieTime,
                collectTime: dataArr[i].collectTime
              });
            }
            this.currentPage = response.data.data.pageNum;
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      console.log(current);
    },
    turn() {
      this.$router.push("/marketingManagement/commodityCouponM");
    },
    getData() {
      var id = this.$route.params.id;
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/productcoupon/showAllProductCouponById?id=" +
            id +
            ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("编辑商品规格成功");
              console.log("数据", response.data.data);
              var dataArr = response.data.data;
              for (var i = 0; i < dataArr.length; i++) {
                this.c19 = dataArr[i].shopCode;
                this.c21 = dataArr[i].shopName;
                this.c25 = dataArr[i].couponName;
                this.c27 = dataArr[i].decrease;
                this.c29 = dataArr[i].amount;
                this.c31 = dataArr[i].promotion;
                this.c33 = dataArr[i].startDate;
                this.c35 = dataArr[i].endDate;
                this.c37 = dataArr[i].limited;
                this.c39 = dataArr[i].collected;
                this.c41 = dataArr[i].used;
              }
              var dataArr1 = response.data.data;
              for (var j = 0; j < dataArr1.length; j++) {
                for (var k = 0; k < dataArr1[j].productList.length; k++) {
                  this.productList += dataArr1[j].productList[k].name + "  ";
                }
              }
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      // console.log(this.dataArr_.username);
    },
    getData1() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/productcouponrecord/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("优惠券领取使用明细数据获取成功");
              console.log("数据", response.data.data);
              var dataArr = response.data.data.list;
              for (var i = 0; i < dataArr.length; i++) {
                this.custList.push({
                  couponName: dataArr[i].couponName,
                  shopName: dataArr[i].shopName,
                  decrease: dataArr[i].decrease,
                  collectName: dataArr[i].collectName,
                  state: dataArr[i].state == "Unused" ? "未使用" : "使用",
                  exprieTime: dataArr[i].exprieTime,
                  collectTime: dataArr[i].collectTime
                });
              }
              this.currentPage = response.data.data.pageNum;
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    getPageNo() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/productcouponrecord/list?pageNum=" +
            this.currentPage +
            "&pageSize=10000"
        )
        .then(
          response => {
            // this.pageNo = response.data.data.pages;
            this.$notify.success("获取页码成功");
            console.log("请求成功", response.data);
            this.pageNo =
              response.data.data.total % 20 == 0
                ? Number.parseInt(response.data.data.total / 20)
                : Number.parseInt(response.data.data.total / 20) + 1;
            console.log("pageNo", this.pageNo);
            this.currentPage = response.data.data.pageNum;
            this.getData1();
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    }
  },
  created: function() {
    this.getPageNo();
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
  width: 257px;
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
  width: 50%;
  margin-top: 10px;
}

.cont .con {
  width: 93%;
  margin-bottom: 20px;
}

.cont .con .c1 {
  height: 40px;
  line-height: 40px;
  margin: 5px 0px;
  font-weight: bold;
  text-align: left;
}

.cont .con .c2 {
  margin: 5px 0px;
}

.cont .btn {
  display: inline-block;
  padding: 12px 30px;
  background: #fff;
  color: black;
  font-weight: bold;
  border-radius: 2px;
  margin-right: 10px;
  border: 1px solid black;
  cursor: pointer;
  margin-bottom: 150px;
}

.table {
  width: 45%;
}

/*.table-box .t2 {
  width: 90%;
}

.table-box .t3 {
  width: 50%;
}

.table-box .t4 {
  width: 80%;
}*/

.title

/*.table-box .t2 .title,
.table-box .t3 .title,
.table-box .t4 .title*/
 {
  padding: 15px 10px 15px 20px;
  background: #f2f2f2;
  margin-bottom: 20px;
}

.input {
  padding: 2px 0px 2px 42px;
}

.input span {
  color: #333333;
  font-weight: bold;
}

.input span {
  margin-right: 11px;
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

.vip {
  width: 60px;
}

.table {
  margin: 10px 0px 10px 0px;
}

.foot {
  width: 100%;
  margin-top: 20px;
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
