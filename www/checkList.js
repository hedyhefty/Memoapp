/*global document, window, confirm, location*/
/*exported addBox, loadData, checkOnChange, getPostfix*/

function addBox(){
    //alert(document.getElementById("addbtn").innerHTML);   
    if(document.getElementById("addbtn").innerHTML.match("Add")){
        //alert(document.getElementById("addbtn").innerHTML[0]);
        document.getElementById('conten').style.visibility='visible';
        document.getElementById('stmbtn').style.visibility = "visible";
        //document.getElementById('okbtn').style.visibility='visible';
        document.getElementById("addbtn").innerHTML = "<b id='goblack'><i class='fas fa-check-circle'></i> OK</b>";
    }
    else{
        document.getElementById("addbtn").innerHTML = "<b id='goblack'><i class='fas fa-plus-circle'></i> Add</b>";
        addContent();
        saveContent();
        //window.location.reload();
        document.getElementById('conten').style.visibility='hidden';
        document.getElementById('stmbtn').style.visibility = "hidden";
    }
}

function addContent(){
    var mydialog = document.createElement("div");
    //mydialog.className = "container";
    mydialog.classList.add("ckdiv");
    var idNum = document.getElementById("mydiv").childElementCount;
    
    idNum = twodigitNumStringify(idNum);
    
    mydialog.setAttribute("id","checkDiv"+idNum);
    
    var para = document.createElement("p");
    para.setAttribute("id","p"+idNum);
    para.innerHTML = document.getElementById('conten').value;
    
    var deletebtn = document.createElement("BUTTON");
    deletebtn.setAttribute("id","dbtn"+idNum);
    
    deletebtn.onclick = function(){deleteContent(deletebtn)};
    
    var dbtnt = document.createTextNode("Delete");
    
    deletebtn.appendChild(dbtnt);
    
    var checkb = document.createElement("INPUT");
    checkb.setAttribute("type","checkbox");
    checkb.setAttribute("id","chk"+idNum);
    //checkb.setAttribute("class","cbox");
    
    checkb.onchange = function(){checkOnChange(document.getElementById("chk"+idNum))};
    
    mydialog.appendChild(checkb);
    mydialog.appendChild(para);
    mydialog.appendChild(deletebtn);
    mydialog.style.backgroundColor = "#f7f7f7";
    mydialog.style.borderBottom = "solid 4px black";
    mydialog.style.borderBottomColor = "#ffffff";
    deletebtn.style.visibility = 'hidden';
    
    document.getElementById('mydiv').appendChild(mydialog);
    
    document.getElementById('conten').value = "";
    document.getElementById('conten').style.visibility='hidden';
    deletebtn.style.visibility = 'hidden';
    //document.getElementById('okbtn').style.visibility='hidden';
}

function changeContent(pa){
    //btn.innerHTML = "OK";
    //document.getElementById(btn.id).innerHTML = "OK";
    
    var para = pa.target;
    
    if(para.id[0] == "p"){
        var idNum = para.id[para.id.length-2] + para.id[para.id.length-1];
        //var para = document.getElementById("p"+idNum);
    
        var textNode;
    
        para.innerHTML = "";
        textNode = document.createElement('input');
        textNode.type = 'text';
        textNode.setAttribute("id", "txt" + idNum);
        para.appendChild(textNode);
        para.onclick = null;
    }
}

function deleteContent(btn){
    //location.href = "./delete.html" + "?" + btn.id;
    var postfix = getPostfix(4);
    var btnId = btn.id[btn.id.length-2] + btn.id[btn.id.length-1];

    var deleteConfirm = confirm("Your are going to delete this check item, are you sure?");
    if(deleteConfirm){
        var myJSON = window.localStorage.getItem("tak" + postfix);
        var Data = JSON.parse(myJSON);
        
        window.localStorage.removeItem("tak" + postfix);
        //window.localStorage.clear();
    
        var myData = [];
    
        var j = 0;
    
        for(var i = 0; i < Data.length; i++){
            if(i == Number(btnId)){
                continue;
            }
            myData[j] = Data[i];
            myData[j].takId = twodigitNumStringify(j);
            j++;
        }
    
        myJSON = JSON.stringify(myData);
        window.localStorage.setItem("tak" + postfix,myJSON);
        if(myJSON == "[]"){
            window.localStorage.removeItem("tak" + postfix);
        }
        window.location.reload();
    }
}

function saveContent(){
    var numOfchild = document.getElementById("mydiv").childElementCount;
    //alert(numOfchild);
    var postfix = getPostfix(4);
    
    var myData = [];
    for( var i = 0; i < numOfchild; i++ ){
        var takId = twodigitNumStringify(i);
        
        var isChecked = document.getElementById('chk' + takId).checked;
        var taskCont = document.getElementById('p' + takId).innerHTML;
        //alert(isCheck);
        //alert(taskCont);
        myData[i] = new tak(takId, isChecked, taskCont);
    }
    
    var myJSON = JSON.stringify(myData);
    window.localStorage.setItem("tak" + postfix, myJSON);
    
}

