<%@page contentType="text/html" language="java" import="java.util.*,com.zsz.jdbc.*"%>
<%@page pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>登录中...</title>
    <link href="css/common.css" rel="stylesheet" type="text/css" />
    <script src="js/common.js"></script>
  </head>
  <body>
    <%
        String uname, upw;
        request.setCharacterEncoding("utf-8");
        uname = request.getParameter("uname");
        upw = request.getParameter("upw");

        if (uname == null || uname.equals("")) {
          out.println("请输入用户名.");
          response.setHeader("refresh", "3;url=login.jsp");
          return;
        }
        if (upw == null || upw.equals("")) {
          out.println("请输入密码.");
          response.setHeader("refresh", "3;url=login.jsp");
          return;
        }
        boolean valid = false;   //表示验证是否通过的标志
      
		Dao dao=new Dao();
		int iname=dao.getUserName(uname);
		
		if(iname>0){
		//response.setHeader("refresh", "3;url=index.jsp");
		
			int ipw=dao.getUserInPw(upw, upw);
			if(ipw>0){
			//login验证通过
			session.setAttribute("uname", uname);
			response.setHeader("refresh", "0;url=index.jsp");
			}else {
			out.println("密码不正确");
			response.setHeader("refresh", "3;url=login.jsp");
			return;
			}
		}else{
		out.println("该账号不存在");
          response.setHeader("refresh", "3;url=login.jsp");
          return;
		}
		
	      
        //if (valid) {
         // session.setAttribute("username", uname);
          /*------开始：在线名单处理------*/
       /*    Vector visitors = (Vector) application.getAttribute("namelist");
          if (visitors == null) {
            visitors = new Vector();
            application.setAttribute("namelist", visitors);
          }
          boolean unique = true;
          for (int i = 0; i < visitors.size(); i++) {
            if (((String) visitors.get(i)).equals(uname)) {
              unique = false;
              break;
            }
          }
          if (unique) {
            visitors.add(uname);
          } */
          /*------结束：在线名单处理------*/

          /*------开始：自动登录Cookie处理----*/
         /*  int limit = Integer.parseInt(request.getParameter("limit"));
          Cookie c = new Cookie("username", java.net.URLEncoder.encode(request.getParameter("uname"),"UTF-8"));
          c.setMaxAge(limit * 24 * 60 * 60);
          response.addCookie(c); */
          /*------结束：自动登录Cookie处理----*/
          
         // out.println("<br/>登录成功!正在自动转向网站首页...");
        // response.setHeader("refresh", "3;url=index.jsp");
      //  } else {
        //  out.println("<br/>用户名或密码错误.");
        //  response.setHeader("refresh", "3;url=login.jsp");
       // }
    %>
  </body>
</html>
