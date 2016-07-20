self.port.on("getElements", function (tag) {
    GetJson2();
});

function AccountHandler(data)
{
    var jsonResponse = JSON.parse(data.responseText);
    alert(jsonResponse.account);
}

var accounts;
function GetJson2() {
    $.getJSON("http://10.50.14.139/ETJsUtil/Accounts2.json?a="+Math.floor((Math.random() * 100000) + 1), function (result) {
        accounts = result.account;
    });
}

function keydown() {
    alert("keydown event detected!");
}




function loginPack(eleID, elePWD, eleBtn) {
    this.id = eleID;
    this.pwd = elePWD;
    this.btn = eleBtn;
    this.divWarpper = $('<div>');
    this.AccountPopupDisplayed = false;
    window.loginPackET = this;
    this.submit = function (id, pwd) {
        $('body').maskOn();
        if (!this.alive()) {
            return;
        }
        this.id.val(id);
        this.id.trigger('focusout');
        this.pwd.val(pwd);
        this.btn.click();
        this.btn.closest("form").submit();
    }
    this.fillInCred = function (id, pwd) {
        this.id.val(id);
        this.pwd.val(pwd);
        alert('click');
        this.btn.click();
    }
    this.alive = function () {
        return (this.id != undefined && this.pwd != undefined && this.btn != undefined);
    }
    this.popupLoginSel = function () {
        if (window.loginPackET.AccountPopupDisplayed) {
            return false;
        }
        else {
            window.loginPackET.AccountPopupDisplayed = true;
        }
        var div = $('<div>');
        div.addClass('et-loginSel');
        var ul = $('<ul>');
        for (i = 0; i < accounts.length; i++) {
            ul.append(this.generateAccountItem(accounts[i].id, accounts[i].pwd, accounts[i].seq));
        }
        div.append(ul);
        this.divWarpper.addClass('et-loginWarpper');
        this.divWarpper.append(div);
        $('body').append(this.divWarpper);
    }
    this.generateAccountItem = function (id, pwd, seq) {
        var li = $('<li data-account="' + id + '"data-pwd="' + pwd + '">');
        li.data("card0", pwd);
        li.text(seq+': '+id);
        li.on('click', function () {
            var loginPack = window.loginPackET;
            loginPack.submit(id, pwd);
        });
        return li;
    }

}

function LoginSuite(loginEle) {
    this.test = function () { alert('test'); }
    this.loginEle = loginEle;
    this.pack = new loginPack();
    this.account = null;

    this.getElementPack = function () {
        for (var i in this.loginEle) {
            if ($(this.loginEle[i].id).length > 0) {
                return new loginPack($(this.loginEle[i].id), $(this.loginEle[i].pwd), $(this.loginEle[i].btn));
            }
        }
    }

    this.init = function () {
        this.pack = this.getElementPack();
        window.onkeydown = this.autoLogin;
        window.etj_loginPack = this.pack;
    }

    this.autoLogin = function (e) {
        if (e.altKey && ((e.keyCode > 48 && e.keyCode < 57)||e.keyCode == 192)) {
            switch (e.which) {
                case 192: window.etj_loginPack.popupLoginSel(); break;//.submit('Arrontest10', 'nectest10'); break;//
                case 49: window.etj_loginPack.submit('GDAA60549060', 'NECTESTAU0'); break;//
                case 50: window.etj_loginPack.submit('GDAA19693362', 'NECTESTAU0'); break;
                case 51: window.etj_loginPack.submit('PREP3296364', 'NECTESTAU0'); break;
                case 52: window.etj_loginPack.submit('rgGD03', 'nectestate01'); break;
                case 53: window.etj_loginPack.submit('Arrontest14', 'nectest14'); break;//5
                case 54: window.etj_loginPack.submit('achen1GDFSC', 'nectest1'); break;
                case 55: window.etj_loginPack.submit('GDepark4334', 'Nectest8'); break;//7
                case 56: window.etj_loginPack.submit('yygd793801', 'nectest66'); break;//8
                default: alert(e.altKey+'|'+e.which);
            }
        }
        //this.pack.submit();
    }
}


function autoFillInQA() {
    var r = new RegExp(/\w*(?=\?)/);
    if ($('#TxtAnswer1').length == 0)
        return;

    $('body').maskOn();
    $('#TxtAnswer1').val(r.exec($('label[for=TxtAnswer1]').text()));
    $('#btnNext').click();
}

