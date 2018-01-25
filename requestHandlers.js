var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var Realm = require('realm');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

let UserSchema = {
  name: 'User',
  properties: {
    id: {type: 'string', default: "99"},
    TBCheck_Q1: {type: 'int', default: 99},
    TBCheck_Q2: {type: 'int', default: 99},
    TBCheck_Q3: {type: 'int', default: 99},
    TBCheck_Q4: {type: 'int', default: 99},
    TBCheck_Q5: {type: 'int', default: 99},
    TBCheck_Q6: {type: 'int', default: 99},
    TBCheck_score: {type: 'int', default: 99},
    TBCheck_result: {type: 'int', default: 99},

    sleep1Check_Q1: {type: 'int', default: 99},
    sleep1Check_Q2: {type: 'int', default: 99},
    sleep1Check_Q3: {type: 'int', default: 99},
    sleep1Check_Q4: {type: 'int', default: 99},
    sleep1Check_Q5: {type: 'int', default: 99},
    sleep1Check_score: {type: 'int', default: 99},
    sleep1Check_result: {type: 'int', default: 99}
  }
  
}
let PostSchema = {
  name: 'Post',
  properties: {
    title: 'string',
    content: {type: 'int', default: 0}
  }
}
/*
let UserSchema = {
  name: 'User',
  properties: {
    account: 'string',
    password: 'string',
    status: {type: 'bool', default: false}
  }
}
*/
var realm = new Realm({
  schema: [UserSchema]
});
/*
Realm.open({schema: [PostSchema]}).then(realm => {
  realm.write(() => {
    var x = realm.create('Post', {title: "fh", content: 50});
    console.log(x.title);
    console.log(realm.objects('Post').filtered('content > 0')[0].title);
  });
  
});
*/


function start(response) {
  console.log("Request handler 'start' was called.");

  function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while(new Date().getTime() < startTime + milliSeconds);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Start");
    response.end();
  }

  response.writeHead(200,{"Content-Type": "text/html"});

  fs.readFile('./HTML/index2.html', 'utf8', function(error, data) {
    if (error) {
      response.writeHead(404);
      response.write('File not found!');
    }
    else {
      response.write(data);
    }
    response.end();
  });
}

function goIntroduction (response, request) {
  response.writeHead(200,{"Content-Type": "text/html"});
  var requestX = querystring.parse(request);
  console.log("issues:" + requestX.issues);

  switch (requestX.issues) {
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;
    case 8:
      break;

  }

  fs.readFile('./HTML/introduction.html', 'utf8', function(err, data) {
    if (err) throw err;

    var x1 = '<body onload="getIntroduction(1)">';
    var y1 = '<body onload="getIntroduction('+requestX.issues+')" style="height: 90%; background: url(' + 'http://localhost:443/RESOURCES/IMAGE/BG_01.png' + ') center center fixed no-repeat; background-size: cover">';
    var newHtml = data.replace(x1, y1);
    
    fs.writeFile('./HTML/introduction_1.html', newHtml, 'utf8', function(err) {
      if (err) throw err;
      fs.readFile('./HTML/introduction_1.html', 'utf8', function(err, data) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(data);
        response.end();
      });
    });
  })
/*
  fs.readFile('./HTML/introduction.html', 'utf8', function(error, data) {
    if (error) {
      response.writeHead(404);
      response.write('File not found!');
    }
    else {
      response.write(data);
    }
    response.end();
  });
  */
}

function goTBCheckup (response, request) {
  response.writeHead(200,{"Content-Type": "text/html"});
  console.log("Issues:" + request.issues);
  fs.readFile('./HTML/app.html', 'utf8', function(error, data) {
    if (error) {
      response.writeHead(404);
      response.write('File not found!');
    }
    else {
      response.write(data);
    }
    response.end();
  });
}

function goSleep1Checkup (response, request) {
  response.writeHead(200,{"Content-Type": "text/html"});
  
  fs.readFile('./HTML/app3.html', 'utf8', function(error, data) {
    if (error) {
      response.writeHead(404);
      response.write('File not found!');
    }
    else {
      response.write(data);
    }
    response.end();
  });
}

function goInternetBehaviorCheckup (response, request) {
  response.writeHead(200,{"Content-Type": "text/html"});
  
  fs.readFile('./HTML/app2.html', 'utf8', function(error, data) {
    if (error) {
      response.writeHead(404);
      response.write('File not found!');
    }
    else {
      response.write(data);
    }
    response.end();
  });
}

