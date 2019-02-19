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
            <div
              class="btn fl"
              style=" background: #00CC00;margin-right:10px;"
              @click="addData()"
            >{{addTxt}}</div>
            <div class="btn fl" @click="refreshData">{{refresh}}</div>
          </el-form>
          <div class="clear"></div>
        </div>
        <div style="position: relative;" class="table">
          <el-table :data="custList" border style="width: 100%" ref="table">
            <el-table-column type="selection" width="70" align="center"></el-table-column>
            <el-table-column label="序号" width="150" align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="name" label="一级分类" width="310" align="center">
              <template slot-scope="scope">
                <span class="sortName">{{scope.row.name}}</span>
                <img
                  style="cursor: pointer;"
                  src="@/assets/add.png"
                  alt
                  @click="turn_one(scope.row.id,scope.$index)"
                >
                <img
                  style="cursor: pointer;"
                  src="@/assets/edit.png"
                  alt
                  @click="edit_redirc(scope.row.id,scope.$index)"
                >
                <img
                  style="cursor: pointer;"
                  src="@/assets/remove.png"
                  alt
                  @click="removeData(scope.row.id)"
                >
              </template>
            </el-table-column>
            <el-table-column label="二级分类" width="310" align="center">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.categoryLv2" :key="index">
                  <span class="sortName">{{item.name}}</span>
                  <img
                    style="cursor: pointer;"
                    src="@/assets/edit.png"
                    alt
                    @click="edit_redirc_2(item.id,item.name,scope.$index)"
                  >
                  <img
                    style="cursor: pointer;"
                    src="@/assets/remove.png"
                    alt
                    @click="removeData(item.id)"
                  >
                  <div
                    v-if="index+2 <= scope.row.categoryLv2.length"
                    style="border:1px solid #F4F5FA;margin-bottom:10px;"
                  ></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商家分类" width="310" align="center">
              <template slot-scope="scope">
                <div v-for="(items,index) in scope.row.categoryLv2" :key="index">
                  <p v-for="(item,index) in items.categoryLv3" :key="index">{{item.name}}</p>
                  <div
                    v-if="index+2 <= scope.row.categoryLv2.length"
                    style="border:1px solid #F4F5FA;margin-bottom:10px;"
                  ></div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="foot">
          <v-pagination
            style="margin-bottom:150px;"
            :page-no="pageNo"
            :current-no.sync="currentPage"
            @pagination="paginationClick"
          ></v-pagination>
        </div>-->
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
    const validateSortName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入分类名称"));
      } else {
        callback();
      }
    };
    return {
      count: "",
      addTxt: "添加一级分类",
      cateLv3: [],
      label_width: "80",
      sortN1: "生鲜",
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
      c15: "用户端商品分类/",
      c16: "列表/",
      c17: "商品管理/",
      c18: "总数",
      c19: "15",
      sortName: "分类名称",
      refresh: "刷新",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      custList: [],
      ruleInline: {
        sortName: [
          { required: true, trigger: "blur", validator: validateSortName }
        ]
      },
      formItem: {
        sortName: ""
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
    addData() {
      this.$router.push({
        path: "/MemberProductCategory/oneSort",
        name: "add_pconeSort"
        // params: {
        // commission: this.custList[]
        // }
      });
    },
    edit_redirc(id, index) {
      this.$router.push({
        path: "/memberProductCategory/oneSort/edit",
        name: "mponeSort_edit",
        params: {
          id: id,
          commission: this.custList[index].commission,
          image: this.custList[index].image,
          isShow: this.custList[index].isShow,
          name: this.custList[index].name,
          parentId: this.custList[index].parentId
        }
      });
      // this.$router.push('/adminManagement/add');
      console.log();
    },
    edit_redirc_2(id, name, index) {
      this.$router.push({
        path: "/memberProductCategory/twoSort/edit",
        name: "mptwoSort_edit",
        params: {
          id: id,
          commission: this.custList[index].commission,
          image: this.custList[index].image,
          isShow: this.custList[index].show,
          name: name,
          parentId: this.custList[index].id
        }
      });
    },
    refreshData() {
      this.$http
        .get("" + this.URL.url + "/api/admin/memberProductCategory/list")
        .then(
          response => {
            this.$Message.success("刷新成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data;
            this.custList = [];
            for (var i = 0; i < dataArr.length; i++) {
              this.custList.push({
                id: dataArr[i].id,
                name: dataArr[i].name,
                show: dataArr[i].show,
                categoryLv2: dataArr[i].categoryLv2
              });
            }
            this.count = this.custList.length;
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    removeData(id) {
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/memberProductCategory/delete",
          "id=" + id + ""
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
    turn_one(id, index) {
      this.$router.push({
        path: "/MemberProductCategory/twoSort",
        name: "add_pctwoSort",
        params: {
          id: id,
          parentId: this.custList[index].id,
          name: this.custList[index].name,
          commission: this.custList[index].commission
        }
      });
    },
    turn_one_3(id, name, firstName, index) {
      this.$router.push({
        path: "/goodsSort/threeSort",
        name: "addThreeSort",
        params: {
          parentId: id,
          name: name,
          firstName: firstName,
          commission: this.custList[index].commission,
          isShow: this.custList[index].show
        }
      });
    },

    request() {
      this.$http
        .get("" + this.URL.url + "/api/admin/memberProductCategory/list")
        .then(
          response => {
            console.log("请求成功", response.data);
            this.$Message.success("获取数据成功");
            var dataArr = response.data.data;
            for (var i = 0; i < dataArr.length; i++) {
              this.custList.push({
                id: dataArr[i].id,
                name: dataArr[i].name,
                show: dataArr[i].show,
                categoryLv2: dataArr[i].categoryLv2
              });
            }
            this.count = this.custList.length;
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    }
  },

  created: function() {
    this.request();
  }
};
</script>
<style type="text/css">
.el-form-item__content .el-form-item__error {
  left: 113px;
}

.sortName {
  display: inline-block;
  vertical-align: top;
  padding-top: 5px;
}

.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
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
