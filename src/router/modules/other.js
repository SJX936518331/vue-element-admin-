/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const otherRouter = {
  path: '/',
  component: Layout,
  redirect: '/home',
  name: 'home',
  meta: {
    title: '用户管理',
    icon: 'chart',
    noCache: true
  },
  hidden: true,
  children: [{
      path: '/userInfo/edit',
      component: () => import('@/views/user/userInfoDetail'),
      name: 'userInfoDetail',
      meta: {
        title: '用户信息详情',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/userOrder/edit',
      component: () => import('@/views/user/userOrderDetail'),
      name: 'userOrderDetail',
      meta: {
        title: '用户订单详情',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/userShopCart/edit',
      component: () => import('@/views/user/userShopCartDetail'),
      name: 'usershopCart',
      meta: {
        title: '查看购物车详情',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/userReAddress/edit',
      component: () => import('@/views/user/userReAddressDetail'),
      name: 'userreAddress',
      meta: {
        title: '查看全部收货地址',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/userShopCollection/edit',
      component: () => import('@/views/user/userShopCollectionDetail'),
      name: 'usershopCollection',
      meta: {
        title: '查看店铺收藏详情',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/userGoodsCollection/edit',
      component: () => import('@/views/user/userGoodsCollectionDetail'),
      name: '查看商品收藏详情',
      meta: {
        title: '查看商品收藏详情',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/userBrowseRecord/edit',
      component: () => import('@/views/user/userBrowseRecordDetail'),
      name: 'userBrowseRecordDetail',
      meta: {
        title: '查看用户浏览足迹详情',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/goodsSort/oneSort',
      component: () => import('@/views/goods/addOneSort'),
      name: 'add_oneSort',
      meta: {
        title: '添加一级分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/MemberProductCategory/oneSort',
      component: () => import('@/views/memberProductCategory/addOneSort'),
      name: 'add_pconeSort',
      meta: {
        title: '添加用户商品一级分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/MemberProductCategory/twoSort',
      component: () => import('@/views/memberProductCategory/addTwoSort'),
      name: 'add_pctwoSort',
      meta: {
        title: '添加用户商品二级分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/goodsSort/twoSort',
      component: () => import('@/views/goods/addTwoSort'),
      name: 'addTwoSort',
      meta: {
        title: '添加二级分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/MemberProductCategory/twoSort',
      component: () => import('@/views/memberProductCategory/addTwoSort'),
      name: 'addTwoSort',
      meta: {
        title: '添加用户商品二级分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/goodsSort/threeSort',
      component: () => import('@/views/goods/addThreeSort'),
      name: 'addThreeSort',
      meta: {
        title: '添加三级分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/goodsSort/oneSort/edit',
      component: () => import('@/views/goods/editOneSort'),
      name: 'oneSort_edit',
      meta: {
        title: '编辑一级分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/memberProductCategory/oneSort/edit',
      component: () => import('@/views/memberProductCategory/editOneSort'),
      name: 'mponeSort_edit',
      meta: {
        title: '编辑用户商品一级分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/memberProductCategory/twoSort/edit',
      component: () => import('@/views/memberProductCategory/editTwoSort'),
      name: 'mptwoSort_edit',
      meta: {
        title: '编辑用户商品二级分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/goodsSort/twoSort/edit',
      component: () => import('@/views/goods/editTwoSort'),
      name: 'twoSort_edit',
      meta: {
        title: '编辑二级分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/goodsSort/threeSort/edit',
      component: () => import('@/views/goods/editThreeSort'),
      name: 'editThreeSort',
      meta: {
        title: '编辑三级分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/goodsSpecification/add',
      component: () => import('@/views/goodsSpecification/addGoodsSpecification'),
      name: 'addGoodsSpecification',
      meta: {
        title: '添加商品规格',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/goodsSpecification/edit',
      component: () => import('@/views/goodsSpecification/editGoodsSpecification'),
      name: 'editGoodsSpecification',
      meta: {
        title: '编辑商品规格',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/goodsList/edit',
      component: () => import('@/views/GoodsList/goodsDetail'),
      name: 'goodsEdit',
      meta: {
        title: '查看商品详情',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/goodsComment/edit',
      component: () => import('@/views/goodsComment/goodsCommentDetail'),
      name: 'goodsCommentDetail',
      meta: {
        title: '查看商品评论详情',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/storeManagement/audit',
      component: () => import('@/views/storeManagement/storeManagement/informationAudit'),
      name: 'sinformationAudit',
      meta: {
        title: '商家信息审核',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/storeManagement/edit',
      component: () => import('@/views/storeManagement/storeManagement/viewBusinessInformation'),
      name: 'storeedit',
      meta: {
        title: '查看商家信息',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/merchantManagement/audit',
      component: () => import('@/views/storeManagement/merchantManagement/auditShop'),
      name: 'auditShop',
      meta: {
        title: '审核店铺',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/merchantManagement/edit',
      component: () => import('@/views/storeManagement/merchantManagement/viewStoreInfo'),
      name: 'shopEdit',
      meta: {
        title: '查看店铺信息',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/cashManagement/audit',
      component: () => import('@/views/storeManagement/cashManagement/caseAudit'),
      name: 'caseAudit',
      meta: {
        title: '提现审核',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/cashManagement/edit',
      component: () => import('@/views/storeManagement/cashManagement/viewCase'),
      name: 'caseEdit',
      meta: {
        title: '查看提现',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/bankCardManagement/edit',
      component: () => import('@/views/storeManagement/bankCardManagement/viewBankCard'),
      name: 'bankCardEdit',
      meta: {
        title: '查看商家银行卡',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/addressManagement/edit',
      component: () => import('@/views/storeManagement/addressManagement/viewAddress'),
      name: 'viewAddress',
      meta: {
        title: '查看退货地址',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/dTemplateManagement/edit',
      component: () => import('@/views/storeManagement/dTemplateManagement/viewTemplate'),
      name: 'dTemplateEdit',
      meta: {
        title: '查看配送模板',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/storeCouponM/edit',
      component: () => import('@/views/marketingManagement/storeCouponM/viewStoreCoupon'),
      name: 'viewStoreCoupon',
      meta: {
        title: '查看店铺优惠券',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/commodityCouponM/edit',
      component: () => import('@/views/marketingManagement/commodityCouponM/viewCommodityCoupon'),
      name: 'viewCommodityCoupon',
      meta: {
        title: '查看商品优惠券',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/rotaryGraphicsA/add',
      component: () => import('@/views/marketingManagement/rotaryGraphicsA/addRotaryGraphicsA'),
      name: 'addRotaryGraphicsA',
      meta: {
        title: '新增广告',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/rotaryGraphicsA/edit',
      component: () => import('@/views/marketingManagement/rotaryGraphicsA/editRotaryGraphicsA'),
      name: 'editRotaryGraphicsA',
      meta: {
        title: '编辑广告',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/commodityA/add',
      component: () => import('@/views/marketingManagement/commodityA/addcommodityA'),
      name: 'addcommodityA',
      meta: {
        title: '新增商品广告',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/commodityA/edit',
      component: () => import('@/views/marketingManagement/commodityA/editcommodityA'),
      name: 'editcommodityA',
      meta: {
        title: '编辑商品广告',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/generalPAM/add',
      component: () => import('@/views/marketingManagement/generalPAM/addGeneralPAM'),
      name: 'addGeneralPAM',
      meta: {
        title: '新增占位广告',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/generalPAM/edit',
      component: () => import('@/views/marketingManagement/generalPAM/editRotaryGraphicsA'),
      name: 'editgeneralPAM',
      meta: {
        title: '编辑占位广告',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/ruleClassification/add',
      component: () => import('@/views/articleManagement/ruleClassification/addRuleClassification'),
      name: '添加规则分类',
      meta: {
        title: '添加规则分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/ruleClassification/edit',
      component: () => import('@/views/articleManagement/ruleClassification/editRuleClassification'),
      name: 'edit_ruleClassification',
      meta: {
        title: '添加规则分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/ruleList/add',
      component: () => import('@/views/articleManagement/ruleList/addRule'),
      name: 'addRule',
      meta: {
        title: '添加规则',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/helpCenterClassification/add',
      component: () => import('@/views/articleManagement/helpCenterClassification/addClassification'),
      name: 'addClassification',
      meta: {
        title: '新增分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/helpCenterClassification/edit',
      component: () => import('@/views/articleManagement/helpCenterClassification/editClassification'),
      name: 'editClassification',
      meta: {
        title: '编辑帮助中心分类',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/helpCenterList/add',
      component: () => import('@/views/articleManagement/helpCenterList/addHelpCenterContent'),
      name: 'addHelpCenterContent',
      meta: {
        title: '新增帮助中心内容',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/adminManagement/add',
      component: () => import('@/views/systemManagement/adminManagement/addAdmin'),
      name: 'addAdmin',
      meta: {
        title: '添加管理员',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/adminManagement/edit',
      component: () => import('@/views/systemManagement/adminManagement/editAdmin'),
      name: 'adminedit',
      meta: {
        title: '管理员编辑',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/roleManagement/add',
      component: () => import('@/views/systemManagement/roleManagement/addRole'),
      name: 'addRole',
      meta: {
        title: '添加角色',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: '/roleManagement/edit',
      component: () => import('@/views/systemManagement/roleManagement/editRole'),
      name: 'editRole',
      meta: {
        title: '编辑角色',
        icon: 'documentation',
        noCache: true
      }
    }

  ]
}

export default otherRouter