function TBCheckup (response, request) {
  var requestX = querystring.parse(request);

  var score = Number(requestX.Q1) + Number(requestX.Q2) + Number(requestX.Q3) + Number(requestX.Q4) + Number(requestX.Q5);
  var result = 99;
  var BMI = 23;//待修改（需改為抓取realm資料庫）

  if (score >= 5 && (BMI < 20 || Number(requestX.Q6) === 1)) {
    result = 2;
  }
  else if (score >= 5) {
    result = 1;
  }
  else {
    result = 0;
  }

  realm.write(() => {
    realm.create('User', { 
      TBCheck_Q1: Number(requestX.Q1),
      TBCheck_Q2: Number(requestX.Q2),
      TBCheck_Q3: Number(requestX.Q3),
      TBCheck_Q4: Number(requestX.Q4),
      TBCheck_Q5: Number(requestX.Q5),
      TBCheck_Q6: Number(requestX.Q6),
      TBCheck_score: score,
      TBCheck_result: result
    })
  })

  fs.readFile('./HTML/result.html', 'utf8', function(err, data) {
    if (err) throw err;
    var x1 = '<img id="resultLight" class="img-responsive" src="http://localhost:443/RESOURCES/IMAGE/green.png">';
    var x2 = '<p id="resultText" style="font-size: 3vh; text-align: justify;">您的肺部健康需要關心，建議至鄰近醫療院所胸腔科進一步檢查。</p>';
    var y1 = '';
    var y2 = '';
    
    switch (result) {
      case 2:
        console.log("result:2");
        var y1 = '<img id="resultLight" class="img-responsive" src="http://localhost:443/RESOURCES/IMAGE/red.png">';
        var y2 = '<p id="resultText" style="font-size: 3vh; text-align: justify;">您的肺部健康需要關心，建議至鄰近醫療院所胸腔科進一步檢查。</p>';
        break;
      case 1:
        console.log("result:1");
        var y1 = '<img id="resultLight" class="img-responsive" src="http://localhost:443/RESOURCES/IMAGE/oringe.png">';
        var y2 = '<p id="resultText" style="font-size: 3vh; text-align: justify;">您的肺部健康需要關心，建議至鄰近醫療院所胸腔科進一步檢查。</p>';
        break;
      case 0:
        console.log("result:0");
        var y1 = '<img id="resultLight" class="img-responsive" src="http://localhost:443/RESOURCES/IMAGE/green.png">';
        var y2 = '<p id="resultText" style="font-size: 3vh; text-align: justify;">暫可放心。為維護健康，請持續自我監測。</p>';
      break;
    }

    var newHtml = data.replace(x1, y1);
    newHtml = newHtml.replace(x2, y2);
    
    fs.writeFile('./HTML/result_1.html', newHtml, 'utf8', function(err) {
      if (err) throw err;
      fs.readFile('./HTML/result_1.html', 'utf8', function(err, data) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(data);
        response.end();
      });
    });    
  });
  /*
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("your score: " + score + "your result: " + result);
  response.end();
  */
}

function sleep1Checkup (response, request) {
  /*
  var requestX = querystring.parse(request);

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("A1" + requestX.Q1 + "A2" + requestX.Q2);
  response.end();
  */
  var requestX = querystring.parse(request);
  
  var score = Number(requestX.Q1) + Number(requestX.Q2) + Number(requestX.Q3) + Number(requestX.Q4) + Number(requestX.Q5)
  var result = 99;

  if (score >= 10) {
    result = 2;
  }
  else {
    result = 0;
  }

  realm.write(() => {
    realm.create('User', { 
      sleep1Check_Q1: Number(requestX.Q1),
      sleep1Check_Q2: Number(requestX.Q2),
      sleep1Check_Q3: Number(requestX.Q3),
      sleep1Check_Q4: Number(requestX.Q4),
      sleep1Check_Q5: Number(requestX.Q5),
      sleep1Check_score: score,
      sleep1Check_result: result
    })
  })

  fs.readFile('./HTML/result.html', 'utf8', function(err, data) {
    if (err) throw err;
    var x1 = '<img id="resultLight" class="img-responsive" src="http://localhost:443/RESOURCES/IMAGE/green.png">';
    var x2 = '<p id="resultText" style="font-size: 3vh; text-align: justify;">您的肺部健康需要關心，建議至鄰近醫療院所胸腔科進一步檢查。</p>';
    var y1 = '';
    var y2 = '';
    
    switch (result) {
      case 2:
        console.log("result:2");
        var y1 = '<img id="resultLight" class="img-responsive" src="http://localhost:443/RESOURCES/IMAGE/red.png">';
        var y2 = '<p id="resultText" style="font-size: 3vh; text-align: justify;">明顯之晚睡晚起作息型態。除了進行調整作息之衛教外，建議整體評估情緒、網路使用、體重等健康面向狀態，並建議轉介至心身醫學科或睡眠門診。</p>';
        break;
      case 0:
        console.log("result:0");
        var y1 = '<img id="resultLight" class="img-responsive" src="http://localhost:443/RESOURCES/IMAGE/green.png">';
        var y2 = '<p id="resultText" style="font-size: 3vh; text-align: justify;">無顯著異常之作息型態。</p>';
      break;
    }

    var newHtml = data.replace(x1, y1);
    newHtml = newHtml.replace(x2, y2);
    
    fs.writeFile('./HTML/result_1.html', newHtml, 'utf8', function(err) {
      if (err) throw err;
      fs.readFile('./HTML/result_1.html', 'utf8', function(err, data) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(data);
        response.end();
      });
    });    
  });
}


