<template>
  <div class="user-container">
    <div class="user-box">
      <div class="box-center">
        <!-- <div class="tag">
          <el-tag v-for="tag in dynamicTags" :key="tag" closable @close="closeTag(tag)">{{tag}}</el-tag>
        </div>-->
        <div class="tips">
          <span>{{c17}}</span>
          <span>{{c15}}</span>
          <span>{{c16}}</span>
          <span>{{c18}}</span>
          <span>{{count}}</span>
        </div>
        <div class="cont">
          <div class="btn fl" @click="refreshData">{{refresh}}</div>
          <el-form
            class="fl"
            :model="formItem"
            ref="formItem"
            :rules="ruleInline"
            auto-complete="on"
            :label-width="label_width"
          >
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
            <el-form-item class="fl" prop="columeType" style="padding: 8px 10px;">
              <span style="margin:0px 5px 0px 10px;">{{vip}}</span>
              <el-select
                style="width: 110px;"
                v-model="formItem.columeType"
                placeholder="请选择"
                @change="changeVipValue"
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
            <el-table-column label="头像" width="70" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.avatar" alt>
              </template>
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" width="150" align="center"></el-table-column>
            <el-table-column prop="phone" label="默认电话" width="140" align="center"></el-table-column>
            <el-table-column prop="isVip" label="是否会员" width="100" align="center"></el-table-column>
            <el-table-column prop="ecoin" label="生豆" width="70" align="center"></el-table-column>
            <el-table-column prop="couponCount" label="优惠券数量" width="100" align="center"></el-table-column>
            <el-table-column prop="createDate" label="注册时间" width="200" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <img
                  style="cursor: pointer;"
                  src="@/assets/search.png"
                  alt
                  @click="edit(scope.$index)"
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
import axios from "axios";
import $ from "jquery";
// import { getToken } from "@/utils/auth";
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
      dynamicTags: ["用户信息"],
      isvip: "",
      count: "",
      label_width: "80",
      pageNo: 1,
      currentPage: 1,
      saveData: [],
      // vip_v:'全部',
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
      c9: "订单管理",
      c10: "用户购物车",
      c11: "用户收货地址",
      c12: "用户店铺收藏",
      c13: "用户商品收藏",
      c14: "用户浏览记录",
      c15: "用户信息/",
      c16: "列表/",
      c17: "用户管理/",
      c18: "总数",
      refresh: "刷新",
      userName: "姓名",
      phoneNum: "电话",
      vip: "是否会员",
      choose: "筛选",
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
    // closeTag(tag) {
    //   this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    //    this.$router.push("/");
    // },
    changeVipValue(value) {
      this.isvip = value == "是" ? true : value == "否" ? false : value;
    },
    chooseData() {
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/member/list",
          "pageNum=" +
            this.currentPage +
            "&pageSize=20&nickName=" +
            this.formItem.username +
            "&phone=" +
            this.formItem.phone +
            "&isVip=" +
            this.isvip +
            ""
        )
        .then(
          response => {
            this.$Message.success("筛选成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            this.custList = [];
            for (var i = 0; i < dataArr.length; i++) {
              var isVip = dataArr[i].isVip == true ? "是" : "否";
              this.custList.push({
                userName: dataArr[i].userName,
                avatar: dataArr[i].avatar,
                nickName: dataArr[i].nickName,
                phone: dataArr[i].phone,
                isVip: isVip,
                ecoin: dataArr[i].ecoin,
                couponCount: dataArr[i].couponCount,
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
    },
    refreshData() {
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/member/list",
          "pageNum=" + this.currentPage + "&pageSize=20"
        )
        .then(
          response => {
            this.$Message.success("刷新成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            this.custList = [];
            for (var i = 0; i < dataArr.length; i++) {
              var isVip = dataArr[i].isVip == true ? "是" : "否";
              this.custList.push({
                userName: dataArr[i].userName,
                avatar: dataArr[i].avatar,
                nickName: dataArr[i].nickName,
                phone: dataArr[i].phone,
                isVip: isVip,
                ecoin: dataArr[i].ecoin,
                couponCount: dataArr[i].couponCount,
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
      this.currentPage = current;
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/member/list?pageNum=" +
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
              var isVip = dataArr[i].isVip == true ? "是" : "否";
              this.custList.push({
                userName: dataArr[i].userName,
                avatar: dataArr[i].avatar,
                nickName: dataArr[i].nickName,
                phone: dataArr[i].phone,
                isVip: isVip,
                ecoin: dataArr[i].ecoin,
                couponCount: dataArr[i].couponCount,
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
    edit(index) {
      this.$router.push({
        path: "/userInfo/edit",
        name: "userInfoDetail",
        params: {
          memberId: this.saveData[index].id
        }
      });
    },
    request() {
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/member/list",
          "pageNum=" + this.currentPage + "&pageSize=20"
        )
        .then(
          response => {
            this.$Message.success("获取数据成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            for (var i = 0; i < dataArr.length; i++) {
              var isVip = dataArr[i].isVip == true ? "是" : "否";
              this.custList.push({
                userName: dataArr[i].userName,
                avatar: dataArr[i].avatar,
                nickName: dataArr[i].nickName,
                phone: dataArr[i].phone,
                isVip: isVip,
                ecoin: dataArr[i].ecoin,
                couponCount: dataArr[i].couponCount,
                createDate: dataArr[i].createDate
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
            "/api/admin/member/list?pageNum=" +
            this.currentPage +
            "&pageSize=10000"
        )
        .then(
          response => {
            this.$Message.success("获取页码数据成功");
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
    // console.log("token", getToken());
  }
};
</script>
<style type="text/css">
.el-form-item__content .el-form-item__error {
  left: 81px;
}
/* .tag {
  margin: 10px 0px 10px 0px;
}
.tag .el-tag {
  margin-right: 10px;
} */
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
