<template>
	<div>
		<v-container class="py-8 px-6" fluid>
			<v-row>
				<v-col>
					<v-card>
						<v-subheader>搜索结果</v-subheader>
						<v-list two-line>
							<v-list-item-group color="indigo">
								<v-list-item v-for="m in SearchJson" :key="m.id">
									<v-list-item-avatar color="grey lighten-4 darken-1">
										<v-img
										height="100%"
										:src='m.picUrl'
										></v-img>
									</v-list-item-avatar>

									<v-list-item-content>
										<v-list-item-title>{{m.MusicName}}-{{m.ArName}}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								
							</v-list-item-group>
						</v-list>
						<h2 v-if="JSON.stringify(SearchJson)=='{}'" class="text-center grey--text mb-2">空空如也,试试搜索一下吧</h2>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	export default {
		name: 'SearchListPage',
		data() {
			return {
				SearchJson:{},
			}
		},
		mounted() {
			this.$bus.$on('SearchPageJson',(json)=>{
					this.SearchJson = json
					//console.log('搜索页面接收的数据')
				})
		},
	}
</script>

<style>
</style>
