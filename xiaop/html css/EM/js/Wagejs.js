var data = "MainAction/Wa.cshtml";

var pageSize = 14;//每页显示的记录条数
var curPage = 0;
var lastPage;
var direct = 0;
var len;
var page;
$(document).ready(function () {
    $("#popupcontent").hide();
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
    $("#xiugai").click(function () {
        //$(".th").show();
        $(".td").show();
    }
    )
})

$(function () {
    $(".td").click(function () {
        var str = $(this).text() == "修改" ? "确定" : "修改";
        $(this).text(str);   // 按钮被点击后，在“编辑”和“确定”之间切换
        $(this).parent().children("td").each(function () {  // 获取当前行的其他单元格
            var col = $(this).prevAll().length + 1;
            if (col == 4 || col == 12) {
                obj_text = $(this).find("input:text");    // 判断单元格下是否有文本框
                if (!obj_text.length)   // 如果没有文本框，则添加文本框使之可以编辑
                {
                    $(this).html("<input type='text' value='" + $(this).text() + "'>");
                }
                else   // 如果已经存在文本框，则将其显示为文本框修改的值
                {
                    $(this).html(obj_text.val());
                }
            }
        })
        if ($(this).text() != "确定") {;
            var wage = $(this).parent().children("td").get(3).innerHTML;
            var travesu = $(this).parent().children("td").get(11).innerHTML;
            var employee = $(this).parent().children("td").get(1).innerHTML;
            $.ajax({
                type: 'post',
                url: data,
                //dataType: 'html',
                cache: false,
                data: {
                    wage: wage,
                    travesu: travesu,
                    employee: employee,
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
            //alert(wage);
            //alert(employee);
            //alert(travesu);
            //location.href("Wage.cshtml?wage=" + wage + "&travesu=" + travesu + "&employee=" + employee + "");
            //alert("修改成功！");
            //window.location.href = "Wage.cshtml";
        }
    });
});