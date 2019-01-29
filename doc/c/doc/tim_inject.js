timDoc = {}


function timVersionInject() {
    // Project name
    var projectName = document.getElementById("projectname");
    if(projectName != undefined) {
        if((typeof timsdk !== "undefined") && (timsdk.sdk_version != undefined)) {
            // SDK-num
            var sdknum = document.createElement("span");
            sdknum.innerHTML = timsdk.sdk_version;
            sdknum.id = "sdknum";
            projectName.appendChild(sdknum);
        }
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

    // Implementation guide
    var projectalign = document.getElementById("projectalign");
        if(projectalign != undefined) {
        var guidelink = document.createElement("a");
        guidelink.href = "../guide.html";
        guidelink.innerHTML = "Implementation Guide";
        guidelink.id = "guidelink";
        projectalign.appendChild(guidelink);
    }
}


// only set this as onload function, if not already one set... 
// if another one is set, that function needs to call the inject
if(window.onload == undefined) {
    window.onload = timVersionInject;
}

this.timDoc.injecter = timVersionInject;