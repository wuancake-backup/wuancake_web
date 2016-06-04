<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String createPid = null, createTid = null, createAuthor = null;
	request.setCharacterEncoding("utf-8");
	createAuthor = (String) session.getAttribute("uname");
	createTid = request.getParameter("tid");
%>	

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>index --test</title>
<%@ include file="head.jsp"%>
<%@ include file="js.jsp"%>
</head>
<!-- nav -->
<body>
	<div id="myBody">
		<!-- nav -->
		<div class="container ">
			<div class="row bg_and_border">
				<div class="">
					<div class="col-md-9 col-sm-12 border-r">
						<div class="nav-tabs hidden-xs">
							<h2 class=" h2">发布文章</h2>
						</div>
						<!--内容区 -->
						<div class="modal-body body-list ">
							<!-- 内容-->
							<div class="col-sm-12 col-xs-12 ">
								<form action="InsertPostsServlet" method="post"
									name="createPosts">
									<input class="form-control " type="text" maxlength="40"
										name="pname" placeholder="请撰写标题">
									<textarea class="form-control" rows="6" maxlength="8000"
										name="particle1" date-myTitle="text" oninput="rep()"
										style="word-wrap: break-word; word-break: break-all;"></textarea>
										
									<input type="hidden" value="null" hidden="hidden"
										class="sr-only" name="particle" date-myTitle="text2">
									<label class="sr-only">发布</label>
									<button type="submit" class="btn btn-default center-block">发布</button>
									<input type="hidden" class="sr-only" name="tid"
										value="<%=createTid%>" hidden="hidden"> <input
										type="hidden" class="sr-only" name="pauthor"
										value="<%=createAuthor%>" hidden="hidden">
								</form>
							</div>
						</div>
					</div>
					<div class="col-md-3 hidden-xs hidden-sm body-list">
						<!-- 热门话题 -->
						<%@ include file="tstopic.jsp"%>
					</div>
				</div>
			</div>
		</div>
	</div>
	<%@ include file="foot.jsp"%>
</body>
</html>
