/**
 * Created by gxia on 2016/8/25.
 *
 */
function heredoc(fn) {
    return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').
    replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
}
avalon.filters.Fwords = function (val) {
    return val.replace(/(\().*?(\))/g, '');
}

avalon.component('ms-birthpicker', {          //最外层componet
    template: heredoc(function () {
        /*
         <div ms-visible='@show.s1' class='stage'>

         <div class='wrap'>

         <ul  class='elps'>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         </ul>

         <ul  ms-for="($index,el) in @data"  class='list'>
         <li  ms-for="($index,el1) in el">{{el1}}</li>

         </ul>
         </div>

         </div>
         */
    }),
    soleSlot: 'buttonText',
    defaults: {}
})



