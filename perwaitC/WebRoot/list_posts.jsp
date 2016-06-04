<%@page import="java.util.List"%>
<%@ page contentType="text/html" language="java"
	import="java.sql.*,com.zsz.jdbc.*" pageEncoding="UTF-8"%>
<%
	PreparedStatement stmt = null;
	ResultSet rs = null;
	Connection conn = null;
	String puname = (String) session.getAttribute("uname"), session_tid = request.getParameter("tid");
	int indexPosts = 0;
%>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
	<div class="container ">
		<div class="row bg_and_border">
			<div class="">
				<div class="col-md-9 col-sm-12 border-r">
					<div class="nav-tabs ">
						<h2 class=" h2"><%=new Dao().getXXval("theme", "tid", session_tid, "tname")%></h2>
						<ul class="nav nav-ul">
							<li><a href="#">热度</a></li>
							<li class="active"><a href="#">最新</a></li>
						</ul>
					</div>
					<!--内容区 -->
					<div class="modal-body body-list ">
						<!-- 内容-->
						<!-- 开始获取posts -->
						<%
							String plogo = null, tname = null;
							List<Posts> test = new Dao().getList("posts", "tid", session_tid);
							for (Posts k : test) {
								plogo = new Dao().getXXval("usr", "uname", k.getPauthor(),
										"uimg");
								tname = new Dao().getXXval("theme", "tid", k.getTid(), "tname");
								if (plogo == "" || plogo == null || plogo.endsWith("")) {
									plogo = "image\\defaultlogo.jpg";
								}
						%>
						<div class="col-sm-12 col-xs-12 border-bottom">
							<a
								href="MyIndex.jsp?uid=<%=new Dao().getXXval("usr", "uname", k.getPauthor(),
						"uid")%>">
								<img src="<%=plogo%>" width="40px" height="40px"
								alt="img 40px ">
							</a>
							<div>
								<h4>
									<a href="article.jsp?tid=<%=k.getTid()%>&pid=<%=k.getPid()%>"><%=k.getPname()%></a>
								</h4>
								<p>
									<label><a href="list.jsp?tid=<%=k.getTid()%>"><%=tname%></a></label>
									发布人：<a
										href="MyIndex.jsp?uid=<%=new Dao().getXXval("usr", "uname", k.getPauthor(),
						"uid")%>">
										<%=k.getPauthor()%>
									</a>&#12288;
									<%=k.getPclick()%>次浏览
									<%=new Dao().getReplyNum(tname, k.getPid())%>个回复
								</p>
							</div>
							<%
								if (puname == k.getPauthor()) {
							%>
							<div class="last">
								<button class="btn btn-sm btn-primary">编辑</button>
								<button class="btn btn-sm btn-danger">删除</button>
							</div>
							<%
								}
							%>
						</div>
						<%
							}
							if (test.toString() == "[]") {
						%>
						<br>
						<h3 class=" text-center ">~此片场 空空如也 哟~</h3>
						<%
							}
						%>
						<!-- 结束获取posts -->
						<!-- 分页-->
						<%
							if (indexPosts / 15 > 1) {
						%>
						<div class="col-sm-12 ">
							<ul class="list-style">
								<li><a href="#">上一页</a></li>
								<li class="active"><a href="http://baidu.com">1</a></li>
								<li><a href="#">2</a></li>
								<li><a href="#">3</a></li>
								<li>...</li>
								<li><a href="#">111</a></li>
								<li><a href="#">下一页</a></li>
							</ul>
						</div>
						<%
							}
						%>
						<!-- 分页结束 -->
					</div>
				</div>
				<div class="col-md-3 hidden-xs hidden-sm body-list">
					<!-- 热门话题 -->
					<%@ include file="tstopic.jsp"%>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
