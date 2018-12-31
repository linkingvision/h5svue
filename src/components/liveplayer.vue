<template>
<div class="h5videowrapper h5container" >
    <video class="h5video" id=video1 ></video>
</div>
</template>

<script>
import '../assets/adapter.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC} from '../assets/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '../assets/h5splayerhelper.js'
export default {
    name: 'liveplayer',
    props:['h5id', 'h5videoid'],
    data () {
        return {
            videoid: this.h5videoid,
            h5handler: undefined,
            currtoken: undefined,
            ptzshow: false,
            proto: 'WS'
        }
    },
    activated() {
        console.log(this.h5id, "activated");
    },
    deactivated() {
        console.log(this.h5id, "deactivated");
    },
    beforeDestroy() {
        console.log(this.h5id, "beforeDestroy");
        if (this.h5handler != undefined)
        {
            this.h5handler.disconnect();
            delete this.h5handler;
            this.h5handler = undefined;
        }
        this.currtoken = undefined;
    },
    destroyed() {
        console.log(this.h5id, "destroyed");
    },
    mounted() {

        //this.PlayVideo('token1');
    },
    methods: {
        PlayVideo(token) 
        {
            if (this.h5handler != undefined)
            {
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
            }
            this.currtoken = token;
            console.log("play ", token);
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if (wsroot == undefined)
            {
                wsroot = window.location.host;
            }
            let conf = {
                videoid: 'video1',
                protocol: window.location.protocol, //http: or https:
                host: wsroot, //localhost:8080
                rootpath: '/', // '/'
                token: token,
                hlsver: 'v1', //v1 is for ts, v2 is for fmp4
                session: 'c1782caf-b670-42d8-ba90-2244d0b0ee83' //session got from login
            };

            //this.h5handler = new H5sPlayerWS(conf);
            this.h5handler = new H5sPlayerRTC(conf);

            this.h5handler.connect();
        },
        CloseVideo(event)
        {
            var $container = $("#"+this.h5id);
            var $controls = $container.children(".h5controls");
            var $rtcbutton = $controls.children(".rtcbutton");
            if (this.h5handler != undefined)
            {
                $rtcbutton.css("display", "none");
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
                this.$Notice.info({
                    title: "Stop successfully"
                })
            }

        }
    }
}
//fill scale-down
</script>

<style scoped>

.h5video{
   width: 100%;
   height: 100%;
   background: black;
}


</style>