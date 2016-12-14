define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        $ = require('lib/jquery'),
        BuildTable = require('lib/cubetable'),
        TablePView;
    TablePView = Backbone.View.extend({
        el: '.JpreivewTable',
        events: {
            'click .preview-table th span': 'sortData'
        },
        initialize: function() {
            Backbone.on('fillPreviewTable', this.JSON2HTML, this);
        },
        render:function(){
            this.$el.html(this.toHtml());
            return this;
        },
        sortData: function(e) {
            var $currentEl = $(e.currentTarget);
            this.drawChart.sort($currentEl.attr("code"));
            this.render();
        },
        JSON2HTML: function(data) {
            this.drawChart = new BuildTable();
            this.drawChart.CreateTable(data);
            this.render();
        },
        toHtml: function() {
            var datasort = this.drawChart.sort();
            var sortClass1 = "";
            if (!$.isEmptyObject(datasort)) {
                if (datasort.code == this.drawChart.RowCode()) {
                    sortClass1 = datasort.ifasc ? "up" : "down";
                }
            }
            var str1 = "<table class='preview-table table table-bordered table-striped' cellspacing='0' cellpadding='0' width='100%'><thead><tr class='tr-title table-th-bg'>";

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
        }
    });
    return TablePView;
});