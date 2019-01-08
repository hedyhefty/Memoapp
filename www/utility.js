//会社のオブジェクト
function cmp(cmpId, cmpName) {
    return {
        cmpId: cmpId,
        cmpName: cmpName
    }
}

//イベントのオブジェクト
function act(actId, parentId, actName, checkDate) {
    return {
        actId: actId,
        parentId: parentId,
        actName: actName,
        checkDate: checkDate
    }
}

//お気に入りのオブジェクト
function tem_bkm(bkmId, bkmName) {
    return {
        bkmId: bkmId,
        bkmName: bkmName
    }
}

//チェックリストのオブジェクト
function tak(takId, isChecked, takName) {
    return {
        takId: takId,
        isChecked: isChecked,
        taskCont: takName
    }
}

//テンプレートのオブジェクト
function tem_act(temId, temName) {
    return {
        temId: temId,
        temName: temName
    }
}

//テンプレート内項目のオブジェクト
function tem_tak(tem_takId, tem_takName){
    return{
        tem_takId:tem_takId,
        tem_takName:tem_takName
    }
}

//２桁のStringに変換
function twodigitNumStringify(num) {
    var twoDstring = "";
    if (num < 10) {
        twoDstring = "0" + num;
    } else {
        twoDstring = num + "";
    }

    return twoDstring;
}

//今いる場所の下ｊ桁を返す
function getPrefix(j) {
    var loc = location.href;
    var prefix = "";

    for (var i = j; i > 0; i--) {
        prefix = prefix + loc[loc.length - i];
    }

    return prefix;
}

//checklistすべてにチェックがあるか
function checked(tskId) {
    var checklist = [];
    var cnt = 0;
    checklist = localStorage.getItem(tskId);
    checklist = JSON.parse(checklist);

    for (var i = 0; i < checklist.length; i++) {
        if (checklist[i].isChecked == true) {
            cnt++;
        }
    }

    if (cnt == checklist.length) {
        return true;
    } else {
        return false;
    }
}