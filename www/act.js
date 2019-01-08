//イベント画面読み込み時の処理
function loadAct() {
    var myAct = localStorage.getItem("act" + getPrefix(2));
    myAct = JSON.parse(myAct);

    var checkCount = 0;
    var unCheckCount = 0;

    if (myAct == null) {

    } else {
        //イベントすべてを調べる
        for (var i = 0; i < myAct.length; i++) {
            var key = "tak" + getPrefix(2) + myAct[i].actId;
            //keyがローカルストレージにある
            if (key in localStorage) {
                //チェックリストすべてにチェックがある
                if (checked(key) == true) {
                    //日付の表示
                    var date = myAct[i].checkDate;
                    var actDate = document.createTextNode(date);
                    var inputId = document.getElementById("actData");
                    inputId.appendChild(actDate);
                    //イベント名の表示
                    var inputAct = document.createElement("input");
                    inputAct.setAttribute("type", "button");
                    inputAct.setAttribute("value", myAct[i].actName);
                    inputAct.setAttribute("id", i);
                    inputAct.setAttribute("maxlength", "20");
                    inputId.appendChild(inputAct);
                    //wstadd
                    inputAct.className = "btn btn-light wstbtn";
                    inputId.appendChild(document.createElement('br'));
                    //押したボタンのidをとってくる
                    var onclickEvent = (function (num) {
                        return function () {
                            return checklist(myAct[num]);
                        }
                    })(i);
                    //onclickの処理
                    inputAct.onclick = onclickEvent;
                    checkCount++;

                    //チェックが終わってないとき
                } else {

                    //日付の表示
                    var date = myAct[i].checkDate;
                    var actDate = document.createTextNode(date);
                    var inputId = document.getElementById("unactData");
                    inputId.appendChild(actDate);
                    //イベント名の表示
                    var inputAct = document.createElement("input");
                    inputAct.setAttribute("type", "button");
                    inputAct.setAttribute("value", myAct[i].actName);
                    inputAct.setAttribute("id", i);
                    inputAct.setAttribute("maxlength", "20");
                    inputId.appendChild(inputAct);
                    //wst
                    inputAct.className = "btn btn-light wstbtn";
                    inputId.appendChild(document.createElement('br'));
                    //押したボタンのidをとってくる
                    var onclickEvent = (function (num) {
                        return function () {
                            return checklist(myAct[num]);
                        }
                    })(i);
                    //onclickの処理
                    inputAct.onclick = onclickEvent;

                }
            } else {
                //日付の表示
                var date = myAct[i].checkDate;
                var actDate = document.createTextNode(date);
                var inputId = document.getElementById("unactData");
                inputId.appendChild(actDate);
                //イベント名の表示
                var inputAct = document.createElement("input");
                inputAct.setAttribute("type", "button");
                inputAct.setAttribute("value", myAct[i].actName);
                inputAct.setAttribute("id", i);
                inputAct.setAttribute("maxlength", "20");
                //wst
                inputId.appendChild(inputAct);
                inputAct.className = "btn btn-light wstbtn";
                inputId.appendChild(document.createElement('br'));
                //押したボタンのidをとってくる
                var onclickEvent = (function (num) {
                    return function () {
                        return checklist(myAct[num]);
                    }
                })(i);
                //onclickの処理
                inputAct.onclick = onclickEvent;
            }
        }
    }
}

//イベント画面、追加ボタンを押した時
function addBox() {
    var inputArea = document.getElementById("inputBox");
    if (!inputBox.hasChildNodes()) {
        //追加ボタンを削除
        var addId = document.getElementById("add");
        // 子ノードを全削除
        if (addId.hasChildNodes()) {
            for (var i = addId.childNodes.length - 1; i >= 0; i--) {
                addId.removeChild(addId.childNodes[i]);
            }
        }

        //決定ボタン
        var decbutton = document.createElement("input");
        decbutton.setAttribute("type", "button");
        decbutton.setAttribute("value", "決定");
        decbutton.setAttribute("onclick", "addAct()");
        inputArea.appendChild(decbutton);
        //wst
        decbutton.className = "btn";

        //日付
        var datebox = document.createElement("input");
        datebox.setAttribute("type", "date");
        datebox.setAttribute("id", "dateBox");
        inputArea.appendChild(datebox);
        
        //wstdate
        datebox.className = "form-control";

        //イベント名
        var inputbox = document.createElement("input");
        inputbox.setAttribute("type", "text");
        inputbox.setAttribute("id", "addActBox");
        inputArea.appendChild(inputbox);
        
        //wstinput
        inputbox.className = "form-control";
        inputbox.placeholder = "イベント名を入力してください"
        

        //テンプレート選択ボタン
        var tmpbutton = document.createElement("input");
        tmpbutton.setAttribute("type", "button");
        tmpbutton.setAttribute("value", "テンプレート選択");
        tmpbutton.setAttribute("onclick", "selecttmp()");
        inputArea.appendChild(tmpbutton);
        
        //wst
        tmpbutton.className = "btn";
    }
}

