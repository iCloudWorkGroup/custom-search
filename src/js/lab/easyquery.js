//缓存选中时间节点
var sjwdNode = "",
    sjwdName = "";

function sum(rowcol) {
    drawChart.Math_SUM(rowcol);
    $(".table-container").html(toHtml());
    setTuOption(); // 作图
}

function avg(rowcol) {
    drawChart.Math_AVG(rowcol);
    $(".table-container").html(toHtml());
    setTuOption(); // 作图
}

function max(rowcol) {
    drawChart.Math_MAX(rowcol);
    $(".table-container").html(toHtml());
    setTuOption(); // 作图
}

function min(rowcol) {
    drawChart.Math_MIN(rowcol);
    $(".table-container").html(toHtml());
    setTuOption(); // 作图
}

function mid(rowcol) {
    drawChart.Math_MID(rowcol);
    $(".table-container").html(toHtml());
    setTuOption(); // 作图
}

function mod(rowcol) {
    drawChart.Math_MOD(rowcol);
    $(".table-container").html(toHtml());
    setTuOption(); // 作图
}

function s2(rowcol) {
    drawChart.Math_S2(rowcol);
    $(".table-container").html(toHtml());
    setTuOption(); // 作图
}

function sd(rowcol) {
    drawChart.Math_SD(rowcol);
    $(".table-container").html(toHtml());
    setTuOption(); // 作图
}

function restore() {
    drawChart.Restore();
    $(".table-container").html(toHtml());
    setTuOption(); // 作图
}

function transdata() {
    drawChart.TransData();
    if (isRow == "row") {
        isRow = "col";
        $("input[value='col']").attr("checked", true);
    } else {
        isRow = "row";
        $("input[value='row']").attr("checked", true);
    }
    QueryData(true, []);
}

function dotu(e) {
    drawChart.setTu(e);
    $(".table-container").html(toHtml());
    lockTable = $(".table-container").yflockTable({
        "width": $(".main-right").width()
    });
}

function tuOff() {
    dotu(false);
    json = {}; // 作图关闭，清除json
    tuTitle = ""; // 清除图标题
    $("#initIndexCharts").hide(); // 图表div隐藏
    $(".drawTu").removeClass("on");
    $(".dataList").addClass("on");

    /* 左右等高 */
    equalHeight("main-left", "main-right", 350);
}

function tuOn() {
    $("#initIndexCharts").show();
    dotu(true);
    $(".dataList").removeClass("on");
}

// 去除空行空列
function trimTable() {
    drawChart.DelBlank("row");
    drawChart.DelBlank("col");
    $(".table-container").html(toHtml());
    setTuOption(); // 作图
}

