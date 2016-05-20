(function(bom,dom,$){

    var baseUrl="http://scuinfo.com";

    /**
     * 瑙ｆ瀽url
     * @param url
     * @returns {{protocol: (*|string), host: *, hostname: (*|string), port: *, pathname: (*|string|string), search: (*|Symbol|string), searchObject: {}, hash: (*|number|c.hash|string)}}
     */
    bom.parseURL = function(url) {
        var parser = document.createElement('a'),
            searchObject = {},
            queries, split, i;
        // Let the browser do the work
        parser.href = url;
        // Convert query string to object
        queries = parser.search.replace(/^\?/, '').split('&');
        for( i = 0; i < queries.length; i++ ) {
            split = queries[i].split('=');
            searchObject[split[0]] = split[1];
        }
        return {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            search: parser.search,
            searchObject: searchObject,
            hash: parser.hash
        };
    }

    /**
     * 杈撳嚭鏍煎紡鍖栫殑鏃堕棿
     * @param time
     * @returns {string}
     */
    bom.date = function (time) {

        if(time==0){

            return "";
        }else if(time){
            return new Date(time).getFullYear().toString()+"骞?"+(new Date(time).getMonth()+1).toString()+"鏈?"+new Date(time).getDate(time).toString()+"鏃? "+new Date(time).getHours().toString()+":"+((new Date(time).getMinutes()<10)?"0":"")+(new Date(time).getMinutes()).toString()

        }
        return new Date().getFullYear().toString()+"骞?"+(new Date().getMonth()+1).toString()+"鏈?"+new Date().getDate().toString()+"鏃? "+new Date().getHours().toString()+":"+((new Date(time).getMinutes()<10)?"0":"")+new Date().getMinutes().toString()
    };

    bom.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    /**
     * 杈撳嚭鏍煎紡鍖栫殑鏃堕棿
     * @param time
     * @returns {string}
     */
    bom.day = function (time) {

        if(time==0){

            return "";
        }else if(time){
            return new Date(time).getFullYear().toString()+"骞?"+(new Date(time).getMonth()+1).toString()+"鏈?"+new Date(time).getDate(time).toString()+"鏃?";

        }
        return new Date().getFullYear().toString()+"骞?"+(new Date().getMonth()+1).toString()+"鏈?"+new Date().getDate().toString()+"鏃?"
    };

    /**
     * 杈撳嚭鏍煎紡鍖栫殑灏忔椂:鍒嗛挓
     * @param time
     * @returns {string}
     */
    bom.hour = function (time) {

        if(time==0){

            return "";
        }else if(time){
            return new Date(time).getHours().toString()+":"+((new Date(time).getMinutes()<10)?"0":"")+new Date(time).getMinutes().toString()

        }
        return new Date().getHours().toString()+":"+((new Date(time).getMinutes()<10)?"0":"")+new Date().getMinutes().toString()
    };
    /**
     * 鑾峰彇褰撳ぉ鐨勬槦鏈熸暟
     */
    bom.getWeek = function()
    {
        return new Date().getDay();
    };

   bom.randomColor = function() {
       var colors = ["#64C0E5", "#98D261", "#E296B4", "#90DAA3", "#F09E9C", "#8CA9E9", "#F5AB8A","#FDAD8B","#F6C86A","#7AC0A4"];
       var rand = Math.floor(Math.random() * colors.length);
       return colors[rand];
   };
    bom.getWechatImg = function(o){

        return 'http://img5q.duitang.com/uploads/blog/201504/03/20150403214054_nekQt.jpeg';
    };
    bom.isWeixin = function(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    };


    var weixinBrowser = isWeixin();
    var wechatTitle=$('title').text(),wechatLink=$("#url").val(),wechatImg="http://ww2.sinaimg.cn/large/d9f8fd81gw1e9nzda6i7kj20rs0rs75i.jpg",wechatDesc="";
    //todo 榛樿鐨勫浘鐗?

bom.getDateDiff = function(dateTimeStamp) {
//JavaScript鍑芥暟锛?

    var minute =  60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var year = day * 365;
    var now = parseInt(new Date().getTime()/1000);
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
        //鑻ユ棩鏈熶笉绗﹀垯寮瑰嚭绐楀彛鍛婁箣
        //alert("缁撴潫鏃ユ湡涓嶈兘灏忎簬寮€濮嬫棩鏈燂紒");
    }
    var yearC = diffValue / year;
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    if (yearC >= 1) {
        result = "" + parseInt(monthC) + "骞村墠";
    } else if (monthC >= 1) {
        result = "" + parseInt(monthC) + "涓湀鍓?";
    }
    else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "鍛ㄥ墠";
    }
    else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "澶╁墠";
    }
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "涓皬鏃跺墠";
    }
    else if (minC >= 1) {
        result = "" + parseInt(minC) + "鍒嗛挓鍓?";
    } else
        result = "鍒氬垰";
    return result;
};
    bom.insert=function(content,index,value)
    {
        var str1 = content.substring(0,index);
        var str2 = content.substring(index);
        return str1+value+str2;
    };


    /**
     * 妫€娴嬫爣绛?
     * @param o
     * @returns {} or false
     */
    bom.checkTag = function(o){
        if(!o.content){
            return false;
        }
        //console.log(o.content);
        var index = o.content.indexOf("#", (o.index>=0)?o.index:0);
       //console.log(index);
        if(index>=0) {
            var nextIndex = o.content.indexOf("#", (index + 2));
            
            //console.log('next'+nextIndex);
            if (nextIndex >= (index + 2)) {

                var name = o.content.substring((index + 1), nextIndex);


                if(name.indexOf(" ")>=0 || name.indexOf("\n")>=0 || name.indexOf("\r")>=0 || name.indexOf("#")>=0){
                   // console.log(name);
                    return {
                        nextIndex:index+1,
                        content: o.content,
                        absoluteNextIndex:index+1+ (o.offset? o.offset:0),
                        code:3002 //闈炴硶鐨?#,璺宠繃
                    }

                }

//console.log(index);
//                console.log(nextIndex+1+ (o.offset? o.offset:0));

                return {
                    index:index,
                    nextIndex:nextIndex+1,
                    absoluteIndex:index+ (o.offset? o.offset:0),
                    absoluteNextIndex:nextIndex+1+ (o.offset? o.offset:0),
                    content: o.content,
                    name:name,
                    code:200 //姝ｅ父

                };
            }
            return false;
        }

        return false;
    };

    /**
     * 缁勮杩欎釜鏂囩珷閲岀殑鎵€鏈塼ag
     * @param o
     * @return array []
     */
    bom.tag = function(o){
        var tags = [];
        //console.log(o);
        var initTag = bom.checkTag(o);
        //console.log(initTag);
        if(initTag){
            if(initTag.code==200) {
                tags.push({name:initTag.name,
                absoluteIndex:initTag.absoluteIndex,
                absoluteNextIndex:initTag.absoluteNextIndex});
            }
            var tag = bom.checkTag({
                content: initTag.content.substr(initTag.nextIndex),
                offset:initTag.absoluteNextIndex
            });
            //console.log(tag);

            while(tag){
                if(tag.code==200) {
                    tags.push({name:tag.name,
                    absoluteIndex:tag.absoluteIndex,
                    absoluteNextIndex:tag.absoluteNextIndex});
                }
                if(tag.content.substr(tag.nextIndex)) {
                    tag = bom.checkTag({
                        content: tag.content.substr(tag.nextIndex),
                        offset:tag.absoluteNextIndex
                    });
                    //console.log(tag);
                }else{
                    tag = false;
                    //console.log(tag);
                }
            }

        }
        return tags;
    };

    bom.cssTag = function(o){
        var tags =  bom.tag({content: o.content});
//console.log(tags);
        var first,second;
        for(var i=0;i<tags.length;i++){
            //console.log(o.content);
            //console.log(tags[i].absoluteIndex);
            //console.log(tags[i].absoluteNextIndex);
            ////todo
            first = tags[i].absoluteIndex+i*25;
            second = tags[i].absoluteNextIndex+i*25+18;
            //console.log(first);
            //console.log(second);

            o.content = bom.insert(o.content,first,'<span class="tag">');
            o.content =  bom.insert(o.content,second,'</span>');
            //console.log(o.content);
        }
        return o.content;

    };

    bom.subTitle = function(o){
        if(o.more){
            try{
               var title = o.title.substr(0,140)
            }catch(e){
               var title =""
            }



      return bom.cssTag({content:title})+'...';
            }
        try{
            var title = o.title.substr(0,140)
        }catch(e){
            var title =""
        }

        return bom.cssTag({content:title});
    };

    bom.getWechatTitle = function(o){

        try{
            var title = o.title.substr(0,29)
        }catch(e){
            var title =""
        }
       // console.log(o);
        if(o.title.length>29) {
            return title+'...';
        }else{
            return title;
        }
    };


    bom.getWeiboTitle = function(o){

        try{
            var title = o.title.substr(0,120)
        }catch(e){
            var title =""
        }
        // console.log(o);
        if(o.title.length>120) {
            return title+'...';
        }else{
            return title;
        }
    };
