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
          <el-form :model="formItem" ref="formItem" :rules="ruleInline" :label-width="label_width">
            <el-form-item prop="buyserId">
              <div class="input">
                <span>{{buyserIdTxt}}</span>
                <span>{{buyserId}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="addressee">
              <div class="input">
                <span>{{addresseeTxt}}</span>
                <span>{{addressee}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="evaluationOrder">
              <div class="input">
                <span>{{evaluationOrderTxt}}</span>
                <span>{{evaluationOrder}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="express">
              <div class="input">
                <span>{{expressTxt}}</span>
                <span>{{express}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="num">
              <div class="input fl">
                <span>{{numTxt}}</span>
                <div v-for="(item,index) in str" :key="index" style="display:inline-block;">
                  <span v-if="item.id >= 1">
                    <img style="vertical-align: middle;" src="@/assets/start.png" alt>
                  </span>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="evaluationTag">
              <div class="input">
                <span>{{evaluationTagTxt}}</span>
                <div
                  v-for="(item,index) in evaluationTag"
                  :key="index"
                  style="display:inline-block;margin-right:10px;"
                >
                  <span
                    style="padding: 0px 25px;background: #F2F2F2;color:black;display:inline-block;width:100%;"
                  >{{item}}</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="otherEvaluation">
              <div class="input">
                <span>{{otherEvaluationTxt}}</span>
                <span>{{otherEvaluation}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="createTime">
              <div class="input">
                <span>{{createTimeTxt}}</span>
                <span style="margin-right:0px;">{{createTime}}</span>
              </div>
              <div class="btn" @click="showDetail">{{goHmoeTxt}}</div>
            </el-form-item>
          </el-form>
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
    const validateGoodsName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      label_width: "80",
      str: [],
      buyserIdTxt: "买家ID",
      buyserId: "",
      addresseeTxt: "收件人",
      addressee: "",
      evaluationOrderTxt: "评价订单",
      evaluationOrder: "",
      expressTxt: "配送快递",
      express: "",
      numTxt: "星数",
      evaluationTagTxt: "评价标签",
      evaluationTag: "",
      otherEvaluationTxt: "其他评价",
      otherEvaluation: "",
      createTimeTxt: "创建时间",
      createTime: "",
      goHmoeTxt: "返回",

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
      c15: "商品评价/",
      c16: "详情",
      c17: "商品管理/",
      goodsName: "商品名称",
      refresh: "刷新",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
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

  methods: {
    showDetail() {
      this.$router.push("/goodsManage/goodsComment");
    },
    getData() {
      var memberId = this.$route.params.memberId;
      var contact = this.$route.params.contact;
      var level = this.$route.params.level;
      var expressName = this.$route.params.expressName;
      var descStar = this.$route.params.descStar;
      var tag = this.$route.params.tag;
      var info = this.$route.params.info;
      var createDate = this.$route.params.createDate;
      this.buyserId = memberId;
      this.addressee = contact;
      this.evaluationOrder = level;
      this.express = expressName;
      for (var i = 0; i < Number.parseInt(descStar); i++) {
        this.str.push({ id: i + 1 });
      }
      // $(".start").append(this.str);
      // console.log("ele", $(".start").text());
      // console.log("str", this.str);
      this.evaluationTag = tag;
      this.otherEvaluation = info;
      this.createTime = createDate;
    }
  },
  created() {
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
  padding: 0px 30px;
  background: #fff;
  color: black;
  font-weight: bold;
  border-radius: 2px;
  margin-left: 2%;
  margin-bottom: 150px;
  border: 1px solid #666;
  cursor: pointer;
}

.input {
  padding: 2px 0px 2px 42px;
  margin-bottom: 30px;
}

.input {
  padding: 2px 0px 2px 42px;
  margin-bottom: 30px;
  width: 100%;
}

.input span {
  color: #333333;
  font-weight: bold;
}

.input span {
  margin-right: 18%;
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
