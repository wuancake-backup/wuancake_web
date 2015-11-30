<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/ajax.js"></script>
<script>
	$(document).ready(function() {
		a = window.location.href;
		if (window.location.href.indexOf("topic") > 0) {
			$("a[title='topic']").remove();
		}
	})

	function rep() {
		var element = $("textarea[date-myTitle='text']");
		var a;
		a = element.val().replace(/\n/g, '<br>');
		$("input[date-myTitle='text2']").val(a);
	};
	function rep2() {
		var element = $("textarea[date-myTitle='htext']");
		var a;
		a = element.val().replace(/\n/g, '<br>');
		$("input[date-myTitle='htext2']").val(a);
	};
</script>
<script>
	window._bd_share_config = {
		"common" : {
			"bdSnsKey" : {},
			"bdText" : "",
			"bdMini" : "2",
			"bdMiniList" : false,
			"bdPic" : "",
			"bdStyle" : "0",
			"bdSize" : "16"
		},
		"slide" : {
			"type" : "slide",
			"bdImg" : "2",
			"bdPos" : "right",
			"bdTop" : "200"
		}
	};
	with (document)
		0[(getElementsByTagName('head')[0] || body)
				.appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='
				+ ~(-new Date() / 36e5)];
</script>
