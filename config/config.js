export default{
	//修改接口请参考官方接口文档
	
	//网易云
	Music163:{
		SearchUrl:'http://10.10.1.134:3000/cloudsearch', //音乐搜索接口
		GetDonwoladUrl:'http://10.10.1.134:3000/song/url', //音乐下载链接获取接口
		GetSongDetail:'http://10.10.1.134:3000/song/detail' //获取音乐详情接口
	},
	//咪咕音乐
	MusicMigu:{
		SearchUrl:'http://10.10.1.134:3400/search', //音乐搜索接口
		GetDonwoladUrl:'http://10.10.1.134:3400/song' //获取音乐下载接口
	}
}
