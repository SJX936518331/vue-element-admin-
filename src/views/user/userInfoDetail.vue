<template>
  <v-common></v-common>
</template>
<script>
  import common from '@/components/UserManager/index'
  export default {
  name: 'user',
  'c1':'用户管理/',
  data() {
        const validateUsername = (rule, value, callback) => {
      if (value=="") {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }

         const validateIsVip = (rule, value, callback) => {
     
    }

       const validatePhone = (rule, value, callback) => {
          if (value.length > 11) {
             callback(new Error('电话格式不对'))
        }else{
           if(value==""){
             callback(new Error('电话号码不能为空'))
         }
            
         }
    }
    return {  
    }
  },
  components:{
   'v-common':common
  },
  methods: {
  }


    
}
</script>

