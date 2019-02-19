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
            <div style="display: inline-block;text-align: left;width: 10%;">
              <span class="c1">{{c18}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 88%;">
              <input
                type="text"
                name="userName"
                style="height: 40px;border: 1px solid #A9A9A9;"
                v-model="userName"
              >
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 10%;">
              <span class="c1">{{c19}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 88%;">
              <input
                type="text"
                name="description"
                style="height: 40px;border: 1px solid #A9A9A9;"
                v-model="description"
              >
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 10%;">
              <span class="c1">{{c20}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 88%;">
              <el-checkbox
                class="ml"
                v-for="(item,index) in bind_cate"
                :key="index"
                v-model="item.check"
                :label="item.label"
                @change="changeStatus(item.id,item.check,item.value)"
              >{{item.name}}</el-checkbox>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 10%;">
              <span class="c1">{{c21}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 88%;">
              <el-checkbox
                class="ml"
                v-for="(item,index) in bind_cate_1"
                :key="index"
                v-model="item.check"
                :label="item.label"
                @change="changeStatus(item.id,item.check,item.value)"
              >{{item.name}}</el-checkbox>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 10%;">
              <span class="c1">{{c22}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 88%;">
              <el-checkbox
                class="ml"
                v-for="(item,index) in bind_cate_2"
                :key="index"
                v-model="item.check"
                :label="item.label"
                @change="changeStatus(item.id,item.check,item.value)"
              >{{item.name}}</el-checkbox>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 10%;">
              <span class="c1">{{c23}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 88%;">
              <el-checkbox
                class="ml"
                v-for="(item,index) in bind_cate_3"
                :key="index"
                v-model="item.check"
                :label="item.label"
                @change="changeStatus(item.id,item.check,item.value)"
              >{{item.name}}</el-checkbox>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 10%;">
              <span class="c1">{{c24}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 88%;">
              <el-checkbox
                class="ml"
                v-for="(item,index) in bind_cate_4"
                :key="index"
                v-model="item.check"
                :label="item.label"
                @change="changeStatus(item.id,item.check,item.value)"
              >{{item.name}}</el-checkbox>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 10%;">
              <span class="c1">{{c25}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 88%;">
              <el-checkbox
                class="ml"
                v-for="(item,index) in bind_cate_5"
                :key="index"
                v-model="item.check"
                :label="item.label"
                @change="changeStatus(item.id,item.check,item.value)"
              >{{item.name}}</el-checkbox>
            </div>
          </div>
          <div
            class="btn fl"
            style="background: #2E92DD;border:1px solid #2E92DD;"
            @click="updateData()"
          >{{btnTxt1}}</div>
          <div class="btn fl" @click="turn">{{btnTxt}}</div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/Page";
import toggle from "@/components/Toggle/toggle";
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
      authArr: [],
      description: "",
      userName: "",
      toggleTxt: false,
      adminTxt1: "普通管理员",
      adminTxt2: "超级管理员",
      adminTxt3: "一般管理员",
      btnTxt: "取消",
      btnTxt1: "确定",
      title1: "优惠券信息",
      title2: "优惠券领取使用明细",
      storeIdTxt: "店铺ID",
      phoneTxt: "电话",
      removeTxt: "删除",
      addTxt: "添加",
      bind_cate: [
        {
          id: 1,
          label: "用户信息",
          check: false,
          name: "用户信息",
          value: "member"
        },
        {
          id: 2,
          label: "用户订单",
          check: false,
          name: "用户订单",
          value: "orders"
        },
        {
          id: 3,
          label: "用户购物车",
          check: false,
          name: "用户购物车",
          value: "cart"
        },
        {
          id: 4,
          label: "用户收货地址管理",
          check: false,
          name: "用户收货地址管理",
          value: "memberAddress"
        },
        {
          id: 5,
          label: "用户店铺收藏",
          check: false,
          name: "用户店铺收藏",
          value: "favoriteShop"
        },
        {
          id: 6,
          label: "用户商品收藏",
          check: false,
          name: "用户商品收藏",
          value: "favoriteGoods"
        },
        {
          id: 7,
          label: "浏览记录",
          check: false,
          name: "浏览记录",
          value: "memberhistoryList"
        }
      ],
      bind_cate_1: [
        {
          id: 1,
          label: "商品分类",
          check: false,
          name: "商品分类",
          value: "productCategory"
        },
        {
          id: 2,
          label: "商品规格",
          check: false,
          name: "商品规格",
          value: "specification"
        },
        {
          id: 3,
          label: "商品列表",
          check: false,
          name: "商品列表",
          value: "Product"
        },
        {
          id: 4,
          label: "商品评论管理",
          check: false,
          name: "商品评论管理",
          value: "productComment"
        }
      ],
      bind_cate_2: [
        {
          id: 1,
          label: "商家管理",
          check: false,
          name: "商家管理",
          value: "merchant"
        },
        {
          id: 2,
          label: "店铺管理",
          check: false,
          name: "店铺管理",
          value: "shop"
        },
        {
          id: 3,
          label: "商家提现",
          check: false,
          name: "商家提现",
          value: "merchantwithdraw"
        },
        {
          id: 4,
          label: "商家银行卡管理",
          check: false,
          name: "商家银行卡管理",
          value: "MerchantBankCard"
        },
        {
          id: 5,
          label: "退货地址管理",
          check: false,
          name: "退货地址管理",
          value: "merchantreturnaddress"
        },
        {
          id: 6,
          label: "配送模板",
          check: false,
          name: "配送模板",
          value: "deliveryTemplate"
        }
      ],
      bind_cate_3: [
        {
          id: 1,
          label: "店铺优惠券管理",
          check: false,
          name: "店铺优惠券管理",
          value: "shopcoupon"
        },
        {
          id: 2,
          label: "商品优惠券管理",
          check: false,
          name: "商品优惠券管理",
          value: "productcoupon"
        },

        {
          id: 3,
          label: "轮播图广告",
          check: false,
          name: "轮播图广告",
          value: "adbanner"
        },
        {
          id: 4,
          label: "商品广告",
          check: false,
          name: "商品广告",
          value: "adproduct"
        },
        {
          id: 5,
          label: "普通占位图广告",
          check: false,
          name: "普通占位图广告",
          value: "adposition"
        }
      ],
      bind_cate_4: [
        {
          id: 1,
          label: "规则分类",
          check: false,
          name: "规则分类",
          value: "ruleCategory"
        },
        {
          id: 2,
          label: "规则列表",
          check: false,
          name: "规则列表",
          value: "ruleEssay"
        },
        {
          id: 3,
          label: "帮助中心分类",
          check: false,
          name: "帮助中心分类",
          value: "helpCategory"
        },
        {
          id: 4,
          label: "帮助中心列表",
          check: false,
          name: "帮助中心列表",
          value: "helpEssay"
        }
      ],
      bind_cate_5: [
        {
          id: 1,
          label: "管理员管理",
          check: false,
          name: "管理员管理",
          value: "admin"
        },
        {
          id: 2,
          label: "角色管理",
          check: false,
          name: "角色管理",
          value: "role"
        },
        {
          id: 3,
          label: "系统设置",
          check: false,
          name: "系统设置",
          value: "set"
        }
      ],

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

      c9: "管理员管理",
      c10: "角色管理",
      // c11:'限时秒杀管理',
      // c12:'清仓专场管理',
      // c13:'1元抢购管理',
      c14: "系统管理",

      c15: "角色管理/",
      c16: "添加角色",
      c17: "系统管理/",
      c18: "名称",
      c19: "描述",
      c20: "用户管理",
      c21: "商品管理",
      c22: "商家管理",
      c23: "营销管理",
      c24: "文章管理",
      c25: "系统管理",
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
    "v-pagination": pagination,
    "v-toggle": toggle
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
    changeStatus(id, check, value) {
      this.authArr.push({ id: id, check: check, value: value });
      console.log("authArr", this.authArr);
    },

    getData() {
      var id = this.$route.params.id;
      this.$http.get("" + this.URL.url + "/api/role/edit?id=" + id + "").then(
        response => {
          this.$Message.success("查看角色详情成功");
          console.log("请求成功", response.data);
          this.userName = response.data.data.name;
          this.description = response.data.data.description;
          var authorities = response.data.data.authorities;
          for (var i = 0; i < authorities.length; i++) {
            for (var j = 0; j < this.bind_cate.length; j++) {
              if (authorities[i] == this.bind_cate[j].value) {
                this.bind_cate[j].check = true;
              }
            }
          }

          for (var a = 0; a < authorities.length; a++) {
            for (var b = 0; b < this.bind_cate_1.length; b++) {
              if (authorities[a] == this.bind_cate_1[b].value) {
                this.bind_cate_1[b].check = true;
              }
            }
          }

          for (var c = 0; c < authorities.length; c++) {
            for (var d = 0; d < this.bind_cate_2.length; d++) {
              if (authorities[c] == this.bind_cate_2[d].value) {
                this.bind_cate_2[d].check = true;
              }
            }
          }

          for (var e = 0; e < authorities.length; e++) {
            for (var f = 0; f < this.bind_cate_3.length; f++) {
              if (authorities[e] == this.bind_cate_3[f].value) {
                this.bind_cate_3[f].check = true;
              }
            }
          }

          for (var g = 0; g < authorities.length; g++) {
            for (var h = 0; h < this.bind_cate_4.length; h++) {
              if (authorities[g] == this.bind_cate_4[h].value) {
                this.bind_cate_4[h].check = true;
              }
            }
          }

          for (var k = 0; k < authorities.length; k++) {
            for (var l = 0; l < this.bind_cate_5.length; l++) {
              if (authorities[k] == this.bind_cate_5[l].value) {
                this.bind_cate_5[l].check = true;
              }
            }
          }
        },
        response => {
          this.$Message.error("系统出错");
        }
      );
    },
    updateData() {
      let authorities = this.$route.params.authorities;
      let description = this.description;
      let id = this.$route.params.id;
      let isSystem =
        this.formItem.sysTxt1 || this.formItem.sysTxt2 || this.formItem.sysTxt3
          ? true
          : false;
      let name = this.userName;
      this.$http
        .post(
          "" + this.URL.url + "/api/role/update",
          "authorities=" +
            authorities +
            "&description=" +
            description +
            "&id=" +
            id +
            "&name=" +
            name +
            "&isSystem=" +
            isSystem +
            ""
        )
        .then(
          response => {
            this.$Message.success("更新角色成功");
            console.log("请求成功", response.data);
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
      console.log(current);
    },
    turn() {
      this.$router.push("/systemManagement/roleManagement");
    }
  },
  created: function() {
    this.getData();
  }
};
</script>
<style type="text/css" scoped>
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  /* background-color: #fff;
  -webkit-appearance: none;*/
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  /*  outline: none;*/
}

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
  width: 75%;
  font-family: "微软雅黑";
  color: #333333;
  font-size: 18px;
  margin: 15px 0px 0px 50px;
}

.tips {
  width: 80%;
  background: #f2f2f2;
  padding: 20px 30px 20px 30px;
  margin-bottom: 20px;
}

.cont {
  font-family: "微软雅黑";
  font-size: 18px;
  color: black;
  width: 100%;
  margin-top: 10px;
}

.cont .con {
  width: 100%;
  margin-bottom: 20px;
  overflow: auto;
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
  border-radius: 21px;
  margin-right: 10px;
  border: 1px solid black;
  cursor: pointer;
}

.table {
  width: 50%;
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
