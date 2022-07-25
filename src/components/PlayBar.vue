<template>
	<v-bottom-navigation height="100" app fixed>
		<v-avatar class="mb-4" color="grey lighten-4 darken-1" size="100">
			<v-img height="100%" :src='url.PicUrl'></v-img>
		</v-avatar>
		<v-btn icon>
			<v-icon @click.stop="changN('-')">mdi-rewind</v-icon>
		</v-btn>

		<v-btn icon @click.stop="ChangePlay">
			<v-icon>{{ isPlay ? 'mdi-pause' : 'mdi-play' }}</v-icon>
		</v-btn>
		<v-btn icon @click.stop="changN('+')">
			<v-icon>mdi-fast-forward</v-icon>
		</v-btn>
		<v-row>
			<v-col>
				<v-slider thumb-label v-model="progress" color="green lighten-1">
					<template v-slot:prepend>
						<p>{{Time.TimesPlayed}}</p>
					</template>

					<template v-slot:append>
						<p>{{Time.Total}}</p>
					</template>
				</v-slider>
				<p>{{MusicTitle}}</p>
			</v-col>
		</v-row>

	</v-bottom-navigation>
</template>

<script>
import axios from 'axios'
import config from '../../config/config.js'

	let audio = document.createElement("audio");
	export default {
		name: 'PlayBar',
		data() {
			return {
				timer:'',
				n:0,
				type:'',
				MusicTitle:'',
				isPlay: false,
				progress:0,
				playjson:[],
				url:{
					PicUrl: '',
					MusicUrl:'',
					lyric:''
				},
				Time:{
					TimesPlayed: '0:00',
					Total: '0:00',
				},
			}
		},
		methods: {
			changN(t){
				if(t=='+'){
					this.n++
				}else if(t=='-'){
					this.n ? this.n--:this.n
				}
			},
			ChangePlay() {
				if(this.isPlay){
					audio.pause()
				}else{
					audio.play()
				}
				
				this.isPlay = !this.isPlay
			},
			formatTime(value) {
			      let time = "";
			      let s = value.split(":");
			      let i = 0;
			      for (; i < s.length - 1; i++) {
			        time += s[i].length == 1 ? "0" + s[i] : s[i];
			        time += ":";
			      }
			      time += s[i].length == 1 ? "0" + s[i] : s[i];
			      return time;
			    },
			transTime(value) {
			      let time = "";
			      let h = parseInt(value / 3600);
			      value %= 3600;
			      let m = parseInt(value / 60);
			      let s = parseInt(value % 60);
			      if (h > 0) {
			        time = this.formatTime(h + ":" + m + ":" + s);
			      } else {
			        time = this.formatTime(m + ":" + s);
			      }
			      return time;
			    },
				RefreshTimeInterval(){
					this.Time.TimesPlayed = this.transTime(audio.currentTime)
					this.Time.Total=this.transTime(audio.duration)
					this.progress = (audio.currentTime)/(audio.duration)*100
					// console.log((audio.currentTime)/(audio.duration)*100)
				},
				RefreshTime(){
					this.timer = setInterval(this.RefreshTimeInterval, 1000)
				},
				changejsonurl(json){
					// for(var n in json){
					// 	// console.log(n,'---',json[n].url)
					// 	this.playjson[n].url=json[n].url
					// }
					if(this.type=='咪咕'){
						this.url.MusicUrl=json['128']
						this.url.lyric=json['lyric']
					}else if(this.type=='网易云'){
					this.playjson[this.n].url=json[0].url
					this.url.MusicUrl=this.playjson[this.n].url
					}
				},
				ChangeUrl(n){
					this.url.PicUrl = this.playjson[n].picUrl
					this.MusicTitle=this.playjson[n].MusicName+'-'+this.playjson[n].ArName
					if(this.playjson[n].url){
						this.url.MusicUrl=this.playjson[n].url
					}else{
						if(this.type=='咪咕'){
							let data = {
								cid: this.playjson[n].id,
							}
							this.$axios.post(config.MusicMigu.GetDonwoladUrl, data)
								.then(response => (this.changejsonurl(response.data.data)))
						}else if(this.type=='网易云'){
							let data = {
								id:this.playjson[n].id,
								br:120000
							}
							// this.playjson.forEach(function(item,index){
							// 	if(index!=0){
							// 		data.id=data.id+','+item.id
							// 	}else{
							// 		data.id=item.id
							// 	}
							// })
							// console.log(data,this.playjson)
							this.$axios.post(config.Music163.GetDonwoladUrl,data)
							.then(response => (this.changejsonurl(response.data.data)))
						}
					}
				},
		},
		watch:{
			'url.MusicUrl':{
				handler(newUrl, oldUrl) {
				        // console.log('音乐链接改变为',newUrl)
						audio.src = this.url.MusicUrl
						audio.load()
						if(this.url.MusicUrl){
							//this.RefreshTime()
							setTimeout(function(){
								audio.play()
								this.isPlay ?this.isPlay : !this.isPlay
							},6000)
						}	
					},
				immediate: true,
			},
			progress(newp,oldp){
				if(newp==100){
					this.n=this.n+1
				}else if(Math.abs(audio.currentTime-newp/100*audio.duration)>2){
					audio.currentTime=newp/100*audio.duration
				}
			},
			n(newn,ldn){
				this.ChangeUrl(newn)
			},
			'Time.TimesPlayed':{
				handler(newt,oldt){
					this.isPlay = true
				}
			}
		},
		mounted() {
			this.$bus.$on('GetMusicUrl',(json)=>{
					this.playjson=json
				}),
			this.$bus.$on('BarMusicType',(type)=>{
					this.type=type
				}),
			this.$bus.$on('GetMusicNum',(n)=>{
					this.n=n
					this.ChangeUrl(n)
				}),
			this.$nextTick(function () {
			    // 仅在整个视图都被渲染之后才会运行的代码
				this.RefreshTime()
			  })
		},
	}
</script>
