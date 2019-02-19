<template>
  <div class="user-container">
    <div class="user-box">
      <div class="box-center fl">
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
            <div class="btn fl" @click="refreshData">{{refresh}}</div>
            <el-form-item class="fl" prop="goodsName">
              <div class="input fl">
                <span>{{goodsName}}</span>
                <el-input
                  style="width:70%;"
                  type="text"
                  name="goodsName"
                  v-model="formItem.goodsName"
                />
              </div>
            </el-form-item>
            <el-form-item class="fl" prop="commentC">
              <div class="input fl">
                <span>{{commentCTxt}}</span>
                <el-input
                  style="width:70%;"
                  type="text"
                  name="commentC"
                  v-model="formItem.commentC"
                />
              </div>
            </el-form-item>
            <div class="btn-1 fl">{{choose}}</div>
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
            <el-table-column prop="memberId" label="买家ID" width="100" align="center"></el-table-column>
            <el-table-column prop="productName" label="评价商品" width="300" align="center"></el-table-column>
            <el-table-column prop="count" label="购买数量" width="100" align="center"></el-table-column>
            <el-table-column prop="contact" label="收件人" width="80" align="center"></el-table-column>
            <el-table-column prop="level" label="评价订单" width="100" align="center"></el-table-column>
            <el-table-column prop="expressName" label="配送快递" width="100" align="center"></el-table-column>
            <el-table-column prop="descStar" label="星数" width="50" align="center"></el-table-column>
            <el-table-column label="评价标签" width="100" align="center">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.tag" :key="index">
                  <span>{{item}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="info" label="其他评价" width="200" align="center"></el-table-column>
            <el-table-column prop="index" label="商品详情页显示" width="150" align="center"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="200" align="center"></el-table-column>
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
    const validateGoodsName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      count: "",
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
      c9: "商品分类",
      c10: "商品列表",
      c11: "商品评论",
      c15: "商品评价/",
      c16: "列表/",
      c17: "商品管理/",
      c18: "总数",
      c19: "15",
      goodsName: "商品名称",
      commentCTxt: "评论内容",
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
    edit_redirc(index) {
      this.$router.push({
        path: "/goodsComment/edit",
        name: "goodsCommentDetail",
        params: {
          id: this.custList[index].id,
          memberId: this.custList[index].memberId,
          contact: this.custList[index].contact,
          level: this.custList[index].level,
          expressName: this.custList[index].expressName,
          descStar: this.custList[index].descStar,
          tag: this.custList[index].tag,
          info: this.custList[index].info,
          createDate: this.custList[index].createDate
        }
      });
      // this.$router.push('/adminManagement/add');
      console.log();
    },
    refreshData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/productComment/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            // this.pageNo = response.data.data.pages;
            this.$Message.success("刷新成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            this.custList = [];
            for (var i = 0; i < dataArr.length; i++) {
              var index = dataArr[i].index == true ? "是" : "否";
              var tag = eval("(" + dataArr[i].tag + ")");
              this.custList.push({
                memberId: dataArr[i].memberId,
                productName: dataArr[i].productName,
                count: dataArr[i].count,
                contact: dataArr[i].contact,
                level: dataArr[i].level,
                expressName: dataArr[i].expressName,
                descStar: dataArr[i].descStar,
                tag: tag,
                info: dataArr[i].info,
                id: dataArr[i].id,
                index: index,
                createDate: dataArr[i].createDate
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
      this.currentPage = current;
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/productComment/list?pageNum=" +
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
              var index = dataArr[i].index == true ? "是" : "否";
              var tag = eval("(" + dataArr[i].tag + ")");
              this.custList.push({
                memberId: dataArr[i].memberId,
                productName: dataArr[i].productName,
                count: dataArr[i].count,
                contact: dataArr[i].contact,
                level: dataArr[i].level,
                expressName: dataArr[i].expressName,
                descStar: dataArr[i].descStar,
                tag: tag,
                info: dataArr[i].info,
                id: dataArr[i].id,
                index: index,
                createDate: dataArr[i].createDate
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
    showDetail() {
      this.$router.push("/goodsComment/edit");
    },
    request() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/productComment/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            // this.pageNo = response.data.data.pages;
            this.$Message.success("获取数据成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            for (var i = 0; i < dataArr.length; i++) {
              var index = dataArr[i].index == true ? "是" : "否";
              var tag = eval("(" + dataArr[i].tag + ")");
              this.custList.push({
                memberId: dataArr[i].memberName,
                productName: dataArr[i].productName,
                count: dataArr[i].count,
                contact: dataArr[i].contact,
                level: dataArr[i].level,
                expressName: dataArr[i].expressName,
                descStar: dataArr[i].descStar,
                tag: tag,
                info: dataArr[i].info,
                id: dataArr[i].id,
                index: index,
                createDate: dataArr[i].createDate
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
    getPageNo() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/productComment/list?pageNum=" +
            this.currentPage +
            "&pageSize=10000"
        )
        .then(
          response => {
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

.cont .btn-1 {
  padding: 12px 30px;
  background: #f2f2f2;
  color: #666;
  border-radius: 2px;
  margin-left: 10px;
  cursor: pointer;
}

.input {
  padding: 2px 0px 2px 7%;
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
