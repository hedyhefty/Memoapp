function save() {

    var task = document.querySelector("#task").value;

    if (task == "") {

        return;

    }

    var target = document.querySelector("#list");

    var ptag = document.createElement("p");

    ptag.innerText = task;
    ptag.setAttribute("maxlength", "20");

    target.appendChild(ptag);

    var reset_text = document.getElementById("task");
    reset_text.value = "";

    if (localStorage.getItem("tem_bkm") == null) {
        var bkmId = 0;
        var stbkmId = "00";
        var myarr = [];
    } else {
        var myarr = [];
        myarr = localStorage.getItem("tem_bkm");
        myarr = JSON.parse(myarr);
        var bkmId = myarr.length;
        var stbkmId = twodigitNumStringify(bkmId);
    }
    
    if (bkmId >= 100) {
        alert("これ以上作成できません。")
        location.reload();
    }else{

    myarr[bkmId] = new tem_bkm(stbkmId, task);
    var arrJSON = JSON.stringify(myarr);

    localStorage.setItem("tem_bkm", arrJSON);
    
    }
}

function changeName() {

    var bkm = localStorage.getItem("tem_bkm");
    bkm = JSON.parse(bkm);

    var inputId = document.getElementById("list");
    if (bkm == null) {

    } else {
        if (inputId.hasChildNodes()) {
            // 子ノードを全削除
            for (var i = inputId.childNodes.length - 1; i >= 0; i--) {
                inputId.removeChild(inputId.childNodes[i]);
            }
        }
        for (var i = 0; i < bkm.length; i++) {

            //イベント名の表示
            var inputBkm = document.createElement("input");
            inputBkm.setAttribute("type", "text");
            inputBkm.setAttribute("value", bkm[i].bkmName);
            inputBkm.setAttribute("id", "inputText" + i);
            inputBkm.setAttribute("maxlength", "20");
            inputId.appendChild(inputBkm);

            var removeButton = document.createElement("input");
            removeButton.setAttribute("type", "button");
            removeButton.setAttribute("value", "削除");
            removeButton.setAttribute("id", "removeButton" + i);

            var onclickEvent = (function (num) {
                return function () {
                    return removeBookmark(num);
                }
            })(i);
            
            //onclickの処理
            removeButton.onclick = onclickEvent;
            inputId.appendChild(removeButton);
            
            //改行
            inputId.appendChild(document.createElement('br'));
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
    okbtn.setAttribute("onclick", "decide()");
    changeId.appendChild(okbtn);

}

function removeBookmark(num){
    var bookmark = localStorage.getItem("tem_bkm");
    bookmark = JSON.parse(bookmark);
    bookmark.splice(num, 1);
    
    for(var j = num; j < bookmark.length; j++){
        bookmark[j].bkmId = twodigitNumStringify(j);
    }
    
    localStorage.setItem("tem_bkm", JSON.stringify(bookmark));
    location.reload();
}


function decide() {
//    var bookmark = [];
    var bookmark = localStorage.getItem("tem_bkm");
    bookmark = JSON.parse(bookmark);
    var listId = document.getElementById("list");

    for (var i = 0; i < listId.childNodes.length /3; i++) {

        bookmark[i].bkmName = document.querySelector("#inputText" + i).value;

    }

    //保存
    var bkmJSON = JSON.stringify(bookmark);
    localStorage.setItem("tem_bkm", bkmJSON);

    //元に戻る
    location.reload();
}


function history_back() {
    location = "./settei.html";
}

function loadBkm() {
    var myJSON = localStorage.getItem("tem_bkm");
    if (myJSON != null) {
        var Data = JSON.parse(myJSON);
        for (var i = 0; i < Data.length; i++) {

            var task = Data[i].bkmName;

            var target = document.querySelector("#list");

            var ptag = document.createElement("input");

            ptag.innerText = task;
            ptag.setAttribute("maxlength", "20");

            target.appendChild(ptag);

            var reset_text = document.getElementById("task");
            reset_text.value = "";

        }
    }

}
