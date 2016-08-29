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
            <div class="x_tab_eclipice"  ms-click='@eclipice()' ms-if='@xBlur'></div>
            <slot ></slot>
           </div>
            */
        }),
        soleSlot: 'buttonText',
        defaults: {
            xBlur:true,           //控制遮罩层
            xTabShow:false,             //控制tab
            xSearchShow:false,             //控制tab
            buttonText: 'hello',
            eclipice:function(){
                this.xTabShow=false;
                this.xBlur =false;
                this.xSearchShow =false;
            }

        }
    })
    avalon.component('ms-search', {
        template:heredoc(function(){
            /*
             <div>
               <input type="text"  ms-css="{width:@width}" ms-duplex="@key['CityName']" ms-click="@focusFn()" ms-keyup="@listKey()">

                 <div ms-if="@xSearchShow" ms-css="{width:@width}" class='search_panel'>
                   <ul class="search_list">
                     <li ms-if="@showData.length ===0" ms-css="{textAlign:'center'}"> 没有搜索结果</li>
                     <li ms-for="($index,el) in @showData" ms-mouseover="@panelMouse($index)"
                      ms-class="{'bg_red':$index===@panel.index}" ms-click="@setData($index)"
                     >{{el}}</li>
                   </ul>
             </div>

             <div>{{@key['CityName']}}</div>
             <div>{{@key['CityCode']}}</div>
             <div>{{@key['ID']}}</div>
             </div>
             */
        }),
        defaults: {
            showData:[],
            source:[],
            panel: {
                index: 0

            },
            setData: function (index) {
                this.key['CityName'] = this.showData[index];
                this.xSearchShow = false;
            },
            panelMouse: function (index) {
                this.panel.index = index;
            },
            focusFn:function(){
              if(this.key['CityName']===''){
                  this.xTabShow=true;
                  this.xBlur =true;
              } else {
                  var _self=this;
                  this.xSearchShow=true;
                  this.xBlur =true;
                  $.ajax({
                      url:this.ajaxUrl,
                      method:'get',
                      success:function(data){
                          _self.source=data;
                          _self.filter(_self.search, _self.source);
                      },
                      error:function(data){
                          //console.log(data)
                      }

                  })
              }
            },
            listKey: function () {
                var e = window.event;
                var _self=this;
                if(this.key['CityName']!==''){
                    this.xSearchShow = true;
                    this.xTabShow=false;
                }

                if (e.keyCode === 38) {   //向上
                    if(!this.xSearchShow){
                        return;
                    }
                    if (this.panel.index === 0) {
                        this.panel.index = this.showData.length - 1;
                    } else {
                        this.panel.index--;
                    }
                    //this.search = this.initData[this.panel.index];
                    return;

                }
                if (e.keyCode === 40) {   //向下
                    if(!this.xSearchShow){
                        return;
                    }
                    if (this.panel.index === this.showData.length - 1) {
                        this.panel.index = 0;
                    } else {
                        this.panel.index++;
                    }
                    //this.search = this.initData[this.panel.index];
                    return;

                }
                if (e.keyCode === 39 || e.keyCode === 37|| e.keyCode === 13) {   //向下
                    this.key['CityName'] = this.showData[this.panel.index];
                    this.xSearchShow = false;
                    this.blur = false;
                    return;

                }
                this.panel.index = 0;
                //console.log(this.isAjax)
                    $.ajax({
                        url:this.ajaxUrl,
                        method:'get',
                        success:function(data){
                            _self.source=data;
                            _self.filter(_self.key['CityName'], _self.source);
                            if (_self.key['CityName'] == '') {
                                _self.xSearchShow = false;
                                _self.xTabShow=true;
                            }
                        },
                        error:function(data){
                            //console.log(data)
                        }

                    })
            },
            filter: function (key, array) {
                this.showData = [];
                var keyReg = new RegExp(key, 'g')
                for (var i = 0; i < array.length; i++) {
                    if (i > 10) {
                        return;
                    }
                    if (keyReg.test(array[i])) {
                        this.showData.push(array[i]);
                    }
                }

            }
        }
    })

    avalon.component('ms-stab', {
        template: heredoc(function(){
            /*
            <div class="x_tab" ms-if='@xTabShow'>
               <div class="x_tab_head">
                 <ul >
                    <li ms-for="(el,$index) in @data" >
                      <a href="javascript:;" ms-click="@tabChange(el)" ms-class="{"selected":el===@defaultHead}">{{el}}</a>
                    </li>
                 </ul>

               </div>
               <div class="x_tab_body" ms-for="(el,$index) in @data" ms-visible="el===@defaultHead">
                 <ul>
                    <li ms-for="(el,$index) in $index">
                        <span >{{el}} </span>
                        <ul >
                            <li ms-for="(el,$index) in $index" >
                                <a href="javascript:;" ms-click="@setItem($index)">{{$index['CityName']}}</a>

                            </li>
                        </ul>

                    </li>
                 </ul>
               </div>
             </div>
             */
        }),
        defaults: {
            defaultHead:'ABCDEF',
            data:initData,
            tabChange:function(ele){

                this.defaultHead=ele;

            },
            setItem:function(obj){
                for(var i in this.key){
                    this.key[i]=obj[i]
                }
            },
            onInit:function(){

            }
        }
    })


