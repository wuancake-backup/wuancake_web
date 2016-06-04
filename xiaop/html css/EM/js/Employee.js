var data = "MainAction/EMp.cshtml";
$(function () {
    $("#add").click(function () {
        $("#popupcontent").show();
        $("#popupcontent").dialog({
            resizable: false,
            height: 350,
            width: 400,
            title: "添加员工",
            modal: true,
            buttons: {
                "确定": function () {
                    var employee = $("#employee").val();
                    var name = $("#name").val();
                    var select = $("#select  option:selected").text();
                    var telephone = $("#telephone").val();
                    var sex = $("#sex option:selected").text();
                    var adress = $("#adress").val();
                    var wage = $("#wage").val();
                    var wagecard = $("#wagecard").val();
                    //var data = "MainProgram/EMp.cshtml";
                    $(this).dialog("close");
                    $.ajax({
                        type: 'post',
                        url: data,
                        //dataType: 'html',
                        cache: false,
                        data: {
                            employee: employee,
                            name: name,
                            select: select,
                            telephone: telephone,
                            sex: sex,
                            adress: adress,
                            wage:wage,
                            wagecard:wagecard,
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
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
    })
})
$(function () {
    $("#xiugai").click(function () {
        $(".th").show();
        $(".td").show();
    }
    )
})
$(function () {
    $(".th").click(function () {
        var trNode = $(this).parent().children("td").get(1).innerHTML;

        $.ajax({
            type: 'post',
            url: data,
            //dataType: 'html',
            cache: false,
            data: {
                trNode: trNode,
            },
            success: function (data) {
                //var result = $("EMp.cshtml").find("divtable1");
                $("#divtable").html(data);
                //$(".th").hide();
                //$(".td").hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest);
                alert(textStatus);
                alert(errorThrown);
            }
        });
        alert("删除成功！");
        $(".th").hide();
        $(".td").hide();
    })
})

$(function () {
    $("#delete").click(function () {
        $(".th").hide();
        $(".td").hide();
    })
})

$(function () {
    $(".td").click(function () {
        var str = $(this).text() == "修改" ? "确定" : "修改";
        $(this).text(str);   // 按钮被点击后，在“编辑”和“确定”之间切换
        $(this).parent().children("td").each(function () {  // 获取当前行的其他单元格
            var col = $(this).prevAll().length + 1;
            if (col == 6 || col == 4) {
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
        if ($(this).text() != "确定") {
            var employee = $(this).parent().children("td").get(0).innerHTML;
            var name = $(this).parent().children("td").get(1).innerHTML;
            var select = $(this).parent().children("td").get(2).innerHTML;
            var telephone = $(this).parent().children("td").get(3).innerHTML;
            var sex = $(this).parent().children("td").get(4).innerHTML;
            var adress = $(this).parent().children("td").get(5).innerHTML;
            var empty = 1;
            $.ajax({
                type: 'post',
                url: data,
                //dataType: 'html',
                cache: false,
                data: {
                    employee: employee,
                    name: name,
                    select: select,
                    telephone: telephone,
                    sex: sex,
                    adress: adress,
                    empty: empty,
                },
                success: function (data) {
                    $(".th").hide();
                    $(".td").hide();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest);
                    alert(textStatus);
                    alert(errorThrown);
                }
            });
            //location.href("../MainProgram/Employee.cshtml?employee=" + employee + "&name=" + name + "&select=" + select + "&empty=" + empty + "&telephone=" + telephone + "&sex=" + sex + "&adress=" + adress + "&isshow=" + isShow + "");
            alert("修改成功！");
            $(".th").hide();
            $(".td").hide();
            //window.location.href = "Employee.cshtml";
        }
    });
});
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

}

);
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
