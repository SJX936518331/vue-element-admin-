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
          <el-form
            class="form"
            :model="formItem"
            ref="formItem"
            :rules="ruleInline"
            :label-width="label_width"
          >
            <el-form-item prop="shopId">
              <div class="input fl">
                <span>{{shopTxt}}</span>
              </div>
              <div class="input input1 fl">
                <span>{{shopId}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="shopName">
              <div class="input fl">
                <span>{{shopNameTxt}}</span>
              </div>
              <div class="input input1 fl">
                <span>{{shopName}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="shopImg">
              <div class="input fl">
                <span>{{shopImgTxt}}</span>
              </div>
              <div class="input input1 fl">
                <img style="vertical-align: middle;width: 60px;height: 60px;" :src="img_url" alt>
              </div>
            </el-form-item>
            <el-form-item prop="pdName">
              <div class="input fl">
                <span>{{pdNameTxt}}</span>
              </div>
              <div class="input input1 fl">
                <span>{{pdName}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="pdSpe">
              <div class="input fl">
                <span>{{pdSpeTxt}}</span>
              </div>
              <div class="input input1 fl">
                <span>{{pdSpe}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="stock">
              <div class="input fl">
                <span>{{stockTxt}}</span>
              </div>
              <div class="input input1 fl">
                <span>{{stock}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="price">
              <div class="input fl">
                <span>{{priceTxt}}</span>
              </div>
              <div class="input input1 fl">
                <span>{{price}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="vipPrice">
              <div class="input fl">
                <span>{{vipPriceTxt}}</span>
              </div>
              <div class="input input1 fl">
                <span>{{vipPrice}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="buyPrice">
              <div class="input fl">
                <span>{{buyPriceTxt}}</span>
              </div>
              <div class="input input1 fl">
                <span>{{buyPrice}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="template">
              <div class="input fl">
                <span>{{templateTxt}}</span>
              </div>
              <div class="input input1 fl">
                <span>{{template}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="ULframes">
              <div class="input fl">
                <span>{{ULframesTxt}}</span>
              </div>
              <div class="input input1 fl">
                <span>{{ULframes}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="goodsDetail">
              <div class="input fl">
                <span>{{goodsDetailTxt}}</span>
              </div>
              <div class="input input1 fl">
                <span>{{goodsDetail}}</span>
              </div>
              <div></div>
            </el-form-item>
          </el-form>
          <div class="btn" @click="showDetail">{{goHmoeTxt}}</div>
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
    const validateGoodsName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      img_url: "",
      label_width: "80",
      shopTxt: "店铺编号",
      shopId: "",
      shopNameTxt: "店铺名称",
      shopName: "",
      shopImgTxt: "商品图片",
      pdNameTxt: "商品名称",
      pdName: "",
      pdSpeTxt: "商品规格",
      priceTxt: "团购价格",
      price: "",
      vipPriceTxt: "会员价",
      vipPrice: "",
      stockTxt: "库存",
      stock: "",
      pdSpe: "",
      buyPriceTxt: "单买价",
      buyPrice: "",
      templateTxt: "配送模板",
      template: "",
      ULframesTxt: "上下架",
      ULframes: "",
      goodsDetailTxt: "商品详情",
      goodsDetail: "",
      goHmoeTxt: "返回",

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
      c9: "商品分类",
      c10: "商品列表",
      c11: "商品评论",
      c15: "商品列表/",
      c16: "详情",
      c17: "商品管理/",
      goodsName: "商品名称",
      refresh: "刷新",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      custList: [],
      ruleInline: {
        goodsName: [
          { required: true, trigger: "blur", validator: validateGoodsName }
        ]
      },
      formItem: {
        goodsName: ""
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
      console.log(current);
    },
    showDetail() {
      this.$router.push("/goodsManage/goodsList");
    },
    getData() {
      var id = this.$route.params.id;
      var specificationId = this.$route.params.specificationId;
      var stock = this.$route.params.stock;
      var collagePrice = this.$route.params.collagePrice;
      var vipPrice = this.$route.params.vipPrice;
      var price = this.$route.params.price;
      var deliveryTemplateName = this.$route.params.deliveryTemplateName;
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/Product/edit?id=" +
            id +
            "&specificationId=" +
            specificationId +
            ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("查看商品详情成功");
              console.log("数据", response.data.data);
              console.log("数据", id);
              this.shopId = response.data.data.product.shopCode;
              this.shopName = response.data.data.product.shopName;
              this.img_url = response.data.data.product.product.pictureUrl;
              this.pdName = response.data.data.product.product.name;
              var spe1 =
                response.data.data.specification.specificationName1 == "" ||
                response.data.data.specification.specificationName1 == null
                  ? ""
                  : response.data.data.specification.specificationName1 +
                    "(" +
                    response.data.data.specification.specificationValue1 +
                    ")" +
                    "    ";
              var spe2 =
                response.data.data.specification.specificationName2 == "" ||
                response.data.data.specification.specificationName2 == null
                  ? ""
                  : response.data.data.specification.specificationName2 +
                    "(" +
                    response.data.data.specification.specificationValue2 +
                    ")";
              this.pdSpe = spe1 + spe2;
              this.stock = response.data.data.specification.stock;
              this.price = "￥" + response.data.data.specification.collagePrice;
              this.vipPrice =
                response.data.data.specification.ecoin == 0 ||
                response.data.data.specification.ecoin == null
                  ? "￥" + response.data.data.specification.vipPrice
                  : "￥" +
                    response.data.data.specification.vipPrice +
                    "+" +
                    response.data.data.specification.ecoin +
                    "生豆";
              this.buyPrice = "￥" + response.data.data.specification.price;
              this.template = deliveryTemplateName;
              this.ULframes = response.data.data.product.product.status;
              this.goodsDetail = response.data.data.product.product.detail;
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    }
  },
  created: function() {
    this.getData();
  }
};
</script>
<style type="text/css" scoped>
.form {
  width: 100%;
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

.btn {
  display: inline-block;
  padding: 10px 30px;
  background: #999999;
  color: #fff;
  font-weight: bold;
  border-radius: 2px;
  margin-left: 2%;
  cursor: pointer;
  margin-bottom: 150px;
}

.input {
  padding: 2px 0px 2px 42px;
  margin-bottom: 30px;
  width: 15%;
}

.input1 {
  width: 45%;
}

.input span {
  color: #333333;
  font-weight: bold;
}

.input span {
  margin-right: 9px;
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
