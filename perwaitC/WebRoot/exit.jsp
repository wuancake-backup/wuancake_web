<%@ page pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<title>退出登录中</title>
</head>
<body>

	<%
		session.removeAttribute("uname");
		response.sendRedirect("index.jsp");
	%>


</body>
</html>