
//-----------------------constant--------------------------------------
const CONST_STORAGE_LOGINCREDKEY = "etLoginCred";

//-----------------------data--------------------------------------
var LoginId = ['#loginModel_TxtAccountNoOrUserId', '#TxtAccountNoOrUserId', '#wt-cardnumber'];

var LoginPWD = ['#loginModel_TxtPassword', '#TxtPassword', '#wt-cardpassword'];

var LoginSubmit = ['.btn[type="submit"]', '#btnLogin', '#wt-loginbutton'];


var loginEle = [
    {
        id: '#loginModel_TxtAccountNoOrUserId',
        pwd: '#loginModel_TxtPassword',
        btn: '.btn[type="submit"]'
    },
    {
        id: '#TxtAccountNoOrUserId',
        pwd: '#TxtPassword',
        btn: '#btnLogin'
    },
    {
        id: '#wt-cardnumber',
        pwd: '#wt-cardpassword',
        btn: '#wt-loginbutton'
    }
];

//-----------------------Class def--------------------------------------

class lpt {
    constructor() {
        console.log('lpt construct');
    }
}


class loginPack {
    constructor(eleID, elePWD, eleBtn) {
        this.id = eleID;
        this.pwd = elePWD;
        this.btn = eleBtn;

        console.log(`login pack construct`);
    }

    Alive() {
        return (this.id != undefined && this.pwd != undefined && this.btn != undefined);
    }

    Submit(id, pwd) {
        if (this.Alive()) {
            this.id.value = id;
            this.pwd.value = pwd;
        }
        window.localStorage.setItem(CONST_STORAGE_LOGINCREDKEY, { id: id, pwd: pwd });
        //maskOn();
        this.btn.click();
    }

    ReSubmit() {
        let cred = window.localStorage.getItem(CONST_STORAGE_LOGINCREDKEY);
        this.Submit(cred.id, cred.pwd);
    }

}

//-----------------------Loader--------------------------------------
(init = () => {
    console.log(`init ${document.title}`);
    var lp;
    switch (document.title) {
        case "Account Login":
        case "Prepaid Debit Card | Prepaid Visa and MasterCard | Green Dot Corporation":
        case "Prepaid Debit Cards - Prepaid Visa Card - MasterCard | Green Dot Prepaid Cards":
        case "landingpages-index-Title":
        case "About The Cards | Green Dot Prepaid Cards | Prepaid Visa and MasterCard":
        case "authentication-login-Title":
            for (let ei of loginEle) {
                console.log(`login pack: ${ei.id},${ei.pwd},${ei.btn}`);
                if (document.querySelectorAll(ei.id).length > 0) {
                    console.log(`select ${ei.id}`);

                    lp = new loginPack(document.querySelector(ei.id), document.querySelector(ei.pwd), document.querySelector(ei.btn));

                    window.addEventListener("keydown", e => {
                        console.log(`ouside auto login: ${e.altKey} | ${e.keyCode}`);
                        if (e.altKey && ((e.keyCode > 48 && e.keyCode < 57) || e.keyCode == 192)) {
                            switch (e.which) {
                                //case 192: window.etj_loginPack.popupLoginSel(); break;//.submit('Arrontest10', 'nectest10'); break;//
                                case 192: lp.ReSubmit();
                                case 49: lp.Submit('GDAA60549060', 'NECTESTAU0'); break;//
                                case 50: lp.Submit('GDAA19693362', 'NECTESTAU0'); break;
                                case 51: lp.Submit('PREP3296364', 'NECTESTAU0'); break;
                                case 52: lp.Submit('rgGD03', 'nectestate01'); break;
                                case 53: lp.Submit('Arrontest14', 'nectest14'); break;//5
                                case 54: lp.Submit('achen1GDFSC', 'nectest1'); break;
                                case 55: lp.Submit('GDepark4334', 'Nectest8'); break;//7
                                case 56: lp.Submit('yygd793801', 'nectest66'); break;//8
                                default: alert(e.altKey + '|' + e.which);
                            }
                        }
                    });

                }
            }
            //var etj = new LoginSuite(loginEle);
            //etj.init();
            break;
        case "Prepaid Visa Debit Card - Prepaid MasterCard Debit Cards - No Credit Check - Green Dot":
            //autoFillInQA();
            autoFillInSecurityQuestion();
            break;
        case "Account Management":
            //var cardpack = new CardInfoSuite($('#CardNumber'), null, $('#ExpMonth'), $('#ExpYear'), cardInfo);
            //cardpack.init();
            break;
        case "Apply for a Prepaid Debit Card | Get a Prepaid Visa or MasterCard | Green Dot Corporation":
            //getACardAutoFill();
            break;
        default:
            return;
    }
})()


//-----------------------login pack--------------------------------------
let strMask = '<div style="position:fixed;width:100%;height:100%;border:1px solid black; top:0;left:0;background-color:gray;z-index:9999;opacity:0.5; font-size:50px;padding-top:13%;text-align: center;">Loging in...</div>';

let maskOn = target => {
    if (target == undefined || target == null) {
        console.log('set body for null input');
        target = document.querySelector('body');
    }
    //let ele = document.createe
    //target.appendChild(strMask);
    target.innerHTML = target.innerHTML + strMask;
}

let fun1 = test => {
    console.log(test);
    return '1' + test;
}



autoFillInSecurityQuestion = () => {
    var r = new RegExp(/\w*(?=\?)/);
    if (document.querySelector('#TxtAnswer1').length == 0)
        return;

    maskOn();
    document.querySelector('#TxtAnswer1').value = r.exec(document.querySelector('label[for=TxtAnswer1]').value);
    document.querySelector('#btnNext').click();
}


//------------------------------------------------------------------------------------------------------------------


