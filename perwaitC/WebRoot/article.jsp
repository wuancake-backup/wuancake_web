<%@page import="java.util.List"%>
<%@ page contentType="text/html" language="java" import="java.sql.*,com.zsz.jdbc.*"  pageEncoding="UTF-8"%>
<%
	
            
            String tid="0";
            tid=request.getParameter("tid"); 
              String pid="0";
              pid=request.getParameter("pid"); 
 %>

<!DOCTYPE html>
<html>
  <head>
   
    <meta charset="UTF-8">
    <title>index --test</title>
	<%@ include file="head.jsp" %>
  </head>
<!-- nav -->
 <body>
  <%
                    	   Dao dao=new Dao();
                    	String tname=null,pname=null,pclick=null,preplies=null,pdate=null,pauthor=null,particle=null,ulogo=null,article_uid=null;
                       	 tname=dao.getXXval("theme", "tid", tid, "tname");
                       	 pname=dao.getXXval("posts", "tid", tid, "pname","pid",pid);
                       	 article_uid=dao.getXXval("usr", "uname", "admin", "uid");
                    	pclick=dao.getXXval("posts", "tid", tid, "pclicks","pid",pid);//获取点击量
                    	   preplies=dao.getXXval("posts", "tid", tid, "preplies","pid",pid);//获取回复数
                    	    pdate=dao.getXXval("posts", "tid", tid, "pdate","pid",pid);//获取date
                    	    pauthor=dao.getXXval("posts", "tid", tid, "pauthor","pid",pid);//获取date
                    	    particle=dao.getXXval("posts", "tid", tid, "particle","pid",pid);
                    	    ulogo=dao.getXXval("usr", "uname", pauthor, "uimg");
                    	    
                    	    if(ulogo.endsWith("")){
                    	   ulogo="image\\defaultlogo.jpg";
                    	   }
                     %>
 

 <div id="myBody">
<div class="container ">
    <div class="row bg_and_border">
        <div class="">
            <div class="col-md-9 col-sm-12 border-r">
                <div class="nav-tabs hidden-xs">
                    <h2 class=" h2"><%=pname %></h2>

                </div>

                <!--内容区 -->
                <div  class="modal-body body-list ">
                    <!-- 内容-->
                    <div class="col-sm-12 col-xs-12 border-bottom" >
                   
                    
                        <a  href="MyIndex.jsp?uid=<%=article_uid%>">
                            <img src="<%=ulogo %>" width="40px" height="40px" alt="img 40px ">
                        </a>
                        <div>
                            <p><label><a href=""><%=tname %></a></label>发布人：<%=pauthor %></p>
                            <p><%=pclick %>次浏览  <%=preplies %>个回复&#12288; 时间：<%=pdate %></p>
                        </div>
                    </div>
                    
                    <div class="col-sm-12 col-xs-12 border-bottom" >

                        <div class="col-sm-12 col-xs-12">

                            <%=particle %>
                        </div>
                    </div>

					<!-- 回复开始 -->
					<%
						String r_ulogo=null;
						String r_uid=null;
						
						List<Reply> rp=dao.getReplyList(tname, pid);
						for(Reply k:rp){
						 if(dao.getXXval("usr", "uname", k.getRauthor(), "uimg").equals("")){
						 r_ulogo="image\\defaultlogo.jpg";
						 }else {r_ulogo=dao.getXXval("usr", "uname", k.getRauthor(), "uimg");}
						 r_uid=dao.getXXval("usr", "uname", k.getRauthor(), "uid");
					 %>
                    <div class="col-sm-12 col-xs-12 border-bottom" >
                        <a  href="MyIndex.jsp?uid=<%=r_uid%>">
                            <img src="<%=r_ulogo %>" width="40px" height="40px" alt="img 40px ">
                        </a>
                        <div>
                            <p><a href="MyIndex.jsp?uid=<%=r_uid%>"><%=k.getRauthor() %></a></p>
                            <p><%=k.getRid()+1 %>楼&#12288;&#12288;时间：<%=k.getRdate() %></p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-xs-12 border-bottom" >

                        <div class="col-sm-12 col-xs-12">

                            <%=k.getRarticle() %>
                        </div>

                        <div class="col-sm-12 col-xs-12">
                            <li><span><a href="#">id xxx </a>:</span>你好</li>
                            <li><span><a href="#">id xxx </a>回复<a href="#">id xxx</a></span>哦</li>
                            <li><span><a href="#">id xxx </a>回复<a href="#">id xxx</a></span>哦 个 头</li>
                        </div>

                    </div>
                    <%} %>
					<!-- 回复结束 -->
 <div class="col-sm-12 col-xs-12 border-bottom" >
                        <a  href="">
                            <img src="" width="40px" height="40px" alt="img 40px ">
                        </a>
                        <div>
                            <p>2楼</p>
                            <p>作者：xxx  时间：2015年9月2日14:49:05</p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-xs-12 border-bottom" >

                        <div class="col-sm-12 col-xs-12">

                            <p>文章内容 呀拉索</p>
                            <p>文章内容 呀拉索</p><p>文章内容 呀拉索</p><p>文章内容 呀拉索</p>
                            <p>文章内容 呀拉索</p><p>文章内容 呀拉索</p>
                            <p>文章内容 呀拉索</p>
                        </div>

                        <div class="col-sm-12 col-xs-12">
                            <li><span><a href="#">id xxx </a>:</span>你好</li>
                            <li><span><a href="#">id xxx </a>回复<a href="#">id xxx</a></span>哦</li>
                            <li><span><a href="#">id xxx </a>回复<a href="#">id xxx</a></span>哦 个 头</li>
                        </div>

                    </div>


                </div>

                <!--huifu k -->
                <div  class="modal-body body-list ">
                    <!-- 内容-->

                    <div class="col-sm-12 col-xs-12 " >
                        <form >
                            <input class="form-control " type="text"  placeholder="请输入话题">

                            <label class="sr-only">回复</label>
                            <button type="submit" class="btn btn-default center-block">发表</button>

                        </form>
                    </div>




                </div>
                <!--huifu j -->

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
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
   </div>
  
  </body>
</html>