function upload(response, request) {
  console.log("Request handler 'upload' was called.");
  var x = querystring.parse(request);
  //response.writeHead(200, {"Content-Type": "text/plain"});
  //response.write("Hello your account: " + x.account);
  //response.end();
  
  
}

function login(response, request) {
  console.log("Request handler 'login' was called.");
  var x = querystring.parse(request);
  var y = realm.objects('User').filtered('account = $0', x.account);
  
  console.log("password =" + y)
  console.log("pppp =" + x.missing)
  if (y.length !== 0 && x.missing === y[0].password) {
    
    realm.write (() => {
      y[0].status = true;
    });

    fs.readFile('./home.html', 'utf8', function(err, data) {
      var result = data.replace('<input type="text" name="account" value="accountX0" hidden="">','<input type="text" name="account" value="' + y[0].account + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX0" hidden="">','<input type="text" name="account" value="' + y[0].account + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX1" hidden="">','<input type="text" name="account" value="' + y[0].account + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX2" hidden="">','<input type="text" name="account" value="' + y[0].account + '" hidden="">');
      
      fs.writeFile('./home_' + y[0].account + '.html', result, 'utf8', function(err) {
        if (err) throw err;
        fs.readFile('./home_' + y[0].account + '.html', 'utf8', function(err, data) {
          if (err) throw err;
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data);
          response.end();
        });
      });
    });
  }
  else {
    fs.readFile('./index_erro.html', 'utf8', function(err, data) {
      if (err) throw err;
      
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data);
      response.end();
      console.log("erro erro password is erro.!!!!!")
      
    });
    /*
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("erro");
    response.end()
    console.log("erro erro password is erro.!!!!!")
    */
  }

}

function logout (response, request) {
  var requestX = querystring.parse(request);
  var User = realm.objects('User').filtered('account = $0', requestX.account);

  if (User.length !== 0) {
    realm.write(() => {
      User[0].status = false;
    });

    fs.readFile( './index.html', 'utf8', function(err, data) {
      if (err) throw err;
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data);
      response.end();
    });
  }
  else {
    response.writeHead(404);
    response.write("error");
    response.end();
  }
}

function certification(response, request) {
  console.log("Request handler 'certification' was called.");
  var requestX = querystring.parse(request);
  if (requestX.account !== undefined) {
    var User = realm.objects('User');
    var result = false;
    for (var i = 0; i < User.length; i++) {
      if (User[i].account === requestX.account) {
        result = true;
      }
    }
    if (result) {
      var User = realm.objects('User').filtered('account = $0', requestX.account)[0];
      if (User.status === true) {
        var x = realm.objects('Member');
        
        var x1 = '<tr><td>1</td><td><form id="myform" action="/checkView" method="post"><input name="status" value="1" hidden><input name="index" value="1" hidden><a href="#" onclick="this.parentNode.submit()">臺北醫院</a></form></td><td>12345678</td><td>2017-12-12 10:43:21</td></tr>';
        var x2 = '<tr><td>1</td><td><form id="myform2" action="/checkView" method="post"><input name="status" value="2" hidden><input name="index" value="1" hidden><a href="#" onclick="this.parentNode.submit()">臺北醫院</a></form></td><td>00000000</td><td>2017-12-12 10:43:21</td><td>Stuffy</td></tr>';
        var x3 = '<tr><td>1</td><td><form id="myform3" action="/checkView" method="post"><input name="status" value="3" hidden><input name="index" value="1" hidden><a href="#" onclick="this.parentNode.submit()">臺北醫院</a></form></td><td>00000000</td><td>2017-12-12 10:43:21</td><td>2017-12-13 10:43:21</td><td>Stuffy</td></tr>';
        var x4 = '<input type="text" name="account" value="accountX0" hidden="">';
        var x5 = '<input type="text" name="account" value="accountX1" hidden="">';
        var x6 = '<input type="text" name="account" value="accountX2" hidden="">';
        var x7 = '<input type="text" name="account" value="accountX3" hidden="">';
        var x8 = '<input type="text" name="account" value="accountX4" hidden="">';

        var y = "";
        var y2 = "";
        var y3 = "";
        var y4 = '<input type="text" name="account" value="' + requestX.account + '" hidden="">';

        var n1 = x.filtered('status = 1');
        var n2 = x.filtered('status = 2');
        var n3 = x.filtered('status = 3');
      
        for (var i = 0; i < n1.length; i++) {
          y += '<tr><td>' + (i+1) +'</td><td><form id="myform" action="/checkView" method="post"><input name="status" value="1" hidden><input name="index" value="' + i + '" hidden><a href="#" onclick="this.parentNode.submit()">' + n1[i].name +'</a>' + y4 + '</form></td><td>' + n1[i].account + '</td><td>2017-12-12 10:43:21</td></tr>';
        }
        
        for (var i = 0; i < n2.length; i++) {
          y2 += '<tr><td>' + (i+1) + '</td><td><form id="myform2" action="/checkView" method="post"><input name="status" value="2" hidden><input name="index" value="' + i + '" hidden><a href="#" onclick="this.parentNode.submit()">' + n2[i].name + '</a>' + y4 + '</form></td><td>' + n2[i].account + '</td><td>2017-12-12 10:43:21</td><td>Stuffy</td></tr>';
        }
      
        for (var i = 0; i < n3.length; i++) {
          y3 += '<tr><td>' + (i+1) + '</td><td><form id="myform3" action="/checkView" method="post"><input name="status" value="3" hidden><input name="index" value="' + i + '" hidden><a href="#" onclick="this.parentNode.submit()">' + n3[i].name + '</a>' + y4 + '</form></td><td>' + n3[i].account + '</td><td>2017-12-12 10:43:21</td><td>2017-12-13 10:43:21</td><td>Stuffy</td></tr>';
        }
      
        fs.readFile('./organization management.html', 'utf8', function(err, data) {
          
          if (err) throw err;
          var result = data.replace(x1, y);
          result = result.replace(x2, y2);
          result = result.replace(x3, y3);
          result = result.replace(x4, y4);
          result = result.replace(x4, y4);//無法一次全部取代，但可跑迴圈去取代
          result = result.replace(x5, y4);
          result = result.replace(x6, y4);
          result = result.replace(x7, y4);
          result = result.replace(x8, y4);
      
          fs.writeFile('./home_' + requestX.account + '.html', result, null, function(err) {
            if (err) throw err;
      
            fs.readFile('./home_' + requestX.account + '.html', 'utf8', function(err, data2) {
              if (err) throw err;
              response.writeHead(200, {'Content-Type': 'text/html'});
              response.write(data2, 'utf8');
              response.end();
            });
          });
        });
      }
      else {
        response.writeHead(404);
        response.write("error");
        response.end();
      }
    }
    else {
      response.writeHead(404);
      response.write("error");
      response.end();
    }
  }
  else {
    response.writeHead(404);
    response.write("error");
    response.end();
  }
}