// 建表
function toHtml() {
    var datasort = drawChart.sort();
    var sortClass1 = "";
    if (!$.isEmptyObject(datasort)) {
        if (datasort.code == drawChart.RowCode()) {
            sortClass1 = datasort.ifasc ? "up" : "down";
        }
    }
    var str1 = "<table class='public_table' cellspacing='0' cellpadding='0' width='100%'><thead><tr class='tr-title'>";

    str1 += "<th style='text-align:center;'><strong>" + drawChart.getCaption() + "</strong><span class='" + sortClass1 + "' code='" + drawChart.RowCode() + "'></span></th>";
    var collist = drawChart.getColList();
    var rowlist = drawChart.getRowList();
    var datatb = drawChart.getDataTable();
    var memolist = drawChart.getMemoList();

    var iftu = drawChart.setTu();
    if (iftu) {
        str1 += "<th>&nbsp;</th>";
    }
    for (var i = 0; i < collist.length; i++) {
        if (collist[i]["ifhide"] != true) {
            var sortClass2 = "",
                redClass = "";
            if (!$.isEmptyObject(datasort)) {
                if (datasort.code == collist[i]["code"]) {
                    sortClass2 = datasort.ifasc ? "up" : "down";
                }
            }
            if (collist[i]["ifjisuan"]) {
                redClass = "red";
            }
            str1 += "<th class='" + redClass + "'>";
            if (drawChart.ColCode() == "zb") {
                var unitStr = "";
                if (collist[i]["unitname"] != "") {
                    unitStr = "(" + collist[i]["unitname"] + ")";
                }
                str1 += "<a class='zbExp' exp='" + collist[i]["exp"] + "' href='javascript:void(0);'><img src='images/icon-1.png'></a><strong>" + collist[i]["cname"] + unitStr + "</strong>";
            } else {
                str1 += "<strong>" + collist[i]["cname"] + "</strong>";
            }
            str1 += "<span class='" + sortClass2 + "' code='" + collist[i]["code"] + "'></span></th>";
        }
    }
    str1 += "</tr>";
    if (iftu) {
        str1 += "<tr><th></th><th></th>";
        for (var i = 0; i < collist.length; i++) {
            if (collist[i]["ifhide"] != true) {
                var c1 = "checked='checked'";
                if (collist[i]["ifchecked"] != true) {
                    c1 = "";
                }
                str1 += "<th><input class='colCheckbox' code='" + collist[i]["code"] + "' type='checkbox'  " + c1 + " /></th>";
            }
        }
        str1 += "</tr>";
    }
    str1 += "</thead><tbody>";
    for (var i = 0; i < rowlist.length; i++) {
        if (rowlist[i]["ifhide"] == true) {
            continue;
        }
        var redClass2 = "";
        if (rowlist[i]["ifjisuan"]) {
            redClass2 = "red";
        }
        str1 += "<tr><td class='" + redClass2 + "'>";

        if (drawChart.RowCode() == "zb") {
            var unitStr = "";
            if (rowlist[i]["unitname"] != "") {
                unitStr = "(" + rowlist[i]["unitname"] + ")";
            }
            str1 += "<a class='zbExp' exp='" + rowlist[i]["exp"] + "' href='javascript:void(0);'><img src='images/icon-1.png'></a>" + rowlist[i]["cname"] + unitStr + "</td>";
        } else {
            str1 += rowlist[i]["cname"] + "</td>";
        }

        if (iftu) {
            var c1 = "checked='checked'";
            if (rowlist[i]["ifchecked"] != true) {
                c1 = "";
            }
            str1 += "<td><input class='rowCheckbox' code='" + rowlist[i]["code"] + "' type='checkbox'  " + c1 + " /></td>";
        }
        var dr1 = datatb[rowlist[i]["id"]];
        if (dr1 != null || dr1 != undefined) {
            for (var j = 0; j < dr1.length; j++) {
                if (collist[j]["ifhide"] != true) {
                    var selClass = "";
                    if (collist[j]["ifchecked"] && rowlist[i]["ifchecked"]) {
                        selClass = "l t";
                    } else if (collist[j]["ifchecked"] && !rowlist[i]["ifchecked"]) {
                        selClass = "t";
                    } else if (!collist[j]["ifchecked"] && rowlist[i]["ifchecked"]) {
                        selClass = "l";
                    }

                    if (rowlist[i]["ifjisuan"] || collist[j]["ifjisuan"]) {
                        selClass += " red";
                    }

                    //单位错误标红
                    /*if(dr1[j]["ifuniterr"]){
                        selClass += " red";
                    }*/

                    var t = "";
                    if (dr1[j]["memo"] && dr1[j]["memo"] != "") {
                        selClass += " rote";
                        t = dr1[j]["memo"];
                    }

                    str1 += "<td align='right' class='" + selClass + "' title='" + t + "'>" + dr1[j]["strdata"] + "</td>";
                }
            }
        } else {
            for (var j = 0; j < collist.length; j++) {
                str1 += "<td></td>";
            }
        }
        str1 += "</tr>";
    }
    str1 += "</table>";

    if (memolist.length > 0) {
        var expshow = "<div class='expShow'><div class='zhu'>注：</div><div class='explist'>";
        if (memolist.length == 1) {
            expshow += '<dl><dd>' + memolist[0] + '</dd></dl>';
        } else {
            for (var i = 0; i < memolist.length; i++) {
                expshow += '<dl><dt>' + (i + 1) + '.</dt><dd>' + memolist[i] + '</dd></dl>';
            }
        }
        expshow += "</div></div>";
        $(".table-container").next().remove();
        $(".table-container").after(expshow);
    } else {
        $(".table-container").next().remove();
    }
    return str1;
};
//维度转换函数
var weiduSwap = {
    run: function(weibu, rc, colcode, callback) {

        //保存选择的维度
        this.saveWeiDu = {
            "weiduRow": {
                "weiduName": "",
                "value": ""
            },
            "weiduCol": {
                "weiduName": "",
                "value": ""
            }
        };
        this.formerWeiDu = {
            "weiduRow": {
                "weiduName": "",
                "value": ""
            },
            "weiduCol": {
                "weiduName": "",
                "value": ""
            }
        };


        this.weibu = weibu; //维度json
        this.rc = rc; //表格行显示的维度
        this.colcode = colcode; //表格列显示的维度
        this.weidBtn = "weidBtn"; //维度按钮添class
        if (typeof callback == "function") {
            this.callback = callback;
        }

        this.create();
        this.addWebDuEvent();
    },
    /*
     *维度转换方法
     *创建表格
     * weibu  维度json
     * rc 表格行显示的维度
     * colcode 表格列显示的维度
     */
    create: function() {
        //输出表格
        var submitObj = $("#MZADX_3 .submit");
        var dataHtml = {
            dataHtml: "",
            weudu: ""
        };
        var col = 0;
        var row = 1;
        for (var i = 0; i < this.weibu.length; i++) {
            if (this.weibu[i].code == this.rc) {
                row = i;
            }
            if (this.weibu[i].code == this.colcode) {
                col = i;
            }
        }
        for (var i = 0; i < (this.weibu.length + 2); i++) {
            if (i == 0) {
                dataHtml.tableHtml = '<tr>';
                for (var j = 0; j < (this.weibu.length + 1); j++) {
                    if (j == 0) {
                        dataHtml.tableHtml += '<td class="weiduTDX" value="' + this.weibu[row].code + '">' + this.weibu[row].name + '</td>';
                    } else {
                        dataHtml.tableHtml += '<td class="weiduTDX" value="' + this.weibu[col].code + '">' + this.weibu[col].name + '</td>';
                    }

                }
                dataHtml.tableHtml += '</tr>';
            } else {
                dataHtml.tableHtml += '<tr>';
                for (var j = 0; j < (this.weibu.length + 1); j++) {
                    if (j == 0) {
                        dataHtml.tableHtml += '<td class="weiduTDY" value="' + this.weibu[row].code + '">' + this.weibu[row].name + '</td>';
                    } else {
                        dataHtml.tableHtml += '<td>&nbsp;</td>';
                    }

                }
                dataHtml.tableHtml += '</tr>';
            }
        }

        this.formerWeiDu.weiduCol.weiduName = this.weibu[col].name;
        this.formerWeiDu.weiduCol.value = this.weibu[col].code;
        this.formerWeiDu.weiduRow.weiduName = this.weibu[row].name;
        this.formerWeiDu.weiduRow.value = this.weibu[row].code;

        this.saveWeiDu.weiduCol.weiduName = this.weibu[col].name;
        this.saveWeiDu.weiduCol.value = this.weibu[col].code;
        this.saveWeiDu.weiduRow.weiduName = this.weibu[row].name;
        this.saveWeiDu.weiduRow.value = this.weibu[row].code;

        //输出维度
        for (var k = 0; k < this.weibu.length; k++) {
            dataHtml.weudu += '<span class="weidBtn" value="' + this.weibu[k].code + '">' + this.weibu[k].name + '</span>';
        }
        $("#MZADX_3 .webDuSwop").html(dataHtml.tableHtml);
        $("#MZADX_3 .weiduTop").html(dataHtml.weudu);
        $("#MZADX_3 .weiduLeft").append(dataHtml.weudu);
    },
    /*
     *维度转换方法
     *维度按钮添加事件
     */
    addWebDuEvent: function() {
        var self = this;
        var $weidBtn = $("." + this.weidBtn);
        var submitObj = $("#MZADX_3 .submit");
        $weidBtn.click(function() {
            var name = $(this).html();
            var value = $(this).attr("value");
            var otr = $("#MZADX_3 .webDuSwop").find("tr");
            if ($(this).parents().attr("class") == "weiduLeft") {
                for (var i = 0; i < otr.length; i++) {
                    otr.eq(i).children("td").eq(0).attr("value", value).html(name);
                }
                self.saveWeiDu.weiduRow.weiduName = name;
                self.saveWeiDu.weiduRow.value = value;

            } else {
                //顶部边维度
                var otd = otr.eq(0).find("td");
                for (var i = 1; i < otd.length; i++) {
                    otd.eq(i).attr("value", value).html(name);
                }
                self.saveWeiDu.weiduCol.weiduName = name;
                self.saveWeiDu.weiduCol.value = value;
            }
        });

        //确定维度转换
        submitObj.click(function(e) {
            //行和列的维度是否改变
            var isAlter = self.checkWeiDu();
            weidu = {
                "former": self.formerWeiDu, //原来的维度
                "news": self.saveWeiDu //新维度
            };
            if (self.saveWeiDu.weiduRow.value == self.saveWeiDu.weiduCol.value) {
                alert("行列相同");
                return false;
            }
            $('.closeBtn').trigger('click');
            //回调函数
            self.callback(e, isAlter, weidu);


        });

    },
    //检查维度是否改变
    checkWeiDu: function() {
        /*
         *返回判断维度三种状态
         * 0 维度没有任何变化
         * 1 维度位置变了
         * 2 维度改变了
         * */
        if (this.formerWeiDu.weiduRow.value == this.saveWeiDu.weiduRow.value && this.formerWeiDu.weiduCol.value == this.saveWeiDu.weiduCol.value) {
            //维度没有任何变化
            return 0;
        } else if (this.formerWeiDu.weiduRow.value == this.saveWeiDu.weiduCol.value && this.formerWeiDu.weiduCol.value == this.saveWeiDu.weiduRow.value) {
            //维度位置改变了
            return 1;
        } else {
            //维度改变了
            return 2;
        }
    }
};


