(function(bom,dom,$){
    $(dom).ready(function(){
        //console.log('init');



        var store = $.AMUI.store;

        switch($('#pageType').val()){

            case 'tag':
                $.get('/api/tag/count?name='+$("#pageTag").val(),function(r){
                    //console.log(r);
                    if(r.code == 200){
                        var count=r.data.postsCount;
                        if(count>999){
                            count=count.toString().substr(0,1)+'.'+count.toString().substr(1,1)+'k';
                        }

                        $("#barTitleAjax").text('('+count+')');

                    }
                });
                break;
        }


    var morePosts = true;

        bom.loadHtml= function(o,cb){
            // console.log(o);
            if(o.action=='loadMore'){
                $("#loadMoreButton").button('loading');
            }
            var url = "/api/posts";
            o.pageSize = o.pageSize?o.pageSize:15;
           switch($('#pageType').val()){
               case 'index':
                  url = "/api/posts?pageSize="+ o.pageSize;
                   break;
               case 'tag':
                   url = "/api/tag?pageSize="+ o.pageSize+"&name="+$("#pageTag").val();
                   break;
               case 'like':
                   url = "/api/posts/like?pageSize="+ o.pageSize+"&userId="+$("#pageUserId").val();
                   break;
               case 'profilePosts':
                   url = "/api/posts?pageSize="+ o.pageSize+"&userId="+$("#pageUserId").val();
                   break;
               default:
                   url = "/api/posts";
                   break;
           }
            //console.log(url);
            if(o.userId && o.fromId){
                url+='&fromId='+ o.fromId+'&userId='+ o.userId;
            }else if(o.userId){
                url+='&userId='+ o.userId;
            }else if(o.fromId){
                url+="&fromId="+ o.fromId;
            }else{
                url+="";
            }
            $.get(url,function(data){
//console.log(data);


                    if(o.action == 'init'){
                        $("#loading").css('display','none');}

                if(data.code==200) {
                        // console.log(data.data.length);
                        if(data.data.length == 0){
                            if(o.action == 'init'){
                                $("#noData").css('display','block');
                                morePosts=false;
                            }else {
                                $("#loadMore").css('display', 'none');
                                $("#noMore").css('display', 'block');
                                morePosts=false;
                            }
                            $("#loadMoreButton").button('reset');
                            cb({
                                code:3003,
                                message:"娌℃湁鏇村鍐呭浜?"
                            });//todo
                            return;
                        }

                        var posts="";
                        var gender={
                            '0':"girl",
                            '1':"boy"
                        };
                        //console.log(data);
                        for (var i = 0; i < data.data.length;i++) {
                            //console.log(data.data[i].level);
                            posts = posts+'<article class="posts '+gender[data.data[i].gender]+'" id="'+data.data[i].id+'" href="'+
                                getPostHref({id:data.data[i].id})+'" userId="'+data.data[i].userId+'" img="'+data.data[i].avatar+'" wechatTitle="'+getWechatTitle({title:data.data[i].title})+'" level="'+data.data[i].level+'" weiboTitle="'+getWeiboTitle({title:data.data[i].title})+'" author="'+data.data[i].author+'">'+
                                '<header class="posts-header">' +
                                '<div class="am-text-truncate posts-header-left "><span class="posts-header-user">'+
                                '<img src="'+data.data[i].avatar+'" />'+
                                data.data[i].nickname+
                                '</span></div>'+
                                '<span class="posts-header-right">' +
                                '<span class="am-icon-external-link am-icon-md posts-header-icon posts-header-share"></span>' +
                                '</span>' +
                                '</header>' +
                                '<div class="posts-body">' +
                                '<span class="am-icon-heart am-icon-md am-animation-scale-up posts-body-like"></span>' +
                                '<p class="posts-body-content">' +
                                subTitle({
                                    title: data.data[i].title,
                                    more:data.data[i].more
                                })+'</p></div>' +
                                '<footer class="posts-footer">' +
                                '<span class="posts-footer-left">'+getDateDiff(data.data[i].date)+'</span>' +
                                '<span class="posts-footer-right posts-footer-like-area">' +
                                '<span class="am-icon-heart am-icon-md posts-footer-icon posts-footer-like '+(data.data[i].like?'posts-footer-icon-active':'')+'"></span>' +
                                '<span class="posts-footer-count posts-footer-like-count">'+(data.data[i].likeCount)+'</span></span>' +
                                '<span class="posts-footer-right posts-comment">' +
                                '<span class="am-icon-comment am-icon-md posts-footer-icon posts-footer-comment"></span>' +
                                '<span class="posts-footer-count posts-footer-comment-count">'+data.data[i].commentCount+'</span></span>' +
                                '<span class="posts-footer-right">'+
                                '<div class="am-dropdown am-dropdown-up more-dropdown">'+
                                '<span class="am-icon-ellipsis-h am-icon-md posts-footer-icon posts-footer-more"></span>'+
                               '<ul class="am-dropdown-content">'+
                                '<li class="shareToWeibo"><a href="#"><span class="am-icon-weibo"></span> 鍒嗕韩鍒板井鍗?</a></li>'+
                            '<li class="posts-delete"><a href="#"><span class="am-icon-trash"></span> 鍒犻櫎</a></li>'+
                                '</ul> </div> </span></footer> </article>';

                        }
                        $('#posts').append(posts.replace(/\n/g,"<br>")).clone(true);

                            $("#loadMore").css('display','block');

                        //}


                       var fromId = data.data.pop().id;

                        $("#loadMore").attr('fromid',fromId).clone(true);
                        $("#loadMoreButton").button('reset');


                        if(store.enabled){
                            store.set('fromId',fromId);
                            store.set('posts',(store.get('posts')?store.get('posts'):"")+posts);

                        }

                    cb(null);

                    }else{
                        alert(data.message);
                    }
            },'json');

        };


        if(store.enabled){

       var currentUrl = bom.parseURL(location.href);
            if(currentUrl.hash){
                if(store.get('posts')){
                    $("#posts").html(
                        store.get('posts')
                    ).clone(true);
                    setTimeout(function() {
                        window.scrollTo(0,store.get('y'));
                        history.replaceState({y: store.get('y')}, null, currentUrl.protocol+"//"+currentUrl.host+currentUrl.search);

                    },1);
                    $("#loadMore").attr('fromid',store.get('fromId'));
                    $("#loadMoreButton").button('reset');
                    $("#loadMore").css('display','block');
                    $(dom).scroll(function () {
                        store.set('y', $(dom).scrollTop());
                    });
                }

            }else {
                store.clear();
                $(dom).scroll(function () {
                    store.set('y', $(dom).scrollTop());
                });

                bom.loadHtml({
                    action:"init"
                },function(){

                });
            }
//浣犱滑濂?
            //
            //if(historyTimestamp == store.get('timestamp')){
            //    if(store.get('posts')){
            //       $("#posts").html(
            //          store.get('posts')
            //       ).clone(true);
            //       setTimeout(function() {window.scrollTo(0,store.get('y'));},1);
            //       $("#loadMore").attr('fromid',store.get('fromId'));
            //       $("#loadMoreButton").button('reset');
            //       $("#loadMore").css('display','block');
            //       $(dom).scroll(function () {
            //           store.set('y', $(dom).scrollTop());
            //       });
            //   }
            //
            //}else {
            //    store.clear();
            //    store.set('timestamp', historyTimestamp);
            //    $(dom).scroll(function () {
            //        store.set('y', $(dom).scrollTop());
            //    });
            //    bom.loadHtml({
            //        action:"init"
            //    },function(){
            //
            //    });
            //}
        }else{
            bom.loadHtml({
                action:"init"
            },function(){

            });
        }







        var flag=false,count= 0,max=100;

        $(bom).scroll(function() {
           //console.log(morePosts);
            if(($(bom).scrollTop()  >( $(dom).height() - $(bom).height() - 30 )) && count<max && !flag && morePosts){
                flag = true;
                    bom.loadHtml({
                        action: "loadMore",
                        fromId: $("#loadMore").attr('fromid')
                    }, function () {
                       flag= false;
                        count++;
                    });

            }
        });
        $("#loadMoreButton").on('click',function(){

            bom.loadHtml({
                action:"loadMore",
                fromId:$("#loadMore").attr('fromid')
            },function(){

            });
        });





        $("#posts").on('click','.posts-body', function(ev){

            //console.log($(this).parents('article'));
            if(store.enabled) {
                history.replaceState({y: store.get('y')}, null, '#' + store.get('y'));
            }
            location.href = '/p/'+$(this).parents('article').attr('id');
        });

        $("#posts").on('click','.posts-comment,.posts-footer-left', function(ev){


            //console.log($(this).parents('article'));
            if(store.enabled) {
                history.replaceState({y: store.get('y')}, null, '#' + store.get('y'));
            }
            location.href = '/p/'+$(this).parents('article').attr('id');
        });



        $("#posts").on('click','.posts-delete',function(){

            var article = $(this).parent().parent().parent().parent().parent();
            bom.delete({
                id:article.attr('id')
            },function(data){
                if(data.code == 200){
                    $("#tips .tips-alert p").text("鍒犻櫎鎴愬姛");
                    $("#tips").css('display','block');
                    article.remove();
                    setTimeout(function(){
                        $("#tips").css('display','none');

                    },1000);
                }else{
                    alert(data.message);
                }
            });

        });

        $("#posts").on('click','.posts-report',function(){

                location.href = '/report/?id='+$(this).parent().parent().parent().parent().parent().attr('id');
        });

    });

})(self,self.document,self.jQuery);