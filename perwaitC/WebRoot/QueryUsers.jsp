<i><%@page language="java" import="java.util.*,com.zsz.jdbc.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'QueryServlet.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<SCRIPT LANGUAGE=javascript>
/*	function my_del() {var msg = "您真的确定要删除吗？";
	if (confirm(msg)==true)
	{return true;}
	} */
	function myDel(UId){
	if(confirm("确定删除")){
	location.href="DeleteServlet?UId="+UId;
	}
	}
	</SCRIPT>
  </head>
  
  <body >
  <form action="InsertUsers.jsp" method="post">
  <input type="submit" value="Add">
    <table  border="1" width="70%" cellspacing="0px" align="center">
    <tr><th>UID</th><th>UName</th><th>UPassword</th><th>UEmail</th><th>Action</th></tr>
    <% 
 
  		Dao Duser=new Dao();
		List<Users> userList =Duser.getAllUsers();
  //以下方法需要等待传回~ 导致无法直接访问··需要每次传回才能访问
  //   List<Users> userList =(List<Users>)request.getAttribute("UserL");
    	for(Users user:userList){
    	%>
    	<tr>
    	<td><%=user.getUid()%></td>
    	<td><%=user.getUname() %></td>
    	<td><%=user.getUpassword() %></td>
    	<td><%=user.getUemail() %></td>
    	<td><a href="javascript:myDel(<%=user.getUid()%>)" >Delete</a>   
    	<a href="">Update</a></td>
    	
    	<!--  	<td><a href="DeleteServlet?UId=<%=user.getUid() %>" onclick="javascript:return my_del()">Delete</a>   
    	<a href="">Update</a></td> -->
    	</tr>
    	<% 
    	}
     %>
    </table>
    </form>
  </body>
</html>
</i>