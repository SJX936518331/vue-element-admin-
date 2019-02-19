<template>
  <el-form-item>
    <el-upload
      class="avatar-uploader"
      action
      :show-file-list="false"
      :http-request="upLoad"
      :limit="10"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-exceed="overfllow"
      list-type="picture"
      accept=".jpg, .jpeg, .png, .gif, .JPG, .JPEG, .GIF"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-form-item>
</template>

<script>
import * as FeightAPI from "@/api/upload";
export default {
  data() {
    return {
      imageUrl: ""
    };
  },
  methods: {
    getData() {
      var id = this.$route.params.id;
      this.$http
        .get(
          "" +
            this.URL.url +
            "/api/admin/memberProductCategory/edit?id=" +
            id +
            ""
        )
        .then(
          response => {
            console.log("请求成功", response.data);
            if (response.data.errmsg == null) {
              console.log("数据", response.data.data);
              this.imageUrl = response.data.data.imageUrl[2].image;
              this.$notify.success("获取图片成功");
            } else {
              this.$notify.error("获取图片失败");
            }
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
    },
    upLoad() {},
    handleAvatarSuccess(res, file) {
      //   this.imageUrl = URL.createObjectURL(file.raw);
      this.$Message.success("上传图片成功");
    },
    beforeAvatarUpload(file) {
      console.log(file);
      var fd = new FormData();
      fd.append("file", file);
      FeightAPI.uploadImg(fd).then(response => {
        console.log(response);
        this.$emit("getListPic2", response.data.data);
        this.imageUrl = response.data.data;
        this.$Message.success("上传图片成功");
      });
    },
    overfllow() {
      this.$message.error("最多允许上传一张");
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style>
.avatar-uploader {
  position: relative;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: absolute;
  overflow: hidden;
  top: -12px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
</style>

