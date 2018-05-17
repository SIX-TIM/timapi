function inject() {
    // Project name
    var projectName = document.getElementById("projectname");
    projectName.innerHTML = "TIM SDK";
    
    // SDK-num
    var sdknum = document.createElement("span");
    sdknum.innerHTML = "18-05";
    sdknum.id = "sdknum";
    projectName.appendChild(sdknum);

    // TIM API version
    var projectbrief = document.getElementById("projectbrief");
    projectbrief.innerHTML = "TIM API C";
    var timnum = document.createElement("span");
    timnum.innerHTML = "v3.5";
    timnum.id = "timnum";
    projectbrief.appendChild(timnum);

    // Implementation guide
    var projectalign = document.getElementById("projectalign");
    var guidelink = document.createElement("a");
    guidelink.href = "../guide.html";
    guidelink.innerHTML = "Back to Implementation Guide";
    guidelink.id = "guidelink";
    projectalign.appendChild(guidelink);
}

window.onload = inject;