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
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 0%;">
              <span class="c1">{{c18}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input
                type="text"
                name="advertiseName"
                style="height: 40px;border: 1px solid #A9A9A9;"
                v-model="advertiseName"
              >
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 0%;">
              <span class="c1">{{c19}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <el-form ref="baseForm" :model="baseForm" size class="base-form">
                <uploadList
                  v-model="baseForm.listPic"
                  :max-length="1"
                  label="广告图片"
                  prop="listPic"
                  @getListPic="getListPic"
                />
              </el-form>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 0%;">
              <span class="c1">{{c20}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input
                style="margin-right: 10px;width: 16px;height: 16px;"
                type="radio"
                name="outChain"
                value="0"
                v-model="pick"
                @change="statusChange"
              >
              <label style="margin-right: 10px;" for="0">{{outChainTxt}}</label>
              <input
                style="margin-right: 10px;width: 16px;height: 16px;"
                type="radio"
                name="h5"
                value="1"
                v-model="pick"
                @change="statusChange"
              >
              <label style="margin-right: 10px;" for="1">{{h5Txt}}</label>
            </div>
          </div>
          <div class="con wl">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 0%;">
              <span class="c1">{{c21}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input
                type="text"
                name="outerChain"
                style="height: 40px;border: 1px solid #A9A9A9;"
                v-model="outerChain"
              >
              <span style="margin-left:10px;">{{notice}}</span>
            </div>
          </div>
          <div class="con content">
            <div
              style="display: inline-block;text-align: left;width: 20%;margin-right: 0%;vertical-align: top;"
            >
              <span class="c1">{{c22}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <v-tinymce ref="editor" :height="400" v-model="formItem.content"></v-tinymce>
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;margin-right: 0%;">
              <span class="c1">{{c23}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input
                type="text"
                name="order"
                style="height: 40px;border: 1px solid #A9A9A9;"
                v-model="order"
              >
            </div>
          </div>
          <div class="btn" @click="updateData">{{submitTxt}}</div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/Page";
import Tinymce from "@/components/Tinymce";
import UploadList from "@/components/UploadListItem/uploadList1";
export default {
  name: "user",
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error"
        });
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };

    const validateStoreId = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    return {
      notice: "注：请输入带有http://格式的网址",
      baseForm: {
        listPic: ""
      },
      advertiseName: "",
      outerChain: "",
      order: "",
      ImigUrl: "src/assets/addImg.png",
      submitTxt: "提交",
      outChainTxt: "外链",
      h5Txt: "H5内容",
      pick: 0,
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

      c15: "商品广告管理/",
      c16: "编辑商品广告",
      c17: "营销管理/",

      c18: "广告名称",
      c19: "广告图片",
      c20: "类型",
      c21: "外链",
      c22: "点击内容",
      c23: "排序",
      refresh: "刷新",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      custList: [],
      ruleInline: {
        storeId: [
          { required: true, trigger: "blur", validator: validateStoreId }
        ],
        content: [{ validator: validateRequire }]
      },
      formItem: {
        storeId: "",
        content: ""
      }
    };
  },
  components: {
    "v-pagination": pagination,
    "v-tinymce": Tinymce,
    UploadList
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
    statusChange() {
      if (this.pick == 0) {
        $(".content").hide();
        $(".wl").show();
        console.log("为0");
      } else {
        $(".wl").hide();
        $(".content").show();
        console.log("为1");
      }
    },
    getListPic(pic) {
      this.baseForm.listPic = pic;
    },
    updateData() {
      var id = this.$route.params.id;
      var type;
      var a = this.formItem.content.replace("<p>", "");
      var detail = a.replace("</p>", "");
      if (this.pick == 0) {
        type = "Link";
      } else if (this.pick == 1) {
        type = "H5";
      }
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/adproduct/update",
          "adName=" +
            this.advertiseName +
            "&connection=" +
            this.outerChain +
            "&detail=" +
            detail +
            "&id=" +
            id +
            "&order=" +
            this.order +
            "&picture=" +
            this.baseForm.listPic +
            "&type=" +
            type +
            ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$notify.success("更新商品广告成功");
              console.log("数据", response.data.data);
              this.$router.push({
                path: "/marketingManagement/commodityA"
              });
            } else {
              this.$Message.error("更新商品广告失败");
            }
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
    getData() {
      var id = this.$route.params.id;
      this.$http
        .get("" + this.URL.url + "/api/admin/adproduct/edit?id=" + id + "")
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("编辑广告成功");
              console.log("数据", response.data.data);
              this.advertiseName = response.data.data.adName;
              this.baseForm.listPic = response.data.data.picture;
              this.outerChain = response.data.data.connection;
              this.formItem.content = response.data.data.detail;
              this.order = response.data.data.order;
              if (response.data.data.type == "H5") {
                this.pick = 1;
                this.statusChange();
              } else if (response.data.data.type == "外链") {
                this.pick = 0;
                this.statusChange();
              }
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      // console.log(this.dataArr_.username);
    }
  },
  created: function() {
    this.getData();
  }
};
</script>
<style type="text/css" scoped>
#fileToUpload {
  /*visibility: hidden;*/
  display: none;
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
  width: 100%;
  margin-top: 10px;
}

.cont .con {
  width: 100%;
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
  background: #ececec;
  color: #333333;
  border-radius: 2px;
  margin-right: 10px;
  border: 1px solid black;
  cursor: pointer;
  margin-bottom: 150px;
}

.table {
  width: 50%;
}

.title {
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
