let constraints={video:true};

let videoPlayer=document.querySelector("video");

let vidRecordBtn=document.querySelector("#record-video");

let captureBtn=document.querySelector("#click-picture");

let recordState=false;
let chunks=[];

let mediaRecorder;

captureBtn.addEventListener("click",function(){
    capture();
})

vidRecordBtn.addEventListener("click",function(){
    if(!recordState){
        mediaRecorder.start();
        recordState=true;
        vidRecordBtn.innerText="Recording...";
    }else{
        mediaRecorder.stop();
        recordState=false;
        vidRecordBtn.innerText="Record";
    }  
});

navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
    videoPlayer.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
    }

    mediaRecorder.onstop = function() {
        let blob  = new Blob(chunks, {type: "video/mp4"});
        chunks = [];
        let blobUrl = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = blobUrl;
        a.download = "temp.mp4";
        a.click();
    }
})

function capture(){
    let canvas=document.createElement("canvas");
    canvas.width=videoPlayer.videoWidth;
    canvas.height=videoPlayer.videoHeight;
    

    let ctx=canvas.getContext("2d");
    ctx.drawImage(videoPlayer,0,0);
    let link=document.createElement("a");
    link.download="img.png";
    link.href=canvas.toDataURL();
    link.click();

}
let filter= "";

let allFilters=document.querySelectorAll(".filter");
for(let i of allFilters){
    i.addEventListener("click",function(e){
        filter=e.currentTarget.style.backgroundColor;
        addFilterToScreen(filter);
    })
}

function addFilterToScreen(filter){
    let filterScreen=document.createElement("div");
    filterScreen.style.height="100vh";
    filterScreen.style.width="100vw";
    filterScreen.style.position="fixed";
    filterScreen.style.top=0;
    filterScreen.style.backgroundColor=filter;
    document.querySelector("body").append(filterScreen);
}