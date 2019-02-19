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
                <el-table
                  :data="list1"
                  border
                  style="width: 100%"
                  @select="selectionChange"
                  ref="table"
                >
                  <el-table-column prop="userName" label="账号" width="150" align="center"></el-table-column>
                  <el-table-column prop="isVip" label="是否会员" width="100" align="center"></el-table-column>
                  <el-table-column prop="nickName" label="昵称" width="150" align="center"></el-table-column>
                </el-table>
              </div>
            </div>
            <div class="t2">
              <div class="title">{{title2}}</div>
              <el-table
                :data="list2"
                border
                style="width: 100%"
                @select="selectionChange"
                ref="table"
              >
                <el-table-column prop="contact" label="联系人" width="150" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话" width="150" align="center"></el-table-column>
                <el-table-column prop="address" label="收件地址" width="350" align="center"></el-table-column>
                <el-table-column prop="isDefault" label="是否默认地址" width="150" align="center"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="return" @click="turn">{{returnHome}}</div>
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
      c15: "用户收货地址/",
      c16: "详情",
      c17: "用户管理/",
      title1: "用户信息",
      title2: "收件信息",
      returnHome: "返回",
      user_name: "罗先生",
      user_name_: "陈小姐",
      defalut: "默认",
      address_1: "广东省广州市天河区猎德街道猎德村里仁巷2号",
      address_2: "广东省广州市天河区猎德街道猎德村里仁巷2号",
      address_3: "广东省广州市天河区猎德街道高德置地大厦夏广场1206",
      address_4: "广东省广州市番禺区市桥街道汀沙村一巷3号206",
      phone_num: "15113648782",
      list1: [],
      list2: []
    };
  },
  components: {},
  methods: {
    request() {
      let memberId = this.$route.params.memberId;
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/memberAddress/edit?id=" +
            memberId +
            ""
        )
        .then(
          response => {
            // this.$Message.success('登录成功')
            console.log("请求成功", response.data);
            var vip = response.data.data.isVip == true ? "是" : "否";
            this.list1.push({
              userName: response.data.data.userName,
              isVip: vip,
              nickName: response.data.data.nickName
            });
            var dataArr = response.data.data.addresses;
            for (var i = 0; i < dataArr.length; i++) {
              this.list2.push({
                contact: dataArr[i].contact,
                phone: dataArr[i].phone,
                address: dataArr[i].area + dataArr[i].specificAddress,
                isDefault: dataArr[i].isDefault == false ? "否" : "是"
              });
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      $(".el-scrollbar__view .active").show();
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
    turn() {
      this.$router.push("/user/userReAddress");
      $(".el-scrollbar__view .active").hide();
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

.btn {
  display: inline-block;
  font-size: 16px;
  padding: 5px 8px;
  text-align: center;
  margin-right: 3%;
  background: #ff7c45;
  border-radius: 2px;
  color: #fff;
}

.btn_ {
  background: #999999;
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
