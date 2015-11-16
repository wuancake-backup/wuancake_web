<%@page import="java.util.List"%>
<%@ page contentType="text/html" language="java" import="java.sql.*,com.zsz.jdbc.*"  pageEncoding="UTF-8"%>


<!DOCTYPE html>
<html>
  <head>
   
    <meta charset="UTF-8">
    <title>index --test</title>
	
	<%@ include file="link.jsp" %>
	
  </head>
  
  <body>

   <div class="container ">
    <div class="row bg_and_border">
        <div class="">
            <div class="col-md-9 col-sm-12 border-r">
                <div class="nav-tabs hidden-xs">
                    <h2 class="hidden-xs h2">全部话题</h2>
                    <ul class="nav nav-ul">
                        <li><a href="createC.jsp">创建</a></li>
                       <!--   <li class="active"><a href="#">全部</a></li>-->
                    </ul>
                </div>

                <!--内容区 -->
                <div  class="modal-body body-list ">
                    <!-- 内容-->
                    
                    <!-- atart -->
                      <%
                   String tlogo=null;
					List<Theme> _themes=new Dao().getThemeList("theme");
					for(Theme k:_themes){
					
					if(k.getTlogo()==null){
						tlogo="image\\group.jpg";
					}else {
						tlogo=k.getTlogo();
					}
					//int theme_article=new Dao().getSqlAForB("posts", "tid", k.getTid());
					 %>
					
                    <div class="col-sm-6 col-xs-12" >
                        <a  href="list.jsp?tid=<%=k.getTid()%>">
                            <img src="<%=tlogo %>" width="40px" height="40px" alt="img 40px ">
                        </a>
                        <div>
                            <label><a  href="list.jsp?tid=<%=k.getTid()%>"><%=k.getTname() %></a></label>
                            <p>共计 <%=new Dao().getSqlAForB("posts", "tid", k.getTid()) %>篇文章  7天内新增 x篇</p>
                        </div>
                    </div>
                    <% } %>
                    <!-- emd -->
                    <div class="col-sm-6 col-xs-12" >
                        <a  href="">
                            <img src="" width="40px" height="40px" alt="img 40px ">
                        </a>
                        <div>
                            <label><a href="">话题</a></label>
                            <p>x篇文章</p>
                            <p>7天内新文章 x篇</p>
                        </div>
                    </div>


                    <!-- 分页-->
                    <div class="col-sm-12 ">
                        <ul class="list-style">
                            <li ><a href="#">上一页</a></li>
                            <li class="active" ><a href="http://baidu.com">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li>...</li>
                            <li><a href="#">111</a></li>
                            <li><a href="#">下一页</a></li>
                        </ul>
                    </div>

                </div>

            </div>

            <div class="col-md-3 hidden-xs hidden-sm body-list">
                <!-- 热门话题 -->

                <div class="col-sm-12 r_div_PaddingAndBorder">
                    <div class="col-sm-12 ">
                        <a href="#">更多</a>
                        <h4>热门话题</h4>
                    </div>


                </div>

                <div class="col-sm-12 r_div_PaddingAndBorder">

                    <a  href="">
                        <img src="" width="40px" height="40px" alt="img 40px ">
                    </a>
                    <div>
                        <h4><a href="#">反馈区</a></h4>
                        <p>共计 xxx篇 7天新增xxx篇</p>
                    </div>

                </div>
                <div class="col-sm-12 r_div_PaddingAndBorder">

                    <a  href="">
                        <img src="" width="40px" height="40px" alt="img 40px ">
                    </a>
                    <div>
                        <h4><a href="#">反馈区</a></h4>
                        <p>xxx 人关注  xxx篇文章</p>
                    </div>

                </div>
                <div class="col-sm-12 r_div_PaddingAndBorder">

                    <a  href="">
                        <img src="" width="40px" height="40px" alt="img 40px ">
                    </a>
                    <div>
                        <h4><a href="#">反馈区</a></h4>
                        <p>xxx 人关注  xxx篇文章</p>
                    </div>

                </div>

                <!--  -->
                <!--  -->



            </div>

        </div>
    </div>
</div>
   
  
  
  </body>
</html>
