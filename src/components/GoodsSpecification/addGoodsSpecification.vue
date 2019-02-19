<template>
  <div class="user-container">
    <div class="user-box">
      <div class="box-center">
        <div class="tips">
          <span>{{c17}}</span>
          <span>{{c15}}</span>
          <span>{{c16}}</span>
        </div>
        <div class="cont">
          <form
            class="fl"
            :model="formItem"
            ref="formItem"
            :rules="ruleInline"
            :label-width="80"
            style="margin-bottom: 20px;"
          >
            <formItem class="fl" label="规格名称" prop="speName">
              <div class="input fl">
                <span>{{speName}}</span>
                <input type="text" name="speName" v-model="formItem.speName">
              </div>
            </formItem>
          </form>
          <div style="clear: both;margin: 0px 0px 0px 3%;height: 44px;">
            <div class="btn-1 fl" @click="request">{{choose}}</div>
            <div class="btn-2 fl" @click="turn">{{cancel}}</div>
          </div>
          <div class="clear"></div>
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
    const validateSpeName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      cancel: "取消",
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
      c9: "商品规格",
      c10: "商品列表",
      c11: "商品评论",
      c15: "商品规格/",
      c16: "添加产品规格",
      c17: "商品管理/",
      speName: "规格名称",
      refresh: "刷新",
      vip: "是否会员",
      choose: "确定",
      edit: "编辑",
      remove: "删除",
      custList: [
        { c1: "01", c2: "味道" },
        { c1: "02", c2: "重量" },
        { c1: "03", c2: "颜色" },
        { c1: "04", c2: "尺码" },
        { c1: "05", c2: "材质" },
        { c1: "06", c2: "包装" }
      ],
      ruleInline: {
        speName: [
          { required: true, trigger: "blur", validator: validateSpeName }
        ]
      },
      formItem: {
        speName: ""
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
    turn() {
      this.$router.push("/goodsManage/goodsSpecification");
    },
    request() {
      this.$http
        .post(
          " " + this.URL.url + "/api/admin/specification/add",
          "name=" + this.formItem.speName + ""
        )
        .then(
          response => {
            if (response.data.errmsg == null) {
              this.$notify.success("添加商品规格成功");
              this.turn();
            } else {
              this.$Message.error("添加商品规格失败");
            }

            console.log("请求成功", response.data);
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
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

.cont .btn-1,
.cont .btn-2 {
  padding: 12px 30px;
  background: #169bd5;
  color: #fff;
  border-radius: 8px;
  margin-left: 20px;
  cursor: pointer;
}

.cont .btn-2 {
  color: #666;
  border: 1px solid #666;
  background: #fff;
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