function tak(takId,isChecked,taskCont){
    this.takId = takId;
    this.isChecked = isChecked;
    this.taskCont = taskCont;
}

function loadData(){
    var postfix = getPostfix(4);
    var onModify = Boolean(Number(getOnModify()));
    
    loadCheckDate();
    
    
    var myJSON = window.localStorage.getItem("tak" + postfix);
    //alert((myJSON!=null));
    if(myJSON != null){
        var Data = JSON.parse(myJSON);
        for(var i = 0; i< Data.length; i++){
            loadContent(Data[i]);
        }
    }
    if(onModify == true){
        var taksJSON = localStorage.getItem("tak" + postfix);
        var taks = JSON.parse(taksJSON);
        var tlength = 0;
        if(taks != null){
            tlength = taks.length;
        }
        for(var i = 0; i < tlength; i++){
            var btn = document.getElementById("dbtn" + twodigitNumStringify(i));
            var para =document.getElementById("p" + twodigitNumStringify(i));
            para.onclick = function(para){return changeContent(para)};
            //para.addEventListener("click", function(){changeContent(para)});
            btn.style.visibility = "visible";
        }
        var mdfbtn = document.getElementById("mdfbtn");
        mdfbtn.innerHTML = "<b><i class='far fa-check-circle'></i> OK</b>";
    }
    checkIsDone();
    var tmpbkmJSON = localStorage.getItem("tem_bkm");
    if(tmpbkmJSON != null){
        var tmpbkmData = JSON.parse(tmpbkmJSON);
        for(var i = 0; i < tmpbkmData.length; i++){
            loadTempBookmark(tmpbkmData[i]);
        }
    }
}

function loadContent(myData){
    var mydialog = document.createElement("div");
    //mydialog.className = "container";
    mydialog.classList.add("ckdiv");
    var idNum = myData.takId;
    mydialog.setAttribute("id","checkDiv"+idNum);
    
    var para = document.createElement("p");
    para.innerHTML = myData.taskCont;
    para.setAttribute("id","p"+idNum);
    
    var deletebtn = document.createElement("BUTTON");
    deletebtn.setAttribute("id","dbtn"+idNum);
    deletebtn.className = "btn btn-danger";
    deletebtn.onclick = function(){deleteContent(deletebtn)};
    
    var dbtnt = document.createTextNode("Delete");
    
    deletebtn.appendChild(dbtnt);
    
    var checkb = document.createElement("INPUT");
    checkb.setAttribute("type","checkbox");
    //checkb.setAttribute("class","cbox");
    checkb.setAttribute("id","chk"+idNum);
    checkb.checked = myData.isChecked;
    
    checkb.onchange = function(){checkOnChange(checkb)};
    
    mydialog.appendChild(checkb);
    mydialog.appendChild(para);
    mydialog.appendChild(deletebtn);
    mydialog.style.backgroundColor = "#f7f7f7";
    mydialog.style.borderBottom = "solid 4px black";
    mydialog.style.borderBottomColor = "#ffffff";
    deletebtn.style.visibility = 'hidden';
    
    document.getElementById('mydiv').appendChild(mydialog);
}

function enableModify(){
    var mdfbtn = document.getElementById("mdfbtn");
    var onModify = Boolean(Number(getOnModify()));
    if(onModify == false){
        var postfix = getPostfix(4);
        var taksJSON = localStorage.getItem("tak" + postfix);
        var taks = JSON.parse(taksJSON);
        for(var i = 0; i < taks.length; i++){
            var btn = document.getElementById("dbtn" + twodigitNumStringify(i));
            var para =document.getElementById("p" + twodigitNumStringify(i));
            para.onclick = function(para){return changeContent(para)};
            //para.addEventListener("click", function(){changeContent(para)});
            btn.style.visibility = "visible";
        }
        mdfbtn.innerHTML = "<b><i class='far fa-check-circle'></i> OK</b>";
        setOnModify(true);
    }
    else{
        var postfix = getPostfix(4);
        var taksJSON = localStorage.getItem("tak" + postfix);
        var taks = JSON.parse(taksJSON);
        for(var i = 0; i < taks.length; i++){
            var btn = document.getElementById("dbtn" + twodigitNumStringify(i));
            var textNode = document.getElementById("txt"+twodigitNumStringify(i));
            if(textNode != null){
                var para = document.getElementById("p" + twodigitNumStringify(i));
                para.innerHTML = textNode.value;
            }
            btn.style.visibility = "hidden";
        }
        setOnModify(false);
        saveContent();
    }
    
    
}

