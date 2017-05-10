var http = require('http');
var watson = require('watson-developer-cloud');
var conversation = watson.conversation({
  username: 'f5d7a29a-369e-4e3e-a29b-0458803aa18b',
  password: 'RPlVfJBjWwV5',
  version: 'v1',
  version_date: '2016-09-20'
});

var workspaceId = "865d39e4-30e7-4995-aa16-e2a63514adc2";
var context = {};
module.exports = function(router,db){

router.get('/conversation',function(req,res){
		conversation.message({
		  workspace_id: workspaceId,
		  input:{'text' : req.query.text},
		  context: context
		},function(err, response) {
		  if (err)
		  {	
			console.log('error:', err);
		  }
		 else
		  {
		  context = response.context;
		  res.send(JSON.stringify(response.output.text[0]));
		  }
		});
});

router.get('/Graph',
	function(req,res)
	{
		res.render('Graph.ejs');
	});
	
	router.get('/getdata',function(req,res){
	db.collection('student').find().then(function(response) {
      res.send(response);     
    });
});

router.get('/store1',function(req,res){
db.collection('student').insert([{
"Name":"steve",
"Candidate_ID":"14002",
"JOB_ID":"1600",
"Experience_Year":8
,"Education":"PHD",
"GRADE":"Overqualified",
"Reason":"Education",
"values":
{
	"EXP_SCORE":15,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":15,
	"SPECILIZATION_SCORE":20,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":100
}
},
{
"Name":"john",
"Candidate_ID":"14001",
"JOB_ID":"1600",
"Experience_Year":4
,"Education":"MASTER",
"GRADE":"Qualified",
"Reason":"",
"values":
{
	"EXP_SCORE":10,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":15,
	"SPECILIZATION_SCORE":10,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":80
}	
},
{
"Name":"oliver1",
"Candidate_ID":"14003",
"JOB_ID":"1600",
"Experience_Year":4
,"Education":"MASTER",
"GRADE":"Qualified",
"Reason":"",
"values":
{
	"EXP_SCORE":15,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":15,
	"SPECILIZATION_SCORE":20,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":75
}	
},
{
"Name":"PETER 1",
"Candidate_ID":"14003",
"JOB_ID":"1600",
"Experience_Year":4
,"Education":"MASTER",
"GRADE":"Qualified",
"Reason":"",
"values":
{
	"EXP_SCORE":15,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":15,
	"SPECILIZATION_SCORE":20,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":90
}	
},
{
"Name":"thomson 2",
"Candidate_ID":"14004",
"JOB_ID":"1600",
"Experience_Year":4
,"Education":"MASTER",
"GRADE":"Qualified",
"Reason":"",
"values":
{
	"EXP_SCORE":15,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":15,
	"SPECILIZATION_SCORE":20,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":70
}	
},
{
"Name":"john 3",
"Candidate_ID":"14005",
"JOB_ID":"1600",
"Experience_Year":4
,"Education":"MASTER",
"GRADE":"Qualified",
"Reason":"",
"values":
{
	"EXP_SCORE":15,
	"COMMUNICATION":0,
	"RESEARCH_WORK":0,
	"EDUCATION_SCORE":5,
	"SPECILIZATION_SCORE":0,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":60
}	
},
{
"Name":"peter 3",
"Candidate_ID":"14006",
"JOB_ID":"1600",
"Experience_Year":4
,"Education":"MASTER",
"GRADE":"Qualified",
"Reason":"",
"values":
{
	"EXP_SCORE":5,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":5,
	"SPECILIZATION_SCORE":0,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":65
}	
},
{
"Name":"peter 4",
"Candidate_ID":"14007",
"JOB_ID":"1600",
"Experience_Year":4
,"Education":"MASTER",
"GRADE":"Qualified",
"Reason":"",
"values":
{
	"EXP_SCORE":15,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":15,
	"SPECILIZATION_SCORE":0,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":0,
	"TOTAL":45
}	
},
{
"Name":"jack",
"Candidate_ID":"14008",
"JOB_ID":"1600",
"Experience_Year":4
,"Education":"MASTER",
"GRADE":"Qualified",
"Reason":"",
"values":
{
	"EXP_SCORE":15,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":5,
	"SPECILIZATION_SCORE":0,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":0,
	"TOTAL":40
}	
},
{
"Name":"hodor",
"Candidate_ID":"14009",
"JOB_ID":"1600",
"Experience_Year":8
,"Education":"PHD",
"GRADE":"Overqualified",
"Reason":"Education",
"values":
{
	"EXP_SCORE":15,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":15,
	"SPECILIZATION_SCORE":20,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":100
}
},
{
"Name":"jack1",
"Candidate_ID":"14010",
"JOB_ID":"1600",
"Experience_Year":4
,"Education":"MASTER",
"GRADE":"Qualified",
"Reason":"",
"values":
{
	"EXP_SCORE":10,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":15,
	"SPECILIZATION_SCORE":10,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":80
}	
},
{
"Name":"jack2",
"Candidate_ID":"14011",
"JOB_ID":"1600",
"Experience_Year":4
,"Education":"MASTER",
"GRADE":"Qualified",
"Reason":"",
"values":
{
	"EXP_SCORE":15,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":15,
	"SPECILIZATION_SCORE":20,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":75
}	
},
{
"Name":"Ramsey",
"Candidate_ID":"14012",
"JOB_ID":"1600",
"Experience_Year":8
,"Education":"PHD",
"GRADE":"Overqualified",
"Reason":"Education",
"values":
{
	"EXP_SCORE":15,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":15,
	"SPECILIZATION_SCORE":20,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":100
}
},
{
"Name":"john 4",
"Candidate_ID":"14013",
"JOB_ID":"1600",
"Experience_Year":4
,"Education":"MASTER",
"GRADE":"Overqualified",
"Reason":"Experience",
"values":
{
	"EXP_SCORE":10,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":15,
	"SPECILIZATION_SCORE":10,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":80
}	
},
{
"Name":"jack 5",
"Candidate_ID":"14014",
"JOB_ID":"1600",
"Experience_Year":4
,"Education":"MASTER",
"GRADE":"Overqualified",
"Reason":"Experience",
"values":
{
	"EXP_SCORE":15,
	"COMMUNICATION":10,
	"RESEARCH_WORK":10,
	"EDUCATION_SCORE":15,
	"SPECILIZATION_SCORE":20,
	"CERTIFICATINO_SCORE":4,
	"PUBLICATION_SCORE":4,
	"TEAM_WORK_SCORE":4,
	"CUSTOMER_FOCUS_SCORE":8,
	"FOREIGN_LANGUAGE_SCORE":10,
	"TOTAL":75
}	
}
]).then(function(req,res)
	{
		res.send("done");
	});		
});

experience = function(arr){
	var exp_arr = [],exp_start = [],exp_end = [];
	for(var i = 0 ; i < arr.length ; i++)
	{
		var exp = arr[i].exp.split("-");
		for(var j = 0 ; j < exp.length ; j++)
		{
			exp_arr[j] = exp[j].split(" ");
			if(j == 0)
			exp_start[i] = exp_arr[j][1];
			else
			exp_end[i] = exp_arr[j][2];		
		}
	}
	for(var i = 0 ; i < exp_start.length ; i++)
		exp_start[i] = parseInt(exp_start[i]);
	for(var i = 0 ; i < exp_end.length ; i++)
		exp_end[i] = parseInt(exp_end[i]);	
	return(Math.max.apply(null,exp_end)-Math.min.apply(null,exp_start));
}

router.get('/exp',function(req,res){
	var arr = [{'exp' : 'jan 2016 - dec 2017' },{'exp' : 'jan 2017 - oct 2019' },{'exp' :  'jan 2019 - oct 2020'}];
	console.log("experience: "+experience(arr)+" years");
});

router.get('/deleteStudent',function(req,res){
	db.collection('student').drop().then(function(response) {
      res.send(response);     
    });
});

}