function checkView (response, request) {
  var x = querystring.parse(request);
  var y = realm.objects('Member').filtered('status = $0', Number(x.status));
  /*
  var yx = realm.objects('Member');
  var y = realm.objects('Member');
  console.log("x.status" + x.status);
  if (x.status === "1") {
    y = yx.filtered('status = 1');
    console.log ("11111111111111111");
  }
  else if (x.status === "2") {
    y = yx.filtered('status = 2');
  }
  else if (x.status === "3") {
    y = yx.filtered('status = 3');
  }
  else {
    console.log ("jojflskjflsnflsdf;");
  }

  switch (x.status) {
    case "1":
      y = yx.filtered('status = 1');
      console.log ("jojflskjflsnflsdf;");
      break;
    case "2":
      y = yx.filtered('status = 2');
      break;
    case "3":
      y = yx.filtered('status = 3');
      break;
    default:
      break;

  }
  */
  fs.readFile('./organization certification.html', 'utf8', function(err, data) {
    if (err) throw err;
      
    
      var result = data.replace('<input type="text" name="account" value="accountX0" hidden="">', '<input type="text" name="account" value="' + x.account + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX0" hidden="">', '<input type="text" name="account" value="' + x.account + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX1" hidden="">', '<input type="text" name="account" value="' + x.account + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX2" hidden="">', '<input type="text" name="account" value="' + x.account + '" hidden="">');
      result = result.replace('<td>機構名稱x</td>','<td>' + y[x.index].name +'</td>');
      result = result.replace('<td>機構屬性x</td>', '<td>' + y[x.index].type +'</td>');
      result = result.replace('<td>統一編號x</td>', '<td>' + y[x.index].VATNumber +'</td>');
      result = result.replace('<td>負責人主管姓名x</td>', '<td>' + y[x.index].ceo +'</td>');
      result = result.replace('<td>國籍x</td>', '<td>' + y[x.index].country +'</td>');
      result = result.replace('<td>官方聯絡電話x</td>', '<td>' + y[x.index].tele +'</td>');
      result = result.replace('<td>機構地址x</td>', '<td>' + y[x.index].address +'</td>');
      result = result.replace('<td>官方E-mailx</td>', '<td>' + y[x.index].email +'</td>');
      result = result.replace('<td>傳真(非必填)x</td>', '<td>' + y[x.index].type +'</td>');

      result = result.replace('<td>承辦人姓名x</td>', '<td>' + y[x.index].userName +'</td>');
      result = result.replace('<td>負責單位部門x</td>', '<td>' + y[x.index].userUnit +'</td>');
      result = result.replace('<td>聯絡電話x</td>', '<td>' + y[x.index].userPhone +'</td>');
      result = result.replace('<td>E-mail(驗證信箱)x</td>', '<td>' + y[x.index].userEmail +'</td>');
      //result = result.replace('<td>承辦人姓名x</td>', '<td>' + y[x.index].userName +'</td>');

      result = result.replace('<input name="index" value="1" hidden="">', '<input name="index" value="'+ x.index + '" hidden="">');
      result = result.replace('<input name="status" value="1" hidden="">', '<input name="status" value="' + x.status + '" hidden="">');

      result = result.replace('<input name="index" value="2x" hidden="">', '<input name="index" value="'+ x.index + '" hidden="">');
      result = result.replace('<input name="status" value="2x" hidden="">', '<input name="status" value="' + x.status + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX3" hidden="">', '<input type="text" name="account" value="' + x.account + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX4" hidden="">', '<input type="text" name="account" value="' + x.account + '" hidden="">');
      result = result.replace('<input id="useformail" type="text" name="memberAccount" value="0" hidden="">', '<input id="useformail" type="text" name="memberAccount" value="' + y[x.index].account + '" hidden="">');
      
      fs.writeFile('./xx.html', result, null, function(err) {
        if (err) throw err;
        
        fs.readFile('./xx.html', 'utf8', function(err, data) {
          if (err) throw err;
          
            //response.write(data);
            //response.end();
            getHistoryMail(response, y[x.index].account, './xx.html');
          
        });
      });
  });

}

function checkActivity (response, request) {
  var x = querystring.parse(request);
  /* radio 可不必讀取
  var y = x.check2
  var z = "";
  for (var i = 0; i < y.length; i++) {
    if (y[i].checked) {
      z += y[i].value;
      break;
    }
  }
  */
  console.log("x.index" + x.index);
  var checkResult = 0;
  if (x.check1 === "true" && x.check2 === "true" && x.check3 === "true" && x.check4 === "true" && x.check5 === "true") {
    console.log("審核通過");
    checkResult = 3;
    mailResult = 0;
  }
  else {
    console.log("審核未通過");
    checkResult = 2;
    mailResult = 1;
  }

  var y = realm.objects('Member').filtered('status = $0', Number(x.status))[x.index];
  realm.write(() => {
    //var x = realm.objects('Member').filtered('account = "12345678"');
    //var y2 = realm.objects('Member').filtered('status = 2')[x.index];
    //var y3 = realm.objects('Member').filtered('status = 3')[x.index];
    y.status = checkResult;
  });
  sendmailx(mailResult, y.account);
  certification(response, request);
  /*
  console.log("true true 有有有" + x.check1);
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(x.check1 + x.check2);
  response.end();
  */

  
  
}

function sendmailx (result, account, email) {
  console.log("Request handler 'sendmailx' was called.");
  var DefaultMail = realm.objects('DefaultMail');
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
      user: 'wacarelife@gmail.com',
      pass: 'RYm-fE5-T98-M7q'
    }
  }));

  var options = {
    //寄件者
    from: 'wacarelife1@gmail.com',
    //收件者
    to: 'kensamsung@gmail.com', 
    ///副本
    //cc: 'account3@gmail.com',
    ///密件副本
    //bcc: 'account4@gmail.com',
    //主旨
    subject: '這是 node.js 發送的測試信件' + DefaultMail[result].title, // Subject line
    //純文字
    text: 'Hello world2' + DefaultMail[result].article  // plaintext body
    //嵌入 html 的內文
    ///html: '<h2>Why and How</h2> <p>The <a href="http://en.wikipedia.org/wiki/Lorem_ipsum" title="Lorem ipsum - Wikipedia, the free encyclopedia">Lorem ipsum</a> text is typically composed of pseudo-Latin words. It is commonly used as placeholder text to examine or demonstrate the visual effects of various graphic design. Since the text itself is meaningless, the viewers are therefore able to focus on the overall layout without being attracted to the text.</p>', 
    //附件檔案
    /*
    attachments: [ {
        filename: 'text01.txt',
        content: '聯候家上去工的調她者壓工，我笑它外有現，血有到同，民由快的重觀在保導然安作但。護見中城備長結現給都看面家銷先然非會生東一無中；內他的下來最書的從人聲觀說的用去生我，生節他活古視心放十壓心急我我們朋吃，毒素一要溫市歷很爾的房用聽調就層樹院少了紀苦客查標地主務所轉，職計急印形。團著先參那害沒造下至算活現興質美是為使！色社影；得良灣......克卻人過朋天點招？不族落過空出著樣家男，去細大如心發有出離問歡馬找事'
    }, {
        filename: 'unnamed.jpg',
        path: '/Users/Weiju/Pictures/unnamed.jpg'
    }]
    */
  };

  transporter.sendMail(options, function(error, info) {
    if (error) {
      console.log("error no mail send!!");
    }
    else {
      console.log("good mail send~~~");
    }
    transporter.close();
  });

  /*
  var options = {
      from           : '"WaCare" <wacarelife@gmail.com>',
      to             : '"cc" <kensamsung@gmail.com>',//可一个或多个以,区分
      subject        : '"你好"',
      text           : '-账户激活（PS:请添加本邮箱到联系人）'
      
      html           : '<h1>你好，这是一封来自的邮件！</h1><a href=http://www.baidu.com target=_blank>baidu</a>',
      attachments    :
          [
              {
                  filename: 'img1.png',            // 改成你的附件名
                  path: '../../public/images/1.jpg',  // 改成你的附件路径
                  cid : '00000001'                 // cid可被邮件使用
              }
          ]
      
  };
  */
  
  var today = new Date();
  var time = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(time);

  realm.write (() => {
    realm.create('HistoryMail', {
      account: account, 
      who: "b",
      title: DefaultMail[result].title,
      article: DefaultMail[result].article,
      time: time
    })
  })
  var HistoryMail = realm.objects('HistoryMail').filtered('account = $0', account);
}