function selectTemplate(){
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function(){modal.style.display = "none"};
    
    
    
    //window.onclick = function(event){if(event.target==modal){modal.style.display="none"}};
}

function loadTempBookmark(tbkmData){
    var tbkmDiv = document.createElement("div");
    tbkmDiv.classList.add("ckdiv");
    var idNum = tbkmData.bkmId;
    tbkmDiv.setAttribute("id","tmpDiv" + idNum);
    
    var para = document.createElement("p");
    para.innerHTML = tbkmData.bkmName;
    para.setAttribute("id","tmpp"+idNum);
    
    var checkb = document.createElement("INPUT");
    checkb.setAttribute("type","checkbox");
    checkb.className = "tmpbox";
    checkb.setAttribute("id","tmpChk" + idNum);
    
    tbkmDiv.appendChild(checkb);
    tbkmDiv.appendChild(para);
    
    document.getElementById('tmpHere').appendChild(tbkmDiv);
}

function addTemplate(){
    var modal = document.getElementById('myModal');
    var tmpDiv = document.getElementById('tmpHere');
    var postfix = getPostfix(4);
    var takJSON = localStorage.getItem("tak" + postfix);
    var taks = JSON.parse(takJSON);

    for(var i = 0; i < tmpDiv.childElementCount; i++){
        var i2d = twodigitNumStringify(i);
        var tckb = document.getElementById('tmpChk' + i2d);
        
        if(tckb.checked == true){
            var newTakId = twodigitNumStringify(taks.length);
            var tmpcontent = document.getElementById('tmpp'+i2d).innerHTML;
            taks[taks.length] = new tak(newTakId, false, tmpcontent);
        }
    }
    
    takJSON = JSON.stringify(taks);
    localStorage.setItem("tak" + postfix,takJSON);
    modal.style.display = "none";
    location.reload();
}


function checkOnChange(chk){
    //alert(chk.checked);
    saveContent();
    checkIsDone();
    //window.location.reload();
}

function checkIsDone(){
    var postfix = getPostfix(4);
    var taksJSON = localStorage.getItem("tak" + postfix);
    var taks = JSON.parse(taksJSON);
    var checkedTask = 0;
    var tlength = 0;
    if(taks != null){
        tlength = taks.length;
    }
    
    for(var i = 0; i < tlength; i++){
        var i2D = twodigitNumStringify(i);
        var para = document.getElementById('p' + i2D);
        
        if(taks[i].isChecked){
            checkedTask++;
            para.style.color = "#a5a5a5";
            para.className = 'strpara'; //strike line
        }
        
        else{
            para.style.color = "#000000";
            para.className = '';
        }
    }
    if((checkedTask == tlength)&&(tlength != 0)){
        var dIcon = document.getElementById("allDone");
        dIcon.style.opacity = "0";
        dIcon.style.visibility = "visible";
        var opa = 0;
        fadeIn(opa);
    }
    else{
        document.getElementById("allDone").style.visibility = "hidden";
    }
}

function fadeIn(opa){
    if(opa <= 1){
        var dIcon = document.getElementById("allDone");
        opa = opa + 0.1;
        dIcon.style.opacity = opa + "";
        //alert(dIcon.style.opacity);
        window.setTimeout(function(){fadeIn(opa);},50);
    }
}

function getPostfix(j){
    var loc = location.href;
    var postfix = "";
    
    for(var i = j; i > 0; i--){
        postfix = postfix + loc[loc.length - i];
    }
    
    return postfix;
}

function getOnModify(){
    var loc = location.href;
    return loc[loc.length-5];
}

function setOnModify(value){
    if(value){
        var postfix = getPostfix(4);
        location.href = "./checkList.html" + "?" + "1" + postfix;
    }
    else{
        var postfix = getPostfix(4);
        location.href = "./checkList.html" + "?" + "0" + postfix;
    }
}

function twodigitNumStringify(num){
    var twoDstring = "";
    if(num < 10){
        twoDstring = "0" + num;
    }
    else{
        twoDstring = num + "";
    }
    
    return twoDstring;
}

function goBackAct(){
    var postfix = getPostfix(4);
    var navTarget = postfix[0] + postfix[1];
    location.href = "./act.html" + "?" + navTarget;
}

function loadCheckDate(){
    var loc = location.href;
    var actRootID = loc.substr(loc.length-4, 2);
    var actRootJSON = localStorage.getItem("act" + actRootID);
    var actRoot = JSON.parse(actRootJSON);
    var parentID = loc.substr(loc.length-2, 2);
    var chkDate = actRoot[Number(parentID)].checkDate;
    document.getElementById('checkDate').innerHTML = "Check Date: "+chkDate;
}