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
            <el-table-column prop="shopCode" label="店铺编号" width="150" align="center"></el-table-column>
            <el-table-column prop="shopName" label="店铺名称" width="100" align="center"></el-table-column>
            <el-table-column prop="pictureUrl" label="商品图片" width="100" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.pictureUrl" alt style="width: 50px;height: 50px">
              </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="150" align="center"></el-table-column>
            <el-table-column label="规格1" width="100" align="center">
              <template slot-scope="scope">
                <div v-for=" (item,index) in scope.row.productSpecifications" :key="index">
                  <p>{{item.specificationName1 == '' || item.specificationName1 == null || item.specificationValue1 == '' || item.specificationValue1 == null ? '' : item.specificationName1 + '('+item.specificationValue1+')'}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="规格2" width="100" align="center">
              <template slot-scope="scope">
                <div v-for=" (item,index) in scope.row.productSpecifications" :key="index">
                  <p>{{item.specificationName2 == '' || item.specificationName2 == null || item.specificationValue2 == '' || item.specificationValue2 == null ? '' : item.specificationName2 + '('+item.specificationValue2+')'}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="库存" width="50" align="center">
              <template slot-scope="scope">
                <div v-for=" (item,index) in scope.row.productSpecifications" :key="index">
                  <p>{{item.stock}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="团购价" width="100" align="center">
              <template slot-scope="scope">
                <div v-for=" (item,index) in scope.row.productSpecifications" :key="index">
                  <p>{{'￥'+item.collagePrice}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="会员价" width="200" align="center">
              <template slot-scope="scope">
                <div v-for=" (item,index) in scope.row.productSpecifications" :key="index">
                  <p>{{item.ecoin == 0 || item.ecoin == null ? '￥'+item.vipPrice : '￥'+item.vipPrice +'+'+ item.ecoin+'生豆'}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="单买价" width="100" align="center">
              <template slot-scope="scope">
                <div v-for=" (item,index) in scope.row.productSpecifications" :key="index">
                  <p>{{'￥'+item.price}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="deliveryTemplateName" label="配送模板" width="150" align="center"></el-table-column>
            <el-table-column label="是否首页展示" width="150" align="center">
              <template slot-scope="scope">
                <div>
                  <el-radio-group v-model="scope.row.isShow">
                    <el-radio label="0" @change="changeSatus(scope.$index,scope.row.isShow)">是</el-radio>
                    <el-radio label="1" @change="changeSatus(scope.$index,scope.row.isShow)">否</el-radio>
                  </el-radio-group>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="上下架" width="100" align="center"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="200" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.productSpecifications" :key="index">
                  <img
                    style="cursor: pointer;"
                    src="@/assets/search.png"
                    alt
                    @click="edit_redirc(scope.$index,item.id)"
                  >
                </div>
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
        callback(new Error("请输入商品名称"));
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
      c15: "商品列表/",
      c16: "列表/",
      c17: "商品管理/",
      c18: "总数",
      c19: "15",
      goodsName: "商品名称",
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
    chooseData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/Product/list?pageNum=" +
            this.currentPage +
            "&pageSize=20?productName=" +
            this.formItem.goodsName +
            ""
        )
        .then(
          response => {
            this.$Message.success("筛选成功");
            console.log("请求成功", response.data);
            var dataArr = response.data.data.list;
            this.custList = [];
            for (var i = 0; i < dataArr.length; i++) {
              this.custList.push({
                id: dataArr[i].id,
                shopId: dataArr[i].shopId,
                shopCode: dataArr[i].shopCode,
                shopName: dataArr[i].shopName,
                name: dataArr[i].name,
                pictureUrl: dataArr[i].pictureUrl,
                productSpecifications: dataArr[i].productSpecifications,
                deliveryTemplateName: dataArr[i].deliveryTemplateName,
                isShow: dataArr[i].isShow == true ? "0" : "1",
                status: dataArr[i].status,
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
    changeSatus(index, value) {
      var val;
      if (value == 0) {
        val = true;
      } else {
        val = false;
      }
      var id = this.custList[index].id;
      this.$http
        .post(
          "" + this.URL.url + "/api/admin/Product/update",
          "id=" + id + "&show=" + val + ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              this.$Message.success("更新是否首页推荐成功");
            } else {
              this.$Message.error("更新是否首页推荐失败");
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      console.log("value", val);
      console.log("index", index);
    },
    refreshData() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/Product/list?pageNum=" +
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
              this.custList.push({
                id: dataArr[i].id,
                shopId: dataArr[i].shopId,
                shopCode: dataArr[i].shopCode,
                shopName: dataArr[i].shopName,
                name: dataArr[i].name,
                pictureUrl: dataArr[i].pictureUrl,
                productSpecifications: dataArr[i].productSpecifications,
                deliveryTemplateName: dataArr[i].deliveryTemplateName,
                isShow: dataArr[i].isShow == true ? "0" : "1",
                status: dataArr[i].status,
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
            "/api/admin/Product/list?pageNum=" +
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
                id: dataArr[i].id,
                shopId: dataArr[i].shopId,
                shopCode: dataArr[i].shopCode,
                shopName: dataArr[i].shopName,
                name: dataArr[i].name,
                pictureUrl: dataArr[i].pictureUrl,
                productSpecifications: dataArr[i].productSpecifications,
                deliveryTemplateName: dataArr[i].deliveryTemplateName,
                isShow: dataArr[i].isShow == true ? "0" : "1",
                status: dataArr[i].status,
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
    edit_redirc(index, speId) {
      this.$router.push({
        path: "/goodsList/edit",
        name: "goodsEdit",
        params: {
          id: this.custList[index].id,
          specificationId: speId,
          stock: this.custList[index].stock,
          collagePrice: this.custList[index].collagePrice,
          vipPrice: this.custList[index].vipPrice,
          price: this.custList[index].price,
          deliveryTemplateName: this.custList[index].deliveryTemplateName
        }
      });
    },
    request() {
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/Product/list?pageNum=" +
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
              this.custList.push({
                id: dataArr[i].id,
                shopId: dataArr[i].shopId,
                shopCode: dataArr[i].shopCode,
                shopName: dataArr[i].shopName,
                name: dataArr[i].name,
                pictureUrl: dataArr[i].pictureUrl,
                productSpecifications: dataArr[i].productSpecifications,
                deliveryTemplateName: dataArr[i].deliveryTemplateName,
                isShow: dataArr[i].isShow == true ? "0" : "1",
                status: dataArr[i].status,
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
            "/api/admin/Product/list?pageNum=" +
            this.currentPage +
            "&pageSize=10000"
        )
        .then(
          response => {
            this.$Message.success("获取数据成功");
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
