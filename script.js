const USER_TYPE_HR="hr";
const USER_TYPE_EMPLOYEE="employee";
const HR_PAGE="hr.html";
const EMPLOYEE_PAGE="employee.html";
const CREDENTIAL_NOT_MATCHES="user id or password doesn't match";
const ALL_EMPTY_FIELD_MSG="PLEASE FILL ALL FIELDS !!!";
const EMPTY_FIELD_MSG="Please fill this field";
const ERROR_ID="-error";
const EMPTY_STRING="";
const DEFAULT_HR= [{user_id:"vimal",password:"negi"},{user_id:"hr",password:"cronj"}];
const HR_AUTH="hrauth";
const EMP_AUTH="empauth"
const SESSION="session";

//CHECKING FOR SESSION
if(localStorage.session)
{
	session=JSON.parse(localStorage.getItem(SESSION));
	window.location = session.user_type === USER_TYPE_EMPLOYEE ? EMPLOYEE_PAGE : HR_PAGE;
}





//GETTING HR AUTHENTICATION AND EMPLOYEE AUTHENTICATION DATA
hrauth = localStorage.hrauth ? JSON.parse(localStorage.getItem(HR_AUTH)) : DEFAULT_HR ;
localStorage.setItem(HR_AUTH,JSON.stringify(hrauth));

empauth = localStorage.empauth ? JSON.parse(localStorage.getItem(EMP_AUTH)) : [];
localStorage.setItem(EMP_AUTH,JSON.stringify(empauth));


function loginValidate()
{
	if(isEmptyFields("login"))
		return false;
	var user_id=document.getElementById("login-userid").value;
	var password=document.getElementById("login-password").value;
	if(isExist(user_id,password,JSON.stringify(hrauth)))
	{
		session={user_type:"hr",user_id:user_id};
		localStorage.setItem('session',JSON.stringify(session));
		window.location.assign("hr.html");
	}
	if(isExist(user_id,password,JSON.stringify(empauth)))
	{
		session={user_type:"employee",user_id:user_id};
		localStorage.setItem('session',JSON.stringify(session));
		window.location.assign("employee.html");		
	}
	document.getElementById("login-error").innerHTML=CREDENTIAL_NOT_MATCHES;
	return false;

}


function isEmptyFields(class_id)
{	
	var items=document.getElementsByClassName(class_id);
	for(var i=0;i<items.length;i++)
	{
		items[i].value=="" ? document.getElementById(class_id + ERROR_ID).innerHTML=ALL_EMPTY_FIELD_MSG :  document.getElementById(class_id+ERROR_ID).innerHTML=EMPTY_STRING;
	}
}

function isExist(user_id,password,dbname)
{
	var db=JSON.parse(dbname);	
	for(var i=0;i<db.length;i++)
	{
		if(db[i].user_id==user_id && db[i].password==password)
		{
				return true;
		}
	}
	return false;
}

function checkEmpty(error_id)
{
	var error_location=document.getElementsByClassName(error_id +ERROR_ID)[0];
	error_field=document.getElementsByClassName(error_id)[0];
	error_location.innerHTML = error_field.value== "" ? error_location.innerHTML="Please fill this field" : error_location.innerHTML="";
}