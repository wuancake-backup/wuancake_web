/**
 * Created by 少郑 on 2015/7/26.
 */



window.onload=function(){
    /*获取对象 */
    var ul=document.getElementById('PosterUl');
    var Uli=ul.getElementsByTagName('li');
    var ol=document.getElementById('PosterOl');
    var Oli=ol.getElementsByTagName('li');
    var Uimg=ul.getElementsByTagName('img');

    //获取父级容器，当触碰父级：暂停自动播放，移开父级： 继续自动播放
    var Box=document.getElementById('PosterBox');

    //自动播放
    var iAUTO=0;
    var ievent=null;



    for(var i=0;i<Oli.length;i++) {
        //为每一个ol>li 添加一个index
        Oli[i].index = i;
        //添加鼠标移入事件
        Oli[i].onmouseover = function () {


                    for (var i = 0; i < Oli.length; i++) {
                        Oli[i].className = '';
                        Uimg[i].className = '';
                        $(Uli[i]).stop().animate({opacity: 0}, 500);

                    }
                    //将当前的index传递给iAUTO 使下次自动进行从此开始
                    iAUTO = this.index;
                    Oli[this.index].className = 'poster-active';
                    Uimg[this.index].className = 'poster-href';
                    $(Uli[this.index]).stop().animate({opacity: 1}, 500);


        }

    }

    //鼠标停留时暂停事件


    Box.onmouseover=function(){
        clearInterval(ievent);

    }


    Box.onmouseout=function(){
        ievent=setInterval(autoNext,3000);
    }



    ievent=setInterval(autoNext,3000);
    //自动下一个
    function autoNext(){
        iAUTO++;
        if(iAUTO==Oli.length){
            iAUTO=0;
        }



            for(var i=0;i<Oli.length;i++){
                Oli[i].className='';
                Uimg[i].className='';
                $(Uli[i]).stop().animate({opacity: 0}, 1500);

            }

            Oli[iAUTO].className='poster-active';
            Uimg[iAUTO].className='poster-href';
            $(Uli[iAUTO]).stop().animate({opacity:1},1500);

    }


}