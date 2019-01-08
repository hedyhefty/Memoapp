//ホーム画面読み込み時の処理
function loadCmp() {
    var myCmp = [];
    myCmp = localStorage.getItem("cpy");
    myCmp = JSON.parse(myCmp);

    var checklist = [];
    var flag = 0;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = twodigitNumStringify(month);
    var day = date.getDate();
    day = twodigitNumStringify(day);

    todayData = year + "-" + month + "-" + day;

    if (myCmp == null) {

    } else {
        //会社すべてを調べる
        for (var i = 0; i < myCmp.length; i++) {
            //IDをString２桁にする
            var stCmpId = twodigitNumStringify(i);

            //会社のイベントを取り出す
            var myAct = localStorage.getItem("act" + stCmpId);
            myAct = JSON.parse(myAct);

            actcnt = 0;
            //イベントすべてを調べる
            //イベントがないとき
            if (myAct == null) {
                var inputCmp = document.createElement("input");
                inputCmp.setAttribute("type", "button");
                inputCmp.setAttribute("value", myCmp[i].cmpName);
                inputCmp.setAttribute("id", i);
                inputCmp.setAttribute("maxlength", "20");
                inputCmp.className = "btn btn-info mbtn";
                //uncheckedに追加
                var inputId = document.getElementById("unchecked");
                inputId.appendChild(inputCmp);
                inputId.appendChild(document.createElement('br'));
                //押したボタンのidをとってくる
                var onclickEvent = (function (num) {
                    return function () {
                        return activity(myCmp[num]);
                    }
                })(i);
                //onclickの処理
                inputCmp.onclick = onclickEvent;
                //イベントがあるとき
            } else {
                //確認日時が今日
                for (var j = 0; j < myAct.length; j++) {
                    if (myAct[j].checkDate == todayData) {
                        var inputId = document.getElementById("today");
                        if (flag == 0) {
                            var todaycheck = document.createTextNode("今日のチェック");
                            inputId.appendChild(todaycheck);
                            inputId.appendChild(document.createElement('br'));
                            flag++;
                        }
                        var inputCmp = document.createElement("input");
                        inputCmp.setAttribute("type", "button");
                        inputCmp.setAttribute("value", myCmp[i].cmpName);
                        inputCmp.setAttribute("maxlength", "20");
                        inputCmp.setAttribute("id", i);
                        inputCmp.className = "btn btn-info mbtn";
                        inputId.appendChild(inputCmp);
                        inputId.appendChild(document.createElement('br'));
                        //押したボタンのidをとってくる
                        var onclickEvent = (function (num) {
                            return function () {
                                return activity(myCmp[num]);
                            }
                        })(i);
                        //onclickの処理
                        inputCmp.onclick = onclickEvent;
                    }
                    var key = "tak" + myCmp[i].cmpId + myAct[j].actId;
                    //keyがローカルストレージにある
                    if (key in localStorage) {
                        //チェックリストすべてにチェックがある
                        if (checked(key) == true) {
                            actcnt++;
                        }
                    }
                }
                //チェックがすべて終わっているとき
                if (actcnt == myAct.length) {
                    var inputCmp = document.createElement("input");
                    inputCmp.setAttribute("type", "button");
                    inputCmp.setAttribute("value", myCmp[i].cmpName);
                    inputCmp.setAttribute("id", i);
                    inputCmp.setAttribute("maxlength", "20");
                    inputCmp.className = "btn btn-info mbtn";
                    //checkedに追加
                    var inputId = document.getElementById("checked");
                    inputId.appendChild(inputCmp);
                    inputId.appendChild(document.createElement('br'));
                    //押したボタンのidをとってくる
                    var onclickEvent = (function (num) {
                        return function () {
                            return activity(myCmp[num]);
                        }
                    })(i);
                    //onclickの処理
                    inputCmp.onclick = onclickEvent;
                    //チェックが終わってないとき
                } else {
                    var inputCmp = document.createElement("input");
                    inputCmp.setAttribute("type", "button");
                    inputCmp.setAttribute("value", myCmp[i].cmpName);
                    inputCmp.setAttribute("id", i);
                    inputCmp.setAttribute("maxlength", "20");
                    inputCmp.className = "btn btn-info mbtn";
                    //uncheckedに追加
                    var inputId = document.getElementById("unchecked");
                    inputId.appendChild(inputCmp);
                    inputId.appendChild(document.createElement('br'));
                    //押したボタンのidをとってくる
                    var onclickEvent = (function (num) {
                        return function () {
                            return activity(myCmp[num]);
                        }
                    })(i);
                    //onclickの処理
                    inputCmp.onclick = onclickEvent;
                }
            }
        }
    }
}

