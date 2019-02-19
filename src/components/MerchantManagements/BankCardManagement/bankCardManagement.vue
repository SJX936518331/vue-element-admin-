<template>
  <div class="user-container">
    <!-- <div class="user_head">
      <img class="logo" src="@/assets/404_images/404.png" alt>
      <div class="hd">
        <ul>
          <li class="fl">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c1}}</div>
          </li>
          <li class="fl">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c2}}</div>
          </li>
          <li class="fl">
            <div class="logo_ choose fl">{{txt}}</div>
            <div class="text fl text_chose">{{c3}}</div>
          </li>
          <li class="fl">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c4}}</div>
          </li>
          <li class="fl">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c5}}</div>
          </li>
          <li class="fl">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c6}}</div>
          </li>
          <li class="fl">
            <svg-icon class="logo_admin fl" icon-class="admin"/>
            <div class="text fl">{{c7}}</div>
          </li>
          <li class="fl">
            <div class="text fl">{{c8}}</div>
            <svg-icon class="logo_admin fl" icon-class="logout"/>
          </li>
          <div class="clear"></div>
        </ul>
      </div>
    </div>-->
    <div class="user-box">
      <!-- <div class="user_aside fl">
        <ul>
          <li class="border-first">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c9}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c10}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c11}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c12}}</div>
            <div class="ps"></div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c13}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_ fl">{{txt}}</div>
            <div class="text fl">{{c14}}</div>
            <div class="clear"></div>
          </li>
        </ul>
      </div>-->
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
            <el-form-item class="fl" prop="storeA">
              <div class="input fl">
                <span>{{storeATxt}}</span>
                <el-input style="width:70%;" type="text" name="storeA" v-model="formItem.storeA"/>
              </div>
            </el-form-item>
            <el-form-item class="fl" prop="phone">
              <div class="input fl">
                <span>{{phoneTxt}}</span>
                <el-input style="width:70%;" type="text" name="phone" v-model="formItem.phone"/>
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
            <el-table-column prop="cardId" label="序号" width="100" align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="userName" label="商家" width="150" align="center"></el-table-column>
            <el-table-column prop="phone" label="商家账号" width="100" align="center"></el-table-column>
            <el-table-column prop="cardNumber" label="银行卡卡号" width="150" align="center"></el-table-column>
            <el-table-column prop="bank" label="银行" width="100" align="center"></el-table-column>
            <el-table-column prop="subBranch" label="所属支行" width="200" align="center"></el-table-column>
            <el-table-column prop="bindPhone" label="绑定电话" width="150" align="center"></el-table-column>
            <el-table-column prop="bindTime" label="绑定时间" width="200" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <img
                  style="cursor: pointer;"
                  src="@/assets/search.png"
                  alt
                  @click="edit_redirc(scope.$index)"
                >
                <!-- <el-button size="mini" @click="edit_redirc(scope.$index)">{{edit}}</el-button> -->
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
    const validateStoreA = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入商家"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入电话"));
      } else {
        callback();
      }
    };
    return {
      count: "",
      label_width: "80",
      storeATxt: "商家",
      phoneTxt: "绑定电话",
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
      c9: "商家管理",
      c10: "店铺管理",
      c11: "商家提现管理",
      c12: "商家银行卡管理",
      c13: "退货地址管理",
      c14: "配送模板管理",
      c15: "商家银行卡管理/",
      c16: "列表/",
      c17: "商家管理/",
      c18: "总数",
      c19: "15",
      refresh: "刷新",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      custList: [],
      ruleInline: {
        storeA: [
          { required: true, trigger: "blur", validator: validateStoreA }
        ],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }]
      },
      formItem: {
        storeA: "",
        phone: ""
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
            "/api/admin/MerchantBankCard/list?userName=" +
            this.formItem.storeA +
            "&phone=" +
            this.formItem.phone +
            ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              var dataArr = response.data.data.list;
              this.custList = [];
              for (var i = 0; i < dataArr.length; i++) {
                this.custList.push({
                  cardId: dataArr[i].cardId,
                  userName: dataArr[i].userName,
                  phone: dataArr[i].phone,
                  cardNumber: dataArr[i].cardNumber,
                  bank: dataArr[i].bank,
                  subBranch: dataArr[i].subBranch,
                  bindPhone: dataArr[i].bindPhone,
                  bindTime: dataArr[i].bindTime
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
    refreshData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/MerchantBankCard/list?pageNum=" +
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
              this.custList.push({
                cardId: dataArr[i].cardId,
                userName: dataArr[i].userName,
                phone: dataArr[i].phone,
                cardNumber: dataArr[i].cardNumber,
                bank: dataArr[i].bank,
                subBranch: dataArr[i].subBranch,
                bindPhone: dataArr[i].bindPhone,
                bindTime: dataArr[i].bindTime
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
            "/api/admin/MerchantBankCard/list?pageNum=" +
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
              this.custList.push({
                cardId: dataArr[i].cardId,
                userName: dataArr[i].userName,
                phone: dataArr[i].phone,
                cardNumber: dataArr[i].cardNumber,
                bank: dataArr[i].bank,
                subBranch: dataArr[i].subBranch,
                bindPhone: dataArr[i].bindPhone,
                bindTime: dataArr[i].bindTime
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
    edit_redirc(index) {
      this.$router.push({
        path: "/bankCardManagement/edit",
        name: "bankCardEdit",
        params: {
          id: this.custList[index].cardId
          // password: this.custList[index].password
        }
      });
    },
    request() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/MerchantBankCard/list?pageNum=" +
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
                cardId: dataArr[i].cardId,
                userName: dataArr[i].userName,
                phone: dataArr[i].phone,
                cardNumber: dataArr[i].cardNumber,
                bank: dataArr[i].bank,
                subBranch: dataArr[i].subBranch,
                bindPhone: dataArr[i].bindPhone,
                bindTime: dataArr[i].bindTime
              });
            }
            this.count = this.custList.length;
            this.currentPage = response.data.data.pageNum;
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
            "/api/admin/MerchantBankCard/list?pageNum=" +
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

.cont .btn,
.cont .btn-1 {
  padding: 12px 30px;
  background: #ff9900;
  color: #fff;
  font-weight: bold;
  border-radius: 2px;
  margin-right: 10px;
  cursor: pointer;
}

.cont .btn-1 {
  background: #f2f2f2;
  color: #666;
  margin-left: 10px;
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
