<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>


<!DOCTYPE html>
<html>
  <head>
   
    <meta charset="UTF-8">
    <title>index --test</title>
	<%@ include file="head.jsp" %>
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
                <div  class="modal-body body-list ">
                    <!-- 内容-->

                    <div class="col-sm-12 col-xs-12 " >
                        <form >
                            <input class="form-control " type="text" placeholder="请撰写标题">
<textarea class="form-control" rows="3"></textarea>
                            <label class="sr-only">发布</label>
                            <button type="submit" class="btn btn-default center-block">发布</button>

                        </form>
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

</div>
  </body>
</html>