//イベントを追加、決定ボタンを押した後
function addAct() {
    //日付、イベント名
    var actName = document.querySelector("#addActBox").value;
    var date = document.querySelector("#dateBox").value;

    //IDを指定,保存用配列作成
    if (localStorage.getItem("act" + getPrefix(2)) == null) {
        var actId = 0;
        var myAct = [];
    } else {
        var myAct = [];
        myAct = localStorage.getItem("act" + getPrefix(2));
        myAct = JSON.parse(myAct);
        var actId = myAct.length;
    }

    //2桁のストリングに変換
    var stActId = twodigitNumStringify(actId);

    //日付が未設定のときは、未設定と保存
    if (date == "") {
        date = "未設定";
    }

    if (actId >= 100) {
        alert("これ以上作成できません")
        location.reload();
    } else {
        //保存
        myAct[actId] = new act(stActId, getPrefix(2), actName, date);
        var actJSON = JSON.stringify(myAct);
        localStorage.setItem("act" + getPrefix(2), actJSON);

        location.reload();

        //inputbox等消す
        var delin = document.getElementById("inputBox");
        if (delin.hasChildNodes()) {
            // 子ノードを全削除
            for (var i = delin.childNodes.length - 1; i >= 0; i--) {
                delin.removeChild(delin.childNodes[i]);
            }
        }
    }
}


