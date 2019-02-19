<template>
  <div class="user-container">
    <!-- <div class="user_head">
      <img class="logo" src="@/assets/404_images/404.png" alt="">
      <div class="hd">
        <ul>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl ">{{c1}}</div>
          </li>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c2}}</div>
          </li>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl ">{{c3}}</div>
          </li>
          <li class="fl">
            <div class="logo_   fl">{{txt}}</div>
            <div class="text fl ">{{c4}}</div>
          </li>
          <li class="fl">
            <div class="logo_  fl">{{txt}}</div>
            <div class="text fl">{{c5}}</div>
          </li>
          <li class="fl">
            <div class="logo_ choose  fl">{{txt}}</div>
            <div class="text fl text_chose">{{c6}}</div>
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
            <div class="text fl">{{c14}}</div>
            <div class="ps"></div>
            <div class="clear"></div>
          </li>
        </ul>
      </div>-->
      <div class="box-center">
        <div class="tips">
          <span>{{c17}}</span>
          <span>{{c15}}</span>
        </div>
        <div
          style="display: inline-block;vertical-align:top;width: 20%;margin-top: 10px;font-weight: bold;"
        >{{priseTxt}}</div>
        <div class="cont" style="width: 77%;display: inline-block;">
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c18}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input type="text" name="praiseLable" style="height: 40px;border: 1px solid #A9A9A9;">
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c19}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input
                type="text"
                name="secondaryLable"
                style="height: 40px;border: 1px solid #A9A9A9;"
              >
            </div>
          </div>
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c20}}</span>
            </div>
            <div style="display: inline-block;text-align: left;width: 60%;">
              <input
                type="text"
                name="feedbackLable"
                style="height: 40px;border: 1px solid #A9A9A9;"
              >
            </div>
          </div>
        </div>
        <div
          style="display: inline-block;vertical-align:top;width: 20%;margin-top: 10px;font-weight: bold;"
        >{{imgTxt}}</div>
        <div class="cont" style="width: 77%;display: inline-block;">
          <div class="con">
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c21}}</span>
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
            <div style="display: inline-block;text-align: left;width: 20%;">
              <span class="c1">{{c22}}</span>
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
          <div class="btn">{{btnTxt}}</div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/Page";
import toggle from "@/components/Toggle/toggle";
import UploadList from "@/components/UploadList/uploadList";
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
      baseForm: {
        listPic: ""
      },
      priseTxt: "评论快捷标签",
      imgTxt: "首页板块标题图片",
      toggleTxt: false,
      btnTxt: "提交",
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
      // c11:'限时秒杀管理',
      // c12:'清仓专场管理',
      // c13:'1元抢购管理',
      c14: "系统管理",

      c15: "系统设置",
      c17: "系统管理/",
      c18: "好评标签",
      c19: "中评标签",
      c20: "差评标签",
      c21: "最新活动",
      c22: "推荐产品",
      refresh: "刷新",
      vip: "是否会员",
      choose: "筛选",
      edit: "编辑",
      remove: "删除",
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
    "v-toggle": toggle,
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
    getListPic(pic) {
      this.baseForm.listPic = pic;
    },
    paginationClick(current) {
      //响应点击后子组件当前页码
      console.log(current);
    },
    showDetail() {
      this.$router.push("/userBrowseRecord/edit");
    }
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

.btn {
  display: inline-block;
  padding: 9px 44px;
  background: #e4e4e4;
  color: #666;
  font-weight: bold;
  border-radius: 2px;
  margin-right: 10px;
  border: 1px solid #a2a2a2;
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
