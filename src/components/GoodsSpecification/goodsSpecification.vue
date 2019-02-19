<template>
  <div class="user-container">
    <div class="user-box">
      <div class="box-center">
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
            <div class="btn-3 fl" style="margin-right: 10px;" @click="addData">{{addTxt}}</div>
            <div class="btn fl" @click="refreshData">{{refresh}}</div>
            <!-- <div class="btn-2 fl" @click="removeData()">{{removeTxt}}</div> -->
            <el-form-item class="fl" prop="speName">
              <div class="input fl">
                <span>{{speName}}</span>
                <el-input style="width:70%;" type="text" name="speName" v-model="formItem.speName"/>
              </div>
            </el-form-item>
            <div class="btn-1 fl" @click="chooseData">{{choose}}</div>
          </el-form>
          <div class="clear"></div>
        </div>
        <div style="position: relative;" class="table">
          <el-table
            :data="custList"
            border
            style="width: 100%;"
            @select="selectionChange"
            ref="table"
          >
            <el-table-column type="selection" width="70" align="center"></el-table-column>
            <el-table-column label="序号" width="150" align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="name" label="规格名称" width="200" align="center"></el-table-column>
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
    const validateSpeName = (rule, value, callback) => {
      // if (value == "") {
      //   callback(new Error("请输入规格名称"));
      // } else {
      //   callback();
      // }
    };
    return {
      count: "",
      remove_id: null,
      label_width: "80",
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
      c9: "商品规格",
      c10: "商品列表",
      c11: "商品评论",
      c15: "商品规格/",
      c16: "列表/",
      c17: "商品管理/",
      c18: "总数",
      c19: "15",
      speName: "规格名称",
      refresh: "刷新",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      custList: [],
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
    chooseData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/specification/list?pageNum=" +
            this.currentPage +
            "&pageSize=20&name=" +
            this.formItem.speName +
            ""
        )
        .then(
          response => {
            this.$Message.success("筛选成功");
            console.log("请求成功", response.data);
            this.custList = [];
            var dataArr = response.data.data.list;
            for (var i = 0; i < dataArr.length; i++) {
              this.custList.push({
                name: dataArr[i].name,
                id: dataArr[i].id
              });
            }
            this.count = this.custList.length;
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    removeData() {
      var id = this.custList[this.remove_id].id;
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/specification/delete",
          "ids=" + id + ""
        )
        .then(
          response => {
            this.$Message.success("删除成功");
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    addData() {
      this.$router.push({
        path: "/goodsSpecification/add",
        name: "addGoodsSpecification"
        // params: {
        // name: this.custList[]
        // }
      });
    },
    refreshData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/specification/list?pageNum=" +
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
              this.custList.push({
                name: dataArr[i].name,
                id: dataArr[i].id
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
    request() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/specification/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            this.$Message.success("获取数据成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            for (var i = 0; i < dataArr.length; i++) {
              this.custList.push({
                name: dataArr[i].name,
                id: dataArr[i].id
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
      val.forEach((val, index) => {
        this.custList.forEach((v, i) => {
          // id 是每一行的数据id
          if (val.id == v.id) {
            console.log(i);
            this.remove_id = i;
          }
        });
      });
    },
    paginationClick(current) {
      //响应点击后子组件当前页码
      this.currentPage = current;
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/specification/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            // this.pageNo = response.data.data.pages;
            this.$Message.success("获取数据成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            this.custList = [];
            for (var i = 0; i < dataArr.length; i++) {
              this.custList.push({
                name: dataArr[i].name,
                id: dataArr[i].id
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
        path: "/goodsSpecification/edit",
        name: "editGoodsSpecification",
        params: {
          id: this.custList[index].id
        }
      });
      // this.$router.push('/adminManagement/add');
      console.log();
    },
    getPageNo() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/specification/list?pageNum=" +
            this.currentPage +
            "&pageSize=10000"
        )
        .then(
          response => {
            // this.pageNo = response.data.data.pages;
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
  left: 113px;
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

.cont .btn-1,
.cont .btn-2,
.cont .btn-3 {
  padding: 12px 30px;
  background: #f2f2f2;
  color: #666;
  border-radius: 2px;
  margin-left: 10px;
  cursor: pointer;
}

.cont .btn-2 {
  color: #fff;
  background: #ff3300;
}

.cont .btn-3 {
  color: #fff;
  background: #00cc00;
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
