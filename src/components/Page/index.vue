
  
<template>
  <div class="pager">
    <button class="btn btn-pager" :disabled="current == 1" @click="prePage">
      <img :src="current == 1 ? perForbid : per" alt>
    </button>
    <span
      v-if="pageNo !== 1"
      :class="'page-index ' + (current == 1 ? 'active' : '') "
      @click="goPage(1)"
    >1</span>
    <span v-if="preClipped" class="page-index">...</span>
    <span
      v-for="index in pages"
      :key="index"
      :class="'page-index ' + (index == current ? 'active': '')"
      @click="goPage(index)"
    >{{index}}</span>
    <span v-if="backClipped" class="page-index">...</span>
    <span
      :class="'page-index ' + (current == pageNo ? 'active' : '')"
      @click="goPage(pageNo)"
    >{{pageNo}}</span>
    <button class="btn btn-pager" :disabled="current == pageNo" @click="nextPage">
      <img :src="current == pageNo ? nextForbid : next" alt>
    </button>
  </div>
</template>

<script>
//引入的是我这边设置的图片，可以用其他图片替换
import Per from "@/assets/prev.png";
import PerForbid from "@/assets/prev_q.png";
import Next from "@/assets/next.png";
import NextForbid from "@/assets/next_q.png";
export default {
  props: {
    // 用于记录总页码，可由父组件传过来
    pageNo: {
      type: Number,
      default: 1
    },
    // 用于记录当前页数，这个与父组件进行数据交互来完成每一页的数据更新，所以我们只要改变current的值来控制整个页面的数据即可
    currentNo: {
      type: Number,
      default: 1
    }
  },
  data: function() {
    return {
      // 用于判断省略号是否显示
      backClipped: true,
      preClipped: false,
      current: this.currentNo,
      per: Per,
      perForbid: PerForbid,
      next: Next,
      nextForbid: NextForbid
    };
  },
  methods: {
    prePage() {
      // 上一页
      this.current--;
      this.$emit("pagination", this.current);
    },
    nextPage() {
      // 下一页
      this.current++;
      this.$emit("pagination", this.current);
    },
    goPage(index) {
      // 跳转到相应页面
      if (index !== this.current) {
        this.current = index;
        this.$emit("pagination", this.current); //子组件值传递   父组件使用  this.current
      }
    }
  },
  created() {},
  computed: {
    // 使用计算属性来得到每次应该显示的页码
    pages: function() {
      let ret = [];
      if (this.current > 3) {
        // 当前页码大于三时，显示当前页码的前2个
        ret.push(this.current - 2);
        ret.push(this.current - 1);
        if (this.current > 4) {
          // 当前页与第一页差距4以上时显示省略号
          this.preClipped = true;
        }
      } else {
        this.preClipped = false;
        for (let i = 2; i < this.current; i++) {
          ret.push(i);
        }
      }
      if (this.current !== this.pageNo && this.current !== 1) {
        ret.push(this.current);
      }
      if (this.current < this.pageNo - 2) {
        // 显示当前页码的后2个
        ret.push(this.current + 1);
        ret.push(this.current + 2);
        if (this.current < this.pageNo - 3) {
          this.backClipped = true;
        }
      } else {
        this.backClipped = false;
        for (let i = this.current + 1; i < this.pageNo; i++) {
          ret.push(i);
        }
      }
      // 返回整个页码组
      return ret;
    }
  }
};
</script>


<style scoped>
.pager {
  text-align: left;
}
.btn-pager {
  margin-left: 10px;
  padding: 0px;
  width: 24px;
  height: 24px;
  text-align: center;
  background-color: #ffffff;
  color: #ffffff;
  border: none;
  border-radius: 0px;
  overflow: hidden;
  vertical-align: middle;
  outline: none;
  cursor: pointer;
}
.btn-pager img {
  width: 100%;
  height: 100%;
}
.page-index {
  display: inline-block;
  margin-left: 10px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  background-color: #f4f4f5;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  border-radius: 4px;
  vertical-align: middle;
  text-align: center;
}
.active {
  background: #409eff;
  border-radius: 4px;
  color: #fff;
}
</style>
