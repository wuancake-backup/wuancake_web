<%@ page language="java"
	import="java.util.*,com.zsz.jdbc.*,com.zsz.test.*" pageEncoding="UTF-8"%>


<!DOCTYPE html>
<html>
<head>

</head>

<body>
	<%
		String uname, upw, upw2, uemail;
		request.setCharacterEncoding("utf-8");
		uname = request.getParameter("uname");
		upw = request.getParameter("upw");
		upw2 = request.getParameter("upw2");
		uemail = request.getParameter("uemail");
		regex reg = new regex();
		Dao dao = new Dao();

		if (uname == null || uname.equals("")) {
			out.println("请输入用户名.");
			response.setHeader("refresh", "3;url=reg.jsp");
			return;
		} else {
			//检查是否被注册
			int iname = dao.getUserName(uname);
			if (iname > 0) {
				out.println("Sorry 该用户名已被使用，请更换用户名");
				response.setHeader("refresh", "3;url=reg.jsp");
				return;
			}
			;

		}
		if (upw == null || uname.equals("")) {
			out.println("请输入密码.");
			response.setHeader("refresh", "3;url=reg.jsp");
			return;
		}
		if (upw2 == null || uname.equals("")) {
			out.println("请再次输入密码");
			response.setHeader("refresh", "3;url=reg.jsp");
			return;
		}
		if (!upw.equals(upw2)) {
			out.println("请重新确认密码，密码不一致");
			response.setHeader("refresh", "3;url=reg.jsp");
			return;
		}
		if (uemail != null | uemail != "") {

			boolean emailReh = reg.Regex(
					"^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
					uemail);
			if (emailReh) {

				int iemail = dao.getUserName("uemail", uemail);
				if (iemail > 0) {
					out.println("Sorry 该邮箱已被使用，请更换邮箱");
					response.setHeader("refresh", "3;url=reg.jsp");

					return;
				}
				;
			} else {
				/*out.println("邮箱格式不正确 ");
				response.setHeader("refresh", "3;url=reg.jsp");
				return;*/
			}
		}
		Users user = new Users();
		user.setUid(new getUid().getId());
		user.setUname(uname);
		user.setUpassword(upw);
		user.setUemail(uemail);
		new Dao().insert(user);
		session.removeAttribute("uname");
		session.setAttribute("uname", uname);
		response.setHeader("refresh", "0;url=index.jsp");
	%>
</body>
</html>