$(function() {
    /** ********************新增指标*********************** */
    $("#addIndexLi").click(function() {
        $.tips({
            title: '新增指标',
            content: tipsAddZb,
            width: 610,
            height: 470,
            drag: true,
            isCopy: false
        });

        tabRowCol();
    });
    // 新增指标、筛选-行列切换
    $(".tipRadio").find(":radio").on("click", function() {
        tabRowCol();
        $(".tip-container-4 ul").empty();
    });

    // 左边双击事件
    $(".tipList li a").on(
        "dblclick",
        function() {
            $(".tipTxtarea").val(
                $(".tipTxtarea").val() + '#' + $.trim($(this).html()) + '#');
        }).on(
        "click",
        function() {
            $(this).addClass("curSel").parent().siblings().find("a")
                .removeClass("curSel");
        });
    // 中间单击事件
    $(".moverR").on("click", function() {
        var $cur = $(".tipList li a.curSel");
        if ($cur.size() < 1) {
            alert("请选择指标！");
            return false;
        }
        $(".tipTxtarea").val(
            $(".tipTxtarea").val() + '#' + $.trim($(".curSel").html()) + '#');

    });
    // 计算符号事件
    $(".tipCalculate ul li a").on("click", function() {
        $(".tipTxtarea").val($(".tipTxtarea").val() + $(this).html());
    });

    // 新增确认
    $(".addConfirm").on("click", function(e) {
        var exp1 = $(".tipTxtarea").val();
        var title = $(".addTitleName").val();
        if ($.trim(title) == "") {
            alert("新增指标名不能为空");
            return false;
        }
        if ($.trim(exp1) == "") {
            alert("请正确填写！");
            return false;
        }

        var strRow = $(".tipRadio").find(":radio:checked").val();

        if (!drawChart.CheckNewExp(strRow, exp1)) {
            alert("表达式不正确！");
            return false;
        }

        drawChart.AddNewExpress(strRow, title, exp1);
        $(".table-container").html(toHtml());

        setTuOption(); // 作图

        $(".closeBtn").click();
    });

    function tabRowCol() {
        var rowsList = drawChart.getRowList();
        var colsList = drawChart.getColList();
        var row = $(".tipRadio").find(":radio:checked").val() == "row";

        if (row) {
            $(".tipList ul").empty();
            $.each(rowsList, function(i) {
                $(".tipList ul").append(
                    '<li><a href="javascript:void(0);" code="' + rowsList[i].code + '">' + rowsList[i].cname + '</a></li>');
            });
        } else {
            $(".tipList ul").empty();
            $.each(colsList, function(i) {
                $(".tipList ul").append(
                    '<li><a href="javascript:void(0);" code="' + colsList[i].code + '">' + colsList[i].cname + '</a></li>');
            });
        }
    }

    /** ********************筛选*********************** */
    $("#filterLi").click(function() {
        $.tips({
            title: '筛选',
            content: tipsShaiXuan,
            width: 800,
            height: 370,
            drag: true,
            isCopy: false
        });

        tabRowCol();
    });

    // 筛选左侧双击
    $(".tip-container-1 ul li a").on("dblclick", function() {
        var symbol = $(".tip-container-2").find(":checked").val();
        var textVal = $(".tip-num-input").val();
        if ($.trim(textVal) == "") {
            alert("请输入过虑条件！");
            return false;
        }

        if ($(".result-list li").size() >= 3) {
            alert("最多只能选择3个过虑条件！");
            return false;
        }

        $(".tip-container-4 ul").append(
            '<li><a href="javascript:void(0)" code="' + $(this).attr("code") + '">#' + $(this).html() + '#' + symbol + textVal + '</a></li>');
    });
    // 输入过虑条件
    $(".tip-num-input").on("keypress", function() {
        var val = $(this).val();
        var tval = $(this).attr('t_value');
        if (!val.match(/^[\+\-]?\d*?\.?\d*?$/)) {
            $(this).val(tval);
        }
    }).on("keyup", function() {
        if (!$(this).val().match(/^[\+\-]?\d*?\.?\d*?$/)) {
            $(this).val($(this).attr("t_value"));
        } else {
            $(this).attr("t_value", $(this).val());
        }
        if ($(this).val().match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) {
            $(this).attr("o_value", $(this).val());
        }
    }).on("blur", function() {
        if (!$(this).val().match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/)) {
            $(this).val($(this).attr("o_value"));
        } else {
            if ($(this).val().match(/^\.\d+$/)) {
                $(this).val($(this).val() + 0);
                if ($(this).val().match(/^\.$/)) {
                    $(this).val(0);
                    $(this).attr("o_value", $(this).val());
                    this.o_value = this.value;
                }
            }
        }
    });
    // 右边双击事件
    $(".tip-container-4 ul li a").on("click", function() {
        $(this).addClass("curSel").parent().siblings().find("a").removeClass("curSel");
    });

    // 右侧清除选定条件
    $(".leftmove").on("click", function() {
        var curObj = $(".result-list").find(".curSel");
        if (curObj.size() < 1) {
            alert("请选择要删除的筛选条件");
            return false;
        } else {
            curObj.parent().remove();
        }
    });
    // 单击添加筛选条件
    $(".rightmove").on("click", function() {
        var $cur = $(".tip-container-1 li a.curSel");
        var symbol = $(".tip-container-2").find(":checked").val();
        var textVal = $(".tip-num-input").val();
        if ($cur.size() < 1) {
            alert("请选择指标！");
            return false;
        }

        if ($.trim(textVal) == "") {
            alert("请输入过虑条件！");
            $(".tip-num-input").focus();
            return false;
        }

        if ($(".result-list li").size() >= 3) {
            alert("最多只能选择3个过虑条件！");
            return false;
        }

        $(".tip-container-4 ul").append(
            '<li><a href="javascript:void(0)" code="' + $cur.attr("code") + '">#' + $cur.html() + '#' + symbol + textVal + '</a></li>');
    });

    // 筛选确认
    $(".shaixuanConfirm").on("click", function() {
        var list = $(".result-list li");
        if (list.size() < 1) {
            alert("筛选条件不能为空！");
            return false;
        }

        var strRow = $(".tipRadio").find(":radio:checked").val();
        var exp1 = "";
        $.each(list, function(i) {
            exp1 += " && " + list.eq(i).text();
        });
        exp1 = exp1.substring(3);

        drawChart.Filter(strRow, exp1);
        $(".table-container").html(toHtml());

        setTuOption(); // 作图

        $(".closeBtn").click();
    });

    /** ************************编辑************************************************************************************ */
    $("#edit").click(function() {
        $.tips({
            title: '编辑',
            content: editHmtl,
            width: 600,
            height: 430,
            drag: true,
            isCopy: false
        });

        tabRowCol2();
    });
    // 编辑-行列切换
    $(".editRadio").find(":radio").on("click", function() {
        tabRowCol2();
    });
    // 全选事件
    $(".selectAll").on("click", function() {
        $(".editBody").find(":checkbox").attr("checked", true);
    });
    // 反选事件
    $(".selectAnti").on("click", function() {
        $(".editBody").find(":checkbox").each(function() {
            $(this).attr("checked", !$(this).attr("checked"));
        });
    });

    // 确认编辑
    $(".editConfirm").on("click", function() {
        var row = $(".editRadio").find(":radio:checked").val() == "row";

        var editArr = [];
        $.each($(".editBody").find(":checkbox"), function() {
            if ($(this).is(":checked")) {
                editArr.push({
                    "code": $(this).attr("code"),
                    "ifhide": false
                });
            } else {
                editArr.push({
                    "code": $(this).attr("code"),
                    "ifhide": true
                });
            }
        });

        if (row) {
            drawChart.Edit("row", editArr);
        } else {
            drawChart.Edit("col", editArr);
        }
        $(".table-container").html(toHtml());

        setTuOption(); // 作图

        $(".closeBtn").click();
    });

    // 取消编辑、取消新增、取消筛选
    $(".editCancel, .addCancel, .shaixuanCancel").on("click", function() {
        $(".closeBtn").click();
    });

    function tabRowCol2() {
        var rowsList = drawChart.getRowList();
        var colsList = drawChart.getColList();
        var row = $(".editRadio").find(":radio:checked").val() == "row";

        if (row) {
            $(".editBody tbody").empty();
            $.each(rowsList, function(i) {
                var isChecked = "";
                if (!rowsList[i].ifhide) {
                    isChecked = 'checked="checked"';
                }
                $(".editBody tbody").append(
                    '<tr><td><input type="checkbox" code="' + rowsList[i].code + '"' + isChecked + ' /><span>' + rowsList[i].cname + '</span></td></tr>');
            });
        } else {
            $(".editBody tbody").empty();
            $.each(colsList, function(i) {
                var isChecked = "";
                if (!colsList[i].ifhide) {
                    isChecked = 'checked="checked"';
                }
                $(".editBody tbody").append(
                    '<tr><td><input type="checkbox" code="' + colsList[i].code + '"' + isChecked + ' /><span>' + colsList[i].cname + '</span></td></tr>');
            });
        }
    }
    /** ************************编辑end**************************** */


    /** ************************维度转换**************************** */
    //维度转换
    $("#webDuSwop").click(function() {
        $.tips({
            title: '维度转换',
            content: webDuSwop,
            width: 600,
            height: 250,
            drag: true, //开启拖拽
            isCopy: false
        });
        $.ajax({
            url: ctx + "/easyquery.htm?m=getWd",
            type: "get",
            dataType: "json",
            data: {
                "db": drawChart.DbCode()
            },
            success: function(data1) {
                weiduSwap.run(data1, drawChart.RowCode(), drawChart.ColCode(), weiduSwapFn);
            }
        });
    });

    /*
     *维度转换回调函数
     * e event对象
     * isAlter 维度改变状态 0：没有变化 1：位置变了 2：维度变了
     * weidu   原来维度和改变后的维度
     * */
    function weiduSwapFn(e, isAlter, weidu) {
        $(".createtype > li").eq(0).click();
        switch (isAlter) {
            case 0:
                return false;
                break;
            case 1:
                //维度zhuanz
                transdata();
                break;
            case 2:
                var rowCode = weidu.news.weiduRow.value;
                var colCode = weidu.news.weiduCol.value;
                getwds(rowCode, colCode, []);
                break;
        }
    };
    /** ************************维度转换end**************************** */

    // 排序
    $(".public_table th span").on("click", function() {
        scrollleft = $(".table_container_main").scrollLeft();

        drawChart.sort($(this).attr("code"));
        $(".table-container").html(toHtml());
        lockTable = $(".table-container").yflockTable({
            "width": $(".main-right").width()
        });
    });

    // 分栏拖拽
    $("#main-container").ySplitbar({
        "number": 1,
        "maxWidth": 300,
        "minWidth": 150,
        "barTop": "200",
        "callback": splitbarFn
    });

    // 指标解释
    $(".zbExp").on("click", function() {
        $.tips({
            title: '指标解释',
            content: '<h2 style="color:#007bd0;font-weight: normal;font-size:14px;text-align:center;padding:5px 0 5px 0;">' + $(this).parent().text() + '</h2><p style="line-height: 150%;">' + $(this).attr("exp") + '</p>',
            width: 500,
            height: 300,
            drag: true,
            swfUrl: "js/tips/js/ZeroClipboard.swf"
        });
    });
});