//activityのURLの提示
function activity(para) {
    var aNavigator = para.cmpId[para.cmpId.length - 2] + para.cmpId[para.cmpId.length - 1];

    location.href = "./act.html" + "?" + aNavigator;

}


//会社の削除選択
function selectDelcmp() {

    //メニューを閉じる
    document.querySelector("#menu").checked = false;

    var myCmp = [];
    myCmp = localStorage.getItem("cpy");
    myCmp = JSON.parse(myCmp);

    var uncheckedId = document.getElementById("unchecked");
    var checkedId = document.getElementById("checked");

    if (myCmp == null) {

    } else {
        var uncheckedId = document.getElementById("unchecked");
        for (var i = uncheckedId.childNodes.length - 1; i >= 0; i--) {
            uncheckedId.removeChild(uncheckedId.childNodes[i]);
        }
        var checkedId = document.getElementById("checked");
        for (var i = checkedId.childNodes.length - 1; i >= 0; i--) {
            checkedId.removeChild(checkedId.childNodes[i]);
        }
        //会社すべてを調べる
        for (var i = 0; i < myCmp.length; i++) {
            //IDをString２桁にする
            var stCmpId = twodigitNumStringify(i);

            //会社のイベントを取り出す
            var myAct = localStorage.getItem("act" + stCmpId);
            myAct = JSON.parse(myAct);

            actcnt = 0;
            //イベントすべてを調べる
            //イベントがないとき
            if (myAct == null) {
                //チェックボックスの表示
                var checkBox = document.createElement("input");
                checkBox.setAttribute("type", "checkbox");
                checkBox.setAttribute("id", "checkbox" + i);
                uncheckedId.appendChild(checkBox);
                //会社名の表示
                var inputCmp = document.createTextNode(myCmp[i].cmpName);
                //uncheckedに追加
                uncheckedId.appendChild(inputCmp);
                uncheckedId.appendChild(document.createElement('br'));
                //イベントがあるとき
            } else {
                for (var j = 0; j < myAct.length; j++) {
                    var key = "tak" + myCmp[i].cmpId + myAct[j].actId;
                    //keyがローカルストレージにある
                    if (key in localStorage) {
                        //チェックリストすべてにチェックがある
                        if (checked(key) == true) {
                            actcnt++;
                        }
                    }
                }
                //チェックがすべて終わっているとき
                if (actcnt == myAct.length) {
                    //チェックボックスの表示
                    var checkBox = document.createElement("input");
                    checkBox.setAttribute("type", "checkbox");
                    checkBox.setAttribute("id", "checkbox" + i);
                    checkedId.appendChild(checkBox);
                    //会社名の表示
                    var inputCmp = document.createTextNode(myCmp[i].cmpName);
                    //uncheckedに追加
                    checkedId.appendChild(inputCmp);
                    checkedId.appendChild(document.createElement('br'));
                    //チェックが終わってないとき
                } else {
                    //チェックボックスの表示
                    var checkBox = document.createElement("input");
                    checkBox.setAttribute("type", "checkbox");
                    checkBox.setAttribute("id", "checkbox" + i);
                    uncheckedId.appendChild(checkBox);
                    //会社名の表示
                    var inputCmp = document.createTextNode(myCmp[i].cmpName);
                    //uncheckedに追加
                    uncheckedId.appendChild(inputCmp);
                    uncheckedId.appendChild(document.createElement('br'));
                }
            }
        }


        var delbtn = document.createElement("input");
        delbtn.setAttribute("type", "button");
        delbtn.setAttribute("value", "削除");

        delbtn.setAttribute("onclick", "delcmp()");
        checkedId.appendChild(delbtn);
    }
}