function systemSettings (response, request) {
  
  var requestX = querystring.parse(request);
  
  if (requestX.account !== undefined) {
    if (realm.objects('User').filtered('account = $0', requestX.account)[0].status) {
      var x = realm.objects('DefaultMail');
      
      var x1 = '<tr><td>1</td><td><form id="myform" action="/systemSettingsMail" method="post"><input name="status" value="1" hidden=""><input name="index" value="1" hidden=""><a href="#" onclick="this.parentNode.submit()">審核通過</a></form></td><td>人員x</td><td>2017-12-12 10:43:21</td></tr>';
      var x2 = '<input type="text" name="account" value="accountX0" hidden="">';
      var x3 = '<input type="text" name="account" value="accountX1" hidden="">';
      var x4 = '<input type="text" name="account" value="accountX2" hidden="">';
    
      var y1 = "";
      var y2 = '<input type="text" name="account" value="' +  requestX.account + '" hidden="">';
    
      for (var i = 0; i < x.length; i++) {
        y1 += '<tr><td>' + (i+1) +'</td><td><form id="myform" action="/systemSettingsMail" method="post"><input name="status" value="1" hidden=""><input name="index" value="' + i + '" hidden="">' + y2 + '<a href="#" onclick="this.parentNode.submit()">' + x[i].label + '</a></form></td><td>' + x[i].user + '</td><td>' + x[i].time + '</td></tr>';
      }
    
      fs.readFile('./system settings.html', 'utf8', function(err, data) {
        if (err) throw err;
        
        var result = data.replace(x1, y1);
        result = result.replace(x2, y2);
        result = result.replace(x2, y2);//無法一次全部取代，但可跑迴圈去取代
        result = result.replace(x3, y2);
        result = result.replace(x4, y2);
    
        fs.writeFile('./ss.html', result, null, function(err) {
          if (err) throw err;
    
          fs.readFile('./ss.html', 'utf8', function(err, data2) {
            if (err) throw err;
    
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data2);
            response.end();
              
          });
        });
      });
    }
    else {
      response.writeHead(404);
      response.write("erro");
      response.end();
    }
  }
  else {
    response.writeHead(404);
    response.write("erro");
    response.end();
  }
}

