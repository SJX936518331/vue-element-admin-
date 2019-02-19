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
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c18}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input
                type="text"
                name="userName"
                style="height: 40px;border: 1px solid #A9A9A9;"
                v-model="userName"
              >
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c19}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input
                type="password"
                name="password"
                style="height: 40px;border: 1px solid #A9A9A9;"
                v-model="pwd"
              >
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c20}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input
                type="password"
                name="repassword"
                style="height: 40px;border: 1px solid #A9A9A9;"
                v-model="rePwd"
                @blur="validatePd"
              >
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c21}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input
                type="text"
                name="userN"
                style="height: 40px;border: 1px solid #A9A9A9;"
                v-model="name_"
              >
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c22}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input
                type="text"
                name="depaetment"
                style="height: 40px;border: 1px solid #A9A9A9;"
                v-model="department"
              >
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c23}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input
                type="text"
                name="email"
                style="height: 40px;border: 1px solid #A9A9A9;"
                v-model="email"
              >
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c24}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <el-checkbox
                v-for="(role,index) in roles"
                :label="role.name"
                :key="index"
                @change="changeVal(role.id,role.name)"
              >{{role.name}}</el-checkbox>
              <!-- <label class="lable_1" style="margin-right: 20px;">
                {{adminTxt1}}
                <input
                  style="margin-left: 10px;width: 15px;height: 15px;"
                  type="checkbox"
                  v-model="formItem.admin1"
                  @change="getValue()"
                >
              </label>
              <label class="lable_2" style="margin-right: 20px;">
                {{adminTxt2}}
                <input
                  style="margin-left: 10px;width: 15px;height: 15px;"
                  type="checkbox"
                  v-model="formItem.admin2"
                  @change="getValue()"
                >
              </label>
              <label class="lable_3">
                {{adminTxt3}}
                <input
                  style="margin-left: 10px;width: 15px;height: 15px;"
                  type="checkbox"
                  v-model="formItem.admin3"
                  @change="getValue()"
                >
              </label>-->
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c25}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <v-toggle v-model="toggleTxt" text @change="changeStatus"></v-toggle>
            </div>
          </div>
          <div
            class="btn fl"
            style="background: #2E92DD;border:1px solid #2E92DD;"
            @click="addData()"
          >{{btnTxt1}}</div>
          <div class="btn fl" @click="turn">{{btnTxt}}</div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/Page";
