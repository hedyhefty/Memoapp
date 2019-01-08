/* global document,window,location,confirm*/
/* exported addBox,loadData, deleteCkl*/

function addBox(){
    if(document.getElementById("addbtn").innerHTML.match("Add")){
        //alert(document.getElementById("addbtn").innerHTML[0]);
        document.getElementById('conten').style.visibility='visible';
        //document.getElementById('okbtn').style.visibility='visible';
        document.getElementById("addbtn").innerHTML = "OK";
    }
    else{
        document.getElementById("addbtn").innerHTML = "Add";
        addContent();
        saveContent();
    }
}

function addContent(){
    var mydialog = document.createElement("div");
    var idNum = document.getElementById("mydiv").childElementCount;
    
    idNum = twodigitNumStringify(idNum);
    
    mydialog.setAttribute("id","actDiv"+idNum);
    
    var para = document.createElement("p");
    para.setAttribute("id","p"+idNum);
    para.innerHTML = document.getElementById('conten').value;
    
    var changebtn = document.createElement("BUTTON");
    var deletebtn = document.createElement("BUTTON");
    changebtn.setAttribute("id","cbtn"+idNum);
    deletebtn.setAttribute("id","dbtn"+idNum);
    
    changebtn.onclick = function(){changeContent(changebtn)};
    deletebtn.onclick = function(){deleteContent(deletebtn)};
    
    var cbtnt = document.createTextNode("Change");
    var dbtnt = document.createTextNode("Delete");
    
    changebtn.appendChild(cbtnt);
    deletebtn.appendChild(dbtnt);
    
    mydialog.appendChild(para);
    mydialog.appendChild(changebtn);
    mydialog.appendChild(deletebtn);
    
    document.getElementById('mydiv').appendChild(mydialog);
    
    document.getElementById('conten').value = "";
    document.getElementById('conten').style.visibility='hidden';
    //document.getElementById('okbtn').style.visibility='hidden';
}

function changeContent(btn){
    
    var idNum = btn.id[btn.id.length-2] + btn.id[btn.id.length-1];
    var para = document.getElementById("p"+idNum);
    var textNode;
    
    if(btn.innerHTML == "Change"){
        para.innerHTML = "";
        textNode = document.createElement('input');
        textNode.type = 'text';
        textNode.setAttribute("id","txt"+idNum);
        para.appendChild(textNode);
        btn.innerHTML = "OK";
    }
    else{
        textNode = document.getElementById("txt"+idNum);
        para.innerHTML = textNode.value;
        //textNode.parentElement.removeChild(textNode);
        btn.innerHTML = "Change";
        saveContent();
    }
    
}

function deleteContent(btn){
    //location.href = "./delete.html" + "?" + btn.id;
    var postfix = getPostfix(2);
    var btnId = btn.id[btn.id.length-2] + btn.id[btn.id.length-1];
    
    var deleteConfirm = confirm("Your are going to delete this activity, are you sure?");
    if(deleteConfirm){
        var myJSON = window.localStorage.getItem("tem_tak" + postfix);
        var Data = JSON.parse(myJSON);
        
        window.localStorage.removeItem("act" + postfix);
        //window.localStorage.clear();
    
        var myData = [];
    
        var j = 0;
    
        for(var i = 0; i < Data.length; i++){
            if(i == Number(btnId)){
                continue;
            }
            myData[j] = Data[i];
            
            var tmpId;
            
            if(j<10){
                tmpId = "0" + j;
            }
            tmpId = tmpId+"";
            myData[j].tem_takId = tmpId;
            j++;
        }
    
        myJSON = JSON.stringify(myData);
        window.localStorage.setItem("tem_tak" + postfix,myJSON);
        
        if(myJSON == "[]"){
            window.localStorage.removeItem("act" + postfix);
        }
        window.location.reload();
    }
}

function saveContent(){
    var numOfchild = document.getElementById("mydiv").childElementCount;
    //alert(numOfchild);
    var postfix = getPostfix(2);
    
    var myData = [];
    for( var i = 0; i < numOfchild; i++ ){
        var tem_takId = i;
        if(tem_takId<10){
            tem_takId = "0" + tem_takId;
        }
        else{
            tem_takId = tem_takId + "";
        }
        
        var actCont = document.getElementById('actDiv' + tem_takId).getElementsByTagName("P")[0].innerHTML;

        myData[i] = new tem_tak(tem_takId, actCont);
    }
    
    var myJSON = JSON.stringify(myData);
    window.localStorage.setItem("tem_tak" + postfix ,myJSON);
    
}

function tem_tak(tem_takId, tem_takName){
    return{
        tem_takId:tem_takId,
        tem_takName:tem_takName
    }
}

function loadData(){
    var postfix = getPostfix(2);
    var myJSON = window.localStorage.getItem("tem_tak" + postfix);
    //alert((myJSON!=null));
    if(myJSON != null){
        var Data = JSON.parse(myJSON);
        for(var i = 0; i< Data.length; i++){
            loadContent(Data[i]);
        }
    }
}

function loadContent(myData){
    var mydialog = document.createElement("div");
    var idNum = myData.tem_takId;
    mydialog.setAttribute("id","actDiv"+idNum);
    
    var para = document.createElement("p");
    para.innerHTML = myData.tem_takName;
    para.setAttribute("id","p"+idNum);
    
    var changebtn = document.createElement("BUTTON");
    var deletebtn = document.createElement("BUTTON");
    changebtn.setAttribute("id","cbtn"+idNum);
    deletebtn.setAttribute("id","dbtn"+idNum);
    
    changebtn.onclick = function(){changeContent(document.getElementById("cbtn"+idNum))};
    deletebtn.onclick = function(){deleteContent(document.getElementById("dbtn"+idNum))};
    
    var cbtnt = document.createTextNode("Change");
    var dbtnt = document.createTextNode("Delete");
    
    changebtn.appendChild(cbtnt);
    deletebtn.appendChild(dbtnt);
    
    mydialog.appendChild(para);
    mydialog.appendChild(changebtn);
    mydialog.appendChild(deletebtn);
    
    document.getElementById('mydiv').appendChild(mydialog);
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

function getPostfix(j){
    var loc = location.href;
    var postfix = "";
    
    for(var i = j; i > 0; i--){
        postfix = postfix + loc[loc.length - i];
    }
    
    return postfix;
}

function goBackTemAct(){
    location.href = "./templateSet.html";
}