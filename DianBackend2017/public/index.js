/**
 * 绑定，删除事件
 * @param {obj对象}   elm       需要绑定事件的对象
 * @param {[type]}   evType     需要绑定的事件名称
 * @param {Function} fn         绑定事件的函数
 * @param {[type]}   useCapture true/false冒泡方式
 */
function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.attachEvent) {
        var r = elm.attachEvent("on" + evType, fn); //IE5+
        return r;
    } else {
        elm['on' + evType] = fn; //DOM 0
    }
}

function removeEvent(elm, evType, fn, useCapture) {
    if (elm.removeEventListener) {
        elm.removeEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.detachEvent) {
        var r = elm.detachEvent("on" + evType, fn); //IE5+
        return r;
    }
}

function forbiddenEvent(event) {
    event = event || window.event;
    if (event.stopPropagation) event.stopPropagation();
    else event.cancelBubble = true;
    if (event.preventDefault) event.preventDefault();
    else event.returnValue = false;

}

/**
 * 原生JS获取form中的信息
 * @param  {[type]} frmID [description]
 * @return {[type]}       [description]
 */
function getFormQueryString(frmName) {
    var form = document.forms[frmName];
    var i, queryString = "",
        and = "";
    var item; // for each form's object
    var itemValue; // store each form object's value
    for (i = 0; i < form.length; i++) {
        item = form[i]; // get form's each object
        if (item.name !== '') {
            if (item.type == 'select-one') {
                itemValue = item.options[item.selectedIndex].value;
            } else if (item.type == 'checkbox' || item.type == 'radio') {
                if (item.checked === false) {
                    continue;
                }
                itemValue = item.value;
            } else if (item.type == 'file') {
                continue; //跳过FILE
            } else if (item.type == 'button' || item.type == 'submit' || item.type == 'reset' || item.type == 'image') { // ignore this type
                continue;
            } else {
                itemValue = item.value;
            }
            //itemValue = encodeURIComponent(itemValue);
            queryString += and + item.name + '=' + itemValue;
            and = "&";
        }
    }
    return queryString;
}

var xmlhttp;
if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

//ajax请求数据
function getData(method, url, queryString, fnc) { //获取JSON数据
    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xmlhttp.send(queryString);
    xmlhttp.onreadystatechange = fnc;
}

function showAddForm() {
    document.forms.addInf.style.zIndex = "3";
    document.forms.addInf.style.opacity = "1";
    document.forms.addInf.style.top = "50%";
}

function hideAddForm() {
    document.forms.addInf.style.zIndex = "0";
    document.forms.addInf.style.opacity = "0";
    document.forms.addInf.style.top = "20%";
}

function createInfList(data, parent) {
    var list = document.createElement('li');
    list.className = "inf-list";
    list.setAttribute('id', data.contact_id);
    var name = document.createElement('span');
    name.title = "name";
    name.innerText = data.name;
    list.appendChild(name);
    var nameInput = document.createElement('input');
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.setAttribute('placeholder', '姓名');
    list.appendChild(nameInput);
    var email = document.createElement('span');
    email.title = "email";
    email.innerText = data.email;
    list.appendChild(email);
    var emailInput = document.createElement('input');
    emailInput.type = "text";
    emailInput.name = "email";
    emailInput.setAttribute('placeholder', '邮箱');
    list.appendChild(emailInput);
    var phone = document.createElement('span');
    phone.title = "phone";
    phone.innerText = data.phone;
    list.appendChild(phone);
    var phoneInput = document.createElement('input');
    phoneInput.type = "text";
    phoneInput.name = "phone";
    phoneInput.setAttribute('placeholder', '手机号码');
    list.appendChild(phoneInput);
    var operation = document.createElement('div');
    operation.className = "operation";
    var edit = document.createElement('div');
    var delete_div = document.createElement('div');
    var save = document.createElement('div');
    edit.className = "edit inline-block";
    delete_div.className = "delete inline-block";
    save.className = "save inline-block";
    operation.appendChild(edit);
    operation.appendChild(save);
    operation.appendChild(delete_div);
    list.appendChild(operation);
    parent.appendChild(list);
    addEvent(delete_div, "click", function(event) {
        deleteInf(event);
    }, false);
    addEvent(edit, "click", function(event) {
        editInf(event);
        forbiddenEvent(event);
    }, false);
    addEvent(save,"click",function (eventq) {
        updateInf(event);
    },false);
}

function getAllInf() {
    getData("GET", "http://120.79.67.211:3000/contacts/", null, function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var data = JSON.parse(xmlhttp.responseText).result;
                console.log(data);
                var wrap = document.createDocumentFragment();
                for (var i = 0; i < data.length; i++) {
                    createInfList(data[i], wrap);
                }
                document.querySelector("ul.container").appendChild(wrap);
            } else {
                console.log("发生错误" + xmlhttp.status);
            }
        }
    });
}