//変更の処理
function change() {
    var myAct = localStorage.getItem("act" + getPrefix(2));
    myAct = JSON.parse(myAct);

    var actDataId = document.getElementById("actData");
    var unactDataId = document.getElementById("unactData");

    var checkCount = 0;
    var unCheckCount = 0;

    if (myAct == null) {

    } else {
        if (actDataId.hasChildNodes()) {
            // 子ノードを全削除
            for (var i = actDataId.childNodes.length - 1; i >= 0; i--) {
                actDataId.removeChild(actDataId.childNodes[i]);
            }
        }
        if (unactDataId.hasChildNodes()) {
            // 子ノードを全削除
            for (var i = unactDataId.childNodes.length - 1; i >= 0; i--) {
                unactDataId.removeChild(unactDataId.childNodes[i]);
            }
        }
        //イベントすべてを調べる
        for (var i = 0; i < myAct.length; i++) {
            var key = "tak" + getPrefix(2) + myAct[i].actId;
            //keyがローカルストレージにある
            if (key in localStorage) {
                //チェックリストすべてにチェックがある
                if (checked(key) == true) {
                    //日付の表示
                    var date = document.createElement("input");
                    date.setAttribute("type", "date");
                    date.setAttribute("value", myAct[i].checkDate);
                    date.setAttribute("id", "date" + myAct[i].actId);
                    date.setAttribute("name", "date" + checkCount);
                    actDataId.appendChild(date);
                    //wstdate
                    date.className = "form-control";
                    
                    //イベント名の表示
                    var inputAct = document.createElement("input");
                    inputAct.setAttribute("type", "text");
                    inputAct.setAttribute("value", myAct[i].actName);
                    inputAct.setAttribute("id", "text" + myAct[i].actId);
                    inputAct.setAttribute("name", "text" + checkCount);
                    actDataId.appendChild(inputAct);
                    //wst
                    inputAct.className = "btn btn-light wstbtn";
                    //削除ボタン
                    var delbtn = document.createElement("input");
                    delbtn.setAttribute("type", "button");
                    delbtn.setAttribute("value", "削除");
                    delbtn.setAttribute("id", "del" + myAct[i].actId);
                    delbtn.setAttribute("name", "del" + checkCount);
                    var onclickEvent = (function (num) {
                        return function () {
                            var stnum = twodigitNumStringify(num);
                            location.reload(change());
                            return deletetak(getPrefix(2) + stnum),
                                deleteAct(getPrefix(2), num);
                        }
                    })(i);
                    //onclickの処理
                    delbtn.onclick = onclickEvent;
                    actDataId.appendChild(delbtn);
                    //改行
                    actDataId.appendChild(document.createElement('br'));
                    //wst
                    delbtn.className = "btn btn-danger";
                    checkCount++;

                    //チェックが終わってないとき
                } else {
                    //日付の表示
                    var date = document.createElement("input");
                    date.setAttribute("type", "date");
                    date.setAttribute("value", myAct[i].checkDate);
                    date.setAttribute("id", "date" + myAct[i].actId);
                    date.setAttribute("name", "date" + unCheckCount);
                    unactDataId.appendChild(date);
                    //wstdate
                    date.className = "form-control";
                    
                    //イベント名の表示
                    var inputAct = document.createElement("input");
                    inputAct.setAttribute("type", "text");
                    inputAct.setAttribute("value", myAct[i].actName);
                    inputAct.setAttribute("id", "text" + myAct[i].actId);
                    inputAct.setAttribute("name", "text" + unCheckCount);
                    unactDataId.appendChild(inputAct);
                    //wst
                    inputAct.className = "btn btn-light wstbtn";
                    //削除ボタン
                    var delbtn = document.createElement("input");
                    delbtn.setAttribute("type", "button");
                    delbtn.setAttribute("value", "削除");
                    delbtn.setAttribute("id", "del" + myAct[i].actId);
                    delbtn.setAttribute("name", "del" + unCheckCount);
                    var onclickEvent = (function (num) {
                        return function () {
                            var stnum = twodigitNumStringify(num);
                            location.reload(change());
                            return deletetak(getPrefix(2) + stnum),
                                deleteAct(getPrefix(2), num);
                        }
                    })(i);
                    //onclickの処理
                    delbtn.onclick = onclickEvent;
                    //wst
                    delbtn.className = "btn btn-danger";
                    
                    unactDataId.appendChild(delbtn);
                    //改行
                    unactDataId.appendChild(document.createElement('br'));
                    unCheckCount++;

                }
            } else {
                //日付の表示
                var date = document.createElement("input");
                date.setAttribute("type", "date");
                date.setAttribute("value", myAct[i].checkDate);
                date.setAttribute("id", "date" + myAct[i].actId);
                date.setAttribute("name", "date" + unCheckCount);
                unactDataId.appendChild(date);
                //wstdate
                date.className = "form-control";
                
                //イベント名の表示
                var inputAct = document.createElement("input");
                inputAct.setAttribute("type", "text");
                inputAct.setAttribute("value", myAct[i].actName);
                inputAct.setAttribute("id", "text" + myAct[i].actId);
                inputAct.setAttribute("name", "text" + unCheckCount);
                unactDataId.appendChild(inputAct);
                //wst
                inputAct.className = "btn btn-light wstbtn";
                //削除ボタン
                var delbtn = document.createElement("input");
                delbtn.setAttribute("type", "button");
                delbtn.setAttribute("value", "削除");
                delbtn.setAttribute("id", "del" + myAct[i].actId);
                delbtn.setAttribute("name", "del" + unCheckCount);
                var onclickEvent = (function (num) {
                    return function () {
                        var stnum = twodigitNumStringify(num);
                        location.reload(change());
                        return deletetak(getPrefix(2) + stnum),
                            deleteAct(getPrefix(2), num);
                    }
                })(i);
                //onclickの処理
                delbtn.onclick = onclickEvent;
                unactDataId.appendChild(delbtn);
                //改行
                
                //wst
                delbtn.className = "btn btn-danger";
                unactDataId.appendChild(document.createElement('br'));
                unCheckCount++;
            }
        }
    }

    var addId = document.getElementById("add");
    // 子ノードを全削除
    if (addId.hasChildNodes()) {
        for (var i = addId.childNodes.length - 1; i >= 0; i--) {
            addId.removeChild(addId.childNodes[i]);
        }
    }

    var changeId = document.getElementById("change");
    // 子ノードを全削除
    if (changeId.hasChildNodes()) {
        for (var i = changeId.childNodes.length - 1; i >= 0; i--) {
            changeId.removeChild(changeId.childNodes[i]);
        }
    }
    var okbtn = document.createElement("input");
    okbtn.setAttribute("type", "button");
    okbtn.setAttribute("value", "決定");
    okbtn.setAttribute("onclick", "decision()");
    changeId.appendChild(okbtn);
    //wst
    okbtn.className = "btn";

}

//変更決定後の処理
function decision() {
    var myAct = localStorage.getItem("act" + getPrefix(2));
    myAct = JSON.parse(myAct);
    var actDataId = document.getElementById("actData");
    var unactDataId = document.getElementById("unactData");

    for (var i = 0; i < actDataId.childNodes.length / 4; i++) {
        var textList = document.getElementsByName("text" + i);
        var text = textList[textList.length - 1].id;
        var Id = text[text.length - 1];
        myAct[Number(Id)].actName = document.querySelector("#" + text).value;
        var dateList = document.getElementsByName("date" + i);
        var date = dateList[dateList.length - 1].id;
        var dateData = document.querySelector("#" + date).value;
        if (dateData == "") {
            myAct[Number(Id)].checkDate = "未設定";
        } else {
            myAct[Number(Id)].checkDate = dateData;
        }
    }
    for (var i = 0; i < unactData.childNodes.length / 4; i++) {
        var textList = document.getElementsByName("text" + i);
        var text = textList[0].id;
        var Id = text[text.length - 1];
        myAct[Number(Id)].actName = document.querySelector("#" + text).value;
        var dateList = document.getElementsByName("date" + i);
        var date = dateList[0].id;
        var dateData = document.querySelector("#" + date).value;
        if (dateData == "") {
            myAct[Number(Id)].checkDate = "未設定";
        } else {
            myAct[Number(Id)].checkDate = dateData;
        }
    }

    //保存
    var actJSON = JSON.stringify(myAct);
    localStorage.setItem("act" + getPrefix(2), actJSON);

    //元に戻る
    location.reload();
}