//会社の削除
function delcmp() {
    var myCmp = [];
    myCmp = localStorage.getItem("cpy");
    myCmp = JSON.parse(myCmp);
    var uncheckedId = document.getElementById("unchecked");
    var length = myCmp.length;
    var cnt = 0;

    for (var i = 0; i < length; i++) {
        var check = document.getElementById("checkbox" + i).checked;
        if (check == true) {
            var idNum = twodigitNumStringify(i);
            deleteCkl(idNum);
            deleteAct(idNum, myCmp.length);
            myCmp.splice(i - cnt, 1);
            cnt++;
        }
    }
    for (var j = 0; j < myCmp.length; j++) {
        myCmp[j].cmpId = twodigitNumStringify(j);
    }

    var cmpJSON = JSON.stringify(myCmp);
    localStorage.setItem("cpy", cmpJSON);


    location.reload();

}

//チェックリストを削除
function deleteCkl(cpyId) {
    var actsJSON = localStorage.getItem("act" + cpyId);
    var acts = JSON.parse(actsJSON);

    if (acts != null) {
        for (var i = 0; i < acts.length; i++) {
            var actId = twodigitNumStringify(i);
            localStorage.removeItem("tak" + cpyId + actId);

        }
    }
}

//イベントを削除
function deleteAct(Id, dlen) {
    localStorage.removeItem("act" + Id);

    for (var i = 0; i < dlen - 1; i++) {
        var i_2D = twodigitNumStringify(i);
        var actHandler = localStorage.getItem("act" + i_2D);
        if (actHandler == null) {
            var ip1_2D = twodigitNumStringify(i + 1);
            var newAct = localStorage.getItem("act" + ip1_2D);
            newAct = JSON.parse(newAct);
            newAct[0].parentId = i_2D;

            reorderCkl(ip1_2D);

            var newActJSON = JSON.stringify(newAct);
            localStorage.setItem("act" + i_2D, newActJSON);
            localStorage.removeItem("act" + ip1_2D);
        }
    }
}

//チェックリストを更新
function reorderCkl(cpyId) {
    var prefix = "act" + cpyId;
    var actsJSON = localStorage.getItem(prefix);
    var acts = JSON.parse(actsJSON);

    if (acts == null) {
        return;
    }

    for (var i = 0; i < acts.length; i++) {
        var handlerId = twodigitNumStringify(i);
        var cklHandler = localStorage.getItem("tak" + cpyId + handlerId);
        if (cklHandler == null) {
            continue;
        }
        var newCpyId = twodigitNumStringify(Number(cpyId) - 1);
        localStorage.setItem("tak" + newCpyId + handlerId, cklHandler);
        localStorage.removeItem("tak" + cpyId + handlerId);
    }

}



////テスト用
////add
//function addTestSet() {
//    var cpyHandler = [];
//    for (var i = 0; i < 5; i++) {
//        cpyHandler[i] = cmp(twodigitNumStringify(i), "cpy" + twodigitNumStringify(i));
//        var actHandler = [];
//        for (var j = 0; j < 5; j++) {
//            actHandler[j] = act(twodigitNumStringify(j), twodigitNumStringify(j), "a", "d");
//            var takHandler = [];
//            for (var k = 0; k < 5; k++) {
//                takHandler[k] = tak(twodigitNumStringify(k), false, "task" + twodigitNumStringify(k));
//            }
//            var takJSON = JSON.stringify(takHandler);
//            localStorage.setItem("tak" + twodigitNumStringify(i) + twodigitNumStringify(j), takJSON);
//        }
//        var actJSON = JSON.stringify(actHandler);
//        localStorage.setItem("act" + twodigitNumStringify(i), actJSON);
//    }
//
//    var cpyJSON = JSON.stringify(cpyHandler);
//    localStorage.setItem("cpy", cpyJSON);
//
//    var tembkmHandler = [];
//    for (var i = 0; i < 5; i++) {
//        var i2d = twodigitNumStringify(i);
//        tembkmHandler[i] = tem_bkm(i2d, "temp bookmark " + i2d);
//    }
//    var tbkmJSON = JSON.stringify(tembkmHandler);
//    localStorage.setItem("tem_bkm", tbkmJSON);
//
//    location.reload();
//}