/** *************************************************************************************************************************************************** */

/* 拖拽回调函数 */
function splitbarFn(w) {
    $(".lockTable_container,.table_container_main,.table_container_head,#chart")
        .width(w);
    // 获取主表的宽度
    var tableObj = $(".table_main");
    var w = tableObj.width();
    var tdw = tableObj.find("tbody tr").eq(0).find("td").eq(0).outerWidth();

    $(".table_container_fix,.table_container_column").width(tdw);
    $(".table_fix,.table_column,.table_head").width(w);

    $(".main-left").height($(".main-right").height());
    if ($("#initIndexCharts").is(":visible")) {
        myChart.resize();
    }
}

// 下拉单击事件
function dropclick(dt) {
    var wdcode = dt.getWd().wdcode;
    var sort = dt.getItem().sort;
    if (sort == "1") {
        QueryData(true, []);
        return;
    }
    var code = dt.getItem().code;
    var dfwds = [];
    if (code != "") {
        dfwds[0] = {
            "wdcode": wdcode,
            "valuecode": code
        };
    }
    if (wdcode == drawChart.RowCode() || wdcode == drawChart.ColCode()) {
        QueryData(true, dfwds);

    } else {
        getwds(wdcode, drawChart.ColCode(), dfwds);
    }
}

// 取得默认维度
function getselwds() {
    var data = [];
    for (var i = 0; i < droplist.length; i++) {
        var dt = droplist[i];
        if (dt.getItem().sort != "4") {
            data[i] = {
                "wdcode": dt.getWd().wdcode,
                "valuecode": dt.getItem().code
            };
        }
    }
    return JSON.stringify(data);
}

