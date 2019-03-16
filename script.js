console.log("start")

if(document.readyState==="complete")
    findVideo();
else
    window.onload=findVideo()
    
function findVideo(){
    console.log("searching video")
    var videoElement=document.querySelector('video');
  //  console.log(videoElement);
    if(videoElement){
        //console.log("sent")
        videoElement.pause();
        videoElement.onplay= function(){
            console.log("capture started")
            try{
                var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                var source = audioCtx.createMediaElementSource(videoElement)
                var chunks=[]
                var dest = audioCtx.createMediaStreamDestination();
                var media=new MediaRecorder(dest.stream);
                source.connect(dest)
                media.ondataavailable=function(evt){
                    try{
                        media.stop();
                        chunks.push(evt.data)
                    }
                    catch (err){}
                        //console.log("coming");
                }
                // console.log("recording");
                //setTimeout(()=> media.stop(), 10000);
                media.onstop=(event)=>{
                    //console.log("stopped");
                    source.connect(audioCtx.destination);
                    var blob = new Blob(chunks, { 'type' : 'audio/wav; codecs=MS_PCM' });
                    var link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = "record.wav";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    alert("audio has been recorded successfully and saved in you downloads folder witht the name 'record.wav'");
                }
                alert("audio recording Will start after you press OK. You wont hear anything for 10 seconds");
                media.start(10000);   
                videoElement.onplay=()=>{};
            } 
            catch (err){}
        }
    }
}