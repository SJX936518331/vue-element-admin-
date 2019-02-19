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
                  <el-table-column prop="c1" label="账号" width="150"></el-table-column>
                  <el-table-column prop="c2" label="是否会员" width="100"></el-table-column>
                  <el-table-column prop="c3" label="默认姓名" width="100"></el-table-column>
                  <el-table-column prop="c4" label="默认电话" width="150"></el-table-column>
                  <el-table-column prop="c5" label="默认收件地址" width="200"></el-table-column>
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
                  <el-table-column prop="c1" label="商品名称" width="500"></el-table-column>
                </el-table>
              </div>
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
      c15: "用户商品收藏/",
      c16: "查看详情",
      c17: "用户管理/",
      title1: "用户信息",
      title2: "收藏商品",
      returnHome: "返回",
      list1: [
        {
          c1: "15625268452",
          c2: "是",
          c3: "罗兰",
          c4: "1358246975",
          c5: "荔湾区东漖北路86号丽和华庭4栋1003"
        }
      ],
      list2: [
        { c1: "少女修身显瘦连衣裙中长款2018夏装新款学院风初中学生小清新裙子" },
        { c1: "艾草艾叶藏红花老姜泡脚药包男女足浴粉包驱寒祛湿调理体寒去湿气" },
        { c1: "【手撕面包1kg/整箱】网红早餐营养食品小零食蛋糕点心" },
        {
          c1: "邓家刀不锈钢厨房套刀锋利刀具菜刀切片刀砍骨刀家用厨具两件套装"
        }
      ]
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
    turn() {
      this.$router.push("/user/userGoodsCollection");
    }
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
  width: 71%;
}

.table-box .t2 {
  width: 71%;
}

.table-box .t2 .table {
  width: 70%;
}

.table-box .t1 .title,
.table-box .t2 .title {
  padding: 15px 10px 15px 20px;
  background: #f2f2f2;
}

.table {
  margin-top: 10px;
}

.return {
  width: 13%;
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