// 查询表格
function QueryData(iffresh, dfwds1) {
    $
        .ajax({
            url: ctx + "/easyquery.htm",
            type: "get",
            dataType: "json",
            async: false,
            data: {
                "m": "QueryData",
                "dbcode": drawChart.DbCode(),
                "rowcode": drawChart.RowCode(),
                "colcode": drawChart.ColCode(),
                "wds": getselwds(),
                "dfwds": JSON.stringify(dfwds1),
                "k1": new Date().getTime()
            },
            beforeSend: function() {
                $(".table-container")
                    .append(
                        "<div class='loadingBox'><div class='loading'>正在加载中...</div></div>");
            },
            success: function(data1) {
                if (data1.returncode != 200) {
                    alert(data1.returndata);
                    //防止错误时间维度 下载、复制、打印错误
                    $("#mySelect_sj > .dtHtml > .dtHead").attr("node", sjwdNode);
                    $("#mySelect_sj > .dtHtml > .dtHead").text(sjwdName);

                    $(".loadingBox").remove();
                    return false;
                }

                var QueryResultData = data1.returndata;
                if (iffresh) {
                    drawChart.FreshData(QueryResultData);
                } else {
                    drawChart.CreateTable(QueryResultData);
                }
                $(".table-container").html(toHtml());
                setTuOption();
                return true;
            },
            complete: function() { // 不管成功还是失败,都删除 正在加载中...
                $(".loadingBox").remove();
            }
        });
}

