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
            <!-- <div class="btn-2 fl" @click="prohibit">{{stop}}</div> -->
            <div class="btn fl" @click="refreshData">
              <i class="el-icon-refresh"></i>
              {{refresh}}
            </div>
            <el-form-item class="fl" prop="storeName">
              <div class="input fl">
                <span>{{storeNameTxt}}</span>
                <el-input
                  style="width:75%;"
                  type="text"
                  name="storeName"
                  v-model="formItem.storeName"
                />
              </div>
            </el-form-item>
            <el-form-item class="fl" prop="phone">
              <div class="input fl">
                <span>{{phoneTxt}}</span>
                <el-input style="width:75%;" type="text" name="phone" v-model="formItem.phone"/>
              </div>
            </el-form-item>
            <div class="fl chooseBtn">
              <span style="margin:0px 5px 0px 10px;">{{auditStatusTxt}}</span>
              <el-select
                style="width: 110px;"
                v-model="formItem.columeType"
                placeholder="请选择"
                @change="auditStatusChoose"
              >
                <el-option
                  v-for="(item,index) in columeTypeArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
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
            <el-table-column label="序号" width="100" align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column label="头像" width="100" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.image" alt>
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="姓名" width="100" align="center"></el-table-column>
            <el-table-column prop="phone" label="电话" width="150" align="center"></el-table-column>
            <el-table-column prop="mail" label="邮箱" width="150" align="center"></el-table-column>
            <el-table-column prop="address" label="公司地址" width="300" align="center"></el-table-column>
            <el-table-column prop="shopNum" label="店铺数量" width="150" align="center"></el-table-column>
            <el-table-column prop="isBlackList" label="是否黑名单" width="150" align="center"></el-table-column>
            <el-table-column prop="isEnable" label="是否禁用" width="150" align="center"></el-table-column>
            <el-table-column prop="createDate" label="申请注册时间" width="200" align="center"></el-table-column>
            <el-table-column prop="auditStatus" label="审核状态" width="150" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.auditStatus == '待审核'">
                  <a class="status-btn" @click="rediret(scope.$index)">{{scope.row.auditStatus}}</a>
                </div>
                <div v-else-if="scope.row.auditStatus == '未通过'">
                  <a
                    class="status-btn status-btn1"
                    @click="rediret(scope.$index)"
                  >{{scope.row.auditStatus}}</a>
                </div>
                <div v-else>{{scope.row.auditStatus}}</div>
              </template>
            </el-table-column>
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
    const validateStoreName = (rule, value, callback) => {
      // if (value == "") {
      //   callback(new Error("请输入姓名"));
      // } else {
      //   callback();
      // }
    };
    const validatePhone = (rule, value, callback) => {
      // if (value == "") {
      //   callback(new Error("请输入电话"));
      // } else {
      //   callback();
      // }
    };
    return {
      columeTypeArr: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "待审核",
          label: "待审核"
        },
        {
          value: "不通过",
          label: "不通过"
        },
        {
          value: "已通过",
          label: "已通过"
        }
      ],
      auditStatusVal: "",
      auditStatusTxt: "审核状态",
      removeIdArr: [],
      count: "",
      label_width: "80",
      storeNameTxt: "姓名",
      phoneTxt: "电话",
      stop: "禁用",
      removeTxt: "删除",
      addTxt: "添加",
      pageNo: 1,
      currentPage: 1,
      saveData: [],
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
      c9: "商家管理",
      c10: "店铺管理",
      c11: "商家提现管理",
      c12: "商家银行卡管理",
      c13: "退货地址管理",
      c14: "配送模板管理",
      c15: "商家管理/",
      c16: "列表/",
      c17: "商家管理/",
      c18: "总数",
      refresh: "刷新",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      custList: [],
      ruleInline: {
        storeName: [
          { required: true, trigger: "blur", validator: validateStoreName }
        ],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }]
      },
      formItem: {
        storeName: "",
        phone: "",
        columeType: "全部"
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
    auditStatusChoose(value) {
      var val = "";
      val =
        value == "待审核"
          ? "Auditing"
          : value == "不通过"
          ? "UnPass"
          : value == "已通过"
          ? "Pass"
          : "";
      this.auditStatusVal = val;
      console.log("auditStatusVal", this.auditStatusVal);
    },
    selectAll(val, row) {
      console.log("全选");
      for (var i = 0; i < val.length; i++) {
        this.removeIdArr.push(val[i].id);
      }
      console.log("arr", this.removeIdArr);
    },
    // prohibit() {
    //   console.log("arr", this.removeIdArr);
    //   var ids = this.removeIdArr;
    //   this.$http
    //     .post(
    //       "" + this.URL.url + "/api/admin/merchant/unUsable",
    //       "ids=" + ids + ""
    //     )
    //     .then(
    //       response => {
    //         console.log("请求成功", response.data);
    //         if (response.data.errmsg == null) {
    //           this.$Message.success("禁用成功");
    //         } else {
    //           this.$Message.error("禁用失败");
    //         }
    //       },
    //       response => {
    //         this.$Message.error("系统出错");
    //       }
    //     );
    // },
    chooseData() {
      var auditStatusVals;
      if (this.auditStatusVal == "全部") {
        auditStatusVals = "";
      } else {
        auditStatusVals = this.auditStatusVal;
      }
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/merchant/list?userName=" +
            this.formItem.storeName +
            "&phone=" +
            this.formItem.phone +
            "&auditStatus=" +
            auditStatusVals +
            "&pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              var dataArr = response.data.data.list;
              this.custList = [];
              for (var i = 0; i < dataArr.length; i++) {
                var isBlackList = dataArr[i].isBlackList == true ? "是" : "否";
                var isEnable = dataArr[i].isEnable == true ? "否" : "是";
                var auditStatus =
                  dataArr[i].auditStatus == "UnPass"
                    ? "未通过"
                    : dataArr[i].auditStatus == "Pass"
                    ? "通过"
                    : dataArr[i].auditStatus == "Auditing"
                    ? "待审核"
                    : "";
                this.custList.push({
                  id: dataArr[i].id,
                  image: dataArr[i].image,
                  userName: dataArr[i].userName,
                  phone: dataArr[i].phone,
                  mail: dataArr[i].mail,
                  address: dataArr[i].address,
                  shopNum: dataArr[i].shopNum,
                  isBlackList: isBlackList,
                  isEnable: isEnable,
                  createDate: dataArr[i].createDate,
                  auditStatus: auditStatus
                });
              }
              this.count = this.custList.length;
              this.$Message.success("筛选成功");
            } else {
              this.$Message.error("筛选失败");
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    rediret(index) {
      this.$router.push({
        path: "/storeManagement/audit",
        name: "sinformationAudit",
        params: {
          id: this.custList[index].id
        }
      });
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
            "/api/admin/merchant/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            this.$Message.success("获取数据成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            this.custList = [];
            for (var i = 0; i < dataArr.length; i++) {
              var isBlackList = dataArr[i].isBlackList == true ? "是" : "否";
              var isEnable = dataArr[i].isEnable == true ? "否" : "是";
              var auditStatus =
                dataArr[i].auditStatus == "UnPass"
                  ? "未通过"
                  : dataArr[i].auditStatus == "Pass"
                  ? "通过"
                  : dataArr[i].auditStatus == "Auditing"
                  ? "待审核"
                  : "";
              this.custList.push({
                id: dataArr[i].id,
                image: dataArr[i].image,
                userName: dataArr[i].userName,
                phone: dataArr[i].phone,
                mail: dataArr[i].mail,
                address: dataArr[i].address,
                shopNum: dataArr[i].shopNum,
                isBlackList: isBlackList,
                isEnable: isEnable,
                createDate: dataArr[i].createDate,
                auditStatus: auditStatus
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
      this.$router.push("/userBrowseRecord/edit");
    },
    refreshData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/merchant/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            this.$Message.success("刷新成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            this.custList = [];
            for (var i = 0; i < dataArr.length; i++) {
              var isBlackList = dataArr[i].isBlackList == true ? "是" : "否";
              var isEnable = dataArr[i].isEnable == true ? "否" : "是";
              var auditStatus =
                dataArr[i].auditStatus == "UnPass"
                  ? "未通过"
                  : dataArr[i].auditStatus == "Pass"
                  ? "通过"
                  : dataArr[i].auditStatus == "Auditing"
                  ? "待审核"
                  : "";
              this.custList.push({
                id: dataArr[i].id,
                image: dataArr[i].image,
                userName: dataArr[i].userName,
                phone: dataArr[i].phone,
                mail: dataArr[i].mail,
                address: dataArr[i].address,
                shopNum: dataArr[i].shopNum,
                isBlackList: isBlackList,
                isEnable: isEnable,
                createDate: dataArr[i].createDate,
                auditStatus: auditStatus
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
    edit_redirc(index) {
      this.$router.push({
        path: "/storeManagement/edit",
        name: "storeedit",
        params: {
          id: this.custList[index].id
          // password: this.custList[index].password
        }
      });
    },
    request() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/merchant/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            this.$Message.success("获取数据成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            for (var i = 0; i < dataArr.length; i++) {
              var isBlackList = dataArr[i].isBlackList == true ? "是" : "否";
              var isEnable = dataArr[i].isEnable == true ? "否" : "是";
              var auditStatus =
                dataArr[i].auditStatus == "UnPass"
                  ? "未通过"
                  : dataArr[i].auditStatus == "Pass"
                  ? "通过"
                  : dataArr[i].auditStatus == "Auditing"
                  ? "待审核"
                  : "";
              this.custList.push({
                id: dataArr[i].id,
                image: dataArr[i].image,
                userName: dataArr[i].userName,
                phone: dataArr[i].phone,
                mail: dataArr[i].mail,
                address: dataArr[i].address,
                shopNum: dataArr[i].shopNum,
                isBlackList: isBlackList,
                isEnable: isEnable,
                createDate: dataArr[i].createDate,
                auditStatus: auditStatus
              });
            }
            this.currentPage = response.data.data.pageNum;
            this.count = this.custList.length;
            this.saveData = response.data.data;
            // this.arrLength = response.data.data.list;
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
            "/api/admin/merchant/list?pageNum=" +
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
<style type="text/css">
.el-form-item__content .el-form-item__error {
  left: 100px;
}
.status-btn {
  background: #35a8ff;
  padding: 8px 10px;
  display: inline-block;
  border-radius: 5px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
.status-btn1 {
  background: #f56c6c;
}
.chooseBtn {
  margin: 5px 40px 0px 10px;
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

.cont .btn,
.cont .btn-2 {
  padding: 12px 30px;
  background: #67c23a;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
}

.cont .btn-2 {
  background: #ff3300;
  cursor: pointer;
}

.cont .btn-1 {
  padding: 12px 30px;
  background: #409eff;
  color: #fff;
  border-radius: 4px;
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
