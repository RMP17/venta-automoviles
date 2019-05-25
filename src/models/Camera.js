export default class Camera {
    constructor(videoNode) {
        this.videoNode=videoNode;
    }
    turnOnCamera(){
        if(navigator.mediaDevices){
            // this.videoNode.requestFullscreen();
            // this.videoNode.querySelector('#btn-play');
            if (this.videoNode.requestFullscreen) {
                this.videoNode.requestFullscreen();
            } else if (this.videoNode.mozRequestFullScreen) { /* Firefox */
                this.videoNode.mozRequestFullScreen();
            } else if (this.videoNode.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                this.videoNode.webkitRequestFullscreen();
            } else if (this.videoNode.msRequestFullscreen) { /* IE/Edge */
                this.videoNode.msRequestFullscreen();
            }
            navigator.mediaDevices.getUserMedia({
                audio:false,
                video: {
                    width:280,
                    height:280,
                    facingMode: "environment"
        }
            }).then(stream=>{
                this.videoNode.srcObject=stream;
                // this.stream=stream;
            });
        }
    }
    takeOnePhoto(){

    }
    turnOffCcamera(){

    }
}


