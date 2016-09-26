# avalon_componet
avalon_componet

###the usage of `citySelector`
#####Create the configuration in VM,such as:
```javascript
  var vm={$id:'test'};
   config: {
                width: '350px',
                key: {                          //最终业务需要得到的key
                    CityName: '',
                    CityCode: '',
                    ID: ''
                },
                xTabShow: false,                 //控制tab
                xSearchShow: false,              //控制listsearch
            }
 ```    
    And in HTML,the usage is blow:
```html
 <div ms-css="{width:@config.width}" class="city_wrap">

        <xmp :widget="[{is:'ms-citypicker',$id:'wueieu1'},@config]">
            <ms-search class="city_search"></ms-search>

            <ms-stab class="city_tab animated rotateIn"></ms-stab>
        </xmp>
    </div>
```
`tips:the HTMLfragment must belong to the VM which define the 'config'`<br>
`You can get the data like this:vm.config.config.key.CityName`<br>
 You can define several of the 'config' model,but do `not use the same nmae`'
 
 ###the usage of `search_Module`
##### `file_path:./view/search_module.html`
