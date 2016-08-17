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

validateHr();

loadDatabase();

function validateHr()
{
	if(localStorage.getItem(CONFIG.SESSION))
		redirectToSession();
	else 
		signOut();

}

window.onload=function(){
	document.getElementById('user').innerHTML=session.user_id;
	viewCurrentEmployees();
}

function loadDatabase()
{	
	empauth=localStorage.getItem(CONFIG.EMP_AUTH) ? JSON.parse(localStorage.getItem(CONFIG.EMP_AUTH)) : []

	if(localStorage.getItem(CONFIG.HR_AUTH))
		hrauth=JSON.parse(localStorage.getItem(CONFIG.HR_AUTH));
}

function redirectToSession()
{
	session=JSON.parse(localStorage.getItem(CONFIG.SESSION));
		if(session.user_type!=CONFIG.USER_TYPE_HR)
			window.location=session.user_type==CONFIG.USER_TYPE_EMPLOYEE ? CONFIG.EMPLOYEE_PAGE : signOut()
}


function checkEmpty(error_id)
{
	if(document.getElementsByClassName(error_id)[0].value==CONFIG.EMPTY_STRING)
	{
		document.getElementsByClassName(error_id +CONFIG.ERROR_ID)[0].innerHTML=CONFIG.EMPTY_FIELD_MSG;
	}
	else
	{
		document.getElementsByClassName(error_id +CONFIG.ERROR_ID)[0].innerHTML=CONFIG.EMPTY_STRING;
	}
}

function isEmptyFields(class_id)
{	
	var items=document.getElementsByClassName(class_id);
	for(var i=0;i<items.length;i++)
	{
		
		if(items[i].value==CONFIG.EMPTY_STRING)
		{
			var errorid=class_id + CONFIG.ERROR_ID;
			document.getElementById(errorid).innerHTML=CONFIG.ALL_EMPTY_FIELD_MSG;
			return true;
		}
	}
}

function registration()
{
	if(isEmptyFields("registration"))
		return false;

	user_id=document.getElementById("registration-user_id").value;
	name=document.getElementById("registration-name").value;
	doj=document.getElementById("registration-doj").value;
	remark=document.getElementById("registration-remark").value;
password=document.getElementById("registration-password").value;
	
	if(isExist(user_id,JSON.stringify(empauth)) || isExist(user_id,JSON.stringify(hrauth)))
	{
		document.getElementById("registration-error").innerHTML=CONFIG.USER_DUPLICATE;
		return false;
	}
	document.getElementById("registration-user_id").value=CONFIG.EMPTY_STRING;
	document.getElementById("registration-name").value=CONFIG.EMPTY_STRING;
	document.getElementById("registration-doj").value=CONFIG.EMPTY_STRING;
	document.getElementById("registration-remark").value=CONFIG.EMPTY_STRING;
	document.getElementById("registration-password").value=CONFIG.EMPTY_STRING;
	console.log(user);
	//insertIntoDatabase(user,empauth);
	empauth[empauth.length]={name:name,user_id:user_id,doj:doj,remark:remark,password:password};
	localStorage.setItem(CONFIG.EMP_AUTH,JSON.stringify(empauth));
	alert(name+" with userid "+user_id+" registered successfully..." );
	viewCurrentEmployees();


	return false;
}


function viewRegistrationForm()
{
	highlightButton('registration');
	clearAllFields('input');
	clearAllFields('small');
	hideAllOptions();
	document.getElementById("registration").style.display="block";
}

function hideAllOptions()
{
	document.getElementById("registration").style.display=CONFIG.EMPTY_STRING;
	document.getElementById("remark").style.display=CONFIG.EMPTY_STRING;
	document.getElementById("current-employees").style.display=CONFIG.EMPTY_STRING;
	document.getElementById("current-employee-search").style.display=CONFIG.EMPTY_STRING;
}

function highlightButton(button_id)
{
	
	nonHighlightAllButton();
	document.getElementById(button_id+"-button").style.background="white";
}

function nonHighlightAllButton()
{
	var buttons=document.getElementsByClassName("hr-options-button");
	for(var i=0;i<buttons.length;i++)
	{
		buttons[i].style.background="grey";
	}
}

function viewCurrentEmployees()
{
	document.getElementById("current-employees").innerHTML=createCurrentEmployeesRecord();
	clearAllFields('input');
	clearAllFields('small');
	hideAllOptions();
	document.getElementById("current-employees").style.display="block";
	document.getElementById("current-employee-search").style.display="block";
	document.getElementById('current-employee-search-result').style.display="none";
	highlightButton('current_employees');
}


function createCurrentEmployeesRecord()
{
	if(empauth.length>0)
	{
		var table="<table id='current-employees-list' border=1><tr><th>Name</th><th>user_id</th><th >date of joining</th><th >remark</th></tr>";
		for(var i=0;i<empauth.length;i++)
		{
			table=table+"<tr><td>"+empauth[i].name+"</td><td>"+empauth[i].user_id+"</td><td>"+empauth[i].doj+"</td><td><p style='cursor:pointer' onclick=goToRemark(\'"+empauth[i].user_id+"\')>"+empauth[i].remark+"</p></td></tr>";
		}
		table=table+"</table>";
		return table;
	}
	else
	{
		return CONFIG.NO_RECORDS;
	}
}