/* fill in Cred No. - start */
function CardInfoSuite(cardNo, cardPWD, cardM, cardY, cardInfo) {
    this.cardNo = cardNo;
    this.cardPWD = cardPWD;
    this.cardM = cardM;
    this.cardY = cardY;
    this.divWarpper = $('<div>');
    this.cardInfo = cardInfo;
    //this.pack = this;
    this.init = function () {
        this.popupCredSel();
        this.hide();
        window.onkeydown = this.keydownHandler;
        window.cardInfoSuite = this;
    }
    this.hide = function () { this.divWarpper.hide(); };
    this.show = function () { this.divWarpper.show(); };
    this.popupCredSel = function () {
        var div = $('<div>');
        div.addClass('et-cardSel');
        var ul = $('<ul>');
        for (i = 0; i < this.cardInfo.length; i++) {
            ul.append(this.generateCardItem(cardInfo[i].cardNo, cardInfo[i].date));
        }
        div.append(ul);
        //this.divWarpper = $('<div>');
        this.divWarpper.addClass('et-warpper');
        this.divWarpper.append(div);
        this.cardNo.parent().append(this.divWarpper);
    }
    this.fillInCardInfo = function (cardNo, pwd, cardM, cardY) {
        this.cardNo.val(cardNo);
        this.cardM.val(cardM);
        this.cardY.val(cardY);
        setTimeout(function () { this.cardNo.click(); }, 100);

        //pwd.val(pwd);
    }
    this.generateCardItem = function (sno, secdate) {
        var li = $('<li data-card="' + secdate + '">');
        li.data("card0", secdate);
        li.text(sno);
        li.on('click', function () {
            window.cardInfoSuite.fillInCardInfo(sno.replace(/-/g,''), secdate, secdate.split('/')[0].replace(/^0+/, ''), secdate.split('/')[2]);
            window.cardInfoSuite.hide();
        });
        return li;
    }

    this.keydownHandler = function (e) {
        if (e.altKey && (e.keyCode > 48 && e.keyCode < 57)) {
            switch (e.which) {
                case 49: window.cardInfoSuite.show(); break;
                default: alert(e.which);
            }
        }
        //this.pack.submit();
    }
}

/* fill in Cred No. - end */

/* fill in get a card info - start */
function getACardAutoFill() {
    //alert("autofill");
    var firstName = document.getElementById('FirstName').value = 'Ellis';
    var lastName = document.getElementById('LastName').value = 'Tian';
    var homeAdd = document.getElementById('Address').value = '3465 E Foothill Blvd 200';
    var city = document.getElementById('City').value = 'Pasadena';
    var state = document.getElementById('State').value = 'CA';
    var zipCode = document.getElementById('Zip').value = '91107';
    var Email = document.getElementById('Email').value = 'Ellis.Tian@greendotcorp.com';
    var phone = document.getElementById('CellPhone').value = '6267753600';
    var ssn = document.getElementById('SocialSecurity').value = '109-85-4555';
    var bdate = document.getElementById('Birthday').value = '01/01/1980';
    var agree = document.getElementById('AgreeToTerms').checked = 'true';
    var ATMPin = document.getElementById('ATMPin').value = '4827';
    
}
/* fill in get a card info - end */

var strMask = '<div style="position:fixed;width:100%;height:100%;border:1px solid black; top:0;left:0;background-color:gray;z-index:9999;opacity:0.5; font-size:50px;padding-top:13%;text-align: center;">Loging in...</div>';
jQuery.fn.extend({
    maskOn: function () {
        $(this).append(strMask);
    }
});

function maskOn(target) {
    target.append(strMask);
}



$(document).ready(function () {
    switch (document.title) {
        case "Account Login":
        case "Prepaid Debit Card | Prepaid Visa and MasterCard | Green Dot Corporation":
        case "Prepaid Debit Cards - Prepaid Visa Card - MasterCard | Green Dot Prepaid Cards":
        case "landingpages-index-Title":
        case "About The Cards | Green Dot Prepaid Cards | Prepaid Visa and MasterCard":
        case "authentication-login-title":
        case "authentication-login-Title":
            var etj = new LoginSuite(loginEle);
            etj.init();
            break;
        case "Prepaid Visa Debit Card - Prepaid MasterCard Debit Cards - No Credit Check - Green Dot":
            autoFillInQA();
            break;
        case "Account Management":
            var cardpack = new CardInfoSuite($('#CardNumber'), null, $('#ExpMonth'), $('#ExpYear'), cardInfo);
            cardpack.init();
            break;
        case "Apply for a Prepaid Debit Card | Get a Prepaid Visa or MasterCard | Green Dot Corporation":
            getACardAutoFill();
            break;
        default:
            return;
    }
});