// 查找纬度
function getwds(rowcode1, colcode1, dfwds1) {
    $
        .ajax({
            url: ctx + "/easyquery.htm",
            type: "get",
            dataType: "json",
            async: false,
            data: {
                "m": "getOtherWds",
                "dbcode": drawChart.DbCode(),
                "rowcode": rowcode1,
                "colcode": colcode1,
                "wds": JSON.stringify(dfwds1),
                "k1": new Date().getTime()
            },
            success: function(data1) {
                if (data1.returncode != 200) {
                    alert(data1.returndata);
                    return false;
                }
                var data = data1.returndata;
                drawChart.RowCode(rowcode1);
                drawChart.ColCode(colcode1);
                for (var i = 0; i < droplist.length; i++) {
                    var dt = droplist[i];
                    dt.delClick();
                }
                droplist = [];
                $("#divdroplist").empty();
                for (var i = 0; i < data.length; i++) {
                    var onewd = data[i];
                    var index = onewd.selcode;

                    for (var j = 0; j < onewd.nodes.length; j++) {
                        if (onewd.nodes[j].code.toLowerCase() == onewd.selcode
                            .toLowerCase()) {
                            index = j;
                        }
                    }
                    $("#divdroplist")
                        .append(
                            "<div id=\"mySelect_" + onewd.wdcode + "\" style=\"margin: 7px 10px 0 20px; float: left\">");
                    var dt1 = $("#mySelect_" + onewd.wdcode);
                    if (typeof index == 'number') {
                        dt1.dropList(onewd, {
                            isText: onewd.issj,
                            setIndex: index
                        }, dropclick);
                    } else {
                        dt1.dropList(onewd, {
                            isText: onewd.issj,
                            setItem: index
                        }, dropclick);
                    }
                    if (onewd.issj == false || (onewd.wdcode != drawChart.RowCode() && onewd.wdcode != drawChart.ColCode())) {
                        dt1.addItem(0, {
                            "code": "",
                            "name": "序列",
                            sort: "4"
                        });
                    }
                    droplist[i] = dt1;
                }
                QueryData(false, []);
            }
        });
}