function goToRemark(user_id)
{
	clearAllFields('input');
	clearAllFields('small');
	viewRemark();
	document.getElementById('remark-user_id').value=user_id;
	return false;
}

function remark()
{	
	
	if(isEmptyFields("remark"))
		return false;
	var user_id=document.getElementById("remark-user_id").value;
	
	var remark=document.getElementById("remark-remark").value;
	document.getElementById("remark-user_id").value="";
	document.getElementById("remark-remark").value=""
	if(!isExist(user_id,JSON.stringify(empauth)))
	{
		document.getElementById("remark-error").innerHTML="there is no employee with that user id"
		return false;
	}
	for(var i=0;i<empauth.length;i++)
	{
		if(user_id==empauth[i].user_id)
		{
			empauth[i].remark=remark;
			localStorage.setItem("empauth",JSON.stringify(empauth));
		}
	}
		alert(remark+" for "+user_id+" is submitted successfully");
		viewRemark();
	return false;
}

function isExist(user_id,dbname)
{
	
	var db=JSON.parse(dbname);
	
	for(var i=0;i<db.length;i++)
	{
		if(db[i].user_id==user_id)
		{
			return true;
		}

	}
}

function signOut()
{
	localStorage.setItem("session","");

	window.location="login.html";
}

function viewRemark()
{
	clearAllFields('input');
    clearAllFields('small');
	viewCurrentEmployees();
	highlightButton('remark');
	hideAllOptions();
	document.getElementById("current-employees").style.display="block";
	//document.getElementById("current-employees-list").style.display="inline-table";
	document.getElementById("remark").style.display="block";
	document.getElementById("current-employee-search-result").style.display=CONFIG.EMPTY_STRING;

}


function searchEmp()
{
	/*if(isEmptyFields("current-employee-search"))
	{
		document.getElementById("current-employee-search-result").style.display="none";
		return false;
	}*/
	var user_id=document.getElementById("current-employee-search-user_id").value;
	var index_matched=search(user_id);
	if(index_matched.length>0)
	{
		var table="<table id='user-profile-list' border=1><tr ><th >Name</th><th >user_id</th><th >date of joining</th><th >remark</th></tr>";
		for(var i=0;i<index_matched.length;i++)
		{
			table=table+"<tr><td>"+empauth[index_matched[i]].name+"</td><td>"+empauth[index_matched[i]].user_id+"</td><td>"+empauth[index_matched[i]].doj+"</td><td><p style='cursor:pointer' onclick=goToRemark('"+ empauth[index_matched[i]].user_id+"')>"+empauth[index_matched[i]].remark+"</p></td></tr>";
		}
		table=table+"</table>"
		document.getElementById("current-employee-search-result").innerHTML=table;
		document.getElementById("current-employee-search-result").style.display="block";
		document.getElementById("current-employees").style.display=CONFIG.EMPTY_STRING;
		return false;
	}
	document.getElementById("current-employee-search-result").innerHTML="<small>No employee with the given user_id</small>";
	document.getElementById("current-employee-search").style.display="block";
	return false;


}


function search(data)
{
	var index_matched=[];
	for(var i=0;i<empauth.length;i++)
	{
		if(matches(data,empauth[i].name,'i'))
		{
			index_matched[index_matched.length]=i;
			continue;
		}
		if(matches(data,empauth[i].user_id,'i'))
		{
			index_matched[index_matched.length]=i;
			continue;
		}
		if(matches(data,empauth[i].remark,'i'))
		{
			index_matched[index_matched.length]=i;
			continue;
		}
	}
	return index_matched;
}

function matches(for_match, with_match,i)
{
	var re=new RegExp(for_match,i);
	if(re.test(with_match))
		return true;
	return false;

}

function clearAllFields(field)
{
	var fields=document.getElementsByTagName(field);
	if(field=='input')
	{
		for(var i=0;i<fields.length;i++)
		{
			
			if(fields[i].type=='text' || fields[i].type=='date' || fields[i].type=='password')
			{
				fields[i].value="";
			}
		}
		return false;
	}
	else
	{
		for(var i=0;i<fields.length;i++)
			fields[i].innerHTML=CONFIG.EMPTY_STRING;
		return false;
	}
}

function isValueValid(value,valueType)
{
	switch(valueType)
	{
	case 'name':
		if(matches("[a-z]{3,}",value,'i') && !matches("[0-9]",value) && !matches("[' ']{2,}",value))
			return true;
		return false;
	

	case 'password' :
		console.log('matching password');
		if(!matches("[\\s]",value,'i') && matches("[^A-Za-z0-9]",value,'i') && matches("[A-Z]{1,}",value) && matches("[0-9]",value))
			return true;
		return false;
	

	case 'userid':
		if(!matches("[\\s]",value,'i'))
			return true;
		return false;
	
	}
}
