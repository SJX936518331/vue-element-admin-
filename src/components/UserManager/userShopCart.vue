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
            <el-form-item class="fl" prop="account">
              <div class="input fl">
                <span>{{account}}</span>
                <el-input style="width:75%;" type="text" name="account" v-model="formItem.account"/>
              </div>
            </el-form-item>
            <el-form-item class="fl" prop="isVip" style="padding: 2px 10px;">
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
            <el-table-column prop="userName" label="账号" width="150" align="center"></el-table-column>
            <el-table-column prop="isVip" label="是否会员" width="120" align="center"></el-table-column>
            <el-table-column prop="nickName" label="昵称" width="150" align="center"></el-table-column>
            <el-table-column prop="phone" label="默认电话" width="150" align="center"></el-table-column>
            <el-table-column prop="shopCount" label="店铺数量" width="100" align="center"></el-table-column>
            <el-table-column prop="productCount" label="商品数量" width="100" align="center"></el-table-column>
            <el-table-column prop="totalCost" label="总金额" width="150" align="center"></el-table-column>
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
    const validateIsVip = (rule, value, callback) => {};
    const validateAccount = (rule, value, callback) => {
      // if (value == "") {
      //   callback(new Error("账号不能为空"));
      // } else {
      //   if (value.length > 6) {
      //     callback(new Error("账号格式不对"));
      //   }
      // }
    };
    return {
      isvip: "",
      count: "",
      label_width: "80",
      saveData: [],
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
      c15: "用户购物车/",
      c16: "列表/",
      c17: "用户管理/",
      c18: "总数",
      account: "账号",
      refresh: "刷新",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      custList: [],
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
      ruleInline: {
        account: [
          { required: true, trigger: "blur", validator: validateAccount }
        ]
      },
      formItem: {
        account: "",
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
      console.log("value", value);
    },
    chooseData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/cart/list?pageNum=" +
            this.currentPage +
            "&pageSize=20&userName=" +
            this.formItem.account +
            "&isVip=" +
            this.isvip +
            ""
        )
        .then(
          response => {
            this.$Message.success("筛选成功");
            console.log("请求成功", response.data);
            this.custList = [];
            var dataArr = response.data.data.list;
            for (var i = 0; i < dataArr.length; i++) {
              var vip = dataArr[i].isVip == true ? "是" : "否";
              this.custList.push({
                userName: dataArr[i].userName,
                isVip: vip,
                nickName: dataArr[i].nickName,
                phone: dataArr[i].phone,
                shopCount: dataArr[i].shopCount,
                productCount: dataArr[i].productCount,
                totalCost: dataArr[i].totalCost
              });
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
            "/api/admin/cart/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            this.$Message.success("刷新成功");
            console.log("请求成功", response.data);
            this.custList = [];
            var dataArr = response.data.data.list;
            for (var i = 0; i < dataArr.length; i++) {
              var vip = dataArr[i].isVip == true ? "是" : "否";
              this.custList.push({
                userName: dataArr[i].userName,
                isVip: vip,
                nickName: dataArr[i].nickName,
                phone: dataArr[i].phone,
                shopCount: dataArr[i].shopCount,
                productCount: dataArr[i].productCount,
                totalCost: dataArr[i].totalCost
              });
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
            "/api/admin/cart/list?pageNum=" +
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
                shopId: dataArr[i].shopId,
                sn: dataArr[i].sn,
                name: dataArr[i].name,
                pictureUrl: dataArr[i].pictureUrl,
                productSpecifications: dataArr[i].productSpecifications,
                deliveryTemplateName: dataArr[i].deliveryTemplateName,
                isShow: dataArr[i].isShow == true ? "0" : "1",
                status: dataArr[i].status,
                createDate: dataArr[i].createDate
              });
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
        path: "/userShopCart/edit",
        name: "usershopCart",
        params: {
          memberId: this.saveData[index].id
        }
      });
    },
    request() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/cart/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            this.$Message.success("获取数据成功");
            var dataArr = response.data.data.list;
            for (var i = 0; i < dataArr.length; i++) {
              var vip = dataArr[i].isVip == true ? "是" : "否";
              this.custList.push({
                userName: dataArr[i].userName,
                isVip: vip,
                nickName: dataArr[i].nickName,
                phone: dataArr[i].phone,
                shopCount: dataArr[i].shopCount,
                productCount: dataArr[i].productCount,
                totalCost: dataArr[i].totalCost
              });
            }
            this.count = this.custList.length;
            this.currentPage = response.data.data.pageNum;
            this.saveData = response.data.data.list;
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
            "/api/admin/cart/list?pageNum=" +
            this.currentPage +
            "&pageSize=10000"
        )
        .then(
          response => {
            this.$Message.success("获取页码成功");
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
