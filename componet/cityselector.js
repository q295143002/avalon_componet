/**
 * Created by gxia on 2016/8/25.
 */
define(['avalon', 'text!../../template/city_tpl.html', 'text!../../template/search_tpl.html', 'text!../../template/stab_tpl.html', 'text!../../template/spanel_tpl.html'], function (avalon, tpl, tpl2, tpl3, tpl4) {
    avalon.component('ms-grid', {
        template: tpl,
        soleSlot: 'buttonText',
        defaults: {
            buttonText: 'hello',
            key: {
                city:'上海'
            }

        }
    })
    avalon.component('ms-search', {
        template: tpl2,
        defaults: {
            click:function(){
                console.log('click')
            },
            press:function(){
                console.log('press')
            },
        }
    })

    avalon.component('ms-stab', {
        template: tpl3,
        defaults: {
            defaultHead:'abcdef',
            tabChange:function(ele){
                console.log( this.defaultHead)
                this.defaultHead=ele
            },
            setItem:function(obj){
                this.key['city']=obj['city']
            }
        }
    })
    avalon.component('ms-spanel', {
        template: tpl4,
        defaults: {

        }
    })

    console.log(avalon)
    console.log(avalon.components)


})