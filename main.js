/**
 * Created by gxia on 2016/8/25.
 */
require.config({
    baseUrl: './vender',
    paths: {
        'jquery': 'jquery',
        'avalon': 'avalon',
        'text': 'text',
        'cityselector': '../componet/cityselector'
    },
    shim: {
        jquery: {
            exports: '_'
        }
    }
})
require(['cityselector'], function (avalon) {
    var a=avalon.define({
        $id:'test',
        a:110,
        config:{
            buttonText:12306,
            width:'200px',
            data:{
                'abcdef':[{CityName:'大连'},{CityName:'大连'},{CityName:'大连'},{CityName:'大连'},{CityName:'大连'}],
                'ghijklm':[{CityName:'大连1'},{CityName:'大连'},{CityName:'大连'},{CityName:'大连'},{CityName:'大连'},{CityName:'大连'},{CityName:'大连'}],
                'nopqrst':[{CityName:'大连2'},{CityName:'大连'},{CityName:'大连'},{CityName:'大连'}],
                'uvwxyz':[{CityName:'大连3'},{CityName:'大连'},{CityName:'大连'},{CityName:'大连'}]
            }
        },
        aaa:function(){

        }
    })

    console.log(a)

})

