package com.zsz.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zsz.jdbc.Dao;
import com.zsz.jdbc.Users;

public class InsertUsersServlet extends HttpServlet {

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		this.doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		request.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
//		接收请求
		int userID=Integer.parseInt(request.getParameter("uid"));
		String userName=request.getParameter("uname");
		String userPw=request.getParameter("upassword");
		String userEmail=request.getParameter("uemail");
//		
		Users user=new Users();
		user.setUid(userID);
		user.setUname(userName);
		user.setUpassword(userPw);
		user.setUemail(userEmail);
		
//		处理业务逻辑
		Dao dao=new Dao();
		dao.insert(user);

//		跳转到某个页面
		request.getRequestDispatcher("QueryServlet").forward(request, response);
		
		out.flush();
		out.close();
	}

}