function systemSettingsMail (response, request) {
  
  var requestX = querystring.parse(request);

  if (requestX.account !== undefined) {
    if (realm.objects('User').filtered('account = $0', requestX.account)[0].status) {

      var x = realm.objects('DefaultMail');
      
        var x2 = '<input type="text" name="account" value="accountX0" hidden="">';
        var x3 = '<input type="text" name="account" value="accountX1" hidden="">';
        var x4 = '<input type="text" name="account" value="accountX2" hidden="">';
        var x5 = '<input type="text" name="account" value="accountX3" hidden="">';
        var y2 = '<input type="text" name="account" value="' +  requestX.account + '" hidden="">';
      
        fs.readFile('./system settings mail.html', 'utf8', function(err, data) {
          if (err) throw err;
          
          var result = data.replace('<input tyep="text" size="60" name="title" value="標題x">', '<input tyep="text" size="60" name="title" value="' + x[requestX.index].title + '">');
          result = result.replace('<textarea rows="10" cols="60" name="article">內文x</textarea>', '<textarea rows="10" cols="60" name="article">' + x[requestX.index].article + '</textarea>');
          result = result.replace('<input id="ssm-index" type="text" name="index" value="0" hidden="">', '<input id="ssm-index" type="text" name="index" value="' + requestX.index + '" hidden="">')
      
          result = result.replace(x2, y2);
          result = result.replace(x2, y2);//無法一次全部取代，但可跑迴圈去取代
          result = result.replace(x3, y2);
          result = result.replace(x4, y2);
          result = result.replace(x5, y2);
      
          fs.writeFile('./ssm.html', result, null, function(err) {
            if (err) throw err;
      
            fs.readFile('./ssm.html', 'utf8', function(err, data2) {
              if (err) throw err
                
              response.writeHead(200, {"Content-Type": "text/html"});
              response.write(data2);
              response.end();
                
            });
          });
        });
    }
    else {
      response.writeHead(404);
      response.write("erro");
      response.end();
    }
  }
  else {
    response.writeHead(404);
    response.write("erro");
    response.end();
  }
}

