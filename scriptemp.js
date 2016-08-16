const CONFIG={USER_TYPE_HR:"hr",
USER_TYPE_EMPLOYEE:"employee",
HR_PAGE:"hr.html",
LOGIN_PAGE:"login.html",
EMPLOYEE_PAGE:"employee.html",
CREDENTIAL_NOT_MATCHES:"user id or password doesn't match",
ALL_EMPTY_FIELD_MSG:"PLEASE FILL ALL FIELDS !!!",
EMPTY_FIELD_MSG:"Please fill this field",
ERROR_ID:"-error",
EMPTY_STRING:"",
USER_DUPLICATE:"Already Exist !!",
EMPTY_FIELD_MSG:"Please fill this field",
ERROR_ID:"-error",
DEFAULT_HR:[{user_id:"vimal",password:"negi"},{user_id:"hr",password:"cronj"}],
HR_AUTH:"hrauth",
EMP_AUTH:"empauth",
SESSION:"session",
NO_RECORDS:"NO RECORS FOUND"
};

const USER_TYPE_HR="hr";
const USER_TYPE_EMPLOYEE="employee";
const HR_PAGE="hr.html";
const LOGIN_PAGE="login.html"
const EMPLOYEE_PAGE="employee.html";
const CREDENTIAL_NOT_MATCHES="user id or password doesn't match";
const ALL_EMPTY_FIELD_MSG="PLEASE FILL ALL FIELDS !!!";
const EMPTY_FIELD_MSG="Please fill this field";
const ERROR_ID="-error";
const EMPTY_STRING="";
const USER_DUPLICATE="Already Exist !!"

validateEmp();

loadDatabase();


function loadDatabase()
{
	if(localStorage.empauth)
		empauth=JSON.parse(localStorage.getItem(CONFIG.EMP_AUTH));
	else
		window.location.assign(CONFIG.EMPLOYEE_PAGE);
}

function validateEmp()
{
	if(isSessionExist())
	{
		redirectToSession();
	}
	else
		signOut();
}

function redirectToSession()
{
	session=JSON.parse(localStorage.getItem(CONFIG.SESSION));
	if(session.user_type!=CONFIG.USER_TYPE_EMPLOYEE)
		window.location= session.user_type==CONFIG.USER_TYPE_HR ? CONFIG.HR_PAGE : signOut()
}


function isSessionExist()
{
	return (localStorage.getItem(CONFIG.SESSION)!=null && localStorage.getItem(CONFIG.SESSION)!=CONFIG.EMPTY_STRING);
}


window.onload=function()
{
	document.getElementById('user').innerHTML=session.user_id;
	for(var i=0;i<empauth.length;i++)
	{
		if(empauth[i].user_id==session.user_id)
		{
			table="<table id='user-profile-list' border=1><tr ><th >Name</th><th >user_id</th><th >date of joining</th><th >remark</th></tr>";
			table=table+"<tr><td>"+empauth[i].name+"</td><td>"+empauth[i].user_id+"</td><td>"+empauth[i].doj+"</td><td>"+empauth[i].remark+"</td></tr>";
			document.getElementById("user-profile").innerHTML=table;
			return false;
		}
		
	}
};


function signOut()
{
	localStorage.setItem(CONFIG.SESSION,"");
	window.location.assign(CONFIG.LOGIN_PAGE);
}