// 树单击事件
function treenodeclick(wdcode, code) {
    var dfwds = [];
    if (code != "") {
        dfwds[0] = {
            "wdcode": wdcode,
            "valuecode": code
        };
    }
    if (wdcode == drawChart.RowCode() || wdcode == drawChart.ColCode()) {
        QueryData(false, dfwds);
    } else {
        getwds(wdcode, drawChart.ColCode(), dfwds);
    }
}

// 初始化树
function initLeftTree() {
    var treeObj = $("#treeZhiBiao").yTree({
        "root": rootTree
    });
    treeObj.url = ctx + "/easyquery.htm";
    treeObj.autoParam = ["id", "dbcode", "wdcode"];
    treeObj.otherParam = {
        "m": "getTree"
    };
    // 点击方法
    treeObj.onClick = onClick;
    // 生成树
    treeObj.renderTreee();
    // 展开指定节点
    treeObj.expandNode(zbpath, zbcode);
    // 节点点击回调函数
    function onClick(event, treeId, treeNode) {
        // addzb="";
        // 如果是父节点就展开
        if (treeNode.isParent) {
            treeObj.expandNode(treeNode.id);
        } else {
            //下载 复制  打印  分享日志基础信息
            if (treeNode.wdcode == "zb") {
                logzbcode = treeNode.id;
            } else if (treeNode.wdcode == "reg") {
                logregcode = treeNode.id;
            } else if (treeNode.wdcode == "sj") {
                logsjcode = treeNode.id;
            }

            treenodeclick(treeNode.wdcode, treeNode.id);
        }
    }
}