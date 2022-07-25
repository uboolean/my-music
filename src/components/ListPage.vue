<template>
	<div>
		<v-container class="py-8 px-6" fluid>
			<v-row>
				<v-col>
					<v-card>
						<v-subheader>{{ card }}</v-subheader>
						<v-col cols="auto">
							<v-dialog transition="dialog-top-transition" max-width="600" :value="alert">
								<template>
									<v-card>
										<v-toolbar color="teal" dark>下载</v-toolbar>
						  		<v-card-text>
											<div class="subtitle-1 pa-12">
												<v-list>
													<v-list-item-group color="teal">
														<v-list-item v-if="MusicUrl.l" @click="GoDownload(MusicUrl.l,1)">
															<v-list-item-content>
																试听: {{MusicUrl.l}}
															</v-list-item-content>
														</v-list-item>
														<v-list-item v-if="MusicUrl.m" @click="GoDownload(MusicUrl.m,2)">
															<v-list-item-content>
																标准: {{MusicUrl.m}}
															</v-list-item-content>
														</v-list-item>
														<v-list-item v-if="MusicUrl.h" @click="GoDownload(MusicUrl.h,3)">
															<v-list-item-content>
																高品: {{MusicUrl.h}}
															</v-list-item-content>
														</v-list-item>
														<v-list-item v-if="MusicUrl.sq" @click="GoDownload(MusicUrl.sq,4)">
															<v-list-item-content>
										  				无损: {{MusicUrl.sq}}
															</v-list-item-content>
										 			</v-list-item>
													</v-list-item-group>
												</v-list>
											</div>
										</v-card-text>
										<v-card-actions class="justify-end">
											<v-btn text @click="CloseDownload()">关闭</v-btn>
										</v-card-actions>
									</v-card>
								</template>
							</v-dialog>
						</v-col>

						<v-list two-line>
							<v-list-item-group color="indigo">
								<v-list-item v-for="(m,index) in MusicJson" :key="m.id" @click.stop="play(index)">
									<v-list-item-avatar color="grey lighten-4 darken-1">
										<v-img height="100%" :src='m.picUrl'></v-img>
									</v-list-item-avatar>

									<v-list-item-content>
										<v-list-item-title>{{m.MusicName}}-{{m.ArName}}</v-list-item-title>
									</v-list-item-content>
									<v-btn icon color="black" :id="m.id" @click.stop="GetDownloadJson($event)">
										<v-icon>mdi-download</v-icon>
									</v-btn>
								</v-list-item>
							</v-list-item-group>
						</v-list>
						<h2 v-if="JSON.stringify(MusicJson)=='{}'" class="text-center grey--text mb-2">空空如也,试试搜索一下吧</h2>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	import config from '../../config/config.js'
	export default {
		name: 'ListPage',
		data() {
			return {
				card: '歌单',
				type:'',
				alert: false,
				MusicJson: {},
				MusicUrl: {
					l: '',
					m: '',
					h: '',
					sq: '',
					// lrc:''
				},
				brs:{
					id:'',
					m: '',
					h: '',
					sq: '',
				},
			}
		},
		mounted() {
			this.MusicJson = this.$route.params.Data
			this.type = this.$route.params.type
			this.$bus.$on('SearchPageJson',(json)=>{
					this.MusicJson = json
			}),
			this.$bus.$on('ListType',(json)=>{
					this.type = json
			})
		},
		methods: {
			GetDownloadJson(event) {
				this.alert = true
				if(this.brs.id){
					return
				}
				let MusicId = event.currentTarget.id
				if (this.type == '咪咕') {
					let data = {
						cid: MusicId,
					}
					this.$axios.post(config.MusicMigu.GetDonwoladUrl, data)
						.then(response => (this.DispposeDownloadJson(response.data.data)))
				} else if (this.type == '网易云') {
					let data = {
						ids: MusicId,
					}
					this.$axios.post(config.Music163.GetSongDetail, data)
						.then(response => (this.DispposeDownloadJson(response.data.songs,MusicId)))
				}
				this.alert = true
			},

			GoDownload(url ,br){
				if(this.type=='咪咕' || br==1){
					window.open(url)
				}else if(this.type=='网易云'){
					if(br==2){
						let data = {
							ids:this.brs.id,
							br:this.brs.m
						}
						this.$axios.post(config.Music163.GetDonwoladUrl, data)
							.then(response => (window.open(response.data.data[0].url)))
					}else if(br==3){
						let data = {
							ids:this.brs.id,
							br:this.brs.h
						}
						this.$axios.post(config.Music163.GetDonwoladUrl, data)
							.then(response => (window.open(response.data.data[0].url)))
					}else if(br==4){
						let data = {
							ids:this.brs.id,
							br:this.brs.sq
						}
						this.$axios.post(config.Music163.GetDonwoladUrl, data)
							.then(response => (window.open(response.data.data[0].url)))
					}
				}
				
			},
			
			DispposeDownloadJson(json,MusicId) {
				if (this.type == '咪咕') {
					this.MusicUrl.m = json['128']
					this.MusicUrl.h = json['320']
					this.MusicUrl.sq = json['flac'] //this.MusicUrl.lrc=json.lrc
				} else if (this.type == '网易云') {					
					let data = {
						id:MusicId,
						br:json[0].l.br
					}
					this.$axios.post(config.Music163.GetDonwoladUrl, data)
						.then(response => (this.MusicUrl.l=response.data.data[0].url))
					this.brs.id=MusicId
					
					if(json[0].m.br){
						this.brs.m=json[0].m.br
						this.MusicUrl.m='http://m740.music.126.net/20220724105354/48d60a3fbb41bf1a1d39c85b9ad5f656/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/8507309415/6a99/b4b6/b69b/670ca6386e55c52e1ff7e5f9f940ebf2.mp3'
					}
					if(json[0].h.br){
						this.brs.h=json[0].h.br
						this.MusicUrl.h='http://m756.music.126.net/20220724105354/48d60a3fbb41bf1a1d39c85b9ad5f656/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/8507309415/6a99/b4b6/b69b/670ca6386e55c52e1ff7e5f9f940ebf2.mp3'
					}
					if(json[0].sq.br){
						this.brs.sq=json[0].sq.br
						this.MusicUrl.sq='http://m802.music.126.net/20220724105354/48d60a3fbb41bf1a1d39c85b9ad5f656/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/8507309415/6a99/b4b6/b69b/670ca6386e55c52e1ff7e5f9f940ebf2.mp3'
					}
				 }
			},
			
			play(n){
				this.$bus.$emit('GetMusicNum',n)
			},

			CloseDownload() {
				this.alert = false
				this.MusicUrl.l = ''
				this.MusicUrl.m = ''
				this.MusicUrl.h = ''
				this.MusicUrl.sq = ''
				this.brs.id=''
				this.brs.h=''
				this.brs.m=''
				this.brs.sq=''
			}
		}
	}
</script>
