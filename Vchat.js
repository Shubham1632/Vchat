let client= AgoraRTC.createClient({mode:'rtc','codec':"vp8"})

//configutration of agora client
let config= {
    appid:'c35e626e1bee45119633477c9c85756f',
    tocken:'006c35e626e1bee45119633477c9c85756fIACGP9lAd7lyFDPB1OPcStmDpuekhhPipxY4tZnzIIi/J1Qub9IAAAAAEAA/6Ep2TbF3YgEAAQBNsXdi',
    uid:null,
    channel:'videochat',
}


//our own video and audio tracks
let localTracks= {
    audioTracks:null,
    videoTracks:null,
}


//video and audio tracks of other user thats gonna be join to our application
let remoteTracks = {

}


document.getElementById("join-btn").addEventListener('click', async()=>{
    console.log("user wants to join steam");
    await joinStreams();
})

let joinStreams = async()=>{
    [config.uid, localTracks.audioTracks,localTracks.videoTracks]= await Promise.all([
        client.join(config.appid, config.channel, config.token || n),
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack(),
    ])
    let videoPlayer= `<div class="video-containers" id="video-wrapper-${config.uid}"> 
                    <p class= "user-id">${config.uid}</p>
                    <div class="video-player player" id="stream-${config.uid}"></div>
                     </div>`

document.getElementById('user-streams').insertAdjacentHTML('beforeend',videoPlayer)
localTracks.videoTracks.play(`stream-${config.uid}`)

await client.publish([localTracks.audioTracks, localTracks.videoTracks])

}