<template>
  <div class="upload-container">
    <el-button
      :style="{background:color,borderColor:color}"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click=" dialogVisible=true"
    >上传图片</el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        class="avatar-uploader1"
        action
        :show-file-list="false"
        :http-request="upLoad"
        :limit="1"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-exceed="overfllow"
        list-type="picture"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader1-icon"></i>
      </el-upload>
      <div>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import * as FeightAPI from "@/api/upload";
export default {
  name: "EditorSlideUpload",
  props: {
    color: {
      type: String,
      default: "#1890ff"
    }
  },
  data() {
    return {
      imageUrl: "",
      dialogVisible: false,
      listObj: {},
      fileList: []
    };
  },
  methods: {
    handleSubmit() {
      this.dialogVisible = false;
    },
    upLoad() {},
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$Message.success("上传图片成功");
    },
    beforeAvatarUpload(file) {
      console.log(file);
      var fd = new FormData();
      fd.append("file", file);
      FeightAPI.uploadImg(fd).then(response => {
        console.log(response);
        this.$emit("getListPic", response.data.data);
        this.imageUrl = response.data.data;
        this.$Message.success("上传图片成功");
      });
    },
    overfllow() {
      this.$message.error("最多允许上传一张");
    }
  }
};
</script>
<style>
.avatar-uploader1 {
  position: relative;
}
.avatar-uploader1 .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: absolute;
  overflow: hidden;
  top: -12px;
  width: 6%;
  right: 32px;
}
.avatar-uploader1 .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader1-icon {
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

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
