<template>
  <div class="user-container">
    <!-- <div class="user_head">
      <img class="logo" src="@/assets/404_images/404.png" alt="">
      <div class="hd">
        <ul>
          <li class="fl">
            <div class="logo_ choose fl">{{txt}}</div>
            <div class="text fl text_chose">{{c1}}</div>
          </li>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c2}}</div>
          </li>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c3}}</div>
          </li>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c4}}</div>
          </li>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c5}}</div>
          </li>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c6}}</div>
          </li>
          <li class="fl">
            <svg-icon class="logo_admin fl" icon-class="admin" />
            <div class="text fl">{{c7}}</div>
          </li>
          <li class="fl">
            <div class="text fl">{{c8}}</div>
            <svg-icon class="logo_admin fl" icon-class="logout" />
          </li>
          <div class="clear"></div>
        </ul>
      </div>
    </div>-->
    <div class="user-box">
      <!-- <div class="user_aside fl">
        <ul>
          <li class="border-first">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c5}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c9}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c10}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c11}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c12}}</div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c13}}</div>
            <div class="ps"></div>
            <div class="clear"></div>
          </li>
          <li class="border-first">
            <div class="logo_  fl">{{txt}}</div>
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
            <div class="btn fl">{{refresh}}</div>
            <el-form-item class="fl" prop="account">
              <div class="input fl">
                <span>{{account}}</span>
                <el-input style="width:70%;" type="text" name="account" v-model="formItem.account"/>
              </div>
            </el-form-item>
            <el-form-item class="fl" prop="isVip" style="padding: 8px 10px;">
              <span style="margin:0px 5px 0px 10px;">{{vip}}</span>
              <el-select style="width: 110px;" v-model="formItem.columeType" placeholder="请选择">
                <el-option
                  v-for="(item,index) in columeTypeArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <div class="btn-1 fl">{{choose}}</div>
          </el-form>
          <div class="clear"></div>
        </div>
        <div class="table">
          <el-table
            :data="custList"
            border
            style="width: 100%"
            @select="selectionChange"
            ref="table"
          >
            <el-table-column type="selection" width="70" align="center"></el-table-column>
            <el-table-column prop="c1" label="账号" width="150" align="center"></el-table-column>
            <el-table-column prop="c2" label="是否会员" width="120" align="center"></el-table-column>
            <el-table-column prop="c3" label="昵称" width="100" align="center"></el-table-column>
            <el-table-column prop="c4" label="默认电话" width="150" align="center"></el-table-column>
            <el-table-column prop="c5" label="商品数量" width="100" align="center"></el-table-column>
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
    const validateAccount = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    return {
      count: "",
      label_width: "80",
      pageNo: 1,
      currentPage: 1,
      // vip_v:'全部',
      c1: "用户管理",
      c2: "商品管理",
      c3: "商家管理",
      c4: "营销管理",
      c5: "文章管理",
      txt: "！",
      c6: "系统",
      c7: "admin",
      c8: "资料",
      c9: "订单管理",
      c10: "用户购物车",
      c11: "用户收货地址",
      c12: "用户店铺收藏",
      c13: "用户商品收藏",
      c14: "用户浏览记录",
      c15: "用户商品收藏/",
      c16: "列表/",
      c17: "用户管理/",
      c18: "总数",
      c19: "15",
      account: "账号",
      refresh: "刷新",
      isVip: [],
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
      custList: [
        { c1: "1358246975", c2: "是", c3: "罗兰", c4: "1358246975", c5: "452" },
        { c1: "1569874521", c2: "否", c3: "李希", c4: "1569874521", c5: "254" }
      ],
      columeTypeArr: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
        }
      ],
      ruleInline: {
        account: [
          { required: true, trigger: "blur", validator: validateAccount }
        ]
      },
      formItem: {
        account: "",
        columeType: "全部"
      }
    };
  },
  components: {
    "v-pagination": pagination
  },
  methods: {
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
    edit_redirc(index) {
      this.$router.push({
        path: "/userGoodsCollection/edit",
        params: {
          id: index
        }
      });
    }
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
