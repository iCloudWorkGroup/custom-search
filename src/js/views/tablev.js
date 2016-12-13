define(function(require) {
    'use strict';
    /**
     * those most of code copy from old lib, so mach bad style
     */
    var Backbone = require('lib/backbone'),
        $ = require('lib/jquery'),
        BuildTable = require('lib/cubetable'),
        cache = require('util/cache'),
        TableView;
    TableView = Backbone.View.extend({
        el: '.JtableContainer',
        events: {
            'click .rowCheckbox': 'RowStatus',
            'click .colCheckbox': 'ColStatus'
        },
        initialize: function() {
            Backbone.on('fillTable', this.JSON2HTML, this);
            this.self = this;
        },
        JSON2HTML: function(data) {
            this.drawChart = new BuildTable();
            this.drawChart.CreateTable(data);
            this.drawChart.setTu(true);
            this.$el.html(this.toHtml());
            return this;
        },
        toHtml: function() {
            var datasort = this.drawChart.sort();
            var sortClass1 = "";
            if (!$.isEmptyObject(datasort)) {
                if (datasort.code == this.drawChart.RowCode()) {
                    sortClass1 = datasort.ifasc ? "up" : "down";
                }
            }
            var str1 = "<table class='table table-bordered table-striped' cellspacing='0' cellpadding='0' width='100%'><thead><tr class='tr-title table-th-bg'>";

            str1 += "<th style='text-align:center;'><strong>" + this.drawChart.getCaption() + "</strong><span class='" + sortClass1 + "' code='" + this.drawChart.RowCode() + "'></span></th>";
            var collist = this.drawChart.getColList();
            var rowlist = this.drawChart.getRowList();
            var datatb = this.drawChart.getDataTable();
            var memolist = this.drawChart.getMemoList();

            var iftu = this.drawChart.setTu();
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
                    if (this.drawChart.ColCode() == "zb") {
                        var unitStr = "";
                        if (collist[i]["unitname"] != "") {
                            unitStr = "(" + collist[i]["unitname"] + ")";
                        }
                        str1 += "<strong>" + collist[i]["cname"] + unitStr + "</strong>";
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

                if (this.drawChart.RowCode() == "zb") {
                    var unitStr = "";
                    if (rowlist[i]["unitname"] != "") {
                        unitStr = "(" + rowlist[i]["unitname"] + ")";
                    }
                    str1 += rowlist[i]["cname"] + unitStr + "</td>";
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
        },
        RowStatus: function(e) {
            var $currentEl = $(e.currentTarget),
                setCodes = this.drawChart.getCheckedList(),
                curCode = $currentEl.attr("code"),
                rowIndex = $currentEl.parents("tr").index(),
                $tr = $("tbody tr", this.$el);
            if ($currentEl.prop("checked")) {
                $tr.eq(rowIndex).find("td").addClass("l");
                setCodes.rows.push(curCode);
            } else {
                $tr.eq(rowIndex).find("td").removeClass("l");
                setCodes.rows.splice(curCode);
            }
            this.drawChart.setCheckedByCode(setCodes.rows, setCodes.cols);
            this.cacheStatus(setCodes.rows, setCodes.cols);
        },
        ColStatus: function(e) {
            var $currentEl = $(e.currentTarget),
                setCodes = this.drawChart.getCheckedList(),
                curCode = $currentEl.attr("code"),
                colIndex = $currentEl.parent().index(),
                $tr = $("tbody tr", this.$el);
            if ($currentEl.prop("checked")) {
                $tr.each(function() {
                    $("td", this).eq(colIndex).addClass("t");
                });
                setCodes.cols.push(curCode);
            } else {
                $tr.each(function() {
                    $("td", this).eq(colIndex).removeClass("t");
                });
                setCodes.cols.splice(curCode, 1);
            }
            this.drawChart.setCheckedByCode(setCodes.rows, setCodes.cols);
            this.cacheStatus(setCodes.rows, setCodes.cols);
        },
        cacheStatus: function(datarows, datacols) {
            cache.rows = datarows;
            cache.cols = datacols;
        }
    });
    return TableView;
});