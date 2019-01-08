var tem_arr = [];
var tem = {};

function Addtem() {
    var div1 = document.getElementById("wrapper");

    // 追加ボタンを押したとき

    if (!div1.hasChildNodes()) {
        var input1 = document.createElement("input");
        input1.id = "txtbox";
        input1.setAttribute("type", "text");
        input1.setAttribute("maxlength", "20");
        input1.setAttribute("size", "10");
        div1.appendChild(input1);
        document.getElementById("AddButton").value = "決定";

    }
    //決定ボタンを押したとき
    
    else {
        addfunction();
        changetext();
    }
}

function addfunction() {
    // 保存されているデータの個数を取る
    //データが既に1個以上保存されているとき
    var raw_data = localStorage.getItem("tem_act");  
    var data = JSON.parse(raw_data);
    if (data == null) {
        var data = [];
    }
    //テキストボックスの中身を取得
    var temName = document.getElementById("txtbox").value;
    //      for (var i = 0; i < tem_arr.length + 1; i++) {
    //          tem.id = twodigitNumStringify(i);
    //      }

    var temId = twodigitNumStringify(data.length);
    //新しく入力されたデータを配列に追加
    data[data.length] = new tem_act(temId, temName);
    //データを保存
    
    localStorage.setItem("tem_act", JSON.stringify(data));
}

function changetext() {
    var mydialog = document.createElement("div");
    mydialog.setAttribute("id", "myDiv");
    mydialog.className = "btn btn-group bgp";

    //テキストの表示
    
    var select = document.querySelector("#txtbox").value;
    var output = document.querySelector("#textpart");
    var Btag = document.createElement("Button");
    
    Btag.innerText = select;
    Btag.className = "btn btn-outline-dark mbtn";
    
    Btag.onclick = function(){
        nav2TemTak(Btag);
    }

    mydialog.appendChild(Btag);

    
    //ボタンの追加  
    
    var chgbtn = document.createElement("Button");
    var dlebtn = document.createElement("Button");
    chgbtn.className = "btn btn-info";
    dlebtn.className = "btn btn btn-warning";


    chgbtn.onclick = function () {
        editText(chgbtn, dlebtn)
      
    };
    
    dlebtn.onclick = function (){
        deleteContent(dlebtn)
    };
    
    dlebtn.innerText = "削除";
    mydialog.appendChild(chgbtn);
    mydialog.appendChild(dlebtn);
    
    chgbtn.innerText = "変更";
    var myJSON = localStorage.getItem("tem_act");
    var data = JSON.parse(myJSON);

    
    
//    for (u = 0; u < data.length; u++) {
//        var idNum = twodigitNumStringify(u);
//        Btag.setAttribute("id", "B" + idNum);
//        dlebtn.setAttribute("id", "db" + idNum);
//        chgbtn.setAttribute("id", "cb" + idNum);
//    }
    var idNum = twodigitNumStringify(data.length-1);
    Btag.setAttribute("id", "B" + idNum);
    dlebtn.setAttribute("id", "db" + idNum);
    chgbtn.setAttribute("id", "cb" + idNum);
    
    document.getElementById("textpart").appendChild(mydialog);
    
    //ボタンの文字の変更とテキストボックスの削除
    document.getElementById("AddButton").value = "追加";
    document.getElementById("txtbox").remove();
}

