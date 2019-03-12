

function injectGuidelink() {
  // Since some of the doc-files are in sub-folders, we need to determine the nesting-level
  // As every page has a breadcrumbs-tag with the image carat.png, we take this to
  // probe the nesting level and create our own url for the guide.html
  let probe = document.getElementById("carat");
  let guideUrl = probe.src.replace("img/carat.png", "../guide.html");

  // inject link to implementation guide
  let guidelinkDiv = document.getElementById("guidelink");
  let guidelink = guidelinkDiv.childNodes[0];
  guidelink.setAttribute("href", guideUrl);  
  guidelink.setAttribute("style", "backround-color: red;");
  //alert(guidelink);
}

function setSdkVersion(sdk_version) {
  if(sdk_version !== undefined) {
      // Project name
      var projectName = document.getElementById("projectname");
      if(projectName != undefined) {
          // SDK-num
          var sdknum = document.createElement("span");
          sdknum.innerHTML = sdk_version;
          sdknum.id = "sdknum";
          projectName.appendChild(sdknum);
      }
  }
}

function timVersionInject() {
  // TIM SDK version 
  if(typeof timsdk !== "undefined") {
    setSdkVersion(timsdk.sdk_version);
  }

  // TIM API version
  var projectbrief = document.getElementById("projectbrief");
  if (projectbrief != undefined) {
      if((typeof timapi !== "undefined") && (timapi.api_lang != undefined)) {
          projectbrief.innerHTML = "TIM API " + timapi.api_lang;
      }

      if((typeof timapi !== "undefined") && (timapi.api_version != undefined)) {
          var timnum = document.createElement("span");
          timnum.innerHTML = timapi.api_version;
          timnum.id = "timnum";
          projectbrief.appendChild(timnum);
      }
  }
}

window.onload = function(evt) { 
  timVersionInject();
  injectGuidelink();
}

