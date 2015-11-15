<%@ page contentType="text/html" language="java" import="com.zsz.jdbc.*"  pageEncoding="UTF-8"%>
<% String uname=(String)session.getAttribute("uname"); 

 int uid=1;
%>
<!DOCTYPE html>
<html>
  <head>
   <%@ include file="link.jsp" %>
	
  </head>
  
  <body>
   
<div class=" bg-499ef3">
    <div class="container ">
        <nav>
            <div class="row  ">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="col-md-1  pull-left">
                        <a href="index.jsp"><img class="img-circle" src="image/ico1.png"></a>
                    </div>
                    <div class="col-md-6  pull-left hidden-xs">
                        <ul id="nav_ul" class="nav navbar-nav list-inline nav-head">

                            <li class="active"><a  title="index_body.jsp">动态</a></li>
                            <li><a title="topic.jsp">分类</a></li>
                            <li><a title="title.jsp">关于</a></li>
                        </ul>
                    </div>
                    <% if(uname==null||uname==""){ %>
                    <div class=" pull-right nav col-md-4 text-right">
                        <a class="btn bg-59b0ff" target="_blank" href="login.jsp">登陆</a>
                        <a class="btn bg-5bbf5a " target="_blank" href="reg.jsp">注册</a>
                    </div>
                    <% } else { %>
                     <div class=" pull-right nav col-md-4 text-right" >


                           <a href="create.jsp" class="btn bg-59b0ff">发布</a>


                        <!-- Split button -->
                        <div class="btn-group">
                            <button type="button" class="btn bg-5bbf5a"><a href="MyIndex.jsp?uid=<%=uid%>"><%=uname%></a></button>
                            <button type="button" class="btn bg-5bbf5a dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="caret"></span>
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li><a href="MyIndex.jsp?uid=<%=uid%>">我的主页</a></li>
                                <li><a href="#">编辑资料</a></li>
                                <% 
                                Dao dao=new Dao();
                                int iex=dao.getSqlAForB("uname", uname, "ulv", "root");
                                if(iex>0){ %>
                                <li><a href="#">进入后台</a></li>
                                <% } %>
                                <li role="separator" class="divider"></li>
                                <li><a href="exit.jsp">退出</a></li>
                            </ul>
                        </div>
                    </div>
                    <% } %>

                </div>
            </div>
        </nav>
    </div>
</div>

<%@ include file="js.jsp" %>
 <script type="text/javascript" >
     jQuery(function($){
        $("#nav_ul li").click(function(){
            $("#nav_ul li").prop("class","");
            $(this).prop("class","active");
            zsz_ajax("myBody",$(this).children().attr("title"));
        });
    });
   </script>

   	
   	
  
  </body>
</html>