//テンプレート選択画面
function selecttmp() {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];

    var tem = [];
    tem = localStorage.getItem("tem_act");
    tem = JSON.parse(tem);

    var inputArea = document.getElementById("template");
    // 子ノードを全削除
    if (inputArea.hasChildNodes()) {
        for (var i = inputArea.childNodes.length - 1; i >= 0; i--) {
            inputArea.removeChild(inputArea.childNodes[i]);
        }
    }

    for (var i = 0; i < tem.length; i++) {
        var tembtn = document.createElement("input");
        tembtn.setAttribute("type", "button");
        var name = tem[i].temName;
        tembtn.setAttribute("value", name);
        tembtn.setAttribute("id", "tembtn" + i);
        var onclickEvent = (function (num) {
            return function () {
                return addTem(num);
            }
        })(i);
        //onclickの処理
        tembtn.onclick = onclickEvent;
        inputArea.appendChild(tembtn);

        //改行
        inputArea.appendChild(document.createElement('br'));
    }

    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none"
    };
}

//テンプレート追加
function addTem(id) {
    //画面を閉じる
    var modal = document.getElementById('myModal');
    modal.style.display = "none"

    var stId = twodigitNumStringify(id);
    var inputArea = document.getElementById("templateName");

    var myTem = [];
    myTem = localStorage.getItem("tem_act");
    myTem = JSON.parse(myTem);

    //テンプレート名

    var name = myTem[id].temName;
    inputArea.innerHTML = name;

    //テンプレートを追加
    var myTemTak = [];
    myTemTak = localStorage.getItem("tem_tak" + stId);
    myTemTak = JSON.parse(myTemTak);
    var myTsk = [];
    for (var i = 0; i < myTemTak.length; i++) {
        myTsk[i] = tak(myTemTak[i].tem_takId, false, myTemTak[i].tem_takName);
    }

    var myAct = [];
    myAct = localStorage.getItem("act" + getPrefix(2));
    myAct = JSON.parse(myAct);
    var num = myAct.length;
    var stnum = twodigitNumStringify(num);
    var myTskJSON = JSON.stringify(myTsk);
    localStorage.setItem("tak" + getPrefix(2) + stnum, myTskJSON);

}

//戻るボタンを押したときの処理
function backHome() {
    location = "./index.html";
}

//checklistのURLの提示
function checklist(para) {
    var aNavigator = getPrefix(2) + para.actId[para.actId.length - 2] + para.actId[para.actId.length - 1];

    location.href = "./checkList.html" + "?0" + aNavigator;
}


//チェックリストを削除
function deletetak(takId) {
    var takJSON = localStorage.getItem("tak" + takId);
    var tak = JSON.parse(takJSON);

    if (tak != null) {
        for (var i = 0; i < tak.length; i++) {
            localStorage.removeItem("tak" + takId);
        }
    }
}

//イベントを削除
function deleteAct(actId, num) {
    var prefix = "act" + actId;
    var actJSON = localStorage.getItem(prefix);
    var act = JSON.parse(actJSON);

    act.splice(num, 1);
    for (var i = num; i < act.length; i++) {
        act[i].actId = twodigitNumStringify(i);
    }
    var actsJSON = JSON.stringify(act);
    localStorage.setItem("act" + actId, actsJSON);

    reorderCkl(getPrefix(2));
}

//チェックリストを更新
function reorderCkl(cpyId) {
    var prefix = "act" + cpyId;
    var actsJSON = localStorage.getItem(prefix);
    var acts = JSON.parse(actsJSON);

    if (acts == null) {
        return;
    }

    for (var i = 0; i < acts.length + 1; i++) {
        var handlerId = twodigitNumStringify(i);
        var cklHandler = localStorage.getItem("tak" + cpyId + handlerId);
        if (cklHandler == null) {
            continue;
        }
        var newActId = twodigitNumStringify(i - 1);
        localStorage.setItem("tak" + cpyId + newActId, cklHandler);
        localStorage.removeItem("tak" + cpyId + twodigitNumStringify(i));
    }

}