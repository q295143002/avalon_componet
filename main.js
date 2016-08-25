/**
 * Created by gxia on 2016/8/25.
 */
require.config({
    baseUrl:'./vender',
    paths:{
        'jquery':'jquery',
        'avalon':'avalon',
        'text':'text'
    },
    shim:{
        jquery:{
            exports:'_'
        }
    }
})

require(['jquery','avalon'],function(){})