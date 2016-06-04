<%@ page contentType="text/html" language="java" import="com.zsz.jdbc.*"
	pageEncoding="UTF-8"%>
<%
	String uname = (String) session.getAttribute("uname"), head_tid = request
			.getParameter("tid"), head_pid = request
			.getParameter("pid");
	int uid = new Dao().getAllUsers("uname", uname);
%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="link.jsp"%>
</head>
<body>
	<div class="navbar-fixed-top bg-499ef3">
		<div class="container ">
			<nav>
				<div class="row  ">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div class="col-md-1  pull-left">
							<a href="index.jsp"><img class="img-circle"
								src="image/ico1.png"></a>
						</div>
						<div class="col-md-6  pull-left hidden-xs">
							<ul id="nav_ul" class="nav navbar-nav list-inline nav-head">

								<li class="active" date-title="index"><a href="index.jsp">动态</a></li>
								<li date-title="topic"><a href="topic.jsp">分类</a></li>
								<li date-title="title"><a href="title.jsp">关于</a></li>
							</ul>
						</div>
						<%
							if (uname == null || uname == "") {
						%>
						<div class=" pull-right nav col-md-4 text-right">
							<a class="btn bg-59b0ff" target="_blank" href="login.jsp"
								data-toggle="modal" data-target="#login"
								data-whatever="@getbootstrap">登陆</a> <a class="btn bg-5bbf5a "
								target="_blank" href="reg.jsp" data-toggle="modal"
								data-target="#reg" data-whatever="@getbootstrap">注册</a>
						</div>
						<%
							} else {
						%>
						<div class=" pull-right nav col-md-4 text-right">
							<%
								if (head_tid != null && head_pid == null) {
							%>
							<a href="create.jsp?tid=<%=head_tid%>" data-toggle="modal"
								data-target="#create_posts" data-whatever="@getbootstrap"
								class="btn bg-59b0ff">发布</a>
							<%
								} else {
							%>
							<a href="javascript:void(0)" class="btn">&#12288;</a>
							<%
								}
							%>
							<!-- Split button -->
							<div class="btn-group">
								<button type="button" class="btn bg-5bbf5a">
									<a href="MyIndex.jsp?uid=<%=uid%>"><%=uname%></a>
								</button>
								<button type="button" class="btn bg-5bbf5a dropdown-toggle"
									data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false">
									<span class="caret"></span> <span class="sr-only">Toggle
										Dropdown</span>
								</button>
								<ul class="dropdown-menu dropdown-menu-right">
									<li><a href="MyIndex.jsp?uid=<%=uid%>">我的主页</a></li>
									<li><a href="#">编辑资料</a></li>
									<%
										Dao dao = new Dao();
											int iex = dao.getSqlAForB("uname", uname, "ulv", "root");
											if (iex > 0) {
									%>
									<li><a href="#">进入后台</a></li>
									<%
										}
									%>
									<li role="separator" class="divider"></li>
									<li><a href="exit.jsp">退出</a></li>
								</ul>
							</div>
						</div>
						<%
							}
						%>
					</div>
				</div>
			</nav>
		</div>
	</div>
	<!-- login modal start-->
	<div class="modal fade " id="login">
		<div class="modal-dialog modal-sm">
			<div class=" bg_and_border">
				<form action="chkLogin.jsp" method="post"
					onsubmit="return Logincheck()">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">登录</h4>
					</div>
					<div class="modal-body">
						<div>
							<label class="sr-only">账号</label> <input id="uname" name="uname"
								type="text" class="form-control" id="Uname"
								placeholder="UserName">
							<p id="UnameWarming"></p>
							<br> <label class="sr-only">密码</label> <input id="upw"
								name="upw" type="password" class="form-control" id="Upassword"
								placeholder="Password">
							<p id="PasswordWarming"></p>
						</div>
					</div>
					<div class="modal-footer form-group">
						<a href="javascript:void(0)" data-toggle="modal"
							data-target="#undefined" data-whatever="@getbootstrap"
							class="btn btn-warning">找回密码</a> <a href="javascript:void(0)"
							data-toggle="modal" data-target="#undefined"
							data-whatever="@getbootstrap" class="btn btn-success">登记账号</a> <a
							href="javascript:void(0)" data-toggle="modal"
							data-target="#undefined" data-whatever="@getbootstrap"
							class="btn btn-info ">QQ登陆</a>
					</div>
					<div class="modal-footer form-group">
						<button type="submit" class="btn btn-primary form-control">登录</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!--  login modal end-->
	<!-- undefined modal start-->
	<div class="modal fade " id="undefined">
		<div class="modal-dialog modal-sm">
			<div class=" bg_and_border">
				<form>
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">Undefind</h4>
					</div>
					<div class="modal-body">
						<h3 class="text-center">~未实现~</h3>
					</div>
					<div class="modal-footer form-group">
						<span data-dismiss="modal" class="btn btn-primary form-control">好吧
						</span>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!--  undefined modal end-->
	<!-- reg modal start-->
	<div class="modal fade " id="reg">
		<div class="modal-dialog ">
			<div class=" bg_and_border">
				<form action="chkReg.jsp" method="post"
					onsubmit="return Rregistration()">
					<div class="bg_and_border mar-div-20px ">
						<div class="text-center">
							<label class="sr-only">LOGO</label> <img class="img-circle "
								width="15%" height="15%" src="image/ico.png">
							<h3 class="h3">登记</h3>
						</div>
						<div class="form-group">
							<label class="sr-only">账号</label> <input id="uname" type="text"
								name="uname" class="form-control"
								placeholder="必填-请输入账号 长度为2-16字符 不能有空格 特殊字符">
							<p id="UnameWarming">&#12288;</p>
						</div>
						<div class="form-group">
							<label class="sr-only">密码</label> <input id="upw" type="password"
								name="upw" class="form-control"
								placeholder="必填-请输入密码 长度为2-16字符 不能有空格 特殊字符 汉字">
							<p id="PasswordWarming">&#12288;</p>
						</div>
						<div class="form-group">
							<label class="sr-only">密码确认</label> <input id="upw2"
								type="password" name="upw2" class="form-control"
								placeholder="必填-请再次输入密码">
							<p id="Password2">&#12288;</p>
						</div>
						<div class="form-group">
							<label class="sr-only"></label> <input id="uemail" type="text"
								name="uemail" class="form-control" placeholder="选填-请输入邮箱 ">
							<p id="EmailWarming">&#12288;</p>
						</div>
						<div class="form-group">
							<input type="submit" class="btn btn-info form-control"
								value="注册，并登陆">
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!--  reg modal end-->
	<!--posts in create start -->
	<div class="modal fade " id="create_posts">
		<div class="modal-dialog modal-lg">
			<div class=" bg_and_border">
				<form action="InsertPostsServlet" method="post">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">创建帖子</h4>
					</div>
					<div class="modal-body">
						<div>
							<label class="sr-only">标题</label> <input class="form-control "
								type="text" maxlength="40" name="pname" placeholder="请撰写标题">
							<p id="UnameWarming"></p>
							<br> <label class="sr-only">内容</label>
							<textarea class="form-control" rows="6" maxlength="8000"
								name="particle1" date-myTitle="htext" oninput="rep2()"
								style="word-wrap: break-word; word-break: break-all;"></textarea>
							<input type="hidden" value="null" hidden="hidden" class="sr-only"
								name="particle" date-myTitle="htext2">
							<p id="PasswordWarming"></p>
						</div>
					</div>
					<div class="modal-footer form-group">
						<button type="submit" class="btn btn-primary form-control">就决定是你了</button>
					</div>
					<input type="hidden" class="sr-only" name="tid"
						value="<%=request.getParameter("tid")%>" hidden="hidden">
					<input type="hidden" class="sr-only" name="pauthor"
						value="<%=(String) session.getAttribute("uname")%>"
						hidden="hidden">
				</form>
			</div>
		</div>
	</div>
	<br>
	<br>
	<br>
</body>
</html>