//mark
    bom.getPostHref = function(o){

        return baseUrl+'/p/'+ o.id;
    };

//mark
    bom.getBookHref = function(o){

        return baseUrl+'/share/book/?userId='+ o.id;
    };
//mark
    bom.getExamHref = function(o){

        return baseUrl+'/share/exam/?userId='+ o.id;
    };
    bom.getExamAgainHref = function(o){
        return baseUrl+'/share/examAgain/?userId='+ o.id;

    };
    bom.getMajorHref = function(o){

        return baseUrl+'/share/major?userId='+ o.id;
    };

    /**
     * 妫€娴嬫彁浜ゆ枃绔犵殑鍙傛暟
     * @param o
     * @param cb
     */
    bom.check = function (o,cb){
        //console.log(o);
        if(!o.id){
            cb({
                code:3007,
                message:"缂哄皯id鍙傛暟"
            });
            return;
        }
        cb(null,{
            id: o.id
        });


    };

    /**
     *
     * @param o
     * @param cb
     */
    bom.delete = function(o,cb){

        bom.check(o,function(e,r){
            if(e){
                cb(e);
                return;
            }

            //console.log(r);
            $.ajax({
                type: 'DELETE',
                url: '/api/post',
                data: JSON.stringify(r),
                success: function(data) { //alert('data: ' + data);
                    cb(data);
                },
                contentType: "application/json",
                dataType: 'json'
            });
        })

    };
    bom.checkPost = function(o,cb){
        if(!o.id){
            cb({
                code:3004,
                message:"璇蜂紶鍏d"
            });
            return;
        }



        cb(null, o);
    };
    bom.postLike = function(o,cb){
        bom.checkPost(o,function(e,r){
            if(e){
                cb(e.message);
                return;
            }
            //console.log('2');
            mixpanel.track("like action");

            $.ajax({
                type: o.method?o.method:"POST",
                url: '/api/like/post',
                data: JSON.stringify(r),
                success: function(data) { //alert('data: ' + data);
                    console.log(data);
                    cb(null,data);
                },
                contentType: "application/json",
                dataType: 'json'
            });
        });
    };

    $("#posts").on('click','.posts-footer-like-area',function(){
        var id =  $(this).parent().parent().attr('id') ;
        var $icon =$($(this).children()[0]);
        var $iconCount =$($(this).children()[1]);
        if($icon.hasClass("posts-footer-icon-active")){

            $icon.removeClass("posts-footer-icon-active");
            if((parseInt($iconCount.text())-1)>=0) {
                $iconCount.text((parseInt($iconCount.text()) - 1));
            }
            bom.postLike({
                id:id,
                method:"DELETE"
            },function(e,r){
                if(e){
                        $iconCount.text((parseInt($iconCount.text()) +1));
                    $icon.addClass("posts-footer-icon-active");
                    console.log(e);
                    alert(e.message);
                    return;
                }

                if(r.code!=200){
                        $iconCount.text((parseInt($iconCount.text()) +1));
                    $icon.addClass("posts-footer-icon-active");
                    console.log(r);
                    alert(r.message);
                    return;
                }



            });
        }else{

            $icon.addClass("posts-footer-icon-active");
            $iconCount.text((parseInt($iconCount.text())+1));
            bom.postLike({
                id:id
            },function(e,r){
                if(e){
                    console.log(e);
                    $icon.removeClass("posts-footer-icon-active");
                    $iconCount.text((parseInt($iconCount.text())-1));

                    alert(e.message);

                    return;
                }
                if(r.code!=200) {
                    console.log(r);
                    $icon.removeClass("posts-footer-icon-active");
                    $iconCount.text((parseInt($iconCount.text())-1));

                    alert(r.message);

                    if(r.code == 2015) {
                        location.href = baseUrl+'/signin?redirect=' +$("#url").val()
                    }

                    return;
                }

            });
        }


    });



    $("#posts").on('click','.posts-header-share',function() {



        if(weixinBrowser) {
            $("#wechatShareTips").css('display', "block");
            var id = $(this).parent('article').attr('id');
            wechatTitle = $(this).parents('article').attr('wechatTitle');
            wechatDesc = $(this).parents('article').attr('weiboTitle');
            wechatLink = $(this).parents('article').attr('href');
            wechatImg = $(this).parents('article').attr('img');
            //console.log(wechatLink);
            wx.onMenuShareTimeline({
                title: wechatTitle,
                link: wechatLink,
                imgUrl: wechatImg,
                trigger: function (res) {
                    // 涓嶈灏濊瘯鍦╰rigger涓娇鐢╝jax寮傛璇锋眰淇敼鏈鍒嗕韩鐨勫唴瀹癸紝鍥犱负瀹㈡埛绔垎浜搷浣滄槸涓€涓悓姝ユ搷浣滐紝杩欐椂鍊欎娇鐢╝jax鐨勫洖鍖呬細杩樻病鏈夎繑鍥?
                    //alert('鐢ㄦ埛鐐瑰嚮鍒嗕韩鍒版湅鍙嬪湀');
                },
                success: function (res) {
                    //alert('宸插垎浜?');

                    $("#wechatShareTips").css('display', "none");

                },
                cancel: function (res) {
                    $("#wechatShareTips").css('display', "none");

                },
                fail: function (res) {
                    $("#wechatShareTips").css('display', "none");
                    alert(JSON.stringify(res));
                }
            });


            wx.onMenuShareAppMessage({
                title: wechatTitle, // 鍒嗕韩鏍囬
                desc: wechatDesc, // 鍒嗕韩鎻忚堪
                link: wechatLink, // 鍒嗕韩閾炬帴
                imgUrl: wechatImg, // 鍒嗕韩鍥炬爣
                type: 'link', // 鍒嗕韩绫诲瀷,music銆乿ideo鎴杔ink锛屼笉濉粯璁や负link
                dataUrl: '', // 濡傛灉type鏄痬usic鎴杤ideo锛屽垯瑕佹彁渚涙暟鎹摼鎺ワ紝榛樿涓虹┖
                success: function () {
                    $("#wechatShareTips").css('display', "none");

                },
                cancel: function () {
                    $("#wechatShareTips").css('display', "none");

                }
            });



            wx.onMenuShareQQ({
                title: wechatTitle, // 鍒嗕韩鏍囬
                desc: wechatDesc, // 鍒嗕韩鎻忚堪
                link: wechatLink, // 鍒嗕韩閾炬帴
                imgUrl: wechatImg, // 鍒嗕韩鍥炬爣
                type: 'link', // 鍒嗕韩绫诲瀷,music銆乿ideo鎴杔ink锛屼笉濉粯璁や负link
                dataUrl: '', // 濡傛灉type鏄痬usic鎴杤ideo锛屽垯瑕佹彁渚涙暟鎹摼鎺ワ紝榛樿涓虹┖
                success: function () {
                    $("#wechatShareTips").css('display', "none");

                },
                cancel: function () {
                    $("#wechatShareTips").css('display', "none");

                }
            });

            mixpanel.track("share wechat");


            // });
        }else{
            mixpanel.track("share weibo");

            article = $(this).parent().parent().parent();
                wbUrl			= encodeURIComponent(article.attr('href')),
                wbAppkey		= $("#weiboAppKey").val(),
                wbTitle			= encodeURIComponent(article.attr('weiboTitle')),
                wbRalateUid	= $("#weiboUid").val(),
                wbPic			= "",
                wbLanguage	= "zh_cn";
            location.href = "http://service.weibo.com/share/share.php?url="+wbUrl+"&appkey="+wbAppkey+"&title="+wbTitle+"&pic="+wbPic+"&ralateUid="+wbRalateUid+"&language="+wbLanguage+"";

        }

    });

    $("#wechatShareTips").on('click',function(){
        $("#wechatShareTips").css('display','none') ;
    });
    wx.config({
        debug: false, // 寮€鍚皟璇曟ā寮?,璋冪敤鐨勬墍鏈塧pi鐨勮繑鍥炲€间細鍦ㄥ鎴风alert鍑烘潵锛岃嫢瑕佹煡鐪嬩紶鍏ョ殑鍙傛暟锛屽彲浠ュ湪pc绔墦寮€锛屽弬鏁颁俊鎭細閫氳繃log鎵撳嚭锛屼粎鍦╬c绔椂鎵嶄細鎵撳嵃銆?
        appId: $("#wechatAppId").val(), // 蹇呭～锛屽叕浼楀彿鐨勫敮涓€鏍囪瘑
        timestamp: $("#wechatTimestamp").val(), // 蹇呭～锛岀敓鎴愮鍚嶇殑鏃堕棿鎴?
        nonceStr: $("#wechatNonceStr").val(), // 蹇呭～锛岀敓鎴愮鍚嶇殑闅忔満涓?
        signature: $("#wechatSignature").val(),// 蹇呭～锛岀鍚嶏紝瑙侀檮褰?1
        jsApiList: ['checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ'
            //'onMenuShareWeibo',
            //'hideMenuItems',
            //'showMenuItems',
            //'hideAllNonBaseMenuItem',
            //'showAllNonBaseMenuItem',
            //'translateVoice',
            //'startRecord',
            //'stopRecord',
            //'onRecordEnd',
            //'playVoice',
            //'pauseVoice',
            //'stopVoice',
            //'uploadVoice',
            //'downloadVoice',
            //'chooseImage',
            //'previewImage',
            //'uploadImage',
            //'downloadImage',
            //'getNetworkType',
            //'openLocation',
            //'getLocation',
            //'hideOptionMenu',
            //'showOptionMenu',
            //'closeWindow',
            //'scanQRCode',
            //'chooseWXPay',
            //'openProductSpecificView',
            //'addCard',
            //'chooseCard',
            //'openCard'
        ] // 蹇呭～锛岄渶瑕佷娇鐢ㄧ殑JS鎺ュ彛鍒楄〃锛屾墍鏈塉S鎺ュ彛鍒楄〃瑙侀檮褰?2
    });

    $("#posts").on('click','.tag', function(ev){
        //console.log($(this).parents('article'));
        location.href = '/tag/'+$(this).text().substr(1,$(this).text().length-2);
        ev.stopPropagation();
    });

    //$("#posts").hammer({
    //    domEvents:true,
    //    threshold:1,
    //    velocity:0.8
    //}).on('swiperight','.posts-body', function(ev){
    //
    //    // alert('婊戝姩')
    //    // console.log($(this));
    //    var like = $($(this).children()[0]);
    //    like.css('display','block');
    //    var id =  $(this).parent().attr('id') ;
    //    var likeIcon = $($($($(this).parent().children()[2]).children()[1]).children()[0]);
    //    var likeCount = $($($($(this).parent().children()[2]).children()[1]).children()[1]);
    //    if(likeIcon.hasClass("posts-footer-icon-active")){
    //        like.removeClass("posts-footer-icon-active");
    //        likeIcon.removeClass("posts-footer-icon-active");
    //        if((parseInt(likeCount.text())-1)>=0) {
    //            likeCount.text((parseInt(likeCount.text()) - 1));
    //        }
    //        bom.postLike({
    //            id:id,
    //            method:"DELETE"
    //        },function(e,r){
    //            if(e){
    //                like.addClass("posts-footer-icon-active");
    //                likeIcon.addClass("posts-footer-icon-active");
    //                    likeCount.text((parseInt(likeCount.text()) + 1));
    //                alert(e.message);
    //
    //                console.log(e);
    //                return;
    //            }
    //
    //            if(r.code!=200){
    //                alert(r.message);
    //                like.addClass("posts-footer-icon-active");
    //                likeIcon.addClass("posts-footer-icon-active");
    //                likeCount.text((parseInt(likeCount.text()) + 1));
    //            }
    //
    //        });
    //    }else{
    //        like.addClass("posts-footer-icon-active");
    //        likeIcon.addClass("posts-footer-icon-active");
    //        likeCount.text((parseInt(likeCount.text()) + 1));
    //        bom.postLike({
    //            id:id
    //        },function(e,r){
    //            if(e){
    //                like.removeClass("posts-footer-icon-active");
    //                likeIcon.removeClass("posts-footer-icon-active");
    //                likeCount.text((parseInt(likeCount.text()) - 1));
    //                console.log(e);
    //                alert(e.message);
    //                return;
    //            }
    //
    //            if(r.code!=200){
    //                like.removeClass("posts-footer-icon-active");
    //                likeIcon.removeClass("posts-footer-icon-active");
    //                likeCount.text((parseInt(likeCount.text()) - 1));
    //                console.log(e);
    //                alert(e.message);
    //                return;
    //            }
    //
    //        });
    //    }
    //    setTimeout(function(){
    //        like.css('display','none');
    //    },1000);
    //
    //});

    $("#posts").on('click','.posts-footer-more',function(){

            var x=$(this).parents('article').attr('level');
            if($(this).parents('article').attr('author')==0  && $(this).parents('article').attr('level')!=1){
                $($(this).next().children()[1]).remove();
            }
            $(this).parent().on('open.dropdown.amui', function (e) {
                $("#posts").off('click','.posts-body');
            });

            $(this).parent().on('close.dropdown.amui', function (e) {
                $("#posts").on('click','.posts-body', function(ev){
                    location.href = '/p/'+$(this).parents('article').attr('id');
                });
            });
            $(this).parent().dropdown('toggle');


        }
    );




    $("#posts").on('click','.shareToWeibo',function(){
        var weibo = $($(this).children()[0]);
        var article = $(this).parents('article'),wbUrl			= article.attr('href'),
            wbAppkey		= $("#weiboAppKey").val(),
            wbTitle			= encodeURIComponent(article.attr('weiboTitle')),
            wbRalateUid	= $("#weiboUid").val(),
            wbPic			= "",
            wbLanguage	= "zh_cn";
        weibo.attr("href","http://service.weibo.com/share/share.php?url="+wbUrl+"&appkey="+wbAppkey+"&title="+wbTitle+"&pic="+wbPic+"&ralateUid="+wbRalateUid+"&language="+wbLanguage+"");
    });


    $("#posts").on('click','.posts-header-user',function(){
        if($(this).parents('article').attr('userId')=='0'){

        }else {
            location.href = '/u/'+$(this).parent().parent().parent().attr('userId');
        }
    });
    
    $("#title").on('dblclick',function(){

        window.scrollTo(0,0);
    });


})(self,self.document,self.jQuery);