<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html>
<head lang="en">
<meta charset="UTF-8">
<title></title>
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/bodyBG.css">
<link rel="icon" href="image/ico.png">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>
<body>
	<div class="area">
		<div class="container">
			<div class="row">
				<div
					class=" col-lg-6  col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12">
					<!-- InstanceBeginEditable name="EditReg" -->
					<form action="chkLogin.jsp" method="post"
						onsubmit="return Logincheck()">
						<div class="modal-content mar-div-20px ">
							<div class="text-center">
								<label class="sr-only">LOGO</label> <img class="img-circle "
									width="15%" height="15%" src="image/ico.png">
								<h3 class="h3">登陆</h3>
							</div>
							<div class="form-group">
								<label class="sr-only">账号</label> <input id="uname" name="uname"
									type="text" class="form-control"
									placeholder="请输入账号 长度为2-16字符 不能有空格 特殊字符">
								<p id="UnameWarming">&#12288;</p>
							</div>
							<div class="form-group">
								<label class="sr-only">密码</label> <input id="upw" name="upw"
									type="password" class="form-control"
									placeholder="请输入密码 长度为2-16字符 不能有空格 特殊字符 汉字">
								<p id="PasswordWarming">&#12288;</p>
							</div>
							<div class="form-group">
								<label class="sr-only">other</label> <a class="btn btn-default">找回密码</a>
								<a href="reg.jsp" class="btn btn-default">登记账号</a> <a
									class="btn btn-default">使用QQ登陆</a>
							</div>
							<div class="form-group">
								<input type="submit" class="btn btn-info form-control"
									value="登陆">
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<script src="js/reg.js"></script>
</body>
</html>