function DefaultMailUpload (response, request) {

  var requestX = querystring.parse(request);

  if (requestX.account !== undefined) {
    if (realm.objects('User').filtered('account = $0', requestX.account)[0].status) {
    
      if (requestX.index !== undefined) {
        if (requestX.action === "upload") {
          var today = new Date();
          var time = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          console.log(time);
        
          var DefaultMail = realm.objects('DefaultMail')[requestX.index];
          console.log(requestX.title);
          
          realm.write ( () => {
            DefaultMail.title = requestX.title;
            DefaultMail.article = requestX.article;
            DefaultMail.user = requestX.user;
            DefaultMail.time = time;
          });
    
          systemSettings(response, request);
        }
        else {
          systemSettings(response, request);
        }
          
      }
      else {
        //console.log();
        response.writeHead(404);
        response.write("erro");
        response.end();
      
      }
    }
    else {
      //console.log();
      response.writeHead(404);
      response.write("erro");
      response.end();
    
    }
  }
  else {
    //console.log();
    response.writeHead(404);
    response.write("erro");
    response.end();
  
  }
}

function getHistoryMail (response, account, URL) {

  console.log("Request handler 'getHistoryMail' was called.");
  var HistoryMail = realm.objects('HistoryMail').filtered('account = $0', account);
  var x1 = '<div id="a" class="alert alert-success" role="alert" style="visibility:hidden"><h4 class="alert-heading">title</h4><p class="mb-0">article</p><p class="mb-0">time</p></div>';
  var x2 = '<div id="b" class="alert alert-success" role="alert" style="visibility:visible"><h4 class="alert-heading">title</h4><p class="mb-0">article</p><p class="mb-0">time</p></div>';
  var y1 = "";
  var y2 = "";

  for ( var i = 0; i < HistoryMail.length; i++) {
    var visibleValueA = "";
    var visibleValueB = "";

    if (HistoryMail[i].who === "a") {
      visibleValueA = "visible";
      visibleValueB = "hidden";
    }
    else {
      visibleValueA = "hidden";
      visibleValueB = "visible";
    }

    y1 += '<div id="a" class="alert alert-success" role="alert" style="visibility:' + visibleValueA + '"><h4 class="alert-heading">' + HistoryMail[i].title + '</h4><p class="mb-0">' + HistoryMail[i].article + '</p><p class="mb-0">' + HistoryMail[i].time + '</p></div>';
    y2 += '<div id="b" class="alert alert-success" role="alert" style="visibility:' + visibleValueB + '"><h4 class="alert-heading">' + HistoryMail[i].title + '</h4><p class="mb-0">' + HistoryMail[i].article + '</p><p class="mb-0">' + HistoryMail[i].time + '</p></div>';
  }

  fs.readFile( URL, 'utf8', function (err, data) {
    if (err) throw err;

    var result = data.replace(x1,y1);
    result = result.replace(x2,y2);
    
    fs.writeFile( URL, result, null, function (err) {
      if (err) throw err;

      fs.readFile( URL, 'utf8', function(err, data2) {
        if (err) throw err;
        
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(data2);
        response.end();
      
      });
    });
    
  });
  /*
  fs.readFile( URL, 'utf8', function (err, data) {
    if (err) {
      response.writeHead(404);
      response.write('File not found!');
      response.end();
    }
    else {
      var result = data.replace(x1,y1);
      result = result.replace(x2,y2);
      fs.writeFile( URL, result, null, function (err) {
        if (err) return console.log("error");
      });
      fs.readFile( URL, 'utf8', function(err, data2) {
        if (err) {
          response.writeHead(404);
          response.write('File not found!');
          response.end();
        }
        else {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data2);
          response.end();
        }
      });
    }
  });
  */
}

function manuallyUploadHistoryMail (response, request) {
  
  console.log("Request handler 'manuallyUploadHistoryMail' was called.");
  var requestX = querystring.parse(request);
  console.log("account" + requestX.title);

  var today = new Date();
  var time = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(time);

  realm.write (() => {
    realm.create('HistoryMail', {
      account: requestX.memberAccount, 
      who: requestX.who,
      title: requestX.title,
      article: requestX.article,
      time: time
    });
  });

  checkView1 (response, requestX.index, requestX.status, requestX.account);
  
}

