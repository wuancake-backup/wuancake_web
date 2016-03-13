// 回调函数
function bookResult(data)
{
	// alert("dd")
	var ulList = $("#bookList");
	var pageAndTotal = $("#trr");
	var ulContent = '';
	pageAndTotal.html('搜索结果'+(data.start+1)+'-'+(data.start+data.count)+' 共'+(data.total+1));
	for(i=0;i<data.count;i++){
		ulContent += '<li class="subject-item"><div class="pic"><a href="'+data.books[i].alt+'" class="nbg"><img src="'+data.books[i].image+'" alt="" width="90"/></a></div><div class="info"><h2><a href="">'+data.books[i].title+'</a></h2><div class="pub">'+data.books[i].author[0]+'/'+data.books[i].publisher+'/'+data.books[i].pubdate+'/'+data.books[i].price+'</div><div class="star"><span class="allstars"></span><span class="rating">'+data.books[i].rating.average+'</span><span class="pl">'+'('+data.books[i].rating.numRaters+'评论)'+'</span></div></div></li>'
	}
	ulList.html(ulContent);
}

function addScript(index,itemsPerPage,search_text){
	var newScript = $("<script></script>");
	newScript.attr("src","https://api.douban.com/v2/book/search?q="+search_text+"&start="+(index-1)*itemsPerPage+"&count="+itemsPerPage+"&callback=bookResult");
	$("body").append(newScript);
	// alert("ff")
}

$(document).ready(function(){
	var btn = $("#searchBtn");
	var bookInput = $("#searchInput");
	var aLink = $(".pagination");
	var nums = 10;
	btn.click(function(){
		if(bookInput.val()!=''){
			addScript(1,10,bookInput.val());

			for(var i=0;i<aLink.length;i++)
			{
				(function(index,val){
					aLink[index].onclick = function(){
						addScript((index+1),10,val);
						return false;
					}
				})(i,bookInput.val())
			}
		}
	});
	
	// for(var i=0;i<aLink.length;i++)
	// {
	// 	(function(index,val){
	// 		aLink[index].onclick = function(){
	// 			addScript((index+1),10,val);
	// 			return false;
	// 		}
	// 	})(i,bookInput.val())
	// }
});