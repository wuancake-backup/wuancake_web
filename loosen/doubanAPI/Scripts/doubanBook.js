function bookResult(data){
	var ulList = document.getElementById("bookList");
	var pageAndTotal = document.getElementById("trr");
	var ulContent = '';
	// 显示搜索结果总数
	pageAndTotal.innerHTML = '搜索结果'+(data.start+1)+'-'+(data.start+data.count)+' 共'+(data.total+1); 

	// 动态加入图书列表
	for(i=0;i<data.count;i++){
		// ulContent += '<li class="subject-item"><p>'+data.books[i].author[0]+'<img src="'+data.books[i].image+'" alt="" /></p></li>';
		// 
		// 下面这样动态添加HTML，显示为不合法
		// ulContent += '<li class="subject-item">
		// <div class="pic">
		// <a href="'+data.books[i].alt+'" class="nbg">
		// <img src="'+data.books[i].image+'" alt="" width="90"/>
		// </a>
		// </div>

		// <div class="info">
		// <h2><a href="">'+data.books[i].title+'</a></h2>
		// <div class="pub">'+data.books[i].author[0]+'/'+data.books[i].publisher+'/'+data.books[i].pubdate+'/'+data.books[i].price+'</div>
		// <div class="star">
		// <span class="allstars"></span>
		// <span class="rating"></span>
		// <span class="pl"></span>
		// </div>

		// </div>
		// </li>'
		ulContent += '<li class="subject-item"><div class="pic"><a href="'+data.books[i].alt+'" class="nbg"><img src="'+data.books[i].image+'" alt="" width="90"/></a></div><div class="info"><h2><a href="">'+data.books[i].title+'</a></h2><div class="pub">'+data.books[i].author[0]+'/'+data.books[i].publisher+'/'+data.books[i].pubdate+'/'+data.books[i].price+'</div><div class="star"><span class="allstars"></span><span class="rating">'+data.books[i].rating.average+'</span><span class="pl">'+'('+data.books[i].rating.numRaters+'评论)'+'</span></div></div></li>'
	}
	ulList.innerHTML = ulContent;
}

window.onload = function(){
	var bookInput = document.getElementById("searchInput");
	var btn = document.getElementById("searchBtn");
	btn.onclick = function(){
		if(bookInput.value!=''){
			var newScript = document.createElement("script");
			newScript.src = "https://api.douban.com/v2/book/search?q="+bookInput.value+"&count=10&callback=bookResult";
			document.body.appendChild(newScript);
		}
	}
}