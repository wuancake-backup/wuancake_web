/* 
* @Author: anchen
* @Date:   2016-03-10 08:42:57
* @Last Modified by:   anchen
* @Last Modified time: 2016-03-10 10:26:50
*/

'use strict';
(function($){
    $.fn.select_op = function(){
        $(this).siblings('.shopping-select-menu').slideToggle("slow");
        $(this).siblings('.shopping-select-menu').children('li').click(function(event){
            $(this).parent().siblings('.shopping-select-selection').html($(event.target).html());
            $(this).parent().slideUp("fast");
        })
    };
})(jQuery);