function editText(chgbtn, dlebtn) {
    var idNum = chgbtn.id[chgbtn.id.length - 2] + chgbtn.id[chgbtn.id.length - 1];
    var myBtn = document.getElementById("B"+idNum);
    
    if(chgbtn.innerText == "変更"){
        var btnParent = myBtn.parentNode;
        var editpart = document.createElement("INPUT");
        editpart.setAttribute('id','edp'+idNum);
        btnParent.appendChild(editpart);
        chgbtn.innerText = "決定";
    }
    
    else{
        var editpart = document.getElementById('edp'+idNum);
        myBtn.innerText = editpart.value;
        chgbtn.innerText = "変更";
        editpart.remove();
        var myJSON = localStorage.getItem("tem_act");
        var data = JSON.parse(myJSON);
        data[Number(idNum)].temName = myBtn.innerText;
        myJSON = JSON.stringify(data);
        localStorage.setItem("tem_act",myJSON);      
    }
}

  
function saveContent(idNum) {
    var myJSON = localStorage.getItem("tem_act");
    var data = JSON.parse(myJSON);
    
    if (!data.length == 0) {
        var newtxt = document.getElementById("txt" + idNum).value;
        data[Number(idNum)].temName = newtxt;
        var myJSON = JSON.stringify(data);
        localStorage.setItem("tem_act", myJSON);
    }
}

  
function deleteContent(dlebtn) {
    var idNum = dlebtn.id[dlebtn.id.length - 2] + dlebtn.id[dlebtn.id.length - 1];
    var deleteConfirm = confirm("本当に削除しますか？");
      
    if (deleteConfirm == true) {
        var myJSON = localStorage.getItem("tem_act");
        var Data = JSON.parse(myJSON);
        
        deleteTemtak(idNum, Data.length);
        
        localStorage.removeItem("tem_act");
          
        var newData = [];
        var j = 0;
          
        for (var i = 0; i < Data.length; i++) {
            if (i == Number(idNum)) {
                continue;
            }
              
            var textName = Data[i].temName;
              
            newData[j] = new tem_act(twodigitNumStringify(j), textName);
              
            j++;
          
        }
        myJSON = JSON.stringify(newData);
        localStorage.setItem("tem_act", myJSON);
        if(myJSON == "[]"){
            window.localStorage.removeItem("tem_act");
        }
        window.location.reload();
        window.location.reload();
      }  
}

function twodigitNumStringify(num) {
    var twoDstring = "";
    if (num < 10) {
        twoDstring = "0" + num;
    } 
    else {
        twoDstring = num + "";
    }
    return twoDstring;
}

function deleteTemtak(actId,dlen){
    //var actPostfix = "act" + postfix;
    //window.localStorage.removeItem(actPostfix + Idstring + "ckl");
    window.localStorage.removeItem("tem_tak" + actId);
    
    for(var i = 0; i < dlen-1; i++){
        var i_2D = twodigitNumStringify(i);
        var takHandler = window.localStorage.getItem("tem_tak" +i_2D);
        if(takHandler == null){
            var ip1_2D = twodigitNumStringify(i+1);
            var newTak = window.localStorage.getItem("tem_tak" + ip1_2D);
            window.localStorage.setItem("tem_tak" +i_2D, newTak);
            window.localStorage.removeItem("tem_tak" + ip1_2D);
        }
    }
    
}

  
function tem_act(temId, temName) {
    return {
        temId: temId,
        temName: temName
    }
}

  
function read() {
    var myJSON = localStorage.getItem("tem_act");
    if (myJSON !== null) {
        var ShowData = JSON.parse(myJSON);
        for (var i = 0; i < ShowData.length; i++) {
            loadContent(ShowData[i]);
        }
    }
}



function loadContent(newData) {
    var mydialog = document.createElement("div");
    var idNum = newData.temId;
    mydialog.setAttribute("id", "Div" + idNum);
    mydialog.className = "btn btn-group bgp";
    var SelectButton = document.createElement("Button");
    
    SelectButton.innerHTML = newData.temName;
    SelectButton.className = "btn btn-outline-dark mbtn";
    
    SelectButton.setAttribute("id", "B" + idNum);
    var changebtn = document.createElement("Button");
    var deletebtn = document.createElement("Button");
    changebtn.setAttribute("id", "cb" + idNum);
    deletebtn.setAttribute("id", "db" + idNum);
    
    changebtn.className = "btn btn-info";
    deletebtn.className = "btn btn btn-warning";

    SelectButton.onclick = function(){
        nav2TemTak(SelectButton);
    }
    
    changebtn.onclick = function () {
        editText(document.getElementById("cb" + idNum))
    };
    
    deletebtn.onclick = function () {
    
        deleteContent(document.getElementById("db" + idNum))
    };
    
    var cbtnt = document.createTextNode("変更");
    var dbtnt = document.createTextNode("削除");
    changebtn.appendChild(cbtnt);
    deletebtn.appendChild(dbtnt);
    mydialog.appendChild(SelectButton);
    mydialog.appendChild(changebtn);
    mydialog.appendChild(deletebtn);
    document.getElementById("textpart").appendChild(mydialog);
}


function nav2TemTak(btn){
    location.href = "./tmpTakManage.html?" + btn.id;
}

function goBack(){
    location.href = "./allSettings.html";
}