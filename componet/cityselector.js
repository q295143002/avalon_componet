/**
 * Created by gxia on 2016/8/25.
 */
function heredoc(fn) {
    return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').
    replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
}


    avalon.component('ms-grid', {
        template: heredoc(function(){
           /*
           <div>
            <slot ></slot>
           </div>
            */
        }),
        soleSlot: 'buttonText',
        defaults: {
            buttonText: 'hello',
            key: {
                CityName:'上海'
            }

        }
    })
    avalon.component('ms-search', {
        template:heredoc(function(){
            /*
             <div>
               <input type="text" ms-css="{width:@width}" ms-duplex="@key['CityName']" ms-click="@click" ms-keypress="@press">
               <div>{{@key}}</div>
             </div>
             */
        }),
        defaults: {
            click:function(){

            },
            press:function(){

            },
        }
    })

    avalon.component('ms-stab', {
        template: heredoc(function(){
            /*
             <div ms-css="{width:'400px'}" class="x_tab">
               <div class="x_tab_head">
                 <ul >
                    <li ms-for="(el,$index) in @data">
                      <a href="javascript:;" ms-click="@tabChange(el)">{{el}}</a>
                    </li>
                 </ul>

               </div>
               <div class="x_tab_body" ms-for="(el,$index) in @data" ms-visible="el===@defaultHead">

                 <ul >

                   <li ms-for="$index in @data[el]">
                     <a href="javascript:;" ms-click="@setItem($index)">{{$index['CityName']}}</a>
                   </li>
                 </ul>
               </div>


             </div>
             */
        }),
        defaults: {
            defaultHead:'ABCEDF',
            data:initData,
            tabChange:function(ele){

                this.defaultHead=ele;


            },
            setItem:function(obj){
                this.key['CityName']=obj['CityName']
            },
            onInit:function(){

            }
        }
    })


