<%@page import="java.util.List,java.lang.*"%>
<%@ page contentType="text/html" language="java"
	import="java.sql.*,com.zsz.jdbc.*,com.zsz.test.*" pageEncoding="UTF-8"%>
<%
	String tid = "0";
	tid = request.getParameter("tid");
	String pid = "0";
	pid = request.getParameter("pid");
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>index --test</title>
<%@ include file="head.jsp"%>
</head>
<!-- nav -->
<body>
	<%
		Dao dao = new Dao();
		String tname = null, pname = null, pclick = null, preplies = null, pdate = null, pauthor = null, particle = null, ulogo = null, article_uid = null;
		tname = dao.getXXval("theme", "tid", tid, "tname");
		pname = dao.getXXval("posts", "tid", tid, "pname", "pid", pid);
		article_uid = dao.getXXval("usr", "uname", "admin", "uid");
		pclick = dao.getXXval("posts", "tid", tid, "pclicks", "pid", pid);//获取点击量
		preplies = dao
				.getXXval("posts", "tid", tid, "preplies", "pid", pid);//获取回复数
		pdate = dao.getXXval("posts", "tid", tid, "pdate", "pid", pid);//获取date
		pauthor = dao.getXXval("posts", "tid", tid, "pauthor", "pid", pid);//获取date
		particle = dao
				.getXXval("posts", "tid", tid, "particle", "pid", pid);
		ulogo = dao.getXXval("usr", "uname", pauthor, "uimg");
		if (ulogo == null || ulogo == "" || ulogo.equals("")) {
			ulogo = "image\\defaultlogo.jpg";
		}
	%>
	<div id="myBody">
		<div class="container ">
			<div class="row bg_and_border">
				<div class="">
					<div class="col-md-9 col-sm-12 border-r">
						<div class="nav-tabs ">
							<h2 class=" h2"><%=pname%></h2>
						</div>
						<!--内容区 -->
						<div class="modal-body body-list ">
							<!-- 内容-->
							<div class="col-sm-12 col-xs-12 ">
								<a href="MyIndex.jsp?uid=<%=article_uid%>"> <img
									src="<%=ulogo%>" width="40px" height="40px" alt="img 40px ">
								</a>
								<div>
									<p>
										<label><a href=""><%=tname%></a></label>发布人：<%=pauthor%></p>
									<p><%=pclick%>次浏览
										<%=new Dao().getReplyNum(tname, pid)%>个回复&#12288; 时间：<%=pdate%></p>
								</div>
							</div>
							<div class="col-sm-12 col-xs-12 border-bottom">
								<div class="col-sm-12 col-xs-12">
									<%
										if (particle == "" || particle == null
												|| (particle + "").equals("")) {
									%>
									<h3 class=" text-center ">~ 楼主丢下标题跑路啦！~</h3>
									<%
										} else {
									%>
									<%=particle.trim()%>
									<%
										}
									%>
									<br> <br>
								</div>
							</div>
							<!-- 回复开始 -->
							<%
								String r_ulogo = null;
								String r_uid = null;

								List<Reply> rp = dao.getReplyList(tname, pid);
								for (Reply k : rp) {
									if (k.getRshow() == "0" || (k.getRshow() + "").equals("0")
											|| k.getRshow() == null) {
										r_ulogo = new Dao().getXXval("usr", "uname",
												k.getRauthor(), "uimg");
										if (r_ulogo == null || r_ulogo == "" || r_ulogo.equals("")) {
											r_ulogo = "image\\defaultlogo.jpg";
										}
										r_uid = dao.getXXval("usr", "uname", k.getRauthor(), "uid");
							%>
							<div class="col-sm-12 col-xs-12 ">
								<a href="MyIndex.jsp?uid=<%=r_uid%>"> <img
									src="<%=r_ulogo%>" width="40px" height="40px" alt="img 40px ">
								</a>
								<div>
									<p>
										<a href="MyIndex.jsp?uid=<%=r_uid%>"><%=k.getRauthor()%></a>
									</p>
									<p><%=k.getRid() + 1%>楼&#12288;&#12288;时间：<%=k.getRdate()%></p>
								</div>
							</div>
							<div class="col-sm-12 col-xs-12 border-bottom">

								<div class="col-sm-12 col-xs-12" date-myTitle="text">

									<%=k.getRarticle()%>
									<br> <br>
								</div>
							</div>
							<%
								} else {

									}
								}
							%>

						</div>

						<!--huifu k -->
						<div class="modal-body body-list ">
							<!-- 内容-->

							<div class="col-sm-12 col-xs-12 ">
								<%
									if ((String) session.getAttribute("uname") != null) {
								%>
								<form method="post" action="InsertReplyServlet">
									<textarea date-myTitle="text" class="form-control "
										name="rarticle1" type="text" rows="4" oninput="rep()"
										placeholder="吐槽该楼主"></textarea>
									<input type="hidden" value="null" hidden="hidden"
										class="sr-only" name="rarticle" date-myTitle="text2">
									<label class="sr-only">回复</label>
									<button type="submit" class="btn btn-default center-block">发表</button>
									<input type="hidden" hidden="hidden" class="sr-only"
										value="<%=pid%>" name="rpid"> <input type="hidden"
										hidden="hidden" class="sr-only" value="<%=tname%>"
										name="rtname"> <input type="hidden" hidden="hidden"
										class="sr-only"
										value="<%=(String) session.getAttribute("uname")%>"
										name="rauthor">
								</form>
								<%
									} else {
								%>
								<p class="text-center">登录后 才能吐槽哟</p>
								<%
									}
								%>
							</div>
						</div>
						<!--huifu j -->
					</div>
					<div class="col-md-3 hidden-xs hidden-sm body-list">
						<!-- 热门话题 -->
						<%@ include file="tstopic.jsp"%>
					</div>

				</div>
			</div>
		</div>
	</div>
	<%@ include file="js.jsp"%>
	<%@ include file="foot.jsp"%>
</body>
</html>
