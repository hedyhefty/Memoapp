//新しい会社を登録
function creatcmp() {
    //入力されている文字を読み込んでくる
    var cmpName = document.querySelector("#cmpNameBox").value;
    var actName = document.querySelector("#actNameBox").value;

    //IDを指定,保存用配列作成
    if (localStorage.getItem("cpy") == null) {
        var cmpId = 0;
        var myCmp = [];
    } else {
        var myCmp = [];
        myCmp = localStorage.getItem("cpy");
        myCmp = JSON.parse(myCmp);
        var cmpId = myCmp.length;

    }

    if (cmpId >= 100) {
        alert("これ以上作成できません")
        location = "./index.html";
    } else {
        var actId = 0;
        var stActId = "00";
        var myAct = [];
        var stCmpId = twodigitNumStringify(cmpId);

        //保存
        myCmp[cmpId] = cmp(stCmpId, cmpName);
        myAct[actId] = act(stActId, stCmpId, actName, "未設定");

        var cmpJSON = JSON.stringify(myCmp);
        var actJSON = JSON.stringify(myAct);
        localStorage.setItem("cpy", cmpJSON);
        localStorage.setItem("act" + stCmpId, actJSON);
    }
    
    goBack();
}

function goBack(){
    location.href = "./index.html";
}


