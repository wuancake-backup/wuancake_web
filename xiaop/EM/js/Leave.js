var data = "MainAction/Lea.cshtml";

var pageSize = 14;//每页显示的记录条数
var curPage = 0;
var lastPage;
var direct = 0;
var len;
var page;
$(document).ready(function () {
    $("#qingjia").hide();
    $(".th").hide();
    $(".td").hide();
    len = $("#table tr").length;
    page = len % pageSize == 0 ? len / pageSize : Math.floor(len / pageSize) + 1;//根据记录条数，计算页数
    //  alert("page==="+page);
    curPage = 1;
    displayPage(1);//显示第一页
    $("#btn1").click(function () {
        curPage = 1;
        displayPage();
    });
    $("#btn2").click(function () {
        direct = -1;
        displayPage();
    });
    $("#btn3").click(function () {
        direct = 1;
        displayPage();
    });
    $("#btn4").click(function () {
        curPage = page;
        displayPage();
    });
});
function displayPage() {
    if ((curPage <= 1 && direct == -1) || (curPage >= page && direct == 1)) {
        direct = 0;
        alert("已经是第一页或者最后一页了");
        return;
    }
    lastPage = curPage;
    curPage = (curPage + direct + len) % len;
    var begin = (curPage - 1) * pageSize;//起始记录号
    var end = begin + pageSize;
    if (end > len) end = len;
    $("#table tr").hide();
    $("#table tr").each(function (i) {
        if (i >= begin && i < end)//显示第page页的记录
            $(this).show();
    });

}
$(function () {
    $("#leavebutton").click(function () {
        $("#qingjia").show();
        $("#qingjia").dialog({
            resizable: false,
            height: 350,
            width: 400,
            title: "请假",
            modal: true,
            buttons: {
                "确定": function () {
                    var startdate = $("#startdate").val();
                    var enddate = $("#enddate").val();
                    var leavetext = $("#leavetext").val();
                    var state = 0;
                    //location.href("Leave.cshtml?startdate=" + startdate + "&enddate=" + enddate + "&leavetext=" + leavetext + "&state="+state+"");
                    $(this).dialog("close");
                    $.ajax({
                        type: 'post',
                        url: data,
                        //dataType: 'html',
                        cache: false,
                        data: {
                            startdate: startdate,
                            name: name,
                            enddate: enddate,
                            leavetext: leavetext,
                            state: state,
                        },
                        success: function (data) {
                            //var result = $("EMp.cshtml").find("divtable1");
                            //$("#divtable").html(data);
                            $("#divtable").html(data);
                            alert("添加成功");
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest);
                            alert(textStatus);
                            alert(errorThrown);
                        }
                    });
                    //window.location.href = "Leave.cshtml";
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
    })
})
$(function () {
    $("#shengpi").click(function () {
        $(".th").show();
        $(".td").show();
    })
}
)
//td同意
$(function () {
    $(".td").click(function () {
        var trNode = $(this).parent().children("td").get(0).innerHTML;
        var state = 1;
        $.ajax({
            type: 'post',
            url: data,
            //dataType: 'html',
            cache: false,
            data: {
                trNode: trNode,
                state: state,
            },
            success: function (data) {
                //var result = $("EMp.cshtml").find("divtable1");
                //$("#divtable").html(data);
                $("#divtable").html(data);
                alert("添加成功");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest);
                alert(textStatus);
                alert(errorThrown);
            }
        });
        //location.href("Leave.cshtml?state=" + state + "&trNode=" + trNode + "");
        //window.location.href = "Leave.cshtml";
    })
}
)
//th取消
$(function () {
    $(".th").click(function () {
        var trNode = $(this).parent().children("td").get(0).innerHTML;
        var state = 2;
        $.ajax({
            type: 'post',
            url: data,
            //dataType: 'html',
            cache: false,
            data: {
                trNode: trNode,
                state: state,
            },
            success: function (data) {
                //var result = $("EMp.cshtml").find("divtable1");
                //$("#divtable").html(data);
                $("#divtable").html(data);
                alert("添加成功");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest);
                alert(textStatus);
                alert(errorThrown);
            }
        });
        //location.href("Leave.cshtml?state=" + state + "&trNode=" + trNode + "");
        //window.location.href = "Leave.cshtml";
    })
}
)
$(function () {
    $("#weishengpi").click(function () {
        var trNode = $(this).parent().children("td").get(0).innerHTML;
        alert(trNode);
        var state = 3;
        $.ajax({
            type: 'post',
            url: data,
            //dataType: 'html',
            cache: false,
            data: {
                trNode: trNode,
                state: state,
            },
            success: function (data) {
                //var result = $("EMp.cshtml").find("divtable1");
                //$("#divtable").html(data);
                $("#divtable").html(data);
                alert("添加成功");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest);
                alert(textStatus);
                alert(errorThrown);
            }
        });
        //location.href("Leave.cshtml?state=" + state + "&trNode=" + trNode + "");
        //window.location.href = "Leave.cshtml";
    })
}
)