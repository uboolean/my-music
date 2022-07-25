<template>
	<div>
	<SearchGroup></SearchGroup>
	<ListPage></ListPage>
	</div>
</template>

<script>
import SearchGroup from './SearchGroup.vue'
import ListPage from './ListPage.vue'
	export default{
		name:'SearchPage',
		components:{
			SearchGroup,
			ListPage
		},
	}
</script>

<style>
</style>