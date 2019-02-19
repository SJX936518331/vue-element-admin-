import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
import otherRouter from './modules/other'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: {
      requireAuth: true
    },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: {
        title: '首页',
        icon: 'dashboard',
        noCache: true
      }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    meta: {
      title: '用户管理',
      icon: 'documentation',
      noCache: true
    },
    children: [{
        path: 'userInfo',
        component: () => import('@/views/user/index'),
        name: 'userInfo',
        meta: {
          title: '用户信息',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'userOrder',
        component: () => import('@/views/user/userOrder'),
        name: 'userOrder',
        meta: {
          title: '用户订单',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'userShopCart',
        component: () => import('@/views/user/userShopCart'),
        name: 'userShopCart',
        meta: {
          title: '用户购物车',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'userReAddress',
        component: () => import('@/views/user/userReAddress'),
        name: 'userReAddress',
        meta: {
          title: '用户收货地址',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'userShopCollection',
        component: () => import('@/views/user/userShopCollection'),
        name: 'userShopCollection',
        meta: {
          title: '用户店铺收藏',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'userGoodsCollection',
        component: () => import('@/views/user/userGoodsCollection'),
        name: 'userGoodsCollection',
        meta: {
          title: '用户商品收藏',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'userBrowseRecord',
        component: () => import('@/views/user/userBrowseRecord'),
        name: 'userBrowseRecord',
        meta: {
          title: '用户浏览记录',
          icon: 'documentation',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/goodsManage',
    component: Layout,
    redirect: '/goods/goodsSort',
    meta: {
      title: '商品管理',
      icon: 'documentation',
      noCache: true
    },
    children: [{
        path: 'goodsSort',
        component: () => import('@/views/goods/goodsSort'),
        name: 'goodsSort',
        meta: {
          title: '商品分类',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'goodsSpecification',
        component: () => import('@/views/goodsSpecification/goodsSpecification'),
        name: 'goodsSpecification',
        meta: {
          title: '商品规格',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'goodsList',
        component: () => import('@/views/goodsList/goodsList'),
        name: 'goodsList',
        meta: {
          title: '商品列表',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'goodsComment',
        component: () => import('@/views/goodsComment/goodsComment'),
        name: 'goodsComment',
        meta: {
          title: '商品评论',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'memberProductCategory',
        component: () => import('@/views/memberProductCategory/memberProductCategory'),
        name: 'memberProductCategory',
        meta: {
          title: '用户端商品分类',
          icon: 'documentation',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/storeManagement',
    component: Layout,
    redirect: '/storeManagement/storeManagement',
    meta: {
      title: '商家管理',
      icon: 'documentation',
      noCache: true
    },
    children: [{
        path: 'storeManagement',
        component: () => import('@/views/storeManagement/storeManagement/storeManagement'),
        name: 'storeManagement',
        meta: {
          title: '商家管理',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'merchantManagement',
        component: () => import('@/views/storeManagement/merchantManagement/merchantManagement'),
        name: 'merchantManagement',
        meta: {
          title: '店铺管理',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'cashManagement',
        component: () => import('@/views/storeManagement/cashManagement/cashManagement'),
        name: 'cashManagement',
        meta: {
          title: '商家提现管理',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'bankCardManagement',
        component: () => import('@/views/storeManagement/bankCardManagement/bankCardManagement'),
        name: 'bankCardManagement',
        meta: {
          title: '商家银行卡管理',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'addressManagement',
        component: () => import('@/views/storeManagement/addressManagement/addressManagement'),
        name: 'addressManagement',
        meta: {
          title: '商家退货地址管理',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'dTemplateManagement',
        component: () => import('@/views/storeManagement/dTemplateManagement/dTemplateManagement'),
        name: 'dTemplateManagement',
        meta: {
          title: '配送模板管理',
          icon: 'documentation',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/marketingManagement',
    component: Layout,
    redirect: '/marketingManagement/storeCouponM/storeCouponM',
    meta: {
      title: '营销管理',
      icon: 'documentation',
      noCache: true
    },
    children: [{
        path: 'storeCouponM',
        component: () => import('@/views/marketingManagement/storeCouponM/storeCouponM'),
        name: 'storeCouponM',
        meta: {
          title: '店铺优惠券管理',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'commodityCouponM',
        component: () => import('@/views/marketingManagement/commodityCouponM/commodityCouponM'),
        name: 'commodityCouponM',
        meta: {
          title: '商品优惠券管理',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'rotaryGraphicsA',
        component: () => import('@/views/marketingManagement/rotaryGraphicsA/rotaryGraphicsA'),
        name: 'rotaryGraphicsA',
        meta: {
          title: '轮播图广告',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'commodityA',
        component: () => import('@/views/marketingManagement/commodityA/commodityA'),
        name: 'commodityA',
        meta: {
          title: '商品广告',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'generalPAM',
        component: () => import('@/views/marketingManagement/generalPAM/generalPAM'),
        name: 'generalPAM',
        meta: {
          title: '普通占位广告管理',
          icon: 'documentation',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/articleManagement',
    component: Layout,
    redirect: '/articleManagement/ruleClassification',
    meta: {
      title: '文章管理',
      icon: 'documentation',
      noCache: true
    },
    children: [{
        path: 'ruleClassification',
        component: () => import('@/views/articleManagement/ruleClassification/ruleClassification'),
        name: 'ruleClassification',
        meta: {
          title: '规则分类',
          icon: 'documentation',
          noCache: true
          // roles: ['ruleCategory']
        }
      },
      {
        path: 'ruleList',
        component: () => import('@/views/articleManagement/ruleList/ruleList'),
        name: 'ruleList',
        meta: {
          title: '规则列表',
          icon: 'documentation',
          noCache: true
          // roles: ['rule']
        }
      },
      {
        path: 'helpCenterClassification',
        component: () => import('@/views/articleManagement/helpCenterClassification/helpCenterClassification'),
        name: 'helpCenterClassification',
        meta: {
          title: '帮助中心分类',
          icon: 'documentation',
          noCache: true
          // roles: ['helpCategory']
        }
      },
      {
        path: 'helpCenterList',
        component: () => import('@/views/articleManagement/helpCenterList/helpCenterList'),
        name: 'helpCenterList',
        meta: {
          title: '帮助中心列表',
          icon: 'documentation',
          noCache: true
          // roles: ['help']
        }
      }
    ]
  },
  {
    path: '/systemManagement',
    component: Layout,
    redirect: '/systemManagement/adminManagement',
    meta: {
      title: '系统管理',
      icon: 'documentation',
      noCache: true
    },
    children: [{
        path: 'adminManagement',
        component: () => import('@/views/systemManagement/adminManagement/adminManagement'),
        name: 'adminManagement',
        meta: {
          title: '管理员管理',
          icon: 'documentation',
          noCache: true
          // roles: ['admin']
        }
      },
      {
        path: 'roleManagement',
        component: () => import('@/views/systemManagement/roleManagement/roleManagement'),
        name: 'roleManagement',
        meta: {
          title: '角色管理',
          icon: 'documentation',
          noCache: true
        }
      },
      {
        path: 'systemSetup',
        component: () => import('@/views/systemManagement/systemSetup/systemSetup'),
        name: 'systemSetup',
        meta: {
          title: '系统设置',
          icon: 'documentation',
          noCache: true
        }
      }
    ]
  }
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/guide/index'),
  //     name: 'Guide',
  //     meta: {
  //       title: 'guide',
  //       icon: 'guide',
  //       noCache: true
  //     }
  //   }]
  // }
]

const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
// export const userOrder = {
//     path: '/userOrder/edit',
//     name: 'userOrder',
//     meta: {
//         title: '用户订单详情'
//     },
//     component: () => import('@/views/user/userOrderDetail')
// };

// export const userShopCart = {
//     path: '/userShopCart/edit',
//     name: 'userShopCart',
//     meta: {
//         title: '查看购物车详情'
//     },
//     component: () => import('@/views/user/userShopCartDetail')
// };
export const asyncRouterMap = [
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/svg-icons/index'),
  //     name: 'Icons',
  //     meta: {
  //       title: 'icons',
  //       icon: 'icon',
  //       noCache: true
  //     }
  //   }]
  // },

  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  otherRouter,
  // userInfo,
  // userOrder,
  // userShopCart,

  // {
  //   path: '/pm',
  //   component: Layout,
  //   redirect: '/pm/permission',
  //   name: 'pm',
  //   meta: {
  //     title: 'pm',
  //     icon: 'example'
  //   },
  //   children: [{
  //     path: 'permission',
  //     component: () => import('@/views/permission/components/SwitchRoles'),
  //     name: 'permission',
  //     meta: {
  //       title: '权限',
  //       icon: 'edit'
  //     }
  //   }]
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [{
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: {
  //         title: 'createArticle',
  //         icon: 'edit'
  //       }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: {
  //         title: 'editArticle',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: {
  //         title: 'articleList',
  //         icon: 'list'
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/tab/index'),
  //     name: 'Tab',
  //     meta: {
  //       title: 'tab',
  //       icon: 'tab'
  //     }
  //   }]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [{
  //       path: '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name: 'Page401',
  //       meta: {
  //         title: 'page401',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name: 'Page404',
  //       meta: {
  //         title: 'page404',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{
  //     path: 'log',
  //     component: () => import('@/views/errorLog/index'),
  //     name: 'ErrorLog',
  //     meta: {
  //       title: 'errorLog',
  //       icon: 'bug'
  //     }
  //   }]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [{
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/exportExcel'),
  //       name: 'ExportExcel',
  //       meta: {
  //         title: 'exportExcel'
  //       }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/selectExcel'),
  //       name: 'SelectExcel',
  //       meta: {
  //         title: 'selectExcel'
  //       }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/uploadExcel'),
  //       name: 'UploadExcel',
  //       meta: {
  //         title: 'uploadExcel'
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'zip',
  //     icon: 'zip'
  //   },
  //   children: [{
  //     path: 'download',
  //     component: () => import('@/views/zip/index'),
  //     name: 'ExportZip',
  //     meta: {
  //       title: 'exportZip'
  //     }
  //   }]
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/theme/index'),
  //     name: 'Theme',
  //     meta: {
  //       title: 'theme',
  //       icon: 'theme'
  //     }
  //   }]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/clipboard/index'),
  //     name: 'ClipboardDemo',
  //     meta: {
  //       title: 'clipboardDemo',
  //       icon: 'clipboard'
  //     }
  //   }]
  // },

  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/i18n-demo/index'),
  //     name: 'I18n',
  //     meta: {
  //       title: 'i18n',
  //       icon: 'international'
  //     }
  //   }]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [{
  //     path: 'https://github.com/PanJiaChen/vue-element-admin',
  //     meta: {
  //       title: 'externalLink',
  //       icon: 'link'
  //     }
  //   }]
  // },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//   } else {
//     const token = localStorage.getItem('token')
//     if (token === 'null' || token === '') {
//       next('/login')
//       console.log('超时了')
//     } else {
//       next()
//     }
//   }
// })

export default router
