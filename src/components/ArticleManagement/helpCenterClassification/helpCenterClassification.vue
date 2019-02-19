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
          <div class="btn-2 fl" style="background: #00CC00" @click="add">{{addTxt}}</div>
          <div class="btn-2 fl" @click="removeData">{{removeTxt}}</div>
          <div class="btn fl" @click="refreshData">{{refresh}}</div>
          <div class="clear"></div>
        </div>
        <div style="position: relative;" class="table">
          <el-table
            :data="custList"
            border
            style="width: 100%;"
            @select="selectionChange"
            @select-all="selectAll"
            ref="table"
          >
            <el-table-column type="selection" width="70" align="center"></el-table-column>
            <el-table-column label="序号" width="100" align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="name" label="分类名称" width="200" align="center">
              <template slot-scope="scope">
                <span class="img_p">{{scope.row.name}}</span>
                <img
                  style="cursor: pointer;"
                  src="@/assets/search.png"
                  alt
                  @click="edit_redirc(scope.$index)"
                >
              </template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="200" align="center"></el-table-column>
            <el-table-column prop="c4" label="创建人" width="150" align="center"></el-table-column>
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
    return {
      removeIdArr: [],
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

      c9: "规则分类",
      c10: "规则列表",
      // c11:'限时秒杀管理',
      // c12:'清仓专场管理',
      // c13:'1元抢购管理',
      c14: "帮助中心分类",
      c9_: "帮助中心列表",
      // c10_:'普通占位广告管理',

      c15: "帮助中心分类/",
      c16: "列表/",
      c17: "文章管理/",
      c18: "总数",
      count: "",
      refresh: "刷新",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      custList: []
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
    selectAll(val, row) {
      console.log("全选");
      for (var i = 0; i < val.length; i++) {
        this.removeIdArr.push(val[i].id);
      }
      console.log("arr", this.removeIdArr);
    },
    edit_redirc(index) {
      this.$router.push({
        path: "/helpCenterClassification/edit",
        name: "editClassification",
        params: {
          id: this.custList[index].id
        }
      });
    },
    removeData() {
      console.log("arr", this.removeIdArr);
      var ids = this.removeIdArr;
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/helpCategory/delete",
          "ids=" + ids + ""
        )
        .then(
          response => {
            this.$notify.success("删除成功");
            this.refreshData();
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    refreshData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/helpCategory/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("刷新成功");
              var dataArr = response.data.data.list;
              this.custList = [];
              for (var i = 0; i < dataArr.length; i++) {
                this.custList.push({
                  id: dataArr[i].id,
                  name: dataArr[i].name,
                  createDate: dataArr[i].createDate
                });
              }
              this.currentPage = response.data.data.pageNum;
              this.count = response.data.data.total;
            } else {
              this.$Message.error("刷新失败");
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    selectionChange: function(val, row) {
      console.log("i", row.id);
      this.removeIdArr.push(row.id);
    },
    paginationClick(current) {
      //响应点击后子组件当前页码
      this.currentPage = current;
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/helpCategory/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("获取数据成功");
              var dataArr = response.data.data.list;
              this.custList = [];
              for (var i = 0; i < dataArr.length; i++) {
                this.custList.push({
                  id: dataArr[i].id,
                  name: dataArr[i].name,
                  createDate: dataArr[i].createDate
                });
              }
              this.currentPage = response.data.data.pageNum;
              this.count = response.data.data.total;
            } else {
              this.$Message.error("获取数据失败");
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      console.log(current);
    },
    add() {
      this.$router.push("/helpCenterClassification/add");
    },
    getData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/helpCategory/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("获取数据成功");
              var dataArr = response.data.data.list;
              for (var i = 0; i < dataArr.length; i++) {
                this.custList.push({
                  id: dataArr[i].id,
                  name: dataArr[i].name,
                  createDate: dataArr[i].createDate
                });
              }
              this.currentPage = response.data.data.pageNum;
              this.count = this.custList.length;
            } else {
              this.$Message.error("获取数据失败");
            }
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
            "/api/admin/helpCategory/list?pageNum=" +
            this.currentPage +
            "&pageSize=10000"
        )
        .then(
          response => {
            this.$notify.success("获取页码成功");
            console.log("请求成功", response.data);
            this.pageNo =
              response.data.data.total % 20 == 0
                ? Number.parseInt(response.data.data.total / 20)
                : Number.parseInt(response.data.data.total / 20) + 1;
            console.log("pageNo", this.pageNo);
            this.currentPage = response.data.data.pageNum;
            this.getData();
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    }
  },
  created() {
    this.getPageNo();
  }
};
</script>
<style>
.img_p {
  display: inline-block;
  vertical-align: top;
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

.cont .btn,
.cont .btn-2 {
  padding: 12px 30px;
  background: #ff9900;
  color: #fff;
  font-weight: bold;
  border-radius: 2px;
  margin-right: 10px;
  cursor: pointer;
}

.cont .btn-2 {
  background: #ff3300;
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
