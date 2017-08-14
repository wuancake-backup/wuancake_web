/*搜索*/
function getSearch()
{
  islyric=false;
  showLyric();
    var name=$('#search').val();
    var number = 23;
   name=name.replace(/\s/g, "");
    var urlString = 'http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n='+number+'&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w='+name;
    $.post("search.php", {
        urlString}, function(data) {
       data = JSON.parse(data);
        var html='<div class="song" id="song" style="border-bottom: 1px solid gray;border-right:1px solid gray;">歌曲名</div><div class="singer" id="singer"  style="border-bottom: 1px solid gray;">歌手</div>';
        $('#lyric').html(String(html));
        data['data']['song']['list'].forEach(
            //value
            function(value)
            {
      
                var a=value['f'];
               // console.log(a);
                var arr=a.split("|",7);
                try
                {
                  for(var i=0;i<6;i++)
                  {
                    arr[i]=arr[i].replace(/&amp;/g,"&"); 
                  }
                  var tag=1;
                  arr[6]=tag;
                  var h1="<a href='#' onclick='creatLocal(\""+arr+"\")'>"+"<span class='song'>"+arr[1]+"</span>"+"<span class='singer'>"+arr[3]+"</span></a><div class='clear'></div>";
                }
               catch(e)
               {
                    //a 换
                    //arr也得换
                    //觉得得给这两种东西做个不一样的标记
                    //第二种图片为空给安排一张固定       8623
                    //http://ws.stream.qqmusic.qq.com/C1L0001rzy0r3Q0D6c.m4a?fromtag=00
                  try{
                      tag=2;
                      arr[6]=tag;
                      //var songid=arr[0];
                    // var songname=arr[1];
                    //var image_id=arr[4];
                    //var singer=arr[3];
                    //var album=arr[5];
                    //var tag=arr[6];
                    //arr[2]随便先
                      var songid=a.match(/ws.stream.qqmusic.qq.com\/(\S*).m4a/);
                      songid=songid[1];
                      var singer=value['fsinger'];
                      var album=value['albumName_hilight'];
                      var name=value['fsong'];
                      var pic=8623;
                      arr=songid+','+name+','+'0,'+singer+','+pic+','+album+','+tag;
                      h1=h1="<a href='#' style'color: black;' onclick='creatLocal(\""+arr+"\")'>"+"<span class='song'>"+name+"</span>"+"<span class='singer'>"+singer+"</span></a><div class='clear'></div>";
                }
                catch(e)
                {
                    
                }
             }
                // console.log(arr);
                 $('#lyric').append(String(h1));
                             
                          }

                      )
                    })
}