import toggle from "@/components/Toggle/toggle";
import $ from "jquery";
import md5 from "js-md5";
export default {
  name: "user",
  data() {
    const validateStoreId = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    return {
      rArr: [],
      saveArr: [],
      roles: [],
      dataArr: [],
      dataArr_: [],
      userName: "",
      pwd: "",
      rePwd: "",
      name_: "",
      department: "",
      email: "",
      loginFailureCount: 1,
      toggleTxt: false,
      isSystem: false,
      adminTxt1: "普通管理员",
      adminTxt2: "超级管理员",
      adminTxt3: "一般管理员",
      label_txt: "",
      btnTxt: "取消",
      btnTxt1: "确定",
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
      c9: "管理员管理",
      c10: "角色管理",
      c14: "系统管理",
      c15: "管理员管理/",
      c16: "新增管理员",
      c17: "系统管理/",
      c18: "用户名",
      c19: "密码",
      c20: "确认密码",
      c21: "姓名",
      c22: "部门",
      c23: "邮箱",
      c24: "角色",
      c25: "是否禁用",
      refresh: "刷新",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      custList: [],
      ruleInline: {
        storeId: [
          { required: true, trigger: "blur", validator: validateStoreId }
        ]
      },
      formItem: {
        storeId: "",
        admin1: false,
        admin2: false,
        admin3: false
      }
    };
  },
  components: {
    "v-pagination": pagination,
    "v-toggle": toggle
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
    changeVal(id) {
      console.log("id", id);
      this.getRolesData(id);
    },
    getRolesData(id) {
      this.$http.get("" + this.URL.url + "/api/role/edit?id=" + id + "").then(
        response => {
          this.$Message.success("查看角色详情成功");
          console.log("请求成功", response.data);
          this.rArr.push({
            description: response.data.data.description,
            isSystem: response.data.data.isSystem,
            id: response.data.data.id,
            name: response.data.data.name,
            authorities: response.data.data.authorities
          });
        },
        response => {
          this.$Message.error("系统出错");
        }
      );
      console.log("rolesArr", this.rArr);
    },
    getRoles() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/role/list?pageNum=" +
            this.currentPage +
            "&pageSize=20"
        )
        .then(
          response => {
            this.$Message.success("获取数据成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            var date = new Date().toLocaleTimeString();
            for (var i = 0; i < dataArr.length; i++) {
              this.roles.push({
                name: dataArr[i].name,
                isSystem: dataArr[i].isSystem == false ? "否" : "是",
                description: dataArr[i].description,
                date: date,
                id: dataArr[i].id,
                authorities: dataArr[i].authorities
              });
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    open2() {
      this.$confirm("你确定要禁用吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.toggleTxt = true;
        })
        .catch(() => {
          this.toggleTxt = false;
        });
    },
    changeStatus(value) {
      console.log("value", value);
      this.toggleTxt = value;
      if (this.toggleTxt === true) {
        this.open2();
      }
    },
    validatePd() {
      if (this.pwd == this.rePwd) {
        console.log("一致");
      } else {
        console.log("不一致");
        this.$notify.error("密码不一致，请重新输入");
        this.rePwd = "";
      }
    },
    addData() {
      var array = JSON.stringify(this.rArr);
      console.log("log", array);
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/add",
          "department=" +
            this.department +
            "&email=" +
            this.email +
            "&isEnabled=" +
            this.toggleTxt +
            "&isLocked=false&loginFailureCount=0&name=" +
            this.name_ +
            "&password=" +
            md5(this.pwd) +
            // "&roles|2=" +
            "&roles|2=" +
            array +
            "&username=" +
            this.userName +
            ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("管理员添加成功");
              console.log("数据", response.data.data);
              this.turn();
            } else {
              this.$Message.error("管理员添加失败");
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    // getValue() {
    //   if (
    //     this.formItem.admin1 == true &&
    //     this.formItem.admin2 == false &&
    //     this.formItem.admin3 == false
    //   ) {
    //     this.label_txt = $(".lable_1")
    //       .text()
    //       .trim();
    //     console.log(this.label_txt);
    //   } else if (
    //     this.formItem.admin1 == false &&
    //     this.formItem.admin2 == true &&
    //     this.formItem.admin3 == false
    //   ) {
    //     this.label_txt = $(".lable_2")
    //       .text()
    //       .trim();
    //     this.isSystem = true;
    //     console.log(this.label_txt);
    //   } else if (
    //     this.formItem.admin1 == false &&
    //     this.formItem.admin2 == false &&
    //     this.formItem.admin3 == true
    //   ) {
    //     this.label_txt = $(".lable_3")
    //       .text()
    //       .trim();
    //     console.log(this.label_txt);
    //   } else {
    //     console.log("都没选中");
    //   }
    // },
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
    turn() {
      this.$router.push("/systemManagement/adminManagement");
    }
  },
  created() {
    this.getRoles();
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

.cont {
  font-family: "微软雅黑";
  font-size: 18px;
  color: black;
  width: 100%;
  margin-top: 10px;
}

.cont .con {
  width: 93%;
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
  background: #fff;
  color: black;
  font-weight: bold;
  border-radius: 21px;
  margin-right: 10px;
  border: 1px solid black;
  cursor: pointer;
}

.table {
  width: 50%;
}

/*.table-box .t2 {
  width: 90%;
}

.table-box .t3 {
  width: 50%;
}

.table-box .t4 {
  width: 80%;
}*/

.title

/*.table-box .t2 .title,
.table-box .t3 .title,
.table-box .t4 .title*/
 {
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
