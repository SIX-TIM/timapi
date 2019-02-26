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
    // If no sdk version set, try to load as json from asset folder 
    if(typeof timsdk === "undefined") {
        timsdk = {};
        fetch("../../assets/sdk_version.json")
            .then(response => response.json(), reason => reason)
            .then(json => setSdkVersion(json.sdk_version), reason => reason);
    }
    else {
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
}