function deleteInf(event) {
    var obj = event.target;
    getData("DELETE", "http://120.79.67.211:3000/contacts/" + obj.parentNode.parentNode.getAttribute('id'), null, function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                obj.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode);
            } else {
                console.log("发生错误" + xmlhttp.status);
            }
        }
    });
}

function updateInf(event) {
    var obj = event.target,
        parent = obj.parentNode.parentNode,
        queryString = "",
        name = parent.querySelector('input[name="name"]'),
        email = parent.querySelector('input[name="email"]'),
        phone = parent.querySelector('input[name="phone"]'),
        emailPattern = /^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/,
        numberPattern = /^[U][2][0]\d{7}$/,
        phonePattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    if (!name.value) {
        alert('请输入姓名');
        name.focus();
    } else if (!email.value) {
        alert('请输入邮箱');
        email.focus();
    } else if (!emailPattern.test(email.value)) {
        alert('请输入有效的学号');
        email.focus();
    } else if (!phone.value) {
        alert('请输入手机号码');
        phone.focus();
    } else if (!phonePattern.test(phone.value)) {
        alert('请输入有效的手机号码');
        phone.focus();
    } else {
        var info = {
        	name: 'error',
        	email: 'test@qq.com',
        	phone: '18973707225'
        };
        info.name = name.value;
        info.email = email.value;
        info.phone = phone.value;
        console.log(info);
        getData("PUT", "http://120.79.67.211:3000/contacts/" + parent.getAttribute('id'), JSON.stringify(info), function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var data = JSON.parse(xmlhttp.responseText);
                    obj.style.display = "none";
                    obj.previousElementSibling.style.display = "inline-block";
                    hideInputs(parent);
                } else {
                    console.log("发生错误" + xmlhttp.status);
                }
            }
        });
    }
}

function editInf(event) {
    var obj = event.target;
    obj.style.display = "none";
    obj.nextElementSibling.style.display = "inline-block";
    showInputs(obj.parentNode.parentNode);
}

function showInputs(parent) {
    parent.querySelector('input[name="name"]').style.display = "inline-block";
    parent.querySelector('span[title="name"]').style.display = "none";
    parent.querySelector('input[name="name"]').value = parent.querySelector('span[title="name"]').innerText;
    parent.querySelector('input[name="email"]').style.display = "inline-block";
    parent.querySelector('span[title="email"]').style.display = "none";
    parent.querySelector('input[name="email"]').value = parent.querySelector('span[title="email"]').innerText;
    parent.querySelector('input[name="phone"]').style.display = "inline-block";
    parent.querySelector('span[title="phone"]').style.display = "none";
    parent.querySelector('input[name="phone"]').value = parent.querySelector('span[title="phone"]').innerText;
}

function hideInputs(parent) {
    parent.querySelector('input[name="name"]').style.display = "none";
    parent.querySelector('span[title="name"]').style.display = "inline-block";
    parent.querySelector('span[title="name"]').innerText = parent.querySelector('input[name="name"]').value;
    parent.querySelector('input[name="email"]').style.display = "none";
    parent.querySelector('span[title="email"]').style.display = "inline-block";
    parent.querySelector('span[title="email"]').innerText = parent.querySelector('input[name="email"]').value;
    parent.querySelector('input[name="phone"]').style.display = "none";
    parent.querySelector('span[title="phone"]').style.display = "inline-block";
    parent.querySelector('span[title="phone"]').innerText = parent.querySelector('input[name="phone"]').value;
}

function checkForm() {
}

addEvent(document.querySelector('div.add'), "click", function(event) {
    showAddForm();
    forbiddenEvent(event);
}, false);
addEvent(document.querySelector('div.close'), "click", function(event) {
    hideAddForm();
    forbiddenEvent(event);
}, false);
addEvent(document.forms.addInf, "submit", function(event) {
	forbiddenEvent(event);
    var form = document.forms.addInf,
        emailPattern = /^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/,
        phonePattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    if (!form.name.value) {
        alert('请输入姓名');
        form.name.focus();
    } else if (!form.email.value) {
        alert('请输入邮箱');
        form.email.focus();
    } else if (!emailPattern.test(form.email.value)) {
        alert('请输入正确的学号');
        form.email.focus();
    } else if (!form.phone.value) {
        alert('请输入手机号码');
        form.phone.focus();
    } else if (!phonePattern.test(form.phone.value)) {
        alert('请输入正确的手机号码');
        form.phone.focus();
    } else {
        var info = {
        	name: 'error',
        	email: 'test@qq.com',
        	phone: '18973707225'
        };
        info.name = form.name.value;
        info.email = form.email.value;
        info.phone = form.phone.value;
        console.log(info);
        getData("POST", "http://120.79.67.211:3000/contacts/", JSON.stringify(info), function() {
            //http://13.230.86.164:20170/contacts
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    window.location.href = "index.html";
                } else {
                    console.log("发生错误" + xmlhttp.status);
                }
            }
        });
    }
}, false);
getAllInf();
