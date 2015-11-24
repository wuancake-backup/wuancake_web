<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>index --test</title>
<%@ include file="link.jsp"%>
</head>
<body>
	<%@ include file="head.jsp"%>
	<div id="myBody">
		<%@ include file="MyData.jsp"%>
	</div>
	<%@ include file="foot.jsp"%>
	<%@ include file="js.jsp"%>
	<script>
		jQuery(function($) {
			$('#nav_ul li').prop('class', '');
		})
	</script>
</body>
</html>
