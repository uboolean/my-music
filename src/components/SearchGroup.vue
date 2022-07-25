<template>
	<v-form >
		<v-container >
			<v-row >
				<v-spacer></v-spacer>
				<v-col class="d-flex" cols="12" sm="2">
					<v-select :items="items" label="平台" v-model="type" outlined></v-select>
				</v-col>
				
				<v-col cols="12" md="6">
					<v-text-field v-model="music" solo label="你还没搜索过呢" filled clearable></v-text-field>
				</v-col>
				
				<v-col @click="SearcchMusic()">
					<v-btn color="white" dark x-large>
						<v-icon color='black' >mdi-magnify</v-icon>
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
		</v-container>
	</v-form>
	
</template>

<script>
import config from '../../config/config.js'

	export default {
		name: 'SearchGroup',
		data() {
			return {
				items: ['咪咕', '网易云'],
				music: '',
				type:'咪咕'
				
			}
		},
		methods:{
			//搜索音乐函数
			SearcchMusic(){
				this.SendType()
				if(this.type=='咪咕'){
					let data ={
						keyword:this.music,
					}
					this.$axios.post(config.MusicMigu.SearchUrl,data)
					.then(response => (this.SendJson(this.DispposeListJson(response.data.data.list))))
				}else if(this.type=='网易云'){
					let data ={
						keywords:this.music,
					}
					this.$axios.post(config.Music163.SearchUrl,data)
					.then(response => (this.SendJson(this.DispposeListJson(response.data.result.songs))))
				}
			},
			//发送平台类型函数
			SendType(){
					this.$bus.$emit('MusicType',this.type)
					this.$bus.$emit('BarMusicType',this.type)
					this.$bus.$emit('ListType',this.type)
			},
			//发送搜索json数据
			SendJson(json){
				this.$bus.$emit('MusicJson',json),
				this.$bus.$emit('SearchPageJson',json)
				this.$bus.$emit('GetMusicUrl',json)
			},
			//处理json数据
			DispposeListJson(response){
					let json =[],
						MusicData={
						MusicName:'',
						id:'',
						ArName:'',
						picUrl:'',
						url:'',
					}
					
					if(this.type=='咪咕'){
						response.forEach(function(item){
							MusicData.MusicName=item.name
							MusicData.ArName=item.artists[0].name
							MusicData.picUrl=item.album.picUrl
							MusicData.id=item.cid
							MusicData.url=item.url
							json.push(JSON.parse(JSON.stringify(MusicData)))
						})
						
					}else if(this.type=='网易云'){
						response.forEach(function(item){
							MusicData.MusicName=item.name
							MusicData.ArName=item.ar[0].name
							MusicData.picUrl=item.al.picUrl
							MusicData.id=item.id
							MusicData.url=''					
							json.push(JSON.parse(JSON.stringify(MusicData)))
						})
					}
					return json;
				}
			
		}

	}
</script>

<style>
</style>
