<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>My JSP 'InsertUsers' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
  </head>
  <body>
  <form action="InsertUsersServlet" method="post">
    <table border="0" align="center">
    <h2></h2>
    <tr><td>UId</td><td><input type="text" name="uid"></td></tr>
	<tr><td>UName</td><td><input type="text" name="uname"></td></tr>
 	<tr><td>UPasswork</td><td><input type="text" name="upassword"></td></tr>
	<tr><td>UEmail</td><td><input type="text" name="uemail"></td></tr>
	 <tr><td colspan="2"align="center" ><input type="submit" value="Insert" ></td></tr>
    </table>
    </form>
  </body>
</html>
