import Vue from 'vue'
import VueRouter from 'vue-router'
import ListPage from '../components/ListPage.vue'
import SearchPage from '../components/SearchPage.vue'
import PlayPage from '../components/PlayPage.vue'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  if(typeof(location)=="string"){
    var Separator = "&";
    if(location.indexOf('?')==-1) { Separator='?'; }
    location = location + Separator + "random=" + Math.random();
  }
  return routerPush.call(this, location).catch(error=> error)
}
 
 
Vue.use(VueRouter)



export default new VueRouter({
	mode: 'history',
	routes:[
		{
			path:'/',
			component:SearchPage
		},
		{
			name:'list',
			path:'/list',
			component:ListPage
		},
		{
			name:'search',
			path:'/search',
			component:SearchPage
		},
		{
			name:'play',
			path:'/play',
			component:PlayPage
		},
	]
})