function checkView1 (response, index, status, account) {
  console.log("status = " + status);

  var y = realm.objects('Member').filtered('status = $0', Number(status));
  
  fs.readFile('./organization certification.html', 'utf8', function(err, data) {
    if (err) throw err;
      var result = data.replace('<input type="text" name="account" value="accountX0" hidden="">', '<input type="text" name="account" value="' + account + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX0" hidden="">', '<input type="text" name="account" value="' + account + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX1" hidden="">', '<input type="text" name="account" value="' + account + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX2" hidden="">', '<input type="text" name="account" value="' + account + '" hidden="">');
      result = result.replace('<td>機構名稱x</td>','<td>' + y[index].name +'</td>');
      result = result.replace('<td>機構屬性x</td>', '<td>' + y[index].type +'</td>');
      result = result.replace('<td>統一編號x</td>', '<td>' + y[index].VATNumber +'</td>');
      result = result.replace('<td>負責人主管姓名x</td>', '<td>' + y[index].ceo +'</td>');
      result = result.replace('<td>國籍x</td>', '<td>' + y[index].country +'</td>');
      result = result.replace('<td>官方聯絡電話x</td>', '<td>' + y[index].tele +'</td>');
      result = result.replace('<td>機構地址x</td>', '<td>' + y[index].address +'</td>');
      result = result.replace('<td>官方E-mailx</td>', '<td>' + y[index].email +'</td>');
      result = result.replace('<td>傳真(非必填)x</td>', '<td>' + y[index].type +'</td>');

      result = result.replace('<td>承辦人姓名x</td>', '<td>' + y[index].userName +'</td>');
      result = result.replace('<td>負責單位部門x</td>', '<td>' + y[index].userUnit +'</td>');
      result = result.replace('<td>聯絡電話x</td>', '<td>' + y[index].userPhone +'</td>');
      result = result.replace('<td>E-mail(驗證信箱)x</td>', '<td>' + y[index].userEmail +'</td>');
      //result = result.replace('<td>承辦人姓名x</td>', '<td>' + y[index].userName +'</td>');

      result = result.replace('<input name="index" value="1" hidden="">', '<input name="index" value="'+ index + '" hidden="">');
      result = result.replace('<input name="status" value="1" hidden="">', '<input name="status" value="' + status + '" hidden="">');

      result = result.replace('<input name="index" value="2x" hidden="">', '<input name="index" value="'+ index + '" hidden="">');
      result = result.replace('<input name="status" value="2x" hidden="">', '<input name="status" value="' + status + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX3" hidden="">', '<input type="text" name="account" value="' + account + '" hidden="">');
      result = result.replace('<input type="text" name="account" value="accountX4" hidden="">', '<input type="text" name="account" value="' + account + '" hidden="">');
      result = result.replace('<input id="useformail" type="text" name="memberAccount" value="0" hidden="">', '<input id="useformail" type="text" name="memberAccount" value="' + y[index].account + '" hidden="">');
      
      fs.writeFile('./xx.html', result, null, function(err) {
        if (err) throw err;
        
        fs.readFile('./xx.html', 'utf8', function(err, data) {
          if (err) throw err;
          
            getHistoryMail(response, y[index].account, './xx.html');
          
        });
      });
  });

}

function home(response, request) {
  var requestX = querystring.parse(request);

  var x1 = '<input type="text" name="account" value="accountX0" hidden="">';
  var x2 = '<input type="text" name="account" value="accountX1" hidden="">';
  var x3 = '<input type="text" name="account" value="accountX2" hidden="">';
  var y1 = '<input type="text" name="account" value="' + requestX.account + '" hidden="">';

  fs.readFile('./home.html', 'utf8', function(err, data) {
    var result = data.replace(x1, y1);
    result = result.replace(x1, y1);
    result = result.replace(x2, y1);
    result = result.replace(x3, y1);
    
    fs.writeFile('./home_' + requestX.account + '.html', result, 'utf8', function(err) {
      if (err) throw err;
      fs.readFile('./home_' + requestX.account + '.html', 'utf8', function(err, data) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(data);
        response.end();
      });
    });
  });
}
exports.start = start;
exports.goIntroduction = goIntroduction;
exports.TBCheckup = TBCheckup;
exports.sleep1Checkup = sleep1Checkup;
exports.goTBCheckup = goTBCheckup;
exports.goSleep1Checkup = goSleep1Checkup;
exports.goInternetBehaviorCheckup = goInternetBehaviorCheckup;


exports.home = home;
exports.upload = upload;
exports.login = login;
exports.logout = logout;
exports.certification = certification;
exports.checkActivity = checkActivity;
exports.checkView = checkView;
exports.sendmailx = sendmailx;
exports.systemSettings = systemSettings;
exports.systemSettingsMail = systemSettingsMail;
exports.DefaultMailUpload = DefaultMailUpload;
exports.manuallyUploadHistoryMail = manuallyUploadHistoryMail;
