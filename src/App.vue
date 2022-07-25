<template>
  <v-app id="inspire">
		<Bar></Bar>
		<PlayBar></PlayBar>
  </v-app>
</template>

<script>
import Bar from './components/Bar.vue'
import PlayBar from './components/PlayBar.vue'

export default {
	name:'App',
	components:{
		Bar,
		PlayBar,
	},

  }
</script>