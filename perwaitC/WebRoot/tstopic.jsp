<%@page import="java.util.List"%>
<%@ page contentType="text/html" language="java"
	import="java.sql.*,com.zsz.jdbc.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
	<div class="col-sm-12 r_div_PaddingAndBorder">
		<div class="col-sm-12 ">
			<a href="topic.jsp" title="topic">更多</a>
			<h4>热门话题</h4>
		</div>
	</div>
	<!-- atart -->
	<%
		String Gtlogo = null;
		List<Theme> G_themes = new Dao().getThemeList("theme", "tlv", "G");
		for (Theme k : G_themes) {

			if (k.getTlogo() == null) {
				Gtlogo = "image\\group.jpg";
			} else {
				Gtlogo = k.getTlogo();
			}
			//int theme_article=new Dao().getSqlAForB("posts", "tid", k.getTid());
	%>
	<div class="col-sm-12 r_div_PaddingAndBorder">
		<a href="list.jsp?tid=<%=k.getTid()%>"> <img src="<%=Gtlogo%>"
			width="40px" height="40px" alt="img 40px ">
		</a>
		<div>
			<h4>
				<a href="list.jsp?tid=<%=k.getTid()%>"><%=k.getTname()%></a>
			</h4>
			<p>
				共计
				<%=new Dao().getSqlAForB("posts", "tid", k.getTid())%>篇 7天新增xxx篇
			</p>
		</div>
	</div>
	<%
		}
	%>
</body>
</html>
