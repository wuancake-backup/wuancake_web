<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>index --test</title>
<%@ include file="head.jsp"%>
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
							<h2 class=" h2">创建话题</h2>
						</div>
						<!--内容区 -->
						<div class="modal-body body-list ">
							<!-- 内容-->
							<div class="col-sm-12 col-xs-12 ">
								<form>
									<input class="form-control " type="text" placeholder="请输入话题">
									<label class="sr-only">创建</label>
									<button type="submit" class="btn btn-default center-block">创建</button>
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
</body>
</html>
