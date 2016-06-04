<%@page import="java.util.List"%>
<%@ page contentType="text/html" language="java"
	import="java.sql.*,com.zsz.jdbc.*" pageEncoding="UTF-8"%>
<%
	String create_author=(String)session.getAttribute("uname");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>index --test</title>
<%@ include file="link.jsp"%>
</head>
<body>
	<!-- 开始创建窗口 -->
	<!--create topic modal -->
	<div class="modal fade " id="createTopicArea">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<form action="InsertThemeServlet" method="post"
					name="createTopicArea">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">创建话题</h4>
					</div>
					<div class="modal-body">
						<div>
							<label class="sr-only">话题名</label> <br> <input type="text"
								name="create_tname" class="form-control" id="Uname"
								placeholder="为话题取个名字"> <input type="hidden"
								value="<%=create_author%>" name="create_author" hidden="hidden"
								class="sr-only"> <br>
						</div>
					</div>
					<div class="modal-footer form-group">
						<button type="submit" class="btn btn-primary form-control">创建</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!--  结束创建窗口 -->

	<%@ include file="head.jsp"%>
	<div class="container ">
		<div class="row bg_and_border">
			<div class="">
				<div class="col-md-9 col-sm-12 border-r">
					<div class="nav-tabs ">
						<h2 class=" h2">全部话题</h2>
						<ul class="nav nav-ul">
							<%
								if(create_author!=null){
							%>
							<li><a href="javascript:void(0)" data-toggle="modal"
								data-target="#createTopicArea" data-whatever="@getbootstrap">创建</a></li>
							<!--   <li class="active"><a href="#">全部</a></li>-->
							<%
								}
							%>
						</ul>
					</div>
					<!--内容区 -->
					<div class="modal-body body-list ">
						<!-- 内容-->

						<!-- atart -->
						<%
							int Tindex=0;
						                   String tlogo=null;
									List<Theme> _themes=new Dao().getThemeList("theme");
									for(Theme k:_themes){
									Tindex+=1;
									if(k.getTlogo()==null){
										tlogo="image\\group.jpg";
									}else {
										tlogo=k.getTlogo();
									}
									//int theme_article=new Dao().getSqlAForB("posts", "tid", k.getTid());
						%>

						<div class="col-sm-6 col-xs-12">
							<a href="list.jsp?tid=<%=k.getTid()%>"> <img
								src="<%=tlogo%>" width="40px" height="40px" alt="img 40px ">
							</a>
							<div>
								<label><a href="list.jsp?tid=<%=k.getTid()%>"><%=k.getTname()%></a></label>
								<p>
									共计
									<%=new Dao().getSqlAForB("posts", "tid", k.getTid())%>篇文章
									7天内新增 x篇
								</p>
							</div>
						</div>
						<%
							}
						%>
						<!-- emd -->
						<!-- 分页-->
						<%
							if(Tindex>20){
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
					</div>
				</div>
				<!-- 热门话题 -->
				<div class="col-md-3 hidden-xs hidden-sm body-list">

					<%@ include file="tstopic.jsp"%>
				</div>
				<!--  end-->
			</div>
		</div>
	</div>
	<%@ include file="foot.jsp"%>
</body>
<%@ include file="js.jsp"%>
<script type="text/javascript">
	jQuery(function($) {
		$('#nav_ul li').prop("class", "");
		$('#nav_ul li[date-title="topic"]').prop("class", "active");
	});
</script>
</html>
