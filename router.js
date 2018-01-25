var requestHandlers = require("./requestHandlers");

function route(pathname, response, request){
  console.log("About to route a request for " + pathname);
  if (pathname === "/start") {
    requestHandlers.start(response);
  }
  else if (pathname === "/goIntroduction") {
    requestHandlers.goIntroduction(response, request);
  }
  else if (pathname === "/TBCheckup") {
    requestHandlers.TBCheckup(response, request);
  }
  else if (pathname === "/sleep1Checkup") {
    requestHandlers.sleep1Checkup(response, request);
  }
  else if (pathname === "/goTBCheckup") {
    requestHandlers.goTBCheckup(response, request);
  }
  else if (pathname === "/goSleep1Checkup") {
    requestHandlers.goSleep1Checkup(response, request);
  }
  else if (pathname === "/goInternetBehaviorCheckup") {
    requestHandlers.goInternetBehaviorCheckup(response, request);
  }
  else if (pathname === "/login") {
    requestHandlers.login(response, request);
  }
  else if (pathname === "/logout") {
    requestHandlers.logout(response, request);
  }
  else if (pathname === "/certification") {
    requestHandlers.certification(response, request);
  }
  else if (pathname === "/checkActivity") {
    requestHandlers.checkActivity(response, request);
  }
  else if (pathname === "/checkView") {
    requestHandlers.checkView(response, request);
  }
  else if (pathname === "/sendmailx") {
    requestHandlers.sendmailx();
  }
  else if (pathname === "/systemSettings") {
    requestHandlers.systemSettings(response, request);
  }
  else if (pathname === "/systemSettingsMail") {
    requestHandlers.systemSettingsMail(response, request);
  }
  else if (pathname === "/DefaultMailUpload") {
    requestHandlers.DefaultMailUpload(response, request);
  }
  else if (pathname === "/manuallyUploadHistoryMail") {
    requestHandlers.manuallyUploadHistoryMail(response, request);
  }
  else {
    requestHandlers.upload(response, request);
  }
}

exports.route = route;