<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <img class="logo" src="@/assets/hzw3.png" alt width="80px" height="80px">
        <h3 class="title">{{title}}</h3>
        <lang-select class="set-language"/>
      </div>
      <el-form-item style="margin-top: 50px;" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>&nbsp;用户名
        </span>
        <!-- <span class="userName">&nbsp;</span> -->
        <el-input
          v-model="loginForm.username"
          :placeholder="userTip"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>&nbsp;密码
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          :placeholder="passwordTip"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-code" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <!--<el-form-item prop="code1">
        <span class="svg-container">
          <svg-icon icon-class="code" />
           &nbsp;验证码
        </span>
        <el-input style="width: 50%;" type="text" v-model="loginForm.code1" :placeholder="codeTip" name="code1" auto-complete="on" @keyup.enter.native="handleLogin" />
        <div class="verify-box" @click="refreshCode">
          <SIdentify :identifyCode="identifyCode"></SIdentify>
        </div>
      </el-form-item>-->
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;background:#FF9900;color:#ffffff;padding:15px 0px;border:1px solid #FF9900;font-size:26px;"
        @click="handleLogin"
      >{{ loginTip }}</el-button>
      <el-button type="success" @click="logout">注销</el-button>
    </el-form>
    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{ $t('login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign/>
    </el-dialog>
  </div>
</template>
<script>
import { isvalidUsername } from "@/utils/validate";
import LangSelect from "@/components/LangSelect";
import SocialSign from "./socialsignin";
import SIdentify from "@/components/identify";
import md5 from "js-md5";
import { setToken } from "@/utils/auth";

export default {
  name: "Login",
  components: { LangSelect, SocialSign, SIdentify },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        if (value == "") {
          callback(new Error("密码不能为空"));
        } else {
          callback(new Error("密码长度不能小于6位"));
        }
      } else {
        callback();
      }
    };
    // const validateCode = (rule, value, callback) => {
    //   if (value.length < 4) {
    //     if (value == "") {
    //       callback(new Error('验证码不能为空'))
    //     } else {
    //       callback(new Error('验证码长度不能小于4位'))
    //     }

    //   } else {
    //     callback()
    //   }
    // }

    return {
      identifyCodes: "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      identifyCode: "12N4",
      userTip: "请输入用户名",
      passwordTip: "请输入密码",
      codeTip: "请输入验证码",
      loginTip: "登录",
      // userToken: "",
      loginForm: {
        username: "",
        password: ""
        // code1: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
        // code1: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      redirect: undefined,
      title: "生多多后台管理系统"
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    logout() {
      this.$http.get("" + this.URL.url + "/api/adminRoot/logout").then(
        response => {
          console.log("请求成功", response.data);
          this.$Message.success("注销成功");
          this.$router.push({ path: "/login" });
        },
        response => {
          this.$Message.error("系统出错");
        }
      );
    },
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    makeCode(o, k) {
      for (let i = 0; i < k; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      console.log("当前验证码:", this.identifyCode);
    },

    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    getRoles() {
      this.$http.get("" + this.URL.url + "/api/admin/getAllRole").then(
        response => {
          console.log("请求成功", response.data);
          this.$Message.success("获取角色成功");
        },
        response => {
          this.$Message.error("系统出错");
        }
      );
    },
    getAllAuthorities() {
      this.$http.get("" + this.URL.url + "/api/role/getAllAuthorities").then(
        response => {
          console.log("请求成功", response.data);
          if (response.data.errmsg == null) {
            this.$Message.success("获取权限成功");
          } else {
            this.$Message.error("获取权限失败");
          }
        },
        response => {
          this.$Message.error("系统出错");
        }
      );
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          var userName = this.loginForm.username;
          var md5Password = md5(this.loginForm.password);
          this.$http
            .post(
              "" + this.URL.url + "/api/adminRoot/login",
              "username=" + userName + "&password=" + md5Password + ""
            )
            .then(
              response => {
                console.log("请求成功", response.data);
                if (response.data.errmsg == null) {
                  this.$Message.success("登录成功");
                  localStorage.setItem(
                    "token",
                    response.data.data.authentication
                  );
                  this.loading = true;
                  this.$store
                    .dispatch("LoginByUsername", this.loginForm)
                    .then(() => {
                      this.loading = false;
                      this.$router.push({ path: this.redirect || "/" });
                      // this.getRoles();
                      // this.getAllAuthorities();
                    })
                    .catch(() => {
                      this.loading = false;
                    });
                } else {
                  this.$Message.error(response.data.errmsg);
                  console.log("登录失败", response.data.errmsg);
                  this.loading = false;
                  // location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
                  this.$router.push({ path: "/login" });
                  // this.$store
                  //   .dispatch("LoginByUsername", this.loginForm)
                  //   .then(() => {
                  //     this.loading = false;
                  //     this.$router.push({ path: this.redirect || "/login" });
                  //   })
                  //   .catch(() => {
                  //     this.loading = false;
                  //   });
                  if (response.data.errmsg == "请勿重复登陆") {
                    this.$router.push({ path: this.redirect || "/" });
                  } else {
                    this.$router.push({ path: "/login" });
                  }
                }
              },
              response => {
                console.log("请求失败");
                this.$Message.error("系统出错");
              }
            );
        } else {
          // this.loading = false
          console.log("error submit!!");
          return false;
        }
      });
    },
    // handleLogin() {
    //   this.$refs.loginForm.validate(valid => {
    //     if (valid) {
    //       this.$store
    //         .dispatch("LoginByUsername", this.loginForm)
    //         .then(() => {
    //           console.log("进去了啊啊");
    //           this.$router.push({ path: this.redirect || "/" });
    //           this.$Message.success('登录成功');
    //         })
    //         .catch(() => {
    //           console.log("出现异常");
    //         });
    //     } else {
    //       console.log("错误提交！");
    //       return false;
    //     }
    //   });
    // },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
  // mounted() {
  //   this.logout();
  // }
};
</script>
<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #cdcdcd;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;

    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 70%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(205, 205, 205, 1);
    border-radius: 5px;
    color: #666666;
    margin-bottom: 30px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #f2f2f2;
$dark_gray: #eaeaea;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 19%;
    text-align: left;
    display: inline-block;
  }

  .title-container {
    position: relative;
    text-align: center;

    .title {
      display: inline-block;
      font-size: 26px;
      color: #ff9900;
      margin: 0px auto 40px auto;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }

  .verify-box {
    display: inline-block;
    width: 20%;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .show-code {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .logo {
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }

  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
