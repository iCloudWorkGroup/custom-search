define(function() {
function cubetable() {
    var dbcode = "hgnd";  //数据库代码
    var rowcode = "zb";   //行维度代码
    var colcode = "sj";   //列维度代码
    var data = {};
    //保存的数据
    var DataTable = [];    //数据体，二维表

    var DataRowList = [];    //二维表的行集合
    var DataColList = [];    //二维表的列集合

    var DataMemoList = [];   //数据对应的备注集合

    var DataAction = [];    //数据动作记录集合

    var DataSort = {};      //排序集合

    var Caption = "";       //数据表标题

    var DataTu = false;     //作图开关


    /***********************************************/
    //与作图相关


    /**
    *取得需要作图的数据，默认是按行
    * e:是否是需要按列
    **/
    this.getCheckedData = function (e) {
        if (e == null || e != "col") {
            return getCheckData_();
        }
        return getCheckDataRowToCol_();
    };

    /**
    *取得作图的行列代码列表接口
    *
    **/
    this.getCheckedList = function () {
        return getCheckedList_();
    };

    /**
    *取得作图的行列代码列表
    *
    **/
    function getCheckedList_() {
        if (DataTu == false) {
            return {};
        }
        var rows = [];
        var cols = [];
        for (var i = 0; i < DataRowList.length; i++) {
            if (DataRowList[i]["ifchecked"] && DataRowList[i]["ifhide"] == false) {
                rows.push(DataRowList[i]["code"]);
            }
        }
        for (var i = 0; i < DataColList.length; i++) {
            if (DataColList[i]["ifchecked"] && DataColList[i]["ifhide"] == false) {
                cols.push(DataColList[i]["code"]);
            }
        }
        return { "rows": rows, "cols": cols };
    };

    /**
    *设置作图接口，可以开关
    *
    **/
    this.setTu = function (e) {
        if (e == null) {
            return DataTu;
        }
        if (typeof e == "boolean") {
            DataTu = e;
            if (DataTu == false) {
                for (var i = 0; i < DataRowList.length; i++) {
                    DataRowList[i]["ifchecked"] = false;
                }
                for (var i = 0; i < DataColList.length; i++) {
                    DataColList[i]["ifchecked"] = false;
                }
            }
        }
    };

    /**
    *设置作图的区域，按代码设置
    *row，col为字符数组
    **/
    this.setCheckedByCode = function (row1, col1) {
        setCheckedByCode_(row1, col1);
        DataTu = true;
    };

    /**
    *接口设置作图局域，按数量设置，请前往后标，0表示整行(列)全部设置
    *row,col1为数值型
    **/
    this.setCheckedbyCount = function (row1, col1) {
        setCheckedbyCount_(row1, col1);
        DataTu = true;
    };

    /**
    *取得作图区域数据，此为按列作图的数据
    *
    **/
    function getCheckDataRowToCol_() {
        var re = {};
        if (DataTu == false) {
            return re;
        }
        var rows = getCheckDataRows_();
        var cols = getCheckDataCols_();
        if (rows.length == 0 || cols.length == 0) {
            return re;
        }
        var rows1 = [];
        for (var i = 0; i < rows.length; i++) {
            var r1 = {};
            r1["code"] = rows[i]["code"];
            r1["cname"] = rows[i]["cname"];
            r1["unitname"] = rows[i]["unitname"];
            r1["namestr"] = rows[i]["namestr"];
            rows1.push(r1);
        }
        re["cols"] = rows1;
        var cols1 = [];
        for (var i = 0; i < cols.length; i++) {
            var r1 = {};
            r1["code"] = cols[i]["code"];
            r1["cname"] = cols[i]["cname"];
            r1["unitname"] = cols[i]["unitname"];
            r1["namestr"] = cols[i]["namestr"];
            cols1.push(r1);
        }
        re["rows"] = cols1;

        var data1 = [];
        for (var j = 0; j < cols.length; j++) {
            var row1 = [];
            var jj1 = cols[j]["id"];
            for (var i = 0; i < rows.length; i++) {
                var ii1 = rows[i]["id"];
                var dd1 = "-";
                if (DataTable[ii1][jj1]["hasdata"]) {
                    dd1 = StrtoFloat(DataTable[ii1][jj1]["strdata"]);
                }
                row1.push(dd1);
            }
            data1.push(row1);
        }
        re["data"] = data1;
        return re;
    }


    /**
    *取得作图区域数据，此为按行作图的数据 ，为默认情况
    *
    **/
    function getCheckData_() {
        var re = {};
        if (DataTu == false) {
            return re;
        }
        var rows = getCheckDataRows_();
        var cols = getCheckDataCols_();
        if (rows.length == 0 || cols.length == 0) {
            return re;
        }
        var rows1 = [];
        for (var i = 0; i < rows.length; i++) {
            var r1 = {};
            r1["code"] = rows[i]["code"];
            r1["cname"] = rows[i]["cname"];
            r1["unitname"] = rows[i]["unitname"];
            r1["namestr"] = rows[i]["namestr"];
            rows1.push(r1);
        }
        re["rows"] = rows1;
        var cols1 = [];
        for (var i = 0; i < cols.length; i++) {
            var r1 = {};
            r1["code"] = cols[i]["code"];
            r1["cname"] = cols[i]["cname"];
            r1["unitname"] = cols[i]["unitname"];
            r1["namestr"] = cols[i]["namestr"];
            cols1.push(r1);
        }
        re["cols"] = cols1;

        var data1 = [];
        for (var i = 0; i < rows.length; i++) {
            var ii1 = rows[i]["id"];
            var row1 = [];
            for (var j = 0; j < cols.length; j++) {
                var jj1 = cols[j]["id"];
                var dd1 = "-";
                if (DataTable[ii1][jj1]["hasdata"]) {
                    dd1 = StrtoFloat(DataTable[ii1][jj1]["strdata"]);
                }
                row1.push(dd1);
            }
            data1.push(row1);
        }
        re["data"] = data1;
        return re;
    }


    /**
    *取得列选择作图的代码数组
    *如果此为时间则进行排序  正序
    **/
    function getCheckDataCols_() {
        var d1 = [];
        for (var i = 0; i < DataColList.length; i++) {
            if (DataColList[i]["ifchecked"] == true && DataColList[i]["ifhide"] != true) {
                var row1 = {};
                row1["code"] = DataColList[i]["code"];
                row1["cname"] = DataColList[i]["cname"];
                row1["id"] = i;
                row1["ifjisuan"] = DataColList[i]["ifjisuan"];
                row1["unitname"] = DataColList[i]["unitname"];
                row1["namestr"] = row1["cname"];
                if (row1["unitname"] != null & row1["unitname"] != "") {
                    row1["namestr"] += "(" + row1["unitname"] + ")";
                }
                d1.push(row1);
            }
        }
        if (colcode == "sj") {
            for (var i = 0; i < d1.length; i++) {
                var pxdata = {};
                var row1 = d1[i];
                pxdata["data"] = row1["code"];
                pxdata["hasdata"] = !row1["ifjisuan"];
                d1[i]["pxdata"] = pxdata;
            }
            d1.sort(function (a, b) {
                var ad1 = a.pxdata;
                var bd1 = b.pxdata;
                if (ad1["hasdata"] == false) {
                    return 1;
                }
                if (bd1["hasdata"] == false) {
                    return -1;
                }
                return ad1["data"].localeCompare(bd1["data"]);
            });
        }
        return d1;
    }

    /**
    *取得行选择作图的代码数组
    *如果此为时间则进行排序  正序
    **/
    function getCheckDataRows_() {
        var d1 = [];
        for (var i = 0; i < DataRowList.length; i++) {
            if (DataRowList[i]["ifchecked"] == true && DataRowList[i]["ifhide"] != true) {
                var row1 = {};
                row1["code"] = DataRowList[i]["code"];
                row1["cname"] = DataRowList[i]["cname"];
                row1["id"] = DataRowList[i]["id"];
                row1["ifjisuan"] = DataRowList[i]["ifjisuan"];
                row1["unitname"] = DataRowList[i]["unitname"];
                row1["namestr"] = row1["cname"];
                if (row1["unitname"] != null & row1["unitname"] != "") {
                    row1["namestr"] += "(" + row1["unitname"] + ")";
                }
                d1.push(row1);
            }
        }
        if (rowcode == "sj") {
            for (var i = 0; i < d1.length; i++) {
                var pxdata = {};
                var row1 = d1[i];
                pxdata["data"] = row1["code"];
                pxdata["hasdata"] = !row1["ifjisuan"];
                d1[i]["pxdata"] = pxdata;
            }
            d1.sort(function (a, b) {
                var ad1 = a.pxdata;
                var bd1 = b.pxdata;
                if (ad1["hasdata"] == false) {
                    return 1;
                }
                if (bd1["hasdata"] == false) {
                    return -1;
                }
                return ad1["data"].localeCompare(bd1["data"]);
            });
        }
        return d1;
    }


    /**
    *设置作图局域，按数量设置，从前往后标，0表示整行(列)全部设置
    *
    **/
    function setCheckedbyCount_(row1, col1) {
        if (row1 == 0) {
            row1 = DataRowList.length;
        }
        if (col1 == 0) {
            col1 = DataColList.length;
        }
        var count1 = 0;
        if (row1 > 0) {
            for (var i = 0; i < DataRowList.length; i++) {
                if (count1 < row1 && DataRowList[i]["ifhide"] == false) {
                    DataRowList[i]["ifchecked"] = true;
                    count1++;
                }
                else {
                    DataRowList[i]["ifchecked"] = false;
                }

            }
        }
        count1 = 0;
        if (col1 > 0) {
            for (var i = 0; i < DataColList.length; i++) {
                if (count1 < col1 && DataColList[i]["ifhide"] == false) {
                    DataColList[i]["ifchecked"] = true;
                    count1++;
                }
                else {
                    DataColList[i]["ifchecked"] = false;
                }
            }
        }
    }


    /**
    *设置作图区域，使用行列代码数组设置
    *
    **/
    function setCheckedByCode_(row1, col1) {
        for (var i = 0; i < DataRowList.length; i++) {
            DataRowList[i]["ifchecked"] = false;
        }
        if (row1 != null) {
            for (var i = 0; i < row1.length; i++) {
                var code1 = row1[i];
                var index1 = FindIndexbyzb(DataRowList, "code", code1);
                if (index1 >= 0 && DataRowList[index1]["ifhide"] == false) {
                    DataRowList[index1]["ifchecked"] = true;
                }
            }
        }
        else {
            for (var i = 0; i < DataRowList.length; i++) {
                if (DataRowList[i]["ifhide"] == false) {
                    DataRowList[i]["ifchecked"] = true;
                }
            }
        }

        for (var i = 0; i < DataColList.length; i++) {
            DataColList[i]["ifchecked"] = false;
        }
        if (col1 != null) {
            for (var i = 0; i < col1.length; i++) {
                var code1 = col1[i];
                var index1 = FindIndexbyzb(DataColList, "code", code1);
                if (index1 >= 0 && DataColList[index1]["ifhide"] == false) {
                    DataColList[index1]["ifchecked"] = true;
                }
            }
        }
        else {
            for (var i = 0; i < DataColList.length; i++) {
                if (DataColList[i]["ifhide"] == false) {
                    DataColList[i]["ifchecked"] = true;
                }
            }
        }
    }



    /************************************************/



    /**
    *取得表格的标题
    *
    **/
    this.getCaption = function () {
        return Caption;
    };

    /**
    *取得或设置表格的数据库代码
    *
    **/
    this.DbCode = function (e) {
        if (e == null) {
            return dbcode;
        } else {
            dbcode = e;
        }
    };

    /**
    *取得或设置列维度代码
    *
    **/
    this.ColCode = function (e) {
        if (e == null) {
            return colcode;
        } else {
            colcode = e;
        }
    };

    /**
    *取得或设置行维度代码
    *
    **/
    this.RowCode = function (e) {
        if (e == null) {
            return rowcode;
        } else {
            rowcode = e;
        }
    };

    /**
    *取得表格数据的二维数组
    *
    **/
    this.getDataTable = function () {
        return DataTable;
    };

    /**
    *取得数据对应的备注列表
    *
    **/
    this.getMemoList = function () {
        return DataMemoList;
    };

    /**
    *取得数据的列标题集合
    *
    **/
    this.getColList = function () {
        return DataColList;
    };

    /**
    *取得数据的行标题集合
    *
    **/
    this.getRowList = function () {
        return DataRowList;
    };

    /**
    *对数据进行排序
    *排序实现是对行标题集合进行排序，把需要排序的数据放在行数组下，行数组记录与二维数据行对应的行标，
    *排序实际是对行数组进行了排序，我们需要通过行数组中的行标与对用的数据区行进行对应
    **/
    this.sort = function (code) {
        if (code == null) {
            return DataSort;
        } else {
            var ifasc = true;
            if (DataSort != null) {
                if (DataSort["code"] == code) {
                    ifasc = !DataSort["ifasc"];
                }
            }
            Sort_(code, ifasc);
        }
    };

    /**
    *清除动作记忆
    *
    **/
    this.ClearAction = function () {
        DataAction = [];
    };

    /**
    *取得或设置动作记忆
    *
    **/
    this.Action = function (e) {
        if (e == null) {
            return DataAction;
        } else {
            DataAction = e;
            CreateTable_();
            DoActions_(false);
        }
    };

    /**
    *数据转置操作
    *
    **/
    this.TransData = function () {
        TransData_();
    };


    /**
    *数据行列编辑操作，指行列时候隐藏
    *此方法需要重新刷新数据，对统计功能重新做
    **/
    this.Edit = function (rowcol, list1) {
        Edit_(rowcol, list1);
        DoActions_(true);
        AddAction_(rowcol, "edit", "", { "list": list1 });
    };

    /**
    *删除数据表中空行空列
    *
    **/
    this.DelBlank = function (rowcol) {
        DelBlank_(rowcol);
        AddAction_(rowcol, "delblank", "");
    };

    /**
    *筛选数据
    *此方法需要重新刷新数据，对统计功能重新做
    **/
    this.Filter = function (rowcol, exp1) {
        Filer_(rowcol, exp1);
        DoActions_(true);
        AddAction_(rowcol, "filter", "", { "express": exp1 });
    };


    /**
    *检查新增表达式是否正确接口
    *
    **/
    this.CheckNewExp = function (rowcol, exp1) {
        return CheckNewExp_(rowcol, exp1);
    };

    /**
    *新增表达式接口
    *
    **/
    this.AddNewExpress = function (rowcol, name1, exp1) {
        var re = AddNewExp_(rowcol, "", false, name1, exp1);
        if (re != null) {
            AddAction_(rowcol, "newzb", re.code, { "name": name1, "express": exp1 });
        }
    };

    /**
    *标准方差接口
    *
    **/
    this.Math_SD = function (rowcol) {
        var re = Math_SD_(rowcol, "", false);
        AddAction_(rowcol, "mathsd", re.code);
    };

    /**
    *标准差接口
    *
    **/
    this.Math_S2 = function (rowcol) {
        var re = Math_S2_(rowcol, "", false);
        AddAction_(rowcol, "maths2", re.code);
    };

    /**
    *众数接口
    *
    **/
    this.Math_MOD = function (rowcol) {
        var re = Math_MOD_(rowcol, "", false);
        AddAction_(rowcol, "mathmod", re.code);
    };

    /**
    *中位数接口
    *
    **/
    this.Math_MID = function (rowcol) {
        var re = Math_MID_(rowcol, "", false);
        AddAction_(rowcol, "mathmid", re.code);
    };


    /**
    *最小值接口
    *
    **/
    this.Math_MIN = function (rowcol) {
        var re = Math_MIN_(rowcol, "", false);
        AddAction_(rowcol, "mathmin", re.code);
    };


    /**
    *最大值接口
    *
    **/
    this.Math_MAX = function (rowcol) {
        var re = Math_MAX_(rowcol, "", false);
        AddAction_(rowcol, "mathmax", re.code);
    };

    /**
    *平均值接口
    *
    **/
    this.Math_AVG = function (rowcol) {
        var re = Math_AVG_(rowcol, "", false);
        AddAction_(rowcol, "mathavg", re.code);
    };

    /**
    *求和接口
    *
    **/
    this.Math_SUM = function (rowcol) {
        var re = Math_SUM_(rowcol, "", false);
        AddAction_(rowcol, "mathsum", re.code);
    };

    /**
    *刷新数据，保留记忆，动作，作图选择，排序
    *
    **/
    this.FreshData = function (d) {
        data = d;
        var list1 = getCheckedList_();
        CreateTable_();
        DoActions_(false);
        setCheckedByCode_(list1.rows, list1.cols);
        var code1 = DataSort["code"];
        var ifasc = DataSort["ifasc"];
        if (code1 != null && ifasc != null) {
            Sort_(code1, ifasc);
        }
    };

    /**
    *恢复数据表，删除所有的记录(动作，作图选择，作图，排序),如果转置，则保留
    *
    **/
    this.Restore = function () {
        DataAction = [];
        CreateTable_();
        DataSort = {};
        DataTu = false;
        DataSort = {};
    };


    /**
    *生成数据表，重新开始
    *
    **/
    this.CreateTable = function (d1) {
        data = d1;
        DataAction = [];
        CreateTable_();
        DataSort = {};
        DataTu = false;
    };


    /**
    *转置，保留所有记忆，只有排序不记忆
    *
    **/
    function TransData_() {
        var code1 = rowcode;
        rowcode = colcode;
        colcode = code1;
        var list1 = getCheckedList_();
        CreateTable_();
        Action_Row_to_Col_();
        DoActions_(false);
        setCheckedByCode_(list1.cols, list1.rows);
        DataSort = {};
    }

    /**
    *编辑行列，主要是设置隐藏
    *
    **/
    function Edit_(rowcol, list1) {
        if (rowcol == "row") {
            Edit_row_(list1);
        } else {
            Edit_col_(list1);
        }
    }
    /**
    *检查新增计算表达式是否正确
    *
    **/
    function CheckNewExp_(rowcol, exp1) {
        var mark1 = false;
        if (rowcol == "row") {
            mark1 = Check_Exp_row_(exp1);
        } else {
            mark1 = Check_Exp_col_(exp1);
        }
        return mark1;
    }

    /**
    *新增计算表达式
    *如果检查表达式不正确时返回为空
    **/
    function AddNewExp_(rowcol, code1, iffresh, tt, exp1) {
        if (iffresh == false) {
            if (CheckNewExp_(rowcol, exp1) == false) {
                return null;
            }

        }
        var re = {};
        if (iffresh == false) {
            re = AddBlank_rowcol_(rowcol, "NEW", tt);
            code1 = re.code;
        }
        if (rowcol == "row") {
            AddNew_row_(code1, exp1);
        } else {
            AddNew_col_(code1, exp1);
        }
        return re;
    }



    /**
    *筛选
    *
    **/
    function Filer_(rowcol, exp1) {
        if (rowcol == "row") {
            Filter_row_(exp1);
        } else {
            Filter_col_(exp1);
        }
    }


    /**
    *删除空行或空列
    *
    **/
    function DelBlank_(rowcol) {
        if (rowcol == "row") {
            DelBlank_row_();
        } else {
            DelBlank_col_();
        }
    }

    /**
    *求和函数
    *
    **/
    function Math_SUM_(rowcol, code1, iffresh) {
        var re = {};
        if (iffresh == false) {
            re = AddBlank_colrow_(rowcol, "SUM", "求和");
            code1 = re.code;
        }
        if (rowcol == "row") {
            Math_SUM_row_(code1);
        } else {
            Math_SUM_col_(code1);
        }
        return re;
    }


    /**
    *均值函数
    *
    **/
    function Math_AVG_(rowcol, code1, iffresh) {
        var re = {};
        if (iffresh == false) {
            re = AddBlank_colrow_(rowcol, "AVG", "均值");
            code1 = re.code;
        }
        if (rowcol == "row") {
            Math_AVG_row_(code1);
        } else {
            Math_AVG_col_(code1);
        }
        return re;

    }


    /**
    *最大值函数
    *
    **/
    function Math_MAX_(rowcol, code1, iffresh) {
        var re = {};
        if (iffresh == false) {
            re = AddBlank_colrow_(rowcol, "MAX", "最大值");
            code1 = re.code;
        }
        if (rowcol == "row") {
            Math_MAX_row_(code1);
        } else {
            Math_MAX_col_(code1);
        }
        return re;
    }


    /**
    *最小值函数
    *
    **/
    function Math_MIN_(rowcol, code1, iffresh) {
        var re = {};
        if (iffresh == false) {
            re = AddBlank_colrow_(rowcol, "MIN", "最小值");
            code1 = re.code;
        }
        if (rowcol == "row") {
            Math_MIN_row_(code1);
        } else {
            Math_MIN_col_(code1);
        }
        return re;
    }


    /**
    *中位数函数
    *
    **/
    function Math_MID_(rowcol, code1, iffresh) {
        var re = {};
        if (iffresh == false) {
            re = AddBlank_colrow_(rowcol, "MID", "中位数");
            code1 = re.code;
        }
        if (rowcol == "row") {
            Math_MID_row_(code1);
        } else {
            Math_MID_col_(code1);
        }
        return re;
    }



    /**
    *众数函数
    *
    **/
    function Math_MOD_(rowcol, code1, iffresh) {
        var re = {};
        if (iffresh == false) {
            re = AddBlank_colrow_(rowcol, "MOD", "众数");
            code1 = re.code;
        }
        if (rowcol == "row") {
            Math_MOD_row_(code1);
        } else {
            Math_MOD_col_(code1);
        }
        return re;
    }

    /**
    *方差函数
    *
    **/
    function Math_S2_(rowcol, code1, iffresh) {
        var re = {};
        if (iffresh == false) {
            re = AddBlank_colrow_(rowcol, "S2", "方差");
            code1 = re.code;
        }
        if (rowcol == "row") {
            Math_S2_row_(code1);
        } else {
            Math_S2_col_(code1);
        }
        return re;
    }

    /**
    *标准差函数
    *
    **/
    function Math_SD_(rowcol, code1, iffresh) {
        var re = {};
        if (iffresh == false) {
            re = AddBlank_colrow_(rowcol, "SD", "均方差");
            code1 = re.code;
        }
        if (rowcol == "row") {
            Math_SD_row_(code1);
        } else {
            Math_SD_col_(code1);
        }
        return re;
    }

    /**
    *新增一空行或空列
    *
    **/
    function AddBlank_rowcol_(rowcol, code1, name1) {
        var re = {};
        if (rowcol == "row") {
            re = AddNewBlank_row_(code1, name1);
        } else {
            re = AddNewBlank_col_(code1, name1);
        }
        return re;
    }

    /**
    *新增一空列或空行，在行上的函数需要新增列，反之则反之
    *
    **/
    function AddBlank_colrow_(rowcol, code1, name1) {
        var re = {};
        if (rowcol == "row") {
            re = AddNewBlank_col_(code1, name1);
        } else {
            re = AddNewBlank_row_(code1, name1);
        }
        return re;
    }

    /**
    * 增加动作
    * 
    * @param rowcol
    * @param action1
    * @param param
    */
    function AddAction_(rowcol1, action2, code1, param) {
        var action1 = {};
        action1.rowcol = rowcol1;
        action1.action = action2;
        action1["code"] = code1;
        if (param != null) {
            for (var key in param) {
                var value1 = param[key];
                action1[key] = value1;
            }
        }
        DataAction.push(action1);
    }


    /**
    * 把所有的动作从行转到列
    * 
    * @returns {Boolean}
    */
    function Action_Row_to_Col_() {
        if (DataAction == null || DataAction.length == 0) {
            return false;
        }
        for (var i = 0; i < DataAction.length; i++) {
            var objaction = DataAction[i];
            var rowcol = objaction.rowcol;
            if (rowcol == "row") {
                rowcol = "col";
            } else {
                rowcol = "row";
            }
            objaction.rowcol = rowcol;
        }
        return true;
    }

    /**
    *告知说有需要计算的数据及数据列是不可用的，需要重新计算
    *
    **/
    function CloseTableMath_() {
        for (var i = 0; i < DataRowList.length; i++) {
            if (DataRowList[i]["ifjisuan"] == true) {
                DataRowList[i]["ifclose"] = true;
            }
        }
        for (var i = 0; i < DataColList.length; i++) {
            if (DataColList[i]["ifjisuan"] == true) {
                DataColList[i]["ifclose"] = true;
            }
        }
    }

    /**
    * 执行历史动作
    * 
    * @returns {Boolean}
    */
    function DoActions_(iffresh) {
        if (DataAction == null || DataAction.length == 0) {
            return false;
        }
        if (iffresh) {
            CloseTableMath_();
        }
        var mark1 = false;
        for (var i = 0; i < DataAction.length; i++) {
            var objaction = DataAction[i];
            var rowcol = objaction.rowcol;
            var action = objaction.action;
            var code1 = objaction.code;
            try {
                var re = null;
                switch (action) {
                    case "mathsum":
                        re = Math_SUM_(rowcol, code1, iffresh);
                        break;
                    case "mathavg":
                        re = Math_AVG_(rowcol, code1, iffresh);
                        break;
                    case "mathmax":
                        re = Math_MAX_(rowcol, code1, iffresh);
                        break;
                    case "mathmin":
                        re = Math_MIN_(rowcol, code1, iffresh);
                        break;
                    case "mathmid":
                        re = Math_MID_(rowcol, code1, iffresh);
                        break;
                    case "mathmod":
                        re = Math_MOD_(rowcol, code1, iffresh);
                        break;
                    case "maths2":
                        re = Math_S2_(rowcol, code1, iffresh);
                        break;
                    case "mathsd":
                        re = Math_SD_(rowcol, code1, iffresh);
                        break;
                    case "newzb":
                        re = AddNewExp_(rowcol, code1, iffresh, objaction.name, objaction.express);
                        break;
                    case "delblank":
                        if (iffresh == false) {
                            DelBlank_(rowcol);
                        }
                        break;
                    case "filter":
                        if (iffresh == false) {
                            Filer_(rowcol, objaction.express);
                            mark1 = true;
                        }
                        break;
                    case "edit":
                        if (iffresh == false) {
                            Edit_(rowcol, objaction.list);
                            mark1 = true;
                        }
                        break;
                }
                if (iffresh == false && re != null) {
                    objaction["code"] = re["code"];
                }

            } catch (e) { }
        }
        //如果有隐藏行列，则需要刷新数据
        if (mark1 == true && iffresh == false) {
            DoActions_(true);
        }
    }

    /**
    *编辑行，设置行是否隐藏
    **/
    function Edit_row_(list1) {
        for (var i = 0; i < list1.length; i++) {
            var code1 = list1[i]["code"];
            var ifhide = (list1[i]["ifhide"] == true);
            if (code1 != null) {
                var index1 = FindIndexbyzb(DataRowList, "code", code1);
                if (index1 >= 0) {
                    DataRowList[index1]["ifhide"] = ifhide;
                    if (ifhide) {
                        DataRowList[index1]["ifchecked"] = false;
                    }
                }
            }
        }
    }

    /**
    *编辑列，设置列是否隐藏
    **/
    function Edit_col_(list1) {
        for (var i = 0; i < list1.length; i++) {
            var code1 = list1[i]["code"];
            var ifhide = (list1[i]["ifhide"] == true);
            if (code1 != null) {
                var index1 = FindIndexbyzb(DataColList, "code", code1);
                if (index1 >= 0) {
                    DataColList[index1]["ifhide"] = ifhide;
                    if (ifhide) {
                        DataColList[index1]["ifchecked"] = false;
                    }
                }
            }
        }
    }

    /***
    **删除空行
    **/
    function DelBlank_row_() {
        for (var i = 0; i < DataRowList.length; i++) {
            if (DataRowList[i]["ifhide"] == true) {
                continue;
            }
            var hasdata = false;
            var row1 = DataRowList[i].id;
            for (var j = 0; j < DataColList.length; j++) {
                if (DataColList[j]["ifhide"] == false && DataTable[row1][j]["hasdata"] == true) {
                    hasdata = true;
                    break;
                }
            }
            DataRowList[i]["ifhide"] = !hasdata;
        }
    }


    /***
    **删除空列
    **/
    function DelBlank_col_() {
        for (var j = 0; j < DataColList.length; j++) {
            if (DataColList[j]["ifhide"] == true) {
                continue;
            }
            var hasdata = false;
            for (var i = 0; i < DataRowList.length; i++) {
                var row1 = DataRowList[i].id;
                if (DataRowList[i]["ifhide"] == false && DataTable[row1][j]["hasdata"] == true) {
                    hasdata = true;
                    break;
                }
            }
            DataColList[j]["ifhide"] = !hasdata;
        }
    }


    /**
    *根据数组得到一个新名字
    *
    **/
    function getNewCodeName_(obj1, zb1, value1) {
        var value2 = value1;
        var count1 = 1;
        while (FindIndexbyzb(obj1, zb1, value2) >= 0) {
            value2 = value1 + "_" + (count1++);
        }
        return value2;
    }

    /**
    *新增加一个空行
    *
    **/
    function AddNewBlank_row_(code1, title1) {
        var code2 = getNewCodeName_(DataRowList, "code", code1 );
        var title2 = getNewCodeName_(DataRowList, "cname", title1);
        var dr1 = [];
        var c1 = { "strdata": "", "data": 0.0, "hasdata": false, "dotcount": 2 };
        for (var i = 0; i < DataColList.length; i++) {
            dr1.push(clone(c1));
        }
        DataTable.push(dr1);
        DataRowList.push({ "id": DataRowList.length, "code": code2, "cname": title2, "name": title2, "unitname": "", "ifchecked": false, "ifhide": false, "ifjisuan": true, "ifclose": true, "exp": title2 });
        return { "code": code2, "cname": title2 };
    }

    /**
    *新增加一个空列
    *
    **/
    function AddNewBlank_col_(code1, title1) {
        var code2 = getNewCodeName_(DataColList, "code", code1 );
        var title2 = getNewCodeName_(DataColList, "cname", title1);
        var c1 = { "strdata": "", "data": 0.0, "hasdata": false, "dotcount": 2 };
        for (var i = 0; i < DataRowList.length; i++) {
            DataTable[i].push(clone(c1));
        }
        DataColList.push({ "code": code2, "cname": title2, "name": title2, "unitname": "", "ifchecked": false, "ifhide": false, "ifjisuan": true, "ifclose": true, "exp": title2 });
        return { "code": code2, "cname": title2 };
    }



    /**
    *检查行公式是否正确
    *
    **/
    function Check_Exp_row_(exp1) {
        var exp2 = exp1;
        for (var i = 0; i < DataRowList.length; i++) {
            var name1 = "#" + DataRowList[i]["cname"] + "#";
            if (exp2.indexOf(name1) >= 0) {
                exp2 = replace_(exp2, name1, " " + (1.2 + Math.random()) + " ");
                //exp2 = exp2.replace(new RegExp(name1, "g"), " " + (1.2 + Math.random()) + " ");
            }
        }
        var mark1 = false;
        try {
            var data1 = eval(exp2);
            if (typeof data1 == "number" && data1 != Infinity) {
                mark1 = true;
            }

        } catch (e) {
        }
        return mark1;
    }

    /**
    *检查列公式是否正确
    *
    **/
    function Check_Exp_col_(exp1) {
        var exp2 = exp1;
        for (var j = 0; j < DataColList.length; j++) {
            var name1 = "#" + DataColList[j]["cname"] + "#";
            if (exp2.indexOf(name1) >= 0) {
                exp2 = replace_(exp2, name1, " " + (1.2 + Math.random()) + " ");
                // exp2 = exp2.replace(new RegExp(name1, "g"), " " + (1.2 + Math.random()) + " ");
            }
        }
        var mark1 = false;
        try {
            var data1 = eval(exp2);
            if (typeof data1 == "number" && data1 != Infinity) {
                mark1 = true;
            }

        } catch (e) {
        }
        return mark1;
    }

    /***
    **行新增计算公式，增加一行
    **/
    function AddNew_row_(code1, exp1) {
        var index1 = FindIndexbyzb(DataRowList, "code", code1);
        if (index1 < 0) {
            return;
        }
        var coderow = DataRowList[index1]["id"];
        var dr1 = DataTable[coderow];
        for (var j = 0; j < DataColList.length; j++) {
            var c1 = dr1[j];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = true;
            c1["ifjisuan"] = true;
            var exp2 = exp1;
            for (var i = 0; i < DataRowList.length; i++) {
                var row1 = DataRowList[i]["id"];
                var name1 = "#" + DataRowList[i]["cname"] + "#";
                if (exp2.indexOf(name1) >= 0) {
                    if (DataTable[row1][j]["hasdata"] == false) {
                        c1["hasdata"] = false;
                        break;
                    }
                    var data1 = DataTable[row1][j]["data"];
                    exp2 = replace_(exp2, name1, " " + data1 + " ");
                    //exp2 = exp2.replace(new RegExp(name1, "g"), " " + data1 + " ");
                }
            }
            if (c1["hasdata"]) {
                try {
                    var data1 = eval(exp2);
                    if (typeof data1 == "number" && data1 != Infinity) {
                        c1["data"] = data1;
                    }
                    else {
                        c1["hasdata"] = false;
                    }
                } catch (e) {
                    c1["hasdata"] = false;
                }

            }
            if (c1["hasdata"]) {
                c1["strdata"] = formatdata(c1["data"], 2);
            }
        }
        DataRowList[index1]["ifclose"] = false;
        DataRowList[index1]["exp"] = exp1;
    }

    /***
    **列增加计算公式 增加一列
    **/
    function AddNew_col_(code1, exp1) {
        var index1 = FindIndexbyzb(DataColList, "code", code1);
        if (index1 < 0) {
            return;
        }
        for (var i = 0; i < DataRowList.length; i++) {
            var row1 = DataRowList[i]["id"];
            var c1 = DataTable[row1][index1];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = true;
            c1["ifjisuan"] = true;
            var exp2 = exp1;
            var hasdata = true;
            for (var j = 0; j < DataColList.length; j++) {
                var name1 = "#" + DataColList[j]["cname"] + "#";
                if (exp2.indexOf(name1) >= 0) {
                    if (DataTable[row1][j]["hasdata"] == false) {
                        c1["hasdata"] = false;
                        break;
                    }
                    var data1 = DataTable[row1][j]["data"];
                    exp2 = replace_(exp2, name1, " " + data1 + " ");
                    //exp2 = exp2.replace(new RegExp(name1, "g"), " " + data1 + " ");
                }
            }
            if (c1["hasdata"]) {
                try {
                    var data1 = eval(exp2);
                    if (typeof data1 == "number" && data1 != Infinity) {
                        c1["data"] = data1;
                    }
                    else {
                        c1["hasdata"] = false;
                    }
                } catch (e) {
                    c1["hasdata"] = false;
                }

            }
            if (c1["hasdata"]) {
                c1["strdata"] = formatdata(c1["data"], 2);
            }
        }
        DataColList[index1]["ifclose"] = false;
        DataColList[index1]["exp"] = exp1;
    }





    /***
    **行筛选  对列做
    **/
    function Filter_row_(exp1) {
        for (var j = 0; j < DataColList.length; j++) {
            if (DataColList[j]["ifhide"] == true) {
                continue;
            }
            var exp2 = exp1;
            var hasdata = true;
            for (var i = 0; i < DataRowList.length; i++) {
                var name1 = "#" + DataRowList[i]["cname"] + "#";
                if (exp2.indexOf(name1) >= 0) {
                    var row1 = DataRowList[i].id;
                    if (DataTable[row1][j]["hasdata"] == false) {
                        hasdata = false;
                        break;
                    }
                    var data1 = DataTable[row1][j]["data"];
                    exp2 = replace_(exp2, name1, " " + data1 + " ");
                    // exp2 = exp2.replace(new RegExp(name1, "g"), data1);
                }
            }
            var ifhide = false;
            if (hasdata == false) {
                ifhide = true;
            } else {
                try {
                    if (eval(exp2) == false) {
                        ifhide = true;
                    }
                } catch (e) {
                    ifhide = true;
                }
            }
            DataColList[j]["ifhide"] = ifhide;
        }
    }


    /***
    **列筛选  对行做
    **/
    function Filter_col_(exp1) {
        for (var i = 0; i < DataRowList.length; i++) {
            if (DataRowList[i]["ifhide"] == true) {
                continue;
            }
            var exp2 = exp1;
            var hasdata = true;
            var row1 = DataRowList[i].id;
            for (var j = 0; j < DataColList.length; j++) {
                var name1 = "#" + DataColList[j]["cname"] + "#";
                if (exp2.indexOf(name1) >= 0) {
                    if (DataTable[row1][j]["hasdata"] == false) {
                        hasdata = false;
                        break;
                    }
                    var data1 = DataTable[row1][j]["data"];
                    exp2 = replace_(exp2, name1, " " + data1 + " ");
                    // exp2 = exp2.replace(new RegExp(name1, "g"), data1);
                }
            }
            var ifhide = false;
            if (hasdata == false) {
                ifhide = true;
            } else {
                try {
                    if (eval(exp2) == false) {
                        ifhide = true;
                    }
                } catch (e) {
                    ifhide = true;
                }
            }
            DataRowList[i]["ifhide"] = ifhide;
        }
    }

    /***
    **行求和  值在列上
    **/
    function Math_SUM_row_(code1) {
        var index1 = FindIndexbyzb(DataColList, "code", code1);
        if (index1 < 0) {
            return;
        }
        for (var i = 0; i < DataRowList.length; i++) {
            var datarow = DataRowList[i]["id"];
            var c1 = DataTable[datarow][index1];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            for (var j = 0; j < DataColList.length; j++) {
                if (DataColList[j]["ifhide"] == false && DataColList[j]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    c1["data"] = c1["data"] + DataTable[datarow][j]["data"];
                    c1["hasdata"] = true;
                }
            }
            if (c1["hasdata"]) {
                c1["strdata"] = formatdata(c1["data"], 2);
            }
        }
        DataColList[index1]["ifclose"] = false;
    }

    /***
    **列求和  值在行上
    **/
    function Math_SUM_col_(code1) {
        var index1 = FindIndexbyzb(DataRowList, "code", code1);
        if (index1 < 0) {
            return;
        }
        var dr1 = DataTable[DataRowList[index1]["id"]];
        for (var j = 0; j < DataColList.length; j++) {
            var c1 = dr1[j];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            for (var i = 0; i < DataRowList.length; i++) {
                var datarow = DataRowList[i]["id"];
                if (DataRowList[i]["ifhide"] == false && DataRowList[i]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    c1["data"] = c1["data"] + DataTable[datarow][j]["data"];
                    c1["hasdata"] = true;
                }
            }
            if (c1["hasdata"]) {
                c1["strdata"] = formatdata(c1["data"], 2);
            }

        }
        DataRowList[index1]["ifclose"] = false;
    }

    /***
    **行求均值
    **/
    function Math_AVG_row_(code1) {
        var index1 = FindIndexbyzb(DataColList, "code", code1);
        if (index1 < 0) {
            return;
        }
        for (var i = 0; i < DataRowList.length; i++) {
            var datarow = DataRowList[i]["id"];
            var c1 = DataTable[datarow][index1];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            c1["count"] = 0;
            for (var j = 0; j < DataColList.length; j++) {
                if (DataColList[j]["ifhide"] == false && DataColList[j]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    c1["data"] = c1["data"] + DataTable[datarow][j]["data"];
                    c1["count"] += 1;
                    c1["hasdata"] = true;
                }
            }
            if (c1["hasdata"]) {
                c1["data"] = c1["data"] / c1["count"];
                c1["strdata"] = formatdata(c1["data"], 2);
            }
        }
        DataColList[index1]["ifclose"] = false;
    }

    /***
    **列求均值
    **/
    function Math_AVG_col_(code1) {
        var index1 = FindIndexbyzb(DataRowList, "code", code1);
        if (index1 < 0) {
            return;
        }
        var dr1 = DataTable[DataRowList[index1]["id"]];
        for (var j = 0; j < DataColList.length; j++) {
            var c1 = dr1[j];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            c1["count"] = 0;
            for (var i = 0; i < DataRowList.length; i++) {
                var datarow = DataRowList[i]["id"];
                if (DataRowList[i]["ifhide"] == false && DataRowList[i]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    c1["data"] = c1["data"] + DataTable[datarow][j]["data"];
                    c1["hasdata"] = true;
                    c1["count"] += 1;
                }
            }
            if (c1["hasdata"]) {
                c1["data"] = c1["data"] / c1["count"];
                c1["strdata"] = formatdata(c1["data"], 2);
            }

        }

        DataRowList[index1]["ifclose"] = false;
    }

    /***
    **行求最大值
    **/
    function Math_MAX_row_(code1) {
        var index1 = FindIndexbyzb(DataColList, "code", code1);
        if (index1 < 0) {
            return;
        }
        for (var i = 0; i < DataRowList.length; i++) {
            var datarow = DataRowList[i]["id"];
            var c1 = DataTable[datarow][index1];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            for (var j = 0; j < DataColList.length; j++) {
                if (DataColList[j]["ifhide"] == false && DataColList[j]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    var data1 = DataTable[datarow][j]["data"];
                    if (c1["hasdata"] == false) {
                        c1["data"] = data1;
                        c1["hasdata"] = true;
                    } else {
                        if (c1["data"] < data1) {
                            c1["data"] = data1;
                        }
                    }

                }
            }
            if (c1["hasdata"]) {
                c1["strdata"] = formatdata(c1["data"], 2);
            }

        }
        DataColList[index1]["ifclose"] = false;
    }

    /***
    **列求最大值
    **/
    function Math_MAX_col_(code1) {
        var index1 = FindIndexbyzb(DataRowList, "code", code1);
        if (index1 < 0) {
            return;
        }
        var dr1 = DataTable[DataRowList[index1]["id"]];
        for (var j = 0; j < DataColList.length; j++) {
            var c1 = dr1[j];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            for (var i = 0; i < DataRowList.length; i++) {
                var datarow = DataRowList[i]["id"];
                if (DataRowList[i]["ifhide"] == false && DataRowList[i]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    var data1 = DataTable[datarow][j]["data"];
                    if (c1["hasdata"] == false) {
                        c1["data"] = data1;
                        c1["hasdata"] = true;
                    } else {
                        if (c1["data"] < data1) {
                            c1["data"] = data1;
                        }
                    }
                }
            }
            if (c1["hasdata"]) {
                c1["strdata"] = formatdata(c1["data"], 2);
            }
        }
        DataRowList[index1]["ifclose"] = false;
    }



    /***
    **行求最小值
    **/
    function Math_MIN_row_(code1) {
        var index1 = FindIndexbyzb(DataColList, "code", code1);
        if (index1 < 0) {
            return;
        }
        for (var i = 0; i < DataRowList.length; i++) {
            var datarow = DataRowList[i]["id"];
            var c1 = DataTable[datarow][index1];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            for (var j = 0; j < DataColList.length; j++) {
                if (DataColList[j]["ifhide"] == false && DataColList[j]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    var data1 = DataTable[datarow][j]["data"];
                    if (c1["hasdata"] == false) {
                        c1["data"] = data1;
                        c1["hasdata"] = true;
                    } else {
                        if (c1["data"] > data1) {
                            c1["data"] = data1;
                        }
                    }

                }
            }
            if (c1["hasdata"]) {
                c1["strdata"] = formatdata(c1["data"], 2);
            }

        }
        DataColList[index1]["ifclose"] = false;
    }

    /***
    **列求最小值
    **/
    function Math_MIN_col_(code1) {
        var index1 = FindIndexbyzb(DataRowList, "code", code1);
        if (index1 < 0) {
            return;
        }
        var dr1 = DataTable[DataRowList[index1]["id"]];
        for (var j = 0; j < DataColList.length; j++) {
            var c1 = dr1[j];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            for (var i = 0; i < DataRowList.length; i++) {
                var datarow = DataRowList[i]["id"];
                if (DataRowList[i]["ifhide"] == false && DataRowList[i]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    var data1 = DataTable[datarow][j]["data"];
                    if (c1["hasdata"] == false) {
                        c1["data"] = data1;
                        c1["hasdata"] = true;
                    } else {
                        if (c1["data"] > data1) {
                            c1["data"] = data1;
                        }
                    }
                }
            }
            if (c1["hasdata"]) {
                c1["strdata"] = formatdata(c1["data"], 2);
            }

        }
        DataRowList[index1]["ifclose"] = false;
    }

    /***
    **行求中位数
    **/
    function Math_MID_row_(code1) {
        var index1 = FindIndexbyzb(DataColList, "code", code1);
        if (index1 < 0) {
            return;
        }
        for (var i = 0; i < DataRowList.length; i++) {
            var datarow = DataRowList[i]["id"];
            var c1 = DataTable[datarow][index1];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            var d1 = [];
            for (var j = 0; j < DataColList.length; j++) {
                if (DataColList[j]["ifhide"] == false && DataColList[j]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    d1.push(DataTable[datarow][j]["data"]);
                    c1["hasdata"] = true;
                }
            }
            if (c1["hasdata"]) {
                d1.sort(function (a, b) { return a - b; });
                var data1 = 0;
                var int1 = parseInt(d1.length / 2);
                if (d1.length % 2 > 0) {
                    data1 = d1[int1];
                }
                else {
                    data1 = (d1[int1] + d1[int1 - 1]) / 2;
                }
                c1["data"] = data1;
                c1["strdata"] = formatdata(c1["data"], 2);
            }

        }
        DataColList[index1]["ifclose"] = false;
    }

    /***
    **列求中位数
    **/
    function Math_MID_col_(code1) {
        var index1 = FindIndexbyzb(DataRowList, "code", code1);
        if (index1 < 0) {
            return;
        }
        var dr1 = DataTable[DataRowList[index1]["id"]];
        for (var j = 0; j < DataColList.length; j++) {
            var c1 = dr1[j];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            var d1 = [];
            for (var i = 0; i < DataRowList.length; i++) {
                var datarow = DataRowList[i]["id"];
                if (DataRowList[i]["ifhide"] == false && DataRowList[i]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    d1.push(DataTable[datarow][j]["data"]);
                    c1["hasdata"] = true;
                }
            }
            if (c1["hasdata"]) {
                d1.sort(function (a, b) { return a - b; });
                var data1 = 0;
                var int1 = parseInt(d1.length / 2);
                if (d1.length % 2 > 0) {
                    data1 = d1[int1];
                }
                else {
                    data1 = (d1[int1] + d1[int1 - 1]) / 2;
                }
                c1["data"] = data1;
                c1["strdata"] = formatdata(c1["data"], 2);
            }

        }
        DataRowList[index1]["ifclose"] = false;
    }


    /***
    **行求众数
    **/
    function Math_MOD_row_(code1) {
        var index1 = FindIndexbyzb(DataColList, "code", code1);
        if (index1 < 0) {
            return;
        }
        for (var i = 0; i < DataRowList.length; i++) {
            var datarow = DataRowList[i]["id"];
            var c1 = DataTable[datarow][index1];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            var d1 = [];
            for (var j = 0; j < DataColList.length; j++) {
                if (DataColList[j]["ifhide"] == false && DataColList[j]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    var sd = DataTable[datarow][j]["strdata"];
                    var data1 = DataTable[datarow][j]["data"];
                    var index2 = FindIndexbyzb(d1, "strdata", sd);
                    var t1 = {};
                    if (index2 < 0) {
                        t1 = { "data": data1, "strdata": sd, "count": 1 };
                        d1.push(t1);
                    } else {
                        d1[index2]["count"] += 1;
                    }
                    c1["hasdata"] = true;
                }
            }
            if (c1["hasdata"]) {
                d1.sort(function (a, b) { return b["count"] - a["count"]; });
                c1["data"] = d1[0]["data"];
                c1["strdata"] = d1[0]["strdata"];
            }

        }
        DataColList[index1]["ifclose"] = false;
    }


    /***
    **列求众数
    **/
    function Math_MOD_col_(code1) {
        var index1 = FindIndexbyzb(DataRowList, "code", code1);
        if (index1 < 0) {
            return;
        }
        var dr1 = DataTable[DataRowList[index1]["id"]];
        for (var j = 0; j < DataColList.length; j++) {
            var c1 = dr1[j];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            var d1 = [];
            for (var i = 0; i < DataRowList.length; i++) {
                var datarow = DataRowList[i]["id"];
                if (DataRowList[i]["ifhide"] == false && DataRowList[i]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    var sd = DataTable[datarow][j]["strdata"];
                    var data1 = DataTable[datarow][j]["data"];
                    var index2 = FindIndexbyzb(d1, "strdata", sd);
                    var t1 = {};
                    if (index2 < 0) {
                        t1 = { "data": data1, "strdata": sd, "count": 1 };
                        d1.push(t1);
                    } else {
                        d1[index2]["count"] += 1;
                    }
                    c1["hasdata"] = true;
                }
            }
            if (c1["hasdata"]) {
                d1.sort(function (a, b) { return b["count"] - a["count"]; });
                c1["data"] = d1[0]["data"];
                c1["strdata"] = d1[0]["strdata"];
            }

        }
        DataRowList[index1]["ifclose"] = false;
    }

    /***
    **行求方差
    **/
    function Math_S2_row_(code1) {
        var index1 = FindIndexbyzb(DataColList, "code", code1);
        if (index1 < 0) {
            return;
        }
        for (var i = 0; i < DataRowList.length; i++) {
            var datarow = DataRowList[i]["id"];
            var c1 = DataTable[datarow][index1];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            c1["count"] = 0;
            var d1 = [];
            for (var j = 0; j < DataColList.length; j++) {
                if (DataColList[j]["ifhide"] == false && DataColList[j]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    var data1 = DataTable[datarow][j]["data"];
                    d1.push(data1);
                    c1["data"] += data1;
                    c1["count"] += 1;
                    c1["hasdata"] = true;
                }
            }
            if (c1["hasdata"]) {
                var data1 = 0;
                var avg = c1["data"] / c1["count"];
                for (var k = 0; k < d1.length; k++) {
                    data1 += Math.pow(d1[k] - avg, 2);
                }
                data1 = data1 / c1["count"];
                c1["data"] = data1;
                c1["strdata"] = formatdata(c1["data"], 2);
            }

        }
        DataColList[index1]["ifclose"] = false;
    }


    /***
    **列求方差
    **/
    function Math_S2_col_(code1) {
        var index1 = FindIndexbyzb(DataRowList, "code", code1);
        if (index1 < 0) {
            return;
        }
        var dr1 = DataTable[DataRowList[index1]["id"]];
        for (var j = 0; j < DataColList.length; j++) {
            var c1 = dr1[j];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["count"] = 0;
            c1["ifjisuan"] = true;
            var d1 = [];
            for (var i = 0; i < DataRowList.length; i++) {
                var datarow = DataRowList[i]["id"];
                if (DataRowList[i]["ifhide"] == false && DataRowList[i]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    var data1 = DataTable[datarow][j]["data"];
                    d1.push(data1);
                    c1["data"] += data1;
                    c1["count"] += 1;
                    c1["hasdata"] = true;
                }
            }
            if (c1["hasdata"]) {
                var data1 = 0;
                var avg = c1["data"] / c1["count"];
                for (var k = 0; k < d1.length; k++) {
                    data1 += Math.pow(d1[k] - avg, 2);
                }
                data1 = data1 / c1["count"];
                c1["data"] = data1;
                c1["strdata"] = formatdata(c1["data"], 2);
            }

        }
        DataRowList[index1]["ifclose"] = false;
    }




    /***
    **行求标准差
    **/
    function Math_SD_row_(code1) {
        var index1 = FindIndexbyzb(DataColList, "code", code1);
        if (index1 < 0) {
            return;
        }
        for (var i = 0; i < DataRowList.length; i++) {
            var datarow = DataRowList[i]["id"];
            var c1 = DataTable[datarow][index1];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["ifjisuan"] = true;
            c1["count"] = 0;
            var d1 = [];
            for (var j = 0; j < DataColList.length; j++) {
                if (DataColList[j]["ifhide"] == false && DataColList[j]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    var data1 = DataTable[datarow][j]["data"];
                    d1.push(data1);
                    c1["data"] += data1;
                    c1["count"] += 1;
                    c1["hasdata"] = true;
                }
            }
            if (c1["hasdata"]) {
                var data1 = 0;
                var avg = c1["data"] / c1["count"];
                for (var k = 0; k < d1.length; k++) {
                    data1 += Math.pow(d1[k] - avg, 2);
                }
                data1 = data1 / c1["count"];
                c1["data"] = Math.sqrt(data1);
                c1["strdata"] = formatdata(c1["data"], 2);
            }

        }
        DataColList[index1]["ifclose"] = false;
    }


    /***
    **列求标准差
    **/
    function Math_SD_col_(code1) {
        var index1 = FindIndexbyzb(DataRowList, "code", code1);
        if (index1 < 0) {
            return;
        }
        var dr1 = DataTable[DataRowList[index1]["id"]];
        for (var j = 0; j < DataColList.length; j++) {
            var c1 = dr1[j];
            c1["strdata"] = "";
            c1["data"] = 0.0;
            c1["hasdata"] = false;
            c1["count"] = 0;
            c1["ifjisuan"] = true;
            var d1 = [];
            for (var i = 0; i < DataRowList.length; i++) {
                var datarow = DataRowList[i]["id"];
                if (DataRowList[i]["ifhide"] == false && DataRowList[i]["ifclose"] == false && DataTable[datarow][j]["hasdata"] == true) {
                    var data1 = DataTable[datarow][j]["data"];
                    d1.push(data1);
                    c1["data"] += data1;
                    c1["count"] += 1;
                    c1["hasdata"] = true;
                }
            }
            if (c1["hasdata"]) {
                var data1 = 0;
                var avg = c1["data"] / c1["count"];
                for (var k = 0; k < d1.length; k++) {
                    data1 += Math.pow(d1[k] - avg, 2);
                }
                data1 = data1 / c1["count"];
                c1["data"] = Math.sqrt(data1);
                c1["strdata"] = formatdata(c1["data"], 2);
            }
        }
        DataRowList[index1]["ifclose"] = false;
    }

    /**
    *排序的实现算法
    *
    **/
    function Sort_(code, ifasc) {
        var mark1 = false;
        if (code == rowcode) {
            mark1 = true;
            for (var i = 0; i < DataRowList.length; i++) {
                var pxdata = {};
                var row1 = DataRowList[i];
                pxdata["data"] = row1["sortcode"];
                pxdata["hasdata"] = (typeof row1["sortcode"] == "number");
                DataRowList[i]["pxdata"] = pxdata;
            }
        }
        else {
            var col1 = FindIndexbyzb(DataColList, "code", code);
            if (col1 >= 0) {
                for (var i = 0; i < DataRowList.length; i++) {
                    var pxdata = {};
                    var row1 = DataTable[DataRowList[i].id];
                    pxdata["data"] = row1[col1]["data"];
                    pxdata["hasdata"] = row1[col1]["hasdata"];
                    DataRowList[i]["pxdata"] = pxdata;
                }
                mark1 = true;
            }
        }
        DataSort = {};
        if (mark1) {
            DataRowList.sort(function (a, b) {
                var ad1 = a.pxdata;
                var bd1 = b.pxdata;
                if (ad1["hasdata"] == false) {
                    return 1;
                }
                if (bd1["hasdata"] == false) {
                    return -1;
                }
                if (ifasc == true) {
                    return ad1["data"] - bd1["data"];
                }
                else {
                    return bd1["data"] - ad1["data"];
                }
            });
            DataSort["code"] = code;
            DataSort["ifasc"] = ifasc;
        }
    }

    /**
    *生成表格，参数初始化
    *
    **/
    function CreateTable_() {
        DataTable = [];
        DataColList = [];
        DataRowList = [];
        DataMemoList = [];
        var row1 = 0;
        var col1 = 0;
        //        var zb1 = 0;
        var Nodes = data.wdnodes;
        for (var i = 0; i < Nodes.length; i++) {
            var node1 = Nodes[i];
            if (node1.wdcode.toLowerCase() == rowcode.toLowerCase()) {
                row1 = i;
            }
            if (node1.wdcode.toLowerCase() == colcode.toLowerCase()) {
                col1 = i;
            }
            //            if (node1.wdcode.toLowerCase() == "zb") {
            //                zb1 = i;
            //            }
        }
        var node1 = Nodes[row1];
        Caption = node1.wdname;
        DataRowList = new Array(node1.nodes.length);
        for (var i = 0; i < node1.nodes.length; i++) {
            var n1 = clone(node1.nodes[i]);
            n1["ifchecked"] = false;
            n1["id"] = i;
            n1["ifhide"] = false;
            n1["ifclose"] = false;
            n1["ifjisuan"] = false;
            DataRowList[i] = n1;
        }
        node1 = Nodes[col1];
        for (var i = 0; i < node1.nodes.length; i++) {
            var n1 = clone(node1.nodes[i]);
            DataColList.push(n1);
            n1["ifchecked"] = false;
            n1["ifhide"] = false;
            n1["ifclose"] = false;
            n1["ifjisuan"] = false;
        }


        for (var zb1 = 0; zb1 < Nodes.length; zb1++) {
            node1 = Nodes[zb1];
            for (var i = 0; i < node1.nodes.length; i++) {
                var n1 = clone(node1.nodes[i]);
                var memo1 = n1.memo;
                var s = memo1.split("||");
                for (var j = 0; j < s.length; j++) {
                    var e1 = s[j];
                    if (e1 != null && e1 != "") {
                        if (FindIndex(DataMemoList, e1) < 0) {
                            DataMemoList.push(e1);
                        }
                    }
                }
            }
        }
        DataTable = new Array(DataRowList.length);
        for (var i = 0; i < data.datanodes.length; i++) {
            var data1 = data.datanodes[i];
            var rowvalue1 = data1.wds[row1].valuecode;
            var colvalue1 = data1.wds[col1].valuecode;
            var rowi = FindIndexbyzb(DataRowList, "code", rowvalue1);
            var colj = FindIndexbyzb(DataColList, "code", colvalue1);
            if (rowi >= 0 && colj >= 0) {
                var dr1 = DataTable[rowi];
                if (dr1 == null) {
                    dr1 = new Array(DataColList.length);
                    DataTable[rowi] = dr1;
                }
                dr1[colj] = clone(data1.data);
                dr1[colj]["ifjisuan"] = false;
            }

        }
    }

    /**
    *查找，通过数组对象中指定的属性，值
    *
    **/
    function FindIndexbyzb(obj1, zb, v) {
        for (var i = 0; i < obj1.length; i++) {
            if (obj1[i][zb].toLowerCase() == v.toLowerCase()) {
                return i;
            }
        }
        return -1;
    }

    /**
    *查找，对字符串数组进行查找
    *
    **/
    function FindIndex(obj1, v) {
        for (var i = 0; i < obj1.length; i++) {
            if (obj1[i].toString().toLowerCase() == v.toString().toLowerCase()) {
                return i;
            }
        }
        return -1;
    }

    /**
    *格式化数值数据，返回#,##0.000模式
    *
    **/
    function formatdata(s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, ""));
        var iffs = false;
        if (s < 0) {
            s = Math.abs(s);
            iffs = true;
        }
        s = s.toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse();
        var r = s.split(".")[1];
        var t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return (iffs ? "-" : "") + t.split("").reverse().join("") + "." + r;
    }

    /**
    *字符串转换成数值类型
    *
    **/
    function StrtoFloat(s) {
        return parseFloat(s.replace(/[^\d\.-]/g, ""));
    }

    /**
    *对象克隆
    *
    **/
    function clone(obj) {
        function Clone() {
        }
        Clone.prototype = obj;
        var o = new Clone();
        for (var a in o) {
            if (typeof o[a] == "object") {
                o[a] = clone(o[a]);
            }
        }
        return o;
    }

    /**
    *数据生成html格式
    *
    **/
    this.toHTML = function () {
        var str1 = "<table class='myChartTable' border='1'><thead><tr>";
        str1 += "<th>" + Caption + "</th>";
        if (DataTu) {
            str1 += "<th>&nbsp;</th>";
        }
        for (var i = 0; i < DataColList.length; i++) {
            if (DataColList[i]["ifhide"] != true) {
                str1 += "<th>" /*+ DataColList[i]["code"] + "_"*/ + DataColList[i]["cname"] + "</th>";
            }
        }
        str1 += "</tr>";
        if (DataTu) {
            str1 += "<tr><th></th><th></th>";
            for (var i = 0; i < DataColList.length; i++) {
                if (DataColList[i]["ifhide"] != true) {
                    var c1 = "checked='checked'";
                    if (DataColList[i]["ifchecked"] != true) {
                        c1 = "";
                    }
                    str1 += "<th><input class='colCheckbox' code='" + DataColList[i]["code"] + "' type='checkbox'  " + c1 + " /></th>";
                }
            }
            str1 += "</tr>";
        }
        str1 += "</thead><tbody>";
        for (var i = 0; i < DataRowList.length; i++) {
            if (DataRowList[i]["ifhide"] == true) {
                continue;
            }
            str1 += "<tr>";
            str1 += "<td>" + /*DataRowList[i]["code"] + "_" +*/DataRowList[i]["cname"] + "</td>";

            if (DataTu) {
                var c1 = "checked='checked'";
                if (DataRowList[i]["ifchecked"] != true) {
                    c1 = "";
                }
                str1 += "<td><input class='rowCheckbox' code='" + DataRowList[i]["code"] + "' type='checkbox'  " + c1 + " /></td>";
            }
            var dr1 = DataTable[DataRowList[i]["id"]];
            for (var j = 0; j < dr1.length; j++) {
                if (DataColList[j]["ifhide"] != true) {
                    var selClass = "";
                    if (DataColList[j]["ifchecked"] && DataRowList[i]["ifchecked"]) {
                        selClass = "l t";
                    } else if (DataColList[j]["ifchecked"] && !DataRowList[i]["ifchecked"]) {
                        selClass = "t";
                    }
                    else if (!DataColList[j]["ifchecked"] && DataRowList[i]["ifchecked"]) {
                        selClass = "l";
                    }
                    str1 += "<td align='right' class='" + selClass + "'>" + dr1[j]["strdata"] + "</td>";
                }
            }
            str1 += "</tr>";
        }
        str1 += "</table>";
        str1 += "<div>";
        for (var i = 0; i < DataMemoList.length; i++) {
            str1 += DataMemoList[i] + "<br />";
        }
        str1 += "</div>";
        return str1;
    };
    /**
    *json数据转换成字符接口
    *
    **/
    this.JsontoString = function (obj1) {
        return JSONtoString(obj1);
    };
    /**
    *json数据转换成字符
    *
    **/
    function JSONtoString(obj1) {
        var str1 = '';
        if (obj1 instanceof Array) {
            str1 += '[';
            str2 = '';
            for (var i = 0; i < obj1.length; i++) {
                str2 += ',' + JSONtoString(obj1[i]);
            }
            str2 = str2.substring(1, str2.length);
            str1 += str2 + ']';

        } else {
            if (typeof obj1 == "object") {
                var str2 = '';
                for (var key in obj1) {
                    str2 += ',"' + key.replace(/\"/g, "\\\"") + '":';
                    str2 += JSONtoString(obj1[key]);
                }
                str2 = str2.substring(1, str2.length);
                str1 += '{' + str2 + '}';
            } else {
                if (typeof (obj1) == "string") {
                    str1 = '"' + obj1.replace(/\"/g, "\\\"") + '"';
                } else {
                    str1 = obj1;
                }
            }
        }
        return str1;
    }

    this.isEmptyObject = function (e) {
        return isEmptyObject_(e);
    };

    function isEmptyObject_(obj) {
        if (obj == null) {
            return true;
        }
        for (var n in obj) {
            return false;
        }
        return true;
    }

    /***
    *替换字符
    **/
    function replace_(s1, str2, repstr) {
        str1 = s1;
        while (str1.indexOf(str2, 0) >= 0) {
            str1 = str1.replace(str2, repstr);
        }
        return str1;
    }

}
return cubetable;
});

