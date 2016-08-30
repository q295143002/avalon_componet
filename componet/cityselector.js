/**
 * Created by gxia on 2016/8/25.
 *  <div class="x_tab_eclipice"  ms-click='@eclipice()' ms-if='@xBlur'></div>
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
            //xBlur:true,           //控制遮罩层
            buttonText: 'hello',
            stopPro:function(e){
                e.stopPropagation();
            }
            /*eclipice:function(){
                this.xTabShow=false;
                //this.xBlur =false;
                this.xSearchShow =false;
            }*/
        }
    })
    avalon.component('ms-search', {
        template:heredoc(function(){
            /*
            <div>
             <div class='search_group'  ms-click='@stopPro($event)'>
               <input type="text"   ms-duplex="@key['CityName']"  ms-focus="@focusFn($event)" ms-keyup="@listKey($event)">
                 <div ms-if="@xSearchShow" ms-css="{width:@width}" class='search_panel'>
                   <ul class="search_list">
                     <li ms-if="@showData.length ===0" ms-css="{textAlign:'center'}"> 没有搜索结果</li>
                     <li ms-for="($index,el) in @showData" ms-mouseover="@panelMouse($index)"
                      ms-class="{'bg_red':$index===@panel.index}" ms-click="@setData($event,$index)"
                     ><span class='dis_left'>{{el['CityName']}}<span class='dis_code'>({{el['CityCode']}})</span></span><span  class='dis_right'>{{el['ChSpelling']}}</span></li>
                   </ul>
                  </div>
             </div>
             </div>
             */
        }),
        defaults: {
            showData:[],
            source:[],
            panel: {
                index: 0

            },
            setData: function (e,index) {
                console.log(this.ie8_key.length)
                for(var i= 0 ;i<this.ie8_key.length;i++){
                    this.key[this.ie8_key[i]] = this.showData[index][this.ie8_key[i]];
                }

                this.xSearchShow = false;
            },
            panelMouse: function (index) {
                this.panel.index = index;
            },
            focusFn:function(e){
              if(this.key['CityName']===''){
                  //this.xBlur =true;
                  this.xTabShow=true;
                  this.xSearchShow=false;

              } else {
                  this.xTabShow=true;
                  //this.xBlur =true;

                  /*$.ajax({
                      url:this.ajaxUrl,
                      method:'get',
                      success:function(data){
                          _self.showData = [];
                          _self.source=data;
                          _self.filter(_self.key['CityName'], _self.source);
                      },
                      error:function(data){
                          //console.log(data)
                      }

                  })*/
              }
            },
            listKey: function (event) {
                var e = event||window.event;
                var _self=this;
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
                    console.log(this.xSearchShow)
                    if(!this.xSearchShow){
                        return;
                    }
                    this.key['CityName'] = this.showData[this.panel.index]['CityName']||'';
                    for(var i= 1 ;i<this.ie8_key.length;i++){
                        this.key[this.ie8_key[i]] = this.showData[this.panel.index][this.ie8_key[i]];
                    }
                    this.xSearchShow = false;
                    //this.xBlur = false;
                    return;

                }

                if(this.key['CityName']!==''){
                    this.xSearchShow = true;
                    this.xTabShow=false;
                }
                if (_self.key['CityName'] == '') {
                    _self.xTabShow=true;
                    return;
                }
                this.panel.index = 0;

                    $.ajax({
                        url:this.ajaxUrl,
                        method:'get',
                        success:function(data){
                            _self.showData = [];
                            _self.source=data;
                            _self.filter(_self.key['CityName'], _self.source);

                        },
                        error:function(data){

                        }

                    })
            },
            dealData:function(){

            },
            filter: function (key, array) {
                if(key===''){
                    return
                }
                this.showData = [];
                var keyReg = new RegExp(key.toUpperCase(), 'g');
                var a=b=c=false;

                for (var i = 0; i < array.length; i++) {
                    if (i > 10) {
                        return;
                    }
                    a = keyReg.test(array[i]['CityName'].toUpperCase());
                    b = keyReg.test(array[i]['CityCode'].toUpperCase());
                    c = keyReg.test(array[i]['parentStationPinyin'].toUpperCase());
                    console.log(1)
                    if (a||b||c) {
                        this.showData.push(array[i]);
                    }


                }



            }
        }
    })

    avalon.component('ms-stab', {
        template: heredoc(function(){
            /*
            <div class="x_tab" ms-if='@xTabShow'  >
               <div class="x_tab_head" ms-click='@stopPro($event)'>
                 <ul >
                    <li ms-for="(el,$index) in @data" >
                      <a href="javascript:;" ms-click="@tabChange($event,el,this)" class='s_tab' ms-class="{"selected":el===@defaultHead}">{{el}}</a>
                    </li>
                 </ul>
               </div>
               <div class="x_tab_body" ms-for="(el,$index) in @data" ms-visible="el===@defaultHead" ms-click='@stopPro($event)'>
                 <ul>
                    <li ms-for="(el,$index) in $index">
                        <span >{{el}} </span>
                        <ul >
                            <li ms-for="(el,$index) in $index" >
                                <a href="javascript:;" ms-click="@setItem($event,$index)">{{$index['CityName']}}</a>

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
            tabChange:function(e,ele,self){
                var index=0;
                for(var i=0;i<$('.s_tab').length;i++){
                    if($('.s_tab').eq(i).html()=== e.target.innerHTML){
                        index=i;
                        break;
                    }
                }
                $('.s_tab').removeClass('selected');
                $('.s_tab').eq(i).addClass('selected');
                $('.x_tab_body').hide();
                $('.x_tab_body').eq(i).show();      //为了ie8/9 tab切换不正确的问题 用了jquery

               // this.defaultHead=ele;

            },
            setItem:function(e,obj){
               var k=0;
                for(var i in this.key){
                    if(this.ie8_key[k]===undefined){
                        break;
                    }
                    this.key[this.ie8_key[k]]=obj[this.ie8_key[k]]
                    k++;
                }
                this.xTabShow=false;
                this.xSearchShow=false;

                //this.xBlur=false;
            },
            onInit:function(){

            }
        }
    })


