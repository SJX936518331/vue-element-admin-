<template>
  <div class="user-container">
    <div class="user-box">
      <div class="box-center">
        <!-- <div class="tag">
          <el-tag v-for="tag in dynamicTags" :key="tag" closable @close="closeTag(tag)">{{tag}}</el-tag>
        </div> -->
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
              <img class="c2 img" :src="img_src" alt>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c21}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c22}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c23}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c24}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c25}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c26}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c27}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c28}}</span>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
              <span class="c1">{{c29}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <span class="c2">{{c30}}</span>
            </div>
          </div>
          <div class="table">
            <el-table :data="list1" border style="width: 100%" ref="table">
              <el-table-column prop="couponName" label="优惠券名称" width="120" align="center"></el-table-column>
              <el-table-column prop="shopName" label="店铺名称" width="100" align="center"></el-table-column>
              <el-table-column prop="decrease" label="优惠额度" width="100" align="center"></el-table-column>
              <el-table-column prop="sn" label="优惠券类型" width="120" align="center"></el-table-column>
              <el-table-column prop="state" label="使用状态" width="100" align="center"></el-table-column>
              <el-table-column prop="useDate" label="使用时间" width="200" align="center"></el-table-column>
              <el-table-column prop="endDate" label="有效期" width="200" align="center"></el-table-column>
              <el-table-column prop="startDate" label="领取时间" width="200" align="center"></el-table-column>
            </el-table>
          </div>
          <div class="table">
            <div class="con" style="margin-top: 20px;">
              <div style="display: inline-block;text-align: left;width: 20%;margin-right: 10%;">
                <span class="c1">{{c29_}}</span>
              </div>
              <div style="display: inline-block;text-align: left;width: 60%;">
                <span class="c2">{{c30_}}</span>
              </div>
            </div>
          </div>
          <el-table :data="list2" border style="width: 100%" ref="table">
            <el-table-column prop="couponName" label="优惠券名字" width="120" align="center"></el-table-column>
            <el-table-column prop="shopName" label="店铺名称" width="100" align="center"></el-table-column>
            <el-table-column prop="decrease" label="优惠券额度" width="100" align="center"></el-table-column>
            <el-table-column prop="sn" label="优惠券类型" width="120" align="center"></el-table-column>
            <el-table-column prop="state" label="使用状态" width="100" align="center"></el-table-column>
            <el-table-column prop="useDate" label="使用时间" width="200" align="center"></el-table-column>
            <el-table-column prop="endDate" label="有效期" width="200" align="center"></el-table-column>
            <el-table-column prop="startDate" label="领取时间" width="200" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="foot">
          <div>
            <span>{{time}}</span>
            <span style="margin-left: 10%;">{{t_c}}</span>
          </div>
          <el-button class="btn" @click="turn">{{login}}</el-button>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
import $ from "jquery";
import tag from "@/views/layout/components/TagsView.vue";
export default {
  name: "userInfoDetail",
  data() {
    return {
      dynamicTags: ["用户信息"],
      img_src: "",
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
      c16: "详情",
      c17: "用户管理/",
      c18: "账号",
      c19: "",
      c20: "头像",
      c21: "昵称",
      c22: "",
      c23: "电话",
      c24: "",
      c25: "是否会员",
      c26: "",
      c27: "生豆",
      c28: "",
      c29: "店铺优惠券数量",
      c29_: "商品优惠券数量",
      c30: "",
      c30_: "",
      time: "最近登录时间",
      t_c: "",
      login: "返回",
      list1: [],
      list2: []
    };
  },
  components: {},
  methods: {
    // closeTag(tag) {
    //   this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    //   console.log(this.dynamicTags.indexOf(tag));
    //   this.$router.push("/user/userInfo");
    // },
    turn() {
      console.log("tag", tag);
      // $(".el-scrollbar__view .active").hide();
      // this.dynamicTags.pop();
      this.$router.push("/user/userInfo");
    },
    request() {
      this.dynamicTags.push("用户信息详情");
      let memberId = this.$route.params.memberId;
      this.$http
        .get(
          "" + this.URL.url + "/api/admin/member/edit?memberId=" + memberId + ""
        )
        .then(
          response => {
            // this.$Message.success('登录成功')
            console.log("请求成功", response.data);
            this.c19 = response.data.data.userName;
            this.c22 = response.data.data.nickName;
            this.img_src = response.data.data.avatar;
            this.c24 = response.data.data.phone;
            var isVip = response.data.data.isVip == true ? "是" : "否";
            this.c26 = isVip;
            this.c28 = response.data.data.ecoin;
            var dataArr = response.data.data.shopCouponRecords;
            for (var i = 0; i < dataArr.length; i++) {
              this.list1.push({
                couponName: dataArr[i].couponName,
                shopName: dataArr[i].shopName,
                decrease: dataArr[i].decrease,
                sn: dataArr[i].sn,
                state: dataArr[i].state,
                useDate: dataArr[i].useDate,
                endDate: dataArr[i].endDate,
                startDate: dataArr[i].startDate
              });
            }
            this.c30 = dataArr.length;
            var dataArr_1 = response.data.data.productCouponRecords;
            for (var j = 0; j < dataArr_1.length; j++) {
              this.list2.push({
                couponName: dataArr_1[j].couponName,
                shopName: dataArr_1[j].shopName,
                decrease: dataArr_1[j].decrease,
                sn: dataArr_1[j].sn,
                state: dataArr_1[j].state == "Unused" ? "未使用" : "使用",
                useDate: dataArr_1[j].useDate,
                endDate: dataArr_1[j].endDate,
                startDate: dataArr_1[j].startDate
              });
            }
            this.c30_ = dataArr_1.length;
            this.t_c = response.data.data.createDate;
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
<style type="text/css">
.tab {
  display: none;
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
  margin-top: 30px;
  cursor: pointer;
  margin-bottom: 150px;
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
