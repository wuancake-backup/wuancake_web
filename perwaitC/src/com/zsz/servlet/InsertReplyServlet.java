package com.zsz.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zsz.jdbc.Dao;
import com.zsz.jdbc.Posts;
import com.zsz.jdbc.Reply;
import com.zsz.jdbc.getDate;
import com.zsz.jdbc.getPid;
import com.zsz.jdbc.getRid;

public class InsertReplyServlet extends HttpServlet {

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
		String tname=request.getParameter("rtname");
		int rPid=Integer.parseInt(request.getParameter("rpid"));
//		int postsPid=Integer.parseInt(request.getParameter("pid"));
		//int postsPid=new getPid().getId(postsTid+"");
//		String postsPname=request.getParameter("pname");
//		String postsParticle=request.getParameter("particle");
//		String postsAuthor=request.getParameter("pauthor");
//		处理请求
		Reply reply=new Reply();
		reply.setPid(rPid);
		reply.setRid(new getRid().getId(tname, rPid+""));
		reply.setTname(tname);
		reply.setRarticle(request.getParameter("rarticle"));
		reply.setRauthor(request.getParameter("rauthor"));
		reply.setRdate(new getDate().time());
		
		
		
//		处理业务逻辑
//		Dao dao=new Dao();
//		dao.insert(posts);
		new Dao().insert(reply);
		String atid=new Dao().getXXval("theme", "tname", tname, "tid");
//		跳转到某个页面
		//request.getRequestDispatcher("article.jsp?tid="+atid+"&pid="+rPid).forward(request, response);
		response.setHeader("refresh", "0;article.jsp?tid="+atid+"&pid="+rPid);
		out.flush();
		out.close();
	}

}
