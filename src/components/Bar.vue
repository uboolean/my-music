<template>
	<v-main>
		<v-navigation-drawer v-model="drawer" app>
			<v-sheet color="white lighten-4" class="pa-4">
				<v-avatar class="mb-4" color="blue lighten-4 darken-1" size="64">
					<v-img
						height="100%"
						src='../../public/favicon.png'
					></v-img>
				</v-avatar>

				<div>开发中</div>
			</v-sheet>

			<v-divider></v-divider>
			<v-list>
				<v-list-item v-for="[icon, text, path] in links" :key="path" link @click="MyRotuerLink(path)">
						<v-list-item-icon>
							<v-icon>{{ icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>{{ text }}</v-list-item-title>
						</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>


		<v-app-bar color='white lighten-4' app>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>Music</v-toolbar-title>
		</v-app-bar>
		
		<keep-alive >
		<router-view></router-view>
		</keep-alive>
		
	</v-main>
</template>

<script>
	export default {
		name: 'Bar',
		data() {
			return {
				drawer: true,
				links: [
					['mdi-magnify', '搜索', 'search'],
					['mdi-playlist-music', '歌单', 'list'],
					['mdi-play-speed','播放','play']
				],
				type:'',
				MusicData:{},
			}
		},
		methods:{
			//编程式路由
			MyRotuerLink(path){
				if(this.$route.path!=path){
					this.$router.push({
						name:path,
						params: {
							Data: this.MusicData,
							type: this.type
						}
					})
				}
			}
		},
		mounted(){
		//全局接收音乐搜索json数据
		this.$bus.$on('MusicJson',(json)=>{
				this.MusicData = json
				// console.log('Bar组件接收了数据')
			}),
		//全局接收平台类型
		this.$bus.$on('MusicType',(type)=>{
				this.type=type
			})
		},
		//销毁通信
		beforeDestroy() {
			this.$bus.$off('MusicJson')
			this.$bus.$off('MusicType')
		},
	}
</script>

<style>
</style>
