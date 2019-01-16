Screen.backgroundColor = "#FFF"
n = Screen.width/750
CarouselComponent = require "carouselcomponent/CarouselComponent"
primaryColor = "#0DBCE8"

# Springs缓动预定义
iOSAppLaunch = "spring(320,40,0)"
iOSKeyboard = "spring(280,33,10)"
iOSSlideView = "spring(220,28,0)"
iOSRetreat = "spring(220,28,0)"
iOSActionSheet = "spring(280,33,10)"

materialAppLaunch = "spring(260,32,16)"
materialKeyboard = "spring(220,35,25)"
materialSlideView = "spring(220,35,25)"
materialRetreat = "spring(160,30,10)"
materialActionSheet = "spring(250,37,20)"

floaty = "spring(160,40,10)"
hello = "spring(400,22,20)"
retreat = "spring(160,30,10)"
pop = "spring(280,13,10)"
bigPop = "spring(370,8,0)"
dramatic = "spring(120,140,0)"
slow = "spring(100,50,0)"
quick = "spring(400,23,6)"
loose = "spring(240,18,28)"

#下拉加载

frameStep = 38
frameWidth = 260
frameRate = 3

topGdt = new Layer
	width: Screen.width
	height: 360*n
	image: "images/gradiantbg.png"
	background:null
	z: 3
	opacity: 0


navbar = new Layer
	width: Screen.width
	height: 164*n
	image: "images/Navigation-Bar1.png"
	opacity: 1
	z: 2
	backgroundColor: "null"


navbarWhite = new Layer
	width: Screen.width
	height: 164*n
	image: "images/Navigation-Bar.png"
	opacity: 0
	z: 2
	backgroundColor: "#FFF"

view = new Layer
	width: 260*n
	height: 180*n
	x: Align.center
	y: 140*n
	backgroundColor: null
	clip: true
	scale: 0.8
	opacity: 0
	z: 1
	
loadcontent = new Layer
	parent: view
	x: 0
	width: 9880*n
	height: 180*n
	image: "images/startsprite.png"
	
pullAnimate = (s) ->
	loadcontent.states =
		on:
			x:-frameWidth*n*s		
	loadcontent.animate "on",time:0


homeScroll = new ScrollComponent
	size: Screen.size
	z: 1
# 	y: -80*n
	
homeScroll.content.draggable.horizontal = false
homeScroll.content.backgroundColor = ""
homeScroll.contentInset = 
	bottom: 300*n
homeScroll.content.draggable.bounceOptions =
	friction: 60,
	tension: 1600,
	tolerance: 0.0001
	
loadtxt = new TextLayer
	text: "下拉加载"
	fontSize: 22*n
	x: Align.center
	y: view.y+view.height-24*n
	opacity: 0
# 	text：“下拉加载”	
view.placeBehind(homeScroll)
loadtxt.placeBehind(homeScroll)
topGdt.placeBefore(homeScroll)	
sound = new Audio("sounds/pop03.wav")
	


# 首页一屏
# 头部banner位
banner = new PageComponent
	parent: homeScroll.content
	width: Screen.width
	x: Align.center
	y: 0*n
	height: 360*n
	z: 2
	backgroundColor: "#f5f5f5"
bannerpicArr = ["images/banner/banner01.png","images/banner/banner02.png"]
banner.content.draggable.vertical = false
banner.content.draggable.overdrag = false
for number in [0...bannerpicArr.length]
	bannerContent = new Layer
		parent: banner.content
		width: banner.width
		height: banner.height
		x: banner.width*number
		image: bannerpicArr[number]
		
#指示器
allIndicators = []
for number in [0...bannerpicArr.length]
	indicator = new Layer
		parent:homeScroll.content
		backgroundColor: "#FFF"
		width:12*n
		height:6*n
		x: (banner.width/36)*number+banner.width/2-24*n
		y: banner.y+banner.height-20*n
		z: 2
		opacity: 0.3
	indicator.states.add(active:{opacity:1})
	indicator.states.animationOptions = time:0.25
	allIndicators.push(indicator)	

allIndicators[0].opacity = 1
# allIndicators[0].scaleX = 1.5		
banner.on "change:currentPage", ->
	current = banner.horizontalPageIndex(banner.currentPage)
	indicator.states.switch("default") for indicator in allIndicators
	allIndicators[current].states.switch("active")			


# 十字交互体验优化
banner.content.on Events.DragMove, ->
	if Math.abs(banner.content.draggable.offset.x)>40*n
# 	if localHotItem.row.content.draggable.offset < 56*n
		homeScroll.content.draggable.enabled = false
	else
		homeScroll.content.draggable.enabled = true	

banner.content.on Events.DragEnd, ->
	homeScroll.content.draggable.enabled = true

#宫格
grid = new Layer
	parent: homeScroll.content
	width: Screen.width-16*n
	x: Align.center
	y: banner.y+banner.height+8*n
	height: 534*n
	image: "images/grid.png"

#图标导航
iconsNav = new Layer
	parent: homeScroll.content
	width: Screen.width-32*n
	height: 228*n
	x: Align.center
	y: grid.y+grid.height+16*n
	image: "images/iconsnav.png"
	borderColor: "#EEE"

qunarData = {
	"bstatus": {
		"code": 0,
		"des": "成功请求数据"
	},
	"data": {
		"whetherUsual": true,
		"commonLog": "{\"residentType\":\"1\"}",
		"showTitleView": 0,
		"currentCity": "北京",
		"recommendProducts": [
			{
				"weight": 7000,
				"itemType": 28,
				"comparePrice": {
					"date": "1月5日",
					"des": "机票比较数据来自携程网、同程网，仅供参考。",
					"fromcity": "广州",
					"scheme": "qunariphone://flight/search",
					"destcity": "上海",
					"firstSearchDate": "2019-01-05",
					"title": "机票比价",
					"businessType": "flight"
				},
				"logKey": "comparePrice",
				"cardTitle": "机票比价"
			},
			{
				"itemType": 32,
				"localAmusementFive": {
					"recommendItemList": {
						"standard": [
							{
								"imgUrl": "https://img1.qunarzz.com/order/comp/1805/91/71aaaba6825bd102.jpg",
								"businessCode": "hotellocal",
								"subTitle": "当地热门酒店",
								"mainTitle": "本地酒店",
								"position": 3,
								"businessType": "{\"sysType\":\"hotel\",\"businessline\":\"hotellocal\",\"location\":\"2\",\"scene\":\"1\"}",
								"jumpUrl": "qunariphone://hotel/search?currLatitude=&currLongitude=&coordinate=1&cityUrl=beijing_city&fromForLog=632&type=navibar-none"
							},
							{
								"imgUrl": "https://img1.qunarzz.com/order/comp/1809/44/9b4f746a65080102.jpg",
								"businessCode": "ticket",
								"subTitle": "必游榜单",
								"mainTitle": "门票",
								"position": 4,
								"businessType": "{\"sysType\":\"ticket\",\"businessline\":\"ticket\",\"location\":\"2\",\"scene\":\"1\"}",
								"jumpUrl": "qunariphone://hy?url=https%3A%2F%2Fsale.piao.qunar.com%2Ftouch%2Ftopic%2Fmk%2Ft_2927.htm%3Fcat%3Din_track%253Da_sy_ddwl_bybd_beijing"
							},
							{
								"imgUrl": "https://img1.qunarzz.com/travel/d7/1804/45/02f232e368ac0bb5.jpg_r_545x218_7f02b1cf.jpg",
								"businessCode": "strategy",
								"subTitle": "皇城根儿 历史名城 华夏文明中心",
								"mainTitle": "新鲜玩法",
								"position": 5,
								"businessType": "{\"sysType\":\"strategy\",\"businessline\":\"strategy\",\"location\":\"2\",\"scene\":\"1\"}",
								"jumpUrl": "qunariphone://hy?url=https%3A%2F%2Fhy.travel.qunar.com%2Fpage%23%2Fcity%2F299914%3FdestId%3D299914%26destType%3D6%26destName%3D%25E5%258C%2597%25E4%25BA%25AC%26anchor%3D%26bd_source%3Dlocal_fun_gonglue&type=navibar-none"
							}
						],
						"ranking": [
							{
								"imgUrl": "https://img1.qunarzz.com/p/p66/201302/28/27e07a6843ef48ac93835fbb.jpg_230x170_d0be2cdb.jpg",
								"businessCode": "weekend",
								"subTitle": "机票+春节预售！亚特兰蒂斯♦海景房3天2晚+水族馆+网红旅拍+游艇出海一日游+双早",
								"mainTitle": "周末去哪儿",
								"rankingList": [
									{
										"detailNum": "4032",
										"detailTitle": "机票+春节预售！亚特兰蒂斯♦海景房3天2晚+水族馆+网红旅拍+游艇出海一日游+双早"
									},
									{
										"detailNum": "4168",
										"detailTitle": "天津起止：蓟州国际滑雪场一日游 嗨翻你的冬季"
									},
									{
										"detailNum": "3.3w",
										"detailTitle": "北京古北水镇+河北承德避暑山庄纯玩2日游，外观司马台长城，北京周边2日游经典"
									}
								],
								"position": 1,
								"businessType": "{\"sysType\":\"public\",\"businessline\":\"weekend\",\"location\":\"2\",\"scene\":\"1\"}",
								"jumpUrl": "qunariphone://hy?url=https%3A%2F%2Fwolf.qunar.com%2Fwebapp%2Fweekend%2Fweekend.html%3FcityName%3D%25E5%258C%2597%25E4%25BA%25AC&type=navibar-none"
							},
							{
								"imgUrl": "https://img1.qunarzz.com/order/comp/1809/41/ecea86dd2761ea02.png",
								"businessCode": "performance",
								"subTitle": "包罗全城精彩现场",
								"mainTitle": "演出展览",
								"rankingList": [
									{
										"detailNum": "8.3w",
										"detailTitle": "孟京辉经典戏剧作品《恋爱的犀牛》"
									},
									{
										"detailNum": "6.5w",
										"detailTitle": "2018德云社北京相声大会—三里屯德云社剧场"
									},
									{
										"detailNum": "6.3w",
										"detailTitle": "2018德云社北京相声大会—天桥德云社剧场"
									}
								],
								"position": 2,
								"businessType": "{\"sysType\":\"public\",\"businessline\":\"performance\",\"location\":\"2\",\"scene\":\"1\"}",
								"jumpUrl": "qunariphone://hy?url=https%3A%2F%2Fwolf.qunar.com%2Fwebapp%2Fperform%2Findex.html%3FisPerform%3D1%26cityName%3D%25E5%258C%2597%25E4%25BA%25AC&type=navibar-none"
							}
						]
					},
					"modelNum": 1,
					"cityName": "北京",
					"title": "玩当地"
				},
				"weight": 6900,
				"logKey": "localAmusementFive",
				"cardTitle": "玩当地"
			},
			{
				"itemType": 36,
				"weight": 4600,
				"logKey": "starofficer",
				"cardTitle": "达人带你去旅行",
				"slideCard": {
					"btnText": "更多达人",
					"btnUrl": "qunariphone://hy?url=https%3A%2F%2Ftripstar.qunar.com&type=navibar-none",
					"cardItems": [
						{
							"imgUrl": "http://img1.qunarzz.com/vc/b0/d0/86/1bad56c25b91cce9075fbcd6d6.png",
							"scheme": "qunariphone://hy?url=https%3A%2F%2Ftripstar.qunar.com&type=navibar-none",
							"subtitle": "旅行最热目的地",
							"title": "精选旅行目的地",
							"businessType": "travel"
						},
						{
							"imgUrl": "http://img1.qunarzz.com/vc/a1/2a/6b/607cc88a1c976cf4dc800997fb.png",
							"scheme": "qunariphone://hy?url=https%3A%2F%2Ftripstar.qunar.com%2F%3Fcategory%3D2916181129%26subCategory%3D3622599782&type=navibar-none",
							"subtitle": "住遍全球最火酒店",
							"title": "最火网红酒店",
							"businessType": "travel"
						},
						{
							"imgUrl": "http://img1.qunarzz.com/vc/17/30/89/0f20059923f6367c5078f65ac9.png",
							"scheme": "qunariphone://hy?url=https%3A%2F%2Ftripstar.qunar.com%2F%3Fcategory%3D3803042451%26subCategory%3D204950937%2C2757800659%2C2658704957%2C2892796441%2C547047661&type=navibar-none",
							"subtitle": "热门拍照打卡圣地",
							"title": "旅行拍照指南",
							"businessType": "travel"
						},
						{
							"imgUrl": "http://img1.qunarzz.com/vc/5b/0b/b0/41c165707a825b50dddbf902bf.png",
							"scheme": "qunariphone://hy?url=https%3A%2F%2Ftripstar.qunar.com%2F%3Fcategory%3D2658704957%26subCategory%3D676462996%2C3726960176%2C279123416%2C1363780425%2C1614287686&type=navibar-none",
							"subtitle": "打卡全球美食潮店",
							"title": "网红美食新地标",
							"businessType": "travel"
						},
						{
							"imgUrl": "http://img1.qunarzz.com/vc/f6/bf/b8/0127146d872fbab8c2f5ec621e.jpg",
							"scheme": "qunariphone://hy?url=https%3A%2F%2Ftripstar.qunar.com%2F%3Fcategory%3D387217385%26subCategory%3D387217385&type=navibar-none",
							"subtitle": "给娃最美回忆",
							"title": "周末亲子游",
							"businessType": "travel"
						}
					],
					"cardName": "达人带你去旅行",
					"businessType": "travel",
					"srvLogger": "444"
				}
			},
			{
				"itemType": 36,
				"weight": 4700,
				"logKey": "highspeed",
				"cardTitle": "高铁游",
				"slideCard": {
					"btnText": "查看更多",
					"btnUrl": "qunariphone://react/open?hybridId=in_gonglue_guide_rn&pageName=TravelByTrain&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_trainMore%22%2C%22cityName%22%3A%22%E5%8C%97%E4%BA%AC%22%2C%22hours%22%3A3%2C%22locationIndex%22%3A0%7D%7D",
					"cardItems": [
						{
							"imgUrl": "https://s.qunarzz.com/interact_community/gaotieyou/gaotiexin269.jpg",
							"scheme": "qunariphone://react/open?hybridId=in_gonglue_guide_rn&pageName=TravelByTrain&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_trainCard%22%2C%22cityName%22%3A%22%E5%8C%97%E4%BA%AC%22%2C%22hours%22%3A3%2C%22locationIndex%22%3A0%7D%7D",
							"subtitle": "海河明珠,五大道,古文化街",
							"title": "约0.5小时/￥54.5",
							"businessType": "public"
						},
						{
							"imgUrl": "https://s.qunarzz.com/interact_community/gaotieyou/gaotiexin219.jpg",
							"scheme": "qunariphone://react/open?hybridId=in_gonglue_guide_rn&pageName=TravelByTrain&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_trainCard%22%2C%22cityName%22%3A%22%E5%8C%97%E4%BA%AC%22%2C%22hours%22%3A3%2C%22locationIndex%22%3A1%7D%7D",
							"subtitle": "海滨度假,天堂之城,美味海鲜",
							"title": "约1.8小时/￥87.5",
							"businessType": "public"
						},
						{
							"imgUrl": "https://s.qunarzz.com/interact_community/gaotieyou/gaotiexin130.jpg",
							"scheme": "qunariphone://react/open?hybridId=in_gonglue_guide_rn&pageName=TravelByTrain&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_trainCard%22%2C%22cityName%22%3A%22%E5%8C%97%E4%BA%AC%22%2C%22hours%22%3A3%2C%22locationIndex%22%3A3%7D%7D",
							"subtitle": "泉城,大明湖,济南打卤面",
							"title": "约1.4小时/￥184.5",
							"businessType": "public"
						},
						{
							"imgUrl": "https://s.qunarzz.com/interact_community/gaotieyou/gaotiexin358.jpg",
							"scheme": "qunariphone://react/open?hybridId=in_gonglue_guide_rn&pageName=TravelByTrain&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_trainCard%22%2C%22cityName%22%3A%22%E5%8C%97%E4%BA%AC%22%2C%22hours%22%3A3%2C%22locationIndex%22%3A4%7D%7D",
							"subtitle": "黄帝故里,少林寺,景色壮美",
							"title": "约2.4小时/￥214",
							"businessType": "public"
						},
						{
							"imgUrl": "https://img1.qunarzz.com/order/comp/1810/7d/dd4a8814badef802.jpg",
							"scheme": "qunariphone://react/open?hybridId=in_gonglue_guide_rn&pageName=TravelByTrain&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_trainCard%22%2C%22cityName%22%3A%22%E5%8C%97%E4%BA%AC%22%2C%22hours%22%3A3%2C%22locationIndex%22%3A6%7D%7D",
							"subtitle": "北方古城,民风淳朴,革命老区",
							"title": "约2.5小时/￥154.5",
							"businessType": "public"
						},
						{
							"imgUrl": "https://s.qunarzz.com/interact_community/gaotieyou/gaotiexin025.jpg",
							"scheme": "qunariphone://react/open?hybridId=in_gonglue_guide_rn&pageName=TravelByTrain&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_trainCard%22%2C%22cityName%22%3A%22%E5%8C%97%E4%BA%AC%22%2C%22hours%22%3A3%2C%22locationIndex%22%3A7%7D%7D",
							"subtitle": "戏曲之乡,冠军之城,驴肉火烧",
							"title": "约0.7小时/￥42.5",
							"businessType": "public"
						}
					],
					"cardName": "高铁游",
					"businessType": "public",
					"srvLogger": "450"
				}
			},
			{
				"sale": {
					"card1": {
						"img": "https://img1.qunarzz.com/order/comp/1811/49/4367cce7f84b3b02.png",
						"schemeUrl": "qunariphone://hy?url=https%3A%2F%2Ftouch.qunar.com%2FlowFlight%2Findex%3Fcat%3Dsecondpagenew&type=navibar-none",
						"subDesc": "你想要的低价",
						"businessType": "flight",
						"title": "低价机票"
					},
					"card2": {
						"img": "https://img1.qunarzz.com/order/comp/1811/7f/1a97468f45038902.png",
						"schemeUrl": "qunariphone://hy?url=https%3A%2F%2Fzt.dujia.qunar.com%2Ftejia%2Fnewtejia_touch.php%3Fchan%3Dfreetravel%26it%3Dhome_sales%26city%3D%25E5%258C%2597%25E4%25BA%25AC%26et%3Dhome_tejiafree&type=navibar-none",
						"subDesc": "限时抢购",
						"businessType": "travel",
						"title": "特价自由行"
					},
					"cards": [
						{
							"img": "https://userimg.qunarzz.com/imgs/201812/16/C._M0DCiii8uT4CHmRi480s.jpg",
							"price": "349",
							"businessType": "hotel",
							"title": "特价·酒店",
							"jumpUrl": "qunariphone://hy?url=https%3A%2F%2Ftouch.qunar.com%2Fmis%2FeUrQZr%3Fbd_source%3Dzthd_808888&type=browser",
							"desc": "[北京] 北京苹果艺术民宿公寓 豪华大床房"
						},
						{
							"img": "https://img1.qunarzz.com/order/comp/1809/7c/f501e2e287b00602.png",
							"price": "3088",
							"originPrice": "3202",
							"businessType": "travel",
							"title": "特价·度假",
							"jumpUrl": "qunariphone://hy?url=http%3A%2F%2Ftejia.qunar.com%2Fwebapp%2Fqsale%2Findex.html%3Fcity%3D%25E5%258C%2597%25E4%25BA%25AC%23vacation&type=navibar-none",
							"desc": "北京-大阪 "
						},
						{
							"img": "http://img1.qunarzz.com/sight/p0/1712/95/95f38f28a6ff19cba3.img.jpg_472x316_34f9cb42.jpg",
							"price": "1",
							"originPrice": "40",
							"businessType": "ticket",
							"title": "特价·门票",
							"jumpUrl": "qunariphone://hy?url=https%3A%2F%2Fsale.piao.qunar.com%2Ftouch%2Fmk%2Fspecial.htm%3Fregion%3D%25E5%258C%2597%25E4%25BA%25AC%26cat%3Din_track%253Da_sy_temai_1",
							"desc": "[北京]【活动票】水奥雪世界成人门票"
						},
						{
							"img": "https://img1.qunarzz.com/travel/d1/1708/93/862ba7bf537627b5.jpg_417x300_80a0b162.jpg",
							"price": "810",
							"businessType": "flight",
							"title": "特价·机票",
							"jumpUrl": "qunariphone://hy?url=https%3A%2F%2Ftouch.qunar.com%2FlowFlight%2FflightList%3Fdep%3D%25E5%25B9%25BF%25E5%25B7%259E%26arr%3D%25E8%25A5%25BF%25E5%258F%258C%25E7%2589%2588%25E7%25BA%25B3%26flightType%3D1%26startDate%3D2019-02-13%26endDate%3D%26tag%3D-1%26tagNames%3D02%25E6%259C%258813%25E6%2597%25A5%26days%3D-1%26cat%3Durban_information_flow&type=navibar-none",
							"desc": "广州-西双版纳-02月13日"
						}
					],
					"more": "查看更多",
					"businessType": "travel",
					"moreUrl": "qunariphone://hy?url=https%3A%2F%2Ftouch.dujia.qunar.com%2Ftejia%3Fbd_source%3Dqunariphone%26city%3D%25E5%258C%2597%25E4%25BA%25AC%26et%3Dhome_dijiamore&type=navibar-none",
					"title": "找低价"
				},
				"itemType": 27,
				"weight": 4900,
				"logKey": "sale",
				"cardTitle": "找低价"
			},
			{
				"itemType": 11,
				"advertisements": {
					"imgUrl": "http://img1.qunarzz.com/vc/b1/ba/41/fe8a2341e0b175f4e8ce2a6735.jpg",
					"whichAd": 1,
					"schemeUrl": "qunariphone://web/url?method=0&url=https://touch.dujia.qunar.com/red_packets/2016jxy100?et%3Dappdsshd%26in_track%3Dappdsshd",
					"isClosable": true,
					"businessType": "advert",
					"imageHeight": "300"
				},
				"weight": 4500,
				"logKey": "advertisements"
			},
			{
				"itemType": 40,
				"hotDestinationNewView": {
					"recommendItemList": [
						{
							"imgUrl": "https://img1.qunarzz.com/travel/d1/1708/93/862ba7bf537627b5.jpg_405x546_5e417297.jpg",
							"ext": "{\"BUCKET\":\"BUCTET_C\",\"RULE\":\"HOT\"}",
							"scheme": "qunariphone://react/open?hybridId=gl_home_rn&pageName=Home&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_hot%22%2C%22distId%22%3A299808%7D%7D",
							"city": "西双版纳",
							"iconImg": "https://img1.qunarzz.com/order/comp/1808/34/14f019d51c1bcd02.png",
							"businessType": "strategy",
							"desc": "大家都在看"
						},
						{
							"imgUrl": "https://img1.qunarzz.com/order/comp/1605/fc/1bf20af18b26a1f7.jpg_405x546_b55020d7.jpg",
							"ext": "{\"BUCKET\":\"BUCTET_C\",\"RULE\":\"HOT\"}",
							"scheme": "qunariphone://react/open?hybridId=gl_home_rn&pageName=Home&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_hot%22%2C%22distId%22%3A0%7D%7D",
							"city": "香港",
							"iconImg": "https://img1.qunarzz.com/order/comp/1808/9c/4c5a0e34cbea0f02.png",
							"businessType": "strategy",
							"desc": "大家都在看"
						},
						{
							"imgUrl": "https://img1.qunarzz.com/travel/d9/1710/9d/b8fff936412267b5.jpg_405x546_f68a2c58.jpg",
							"ext": "{\"BUCKET\":\"BUCTET_C\",\"RULE\":\"HOT\"}",
							"scheme": "qunariphone://react/open?hybridId=gl_home_rn&pageName=Home&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_hot%22%2C%22distId%22%3A300079%7D%7D",
							"city": "丽江",
							"iconImg": "https://img1.qunarzz.com/order/comp/1808/c4/2c85090e10f43b02.png",
							"businessType": "strategy",
							"desc": "大家都在看"
						},
						{
							"imgUrl": "https://img1.qunarzz.com/wugc/p24/201206/05/acb361d8b3c400e393835fbb.jpg_405x546_d7101775.jpg",
							"ext": "{\"BUCKET\":\"BUCTET_C\",\"RULE\":\"HOT\"}",
							"scheme": "qunariphone://react/open?hybridId=gl_home_rn&pageName=Home&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_hot%22%2C%22distId%22%3A300118%7D%7D",
							"city": "深圳",
							"iconImg": null,
							"businessType": "strategy",
							"desc": "大家都在看"
						},
						{
							"imgUrl": "https://img1.qunarzz.com/order/comp/1809/dc/6a527ef4e3451102.jpg_405x546_7edcd092.jpg",
							"ext": "{\"BUCKET\":\"BUCTET_C\",\"RULE\":\"HOT\"}",
							"scheme": "qunariphone://react/open?hybridId=gl_home_rn&pageName=Home&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_hot%22%2C%22distId%22%3A302163%7D%7D",
							"city": "芭堤雅",
							"iconImg": null,
							"businessType": "strategy",
							"desc": "大家都在看"
						},
						{
							"imgUrl": "https://img1.qunarzz.com/travel/d2/1703/22/a33e144000914fb5.jpg_405x546_ec157369.jpg",
							"ext": "{\"BUCKET\":\"BUCTET_C\",\"RULE\":\"HOT\"}",
							"scheme": "qunariphone://react/open?hybridId=gl_home_rn&pageName=Home&initProps=%7B%22param%22%3A%7B%22bd_source%22%3A%22qunar_index_hot%22%2C%22distId%22%3A300166%7D%7D",
							"city": "哈尔滨",
							"iconImg": null,
							"businessType": "strategy",
							"desc": "大家都在看"
						}
					],
					"moreText": "查看更多",
					"businessType": "public",
					"moreUrl": "qunariphone://hy?url=https%3A%2F%2Fwuzetian.qunar.com%2Fsite%2Fdestination%2Findex.html%23%2F&type=navibar-none",
					"cardTitle": "去远方"
				},
				"weight": 6700,
				"logKey": "hotDestinationNewView",
				"cardTitle": "去远方"
			}
		],
		"showCity": "北京"
	}
}

#机型适配		
if Screen.height>=812	
	bottom = new Layer
		width: Screen.width
		height:166*n
		y: Align.bottom()
		image: "images/bottom.png"
		shadowY: -4
		shadowColor: "rgba(0,0,0,0.03057065217391304)"
		shadowBlur: 8
		z: 3
else
	homeScroll.y = 0
	navbar.y = -36*n
	navbarWhite.y = -36*n
	bottom = new Layer
		width: Screen.width
		height:166*n
		y: Align.bottom(64*n)
		image: "images/bottom.png"
		shadowY: -4
		shadowColor: "rgba(0,0,0,0.03057065217391304)"
		shadowBlur: 8
		z: 3	

CardTitleSize = 32*n
CardSubTitleSize = 24*n
CardRadius = 4
CardPriceSize = 40*n

#initial
currentCity = new TextLayer
	parent: navbar
	text: "定位"
	color: "#FFF"
	fontSize: 32*n
	y: Align.center(37*n)
	x: 24*n

currentCityWhite = new TextLayer
	parent: navbarWhite
	text: "定位"
	color: "#000"
	fontSize: 32*n
	y: Align.center(37*n)
	x: 24*n

Cards = []

# Utils.domLoadJSON "https://qunar-138bc.firebaseio.com/data.json", (error, qunarData) ->
# 	print qunarData.data
# 二屏卡片
currentCity.text = qunarData.data.currentCity
currentCityWhite.text = qunarData.data.currentCity
for i in [0...qunarData.data.recommendProducts.length]
	Cardtype = new Layer
		parent: homeScroll.content
		backgroundColor:"#FFF"
		width: Screen.width
	
# 		print qunarData.data.recommendProducts[i].cardTitle
	CardTitle = new TextLayer
		parent: Cardtype
		text: qunarData.data.recommendProducts[i].cardTitle
		fontSize: 40*n
		color: "#212121"
		fontWeight: 900
		width: Screen.width
		x: 32*n
		background: null
	
		
	CardScroll = new ScrollComponent
		x: 0
		width: Screen.width
		parent: Cardtype	
		scrollHorizontal : true
		scrollVertical : false
		visible: false
# 		CardScroll.content.visible = false
	Cards.push(Cardtype)	
	
	MoreText = new TextLayer
		parent: CardTitle
		width: 136*n
		text: "查看更多"	
		fontSize: 24*n
		y: 8*n
		x: Align.right(-64*n)
		color: "#212121"
		
	innerPicArrow = new Layer
		parent: MoreText
		x: Align.right(-4*n)
		y: Align.center
		scale: 0.64
		width: 36*n
		height: 36*n
		background:null
		image: "images/arrow.svg"	
	
	#机票比价
	if qunarData.data.recommendProducts[i].itemType == 28
		Cards[i].height = 440*n
		Cards[i].children[0].children[0].visible = false
		comparePrice = new Layer
			width: Screen.width
			height: 336*n
			parent: Cards[i]
			y: 80*n
			image: "images/comparePrice/cardbg.png"
			
		comparePriceSqr = new Layer
			parent: comparePrice
			width: Screen.width-64*n
			x: Align.center
			y: Align.center
			height: 258*n	
			backgroundColor: "#FFF"
			
		startPntTxt = new TextLayer
			parent: comparePrice
			text: "起点"
			fontSize: 28*n
			color: "#9e9e9e"
			x: 64*n
			y: 72*n
		
		startPnt = new TextLayer
			parent: startPntTxt
			text: qunarData.data.recommendProducts[i].comparePrice.fromcity
			fontSize: 36*n
			fontWeight: 900
			color: "#212121"	
			y: 64*n	
		
		startarrow = new Layer
			parent: startPnt
			width: 32*n
			height: 32*n
			image: "images/arrow.svg"
			x: startPnt.width+startPnt.x+12*n
			y: Align.center	
			opacity: 0.4
		
		endPntTxt = new TextLayer
			parent: comparePrice
			text: "终点"
			fontSize: 28*n
			color: "#9e9e9e"
			x: Align.right(-88*n)
			y: 72*n
		
		endPnt = new TextLayer
			parent: endPntTxt
			text: qunarData.data.recommendProducts[i].comparePrice.destcity
			fontSize: 36*n
			fontWeight: 900
			color: "#212121"
			textAlign: "right"
			x: Align.right(0)
			y: 64*n	
			
		endarrow = new Layer
			parent: endPnt
			width: 32*n
			height: 32*n
			image: "images/arrow.svg"
			x: endPnt.width+endPnt.x+16*n
			y: Align.center	
			opacity: 0.4
		
		time = new Layer
			parent: comparePrice
			width: 24*n
			height: 24*n
			image: "images/time.svg"
			x: 64*n
			y: 232*n			
	
		timeTxt = new TextLayer
			parent: time
			x: 36*n
			text: qunarData.data.recommendProducts[i].comparePrice.date
			fontSize: 24*n
			color: "#212121"
			y: Align.center
			
		timeArrow = new Layer
			parent: timeTxt
			width: 32*n
			height: 32*n
			image: "images/arrow.svg"
			x: timeTxt.width+timeTxt.x-36*n
			scale: 0.64
			y: Align.center	
			opacity: 0.4
		
		compareBtn = new Layer
			parent: comparePrice
			width: 140*n
			height: 64*n
			borderRadius: 45
			x: Align.right(-64*n)
			y: 208*n
			backgroundColor: "#00BCD4"
			
		compareBtnTxt = new TextLayer
			parent: compareBtn
			text: "查询"
			fontSize: 32*n
			color: "#FFF"
			x: Align.center
			y: Align.center
			fontWeight: 800
		
		flighticon = new Layer
			parent: comparePrice
			width: 24*n
			height: 10*n
			image: "images/flight.svg"
			x: Align.center
			scale: 1.8
			y: Align.center(-12*n)
			
		comparePriceDesc = new TextLayer
			parent: Cards[i]
			x: 32*n
			y: 440*n
			fontSize: CardSubTitleSize
			color: "#9e9e9e"
			text: qunarData.data.recommendProducts[i].comparePrice.des
			
		Cards[i].height = 440		
		
	#玩当地
	localAmtRankNum = null
	localAmtRankListNum = null
	localAmtStdNum = null
	if qunarData.data.recommendProducts[i].itemType == 32 then localAmtRankNum = qunarData.data.recommendProducts[i].localAmusementFive.recommendItemList.ranking.length

	if qunarData.data.recommendProducts[i].itemType == 32
		localAmtRankListNum = qunarData.data.recommendProducts[i].localAmusementFive.recommendItemList.ranking[0].rankingList.length
		Cards[i].height = 560*n
# 			print localAmtRankNum
		for l in [0...localAmtRankNum]
			localAmtRank = new Layer
				width: (Screen.width-70*n)/2
				y: 80*n
				x: 32*n+(Screen.width-54*n)/2*l
				height: (Screen.width-70*n)/2*0.66
				parent: Cards[i]
				backgroundColor: "#CCC"
				borderRadius: CardRadius
# 					opacity: 0.5
				image: qunarData.data.recommendProducts[i].localAmusementFive.recommendItemList.ranking[l].imgUrl
			
			localAmtRankName = new TextLayer
				parent: localAmtRank
				width: (Screen.width-70*n)/2
				textAlign: "center"
				y: Align.center
				x: Align.center
				fontSize: 36*n
				fontWeight: 900
				color: "#FFF"
				text: qunarData.data.recommendProducts[i].localAmusementFive.recommendItemList.ranking[l].mainTitle
				
				
			localAmtRankBg = new Layer
				width: (Screen.width-70*n)/2
				y: 290*n
				x: 32*n+(Screen.width-54*n)/2*l
				height: (Screen.width-70*n)/2*0.66
				parent: Cards[i]
				height: 172*n
				backgroundColor: "#FFF"
				borderWidth: 1
				borderColor: "#e0e0e0"
			
			for o in [0...localAmtRankListNum]
				localAmtRankListName = new TextLayer
					parent: localAmtRank
					width: (Screen.width-70*n)/2-120*n
					textOverflow: "ellipsis"
					height: 32*n
					x: 16*n
					y: 224*n+50*n*o
					text: o+1+"."+qunarData.data.recommendProducts[i].localAmusementFive.recommendItemList.ranking[l].rankingList[o].detailTitle
					z: 1
					fontSize: 28*n
					color: "#212121"	
	
	
				localAmtRankListDetail = new TextLayer
					parent: localAmtRank
					width: (Screen.width-70*n)/2-120*n
					textOverflow: "ellipsis"
					height: 32*n
					x: Align.right(-16*n)
					textAlign: "right"
					y: 224*n+50*n*o
					text: qunarData.data.recommendProducts[i].localAmusementFive.recommendItemList.ranking[l].rankingList[o].detailNum
					z: 1
					fontSize: 24*n
					color: "#616161"
	
	if qunarData.data.recommendProducts[i].itemType == 32 then localAmtStdNum = qunarData.data.recommendProducts[i].localAmusementFive.recommendItemList.standard.length
	if qunarData.data.recommendProducts[i].itemType == 32	
# 			print localAmtStdNum		
		for m in [0...localAmtStdNum]
			localAmtStd = new Layer
				width: 	(Screen.width-82*n)/3
				height: (Screen.width-82*n)/3*0.66
				y: 472*n
				parent: Cards[i]
				x: 32*n+(Screen.width-53*n)/3*m
				image: qunarData.data.recommendProducts[i].localAmusementFive.recommendItemList.standard[m].imgUrl
				borderRadius: CardRadius
			
			localAmtStdsubTitle = new TextLayer
				parent: localAmtStd
				width: 	(Screen.width-82*n)/3
				textOverflow: "ellipsis"
				y: 160*n
				height: 32*n
				fontSize: 28*n
# 					fontWeight: 800
				color: "#212121"
				text: qunarData.data.recommendProducts[i].localAmusementFive.recommendItemList.standard[m].subTitle	
		
	
			
	#3.5滑块
	SlideCardNum = null
	if qunarData.data.recommendProducts[i].itemType == 36 and qunarData.data.recommendProducts[i].logKey == "starofficer"
		SlideCardNum = qunarData.data.recommendProducts[i].slideCard.cardItems.length
		for k in [0...SlideCardNum]
			SlideCardView = new Layer
				parent: Cards[i].children[1].content
				borderRadius: CardRadius
				width: 212*n
				height: 140*n
				x: 220*n*k+32*n
				image: qunarData.data.recommendProducts[i].slideCard.cardItems[k].imgUrl
				
			SlideCardTitle = new TextLayer
				parent: SlideCardView
				y: 148*n
				fontSize: 30*n
				textOverflow: "ellipsis"
				width: 212*n
				height: 32*n
				color: "#212121"
				text: qunarData.data.recommendProducts[i].slideCard.cardItems[k].title
				fontWeight: 800	
				
			SlideCardSubTitle = new TextLayer
				parent: SlideCardView
				y: 190*n
				fontSize: 24*n
				textOverflow: "ellipsis"
				width: 212*n
				height: 32*n
				color: "#616161"
				text: qunarData.data.recommendProducts[i].slideCard.cardItems[k].subtitle
				fontWeight: 400
				
			Cards[i].children[1].height = 220*n
			Cards[i].children[1].visible = true
			Cards[i].children[1].y = 80*n
			Cards[i].children[1].contentInset = right: 32*n	
	

	if qunarData.data.recommendProducts[i].itemType == 36 and qunarData.data.recommendProducts[i].logKey == "highspeed"
		SlideCardNum = qunarData.data.recommendProducts[i].slideCard.cardItems.length
		for j in [0...SlideCardNum]
			SlideCardView = new Layer
				parent: Cards[i].children[1].content
				borderRadius: CardRadius
				width: 212*n
				height: 140*n
				x: 220*n*j+32*n
				image: qunarData.data.recommendProducts[i].slideCard.cardItems[j].imgUrl
				
			SlideCardTitle = new TextLayer
				parent: SlideCardView
				y: 148*n
				fontSize: 30*n
				textOverflow: "ellipsis"
				width: 212*n
				height: 32*n
				color: "#212121"
				text: qunarData.data.recommendProducts[i].slideCard.cardItems[j].title
				fontWeight: 800	
				
			SlideCardSubTitle = new TextLayer
				parent: SlideCardView
				y: 190*n
				fontSize: 24*n
				textOverflow: "ellipsis"
				width: 212*n
				height: 32*n
				color: "#616161"
				text: qunarData.data.recommendProducts[i].slideCard.cardItems[j].subtitle
				fontWeight: 400
			Cards[i].children[1].height = 220*n
			Cards[i].children[1].visible = true
			Cards[i].children[1].y = 80*n
			Cards[i].children[1].contentInset = right: 32*n	
			
			
	#找低价
	lowPriceCardNum = null
	if qunarData.data.recommendProducts[i].itemType == 27 then lowPriceCardNum = qunarData.data.recommendProducts[i].sale.cards.length
	if qunarData.data.recommendProducts[i].itemType == 27
		CardPage = new PageComponent
			borderRadius: CardRadius
			y: 80*n
			parent: Cards[i]
			width: (Screen.width-40*n)*0.606
			height: (Screen.width-40*n)*0.66*0.654
		CardPage.content.draggable.vertical = false
		CardPage.content.draggable.overdrag = false
		
		lowPriceCard1 = new Layer
			parent: Cards[i]
			width: Screen.width*0.33
			height: Screen.width*0.33*0.6
			borderRadius: CardRadius
			y: 80*n
			x: Align.right(-32*n)
			image: qunarData.data.recommendProducts[i].sale.card1.img
		
		lowPriceCard1Title = new TextLayer
			parent: lowPriceCard1
			color: "#FFF"
			fontSize: CardTitleSize
			fontWeight: 900
			x: 16*n
			y: 12*n
			text: qunarData.data.recommendProducts[i].sale.card1.title
				
		lowPriceCard1SubTitle = new TextLayer
			parent: lowPriceCard1
			color: "#FFF"
			fontSize: CardSubTitleSize
			fontWeight: 400
			x: 16*n
			y: 56*n
			text: qunarData.data.recommendProducts[i].sale.card1.subDesc
		
		lowPriceCard2 = new Layer
			parent: Cards[i]
			width: Screen.width*0.33
			height: Screen.width*0.33*0.6
			borderRadius: CardRadius
			y: lowPriceCard1.y+lowPriceCard1.height+8*n
			x: Align.right(-32*n)
			image: qunarData.data.recommendProducts[i].sale.card2.img			
		lowPriceCard2Title = new TextLayer
			parent: lowPriceCard2
			color: "#FFF"
			fontSize: CardTitleSize
			fontWeight: 900
			x: 16*n
			y: 12*n
			text: qunarData.data.recommendProducts[i].sale.card2.title
				
		lowPriceCard2SubTitle = new TextLayer
			parent: lowPriceCard2
			color: "#FFF"
			fontSize: CardSubTitleSize
			fontWeight: 400
			x: 16*n
			y: 56*n
			text: qunarData.data.recommendProducts[i].sale.card2.subDesc	
		
		#指示器
		allCardIndicators = []
		for number in [0...lowPriceCardNum]
			CardPageIndicator = new Layer
				parent:Cards[i]
				backgroundColor: "#CCC"
				width:12*n
				height:6*n
				x: (CardPage.width/32+8*n)*number+CardPage.width/2-14*n
				y: 16*n+CardPage.height+CardPage.y
				z: 2
				opacity: 0.3
			CardPageIndicator.states.add(active:{opacity:1,backgroundColor:"#00BCD4"})
			CardPageIndicator.states.animationOptions = time:0.25
			allCardIndicators.push(CardPageIndicator)
		
		allCardIndicators[0].opacity = 1
		allCardIndicators[0].backgroundColor = "#00BCD4"
		CardPage.on "change:currentPage", ->
			current = CardPage.horizontalPageIndex(CardPage.currentPage)
			CardPageIndicator.states.switch("default") for CardPageIndicator in allCardIndicators
			allCardIndicators[current].states.switch("active")			
	
	#翻页卡片
	for j in [0...lowPriceCardNum]
		Cards[i].children[2].x = 32*n
		lowPriceCardsGroup = new Layer
			borderRadius: CardRadius
			parent: Cards[i].children[2].content
			width: (Screen.width-40*n)*0.606
			height: (Screen.width-40*n)*0.66*0.654
			x: [(Screen.width-40*n)*0.606+8*n]*j
			image: qunarData.data.recommendProducts[i].sale.cards[j].img
		
		lowPriceCardsMask = new Layer
			parent: lowPriceCardsGroup
			width: lowPriceCardsGroup.width
			height: lowPriceCardsGroup.height
			image: "images/lowPrice/mask.png"
			borderRadius: CardRadius
		
		lowPriceCardsPrice = new TextLayer
			parent: lowPriceCardsGroup
			text: "¥"+qunarData.data.recommendProducts[i].sale.cards[j].price
			color: "#FFF"
			fontSize: CardPriceSize
			x: 16*n
			y: Align.bottom(-56*n)
			fontWeight: 700	
		
		lowPriceCardsOriginPrice = new TextLayer
			parent: lowPriceCardsGroup
			text: "¥"+qunarData.data.recommendProducts[i].sale.cards[j].originPrice
			color: "#FFF"
			fontSize: CardSubTitleSize
			x: lowPriceCardsPrice.x+lowPriceCardsPrice.width+12*n
			y: Align.bottom(-66*n)
			textDecoration: "line-through"
			fontWeight: 400
		
		lowPriceCardsTag = new Layer
			x: 16*n
			y: 16*n
			parent: lowPriceCardsGroup
			width: 132*n
			height: 48*n
			backgroundColor: "#FF736B"
			borderRadius: 4
		
		lowPriceCardsTagCont = new TextLayer
			parent: lowPriceCardsTag
			x: Align.center
			y: Align.center
			text: qunarData.data.recommendProducts[i].sale.cards[j].title
			fontSize: 24*n
			color: "#FFF"
			fontWeight: 700
		
					
		#如果不传入折扣价则为空并隐藏“¥”
		if qunarData.data.recommendProducts[i].sale.cards[j].originPrice == undefined then lowPriceCardsOriginPrice.text = ""
		
		lowPriceCardsDesc = new TextLayer
			parent: lowPriceCardsGroup
			width: lowPriceCardsGroup.width-32*n
			textOverflow: "ellipsis"
			height: 32*n
			x: 16*n
			fontSize: CardSubTitleSize
			color: "#FFF"
			text: qunarData.data.recommendProducts[i].sale.cards[j].desc
			y: Align.bottom(-16*n)
			clip: true		
		
	
	#巨幅banner	
	if qunarData.data.recommendProducts[i].itemType == 11
		ad = new Layer
			parent: Cards[i]
			width: Screen.width-64*n
			y: 10*n
			x: Align.center
			borderRadius: CardRadius
			height: 220*n
			backgroundColor: "#CCC"
			image: qunarData.data.recommendProducts[i].advertisements.imgUrl
		Cards[i].children[1].visible = false
		Cards[i].children[1].height = 220*n
		Cards[i].height = Cards[i].contentFrame().height
	
	
						

	

	
	#目的地
	items = null
	if qunarData.data.recommendProducts[i].itemType == 40 then items = qunarData.data.recommendProducts[i].hotDestinationNewView.recommendItemList.length
	for j in [0...items]
		hotDestinationNewView = new Layer
			parent: Cards[i].children[1].content
			borderRadius: CardRadius
			width: 270*n
			height: 360*n
			x: 278*n*j+32*n
			image: qunarData.data.recommendProducts[i].hotDestinationNewView.recommendItemList[j].imgUrl
			
		hotDestinationMask = new Layer
			parent: hotDestinationNewView
			width: 270*n
			height: 360*n
			borderRadius: CardRadius
# 				backgroundColor: "#000"
			image: "images/hotDestination/mask.png"
			
		hotDestinationCityName = new TextLayer
			parent: hotDestinationNewView
			fontSize: CardTitleSize
			x: 16*n
			y: Align.bottom(-56*n)
			fontWeight: 900
			color: "#FFF"
			text:qunarData.data.recommendProducts[i].hotDestinationNewView.recommendItemList[j].city
		
		hotDestinationCityDesc = new TextLayer
			parent: hotDestinationNewView
			fontSize: CardSubTitleSize
			x: 16*n
			y: Align.bottom(-16*n)
			fontWeight: 400
			color: "#FFF"
			text:qunarData.data.recommendProducts[i].hotDestinationNewView.recommendItemList[j].desc
		
		hotDestinationTag = new Layer
			parent: hotDestinationNewView
			width: 104*n
			height: 40*n
			backgroundColor: null
			x: 16*n
			y: Align.bottom(-116*n)
			image: qunarData.data.recommendProducts[i].hotDestinationNewView.recommendItemList[j].iconImg
					
		Cards[i].children[1].visible = true
		Cards[i].children[1].height = 360*n
		Cards[i].children[1].y = 80*n
		Cards[i].children[1].contentInset =
			right: 32*n	
			
			
			
			
						
# 	print Cards[i].children[1]
# 十字交互体验优化
	Cards[i].children[1].content.on Events.DragMove, ->

		if Math.abs(@draggable.offset.x)>40*n
# 			print 1
			homeScroll.content.draggable.enabled = false
# 			@draggable.enabled = false
		else
# 			print 2
			homeScroll.content.draggable.enabled = true	
# 	
	Cards[i].children[1].content.on Events.DragEnd, ->
		homeScroll.content.draggable.enabled = true				
							
	#重置卡片模块高度
	
	Cards[i].height = Cards[i].contentFrame().height

	Cards[i].y = iconsNav.y + iconsNav.height+64*n+540*n*i

# 	for i in [1...qunarData.data.recommendProducts.length]	
# 		Cards[n].y = Cards[n-1].y+Cards[n-1].height+240*n
Cards[2].y = Cards[1].y+Cards[1].height+120*n
Cards[3].y = Cards[2].y+Cards[2].height+120*n
Cards[4].y = Cards[3].y+Cards[3].height+120*n
Cards[5].y = Cards[4].y+Cards[4].height+80*n
Cards[6].y = Cards[5].y+Cards[5].height+100*n

# 		print Cards[i].height
# 	Cards[i].y = Cards[i-1].y+Cards[i].height+Cards[i-2].height+64*n
# 	print Cards[1].height

homeScroll.height = Screen.height+100*n

cardShowValue = new TextLayer
	width: Screen.width/2
# 	height: 80
	z: 2
	backgroundColor: "#000"
	fontSize: 16
	textAlign: "center"
	y: Align.center
	x: Align.center
	color: "red"
	fontWeight: 900
	text: "卡片曝光面积"
	visible: false

scrollSpeed = new TextLayer
	width: Screen.width/2
	y: cardShowValue.y+120
	z: 2
	x: Align.center
	textAlign: "center"
	fontSize: 16
	fontWeight: 900
	color: "green"
	text: "Scroll speed"
	backgroundColor: "#000"
	visible: false


# homeScroll.content.draggable.on Events.DragMove, ->
# 	scrollSpeed.text = "Scroll speed" + Math.abs(homeScroll.content.draggable.velocity.y).toFixed(2)
	
homeScroll.content.draggable.on Events.DragEnd, ->
	
# 	print homeScroll.content.draggable.velocity.y
	for i in [0...qunarData.data.recommendProducts.length]
		cardShowPercent = (Screen.height-Cards[i].y-homeScroll.content.y-49)/Cards[i].height
		if cardShowPercent>1 then cardShowPercent = "100%"
		if Math.abs(homeScroll.content.draggable.velocity.y) < 1.5 and cardShowPercent>0
			if Cards[i].y+homeScroll.content.y>64 and Cards[i].y+homeScroll.content.y < Screen.height-Cards[0].height then cardShowValue.text = Cards[i].children[0].text+"100%"		
			else cardShowValue.text = Cards[i].children[0].text+(cardShowPercent*100).toFixed(2)+"%"

# 		print Cards[i].children[0].text
homeScroll.on Events.Move, ->
	scrolltoY(homeScroll.scrollY)
	
scrolltoY = (y) ->
	navbarWhite.opacity = Utils.modulate(y, [0, 164*n], [0,1], true)
	navbar.opacity = Utils.modulate(y, [0, -22*n], [1,0], true)
	topGdt.opacity = Utils.modulate(y, [0, -80*n], [0,0.5], true)
	loadtxt.opacity = Utils.modulate(y, [20*n, -40*n], [0,1], true)
	view.y = Utils.modulate(y, [0, -10*n], [120*n,-30*n], true)
	view.opacity = Utils.modulate(y, [0, -20*n], [0,1], true)
	loadtxt.y = Utils.modulate(y, [0, -80*n], [view.y+view.height-24*n,view.y+view.height-32*n], true)
	s = Math.round(homeScroll.content.y/frameRate)

		
# 	print homeScroll.content.y
	
	beyondNum = frameStep*frameRate
	loadtxt.text = "下拉加载"
# 	
# 	Utils.domLoadJSON "https://qunar-138bc.firebaseio.com/data.json", (error, qunarData.data) ->
# 		print qunarData.data.currentCity
# 	
	if s < 0
		s = 0
		loadcontent.image = "images/startsprite.png"
	
# 	if s == 30
# 		sound.play()
		
	if s >=  frameStep-1
# 		print s
		loadtxt.text = "加载中..."
		s = frameStep-1
		loadcontent.image = "images/sprite.gif"
		
		
		
	else
		loadcontent.image = "images/startsprite.png"
	
	pullAnimate(s)	


if Screen.height>=812
	frameRate = 3
	scrolltoY = (y) ->
		navbarWhite.opacity = Utils.modulate(y, [0, 164*n], [0,1], true)
		navbar.opacity = Utils.modulate(y, [0, -20*n], [1,0], true)
		topGdt.opacity = Utils.modulate(y, [0, -80*n], [0,0.5], true)
		loadtxt.opacity = Utils.modulate(y, [20*n, -40*n], [0,1], true)
		view.y = Utils.modulate(y, [0, -10*n], [120*n,30*n], true)
		view.opacity = Utils.modulate(y, [0, -20*n], [0,1], true)
		loadtxt.y = Utils.modulate(y, [0, -80*n], [view.y+view.height-24*n,view.y+view.height-32*n], true)
		s = Math.round(homeScroll.content.y/frameRate)
		beyondNum = frameStep*frameRate
		loadtxt.text = "下拉加载"
		if s < 0
			s = 0
			loadcontent.image = "images/startsprite.png"
	
		if s >=  frameStep-1
	# 		print s
			loadtxt.text = "加载中..."
			s = frameStep-1
			loadcontent.image = "images/sprite.gif"
			
	
			
		else
			loadcontent.image = "images/startsprite.png"
		
		pullAnimate(s)


# Cards[1].onTap (event, layer) ->
# 	print cardShowValue.text
# 	print scrollSpeed.text
# 			
# 
# Cards[6].onTap (event, layer) ->
# 	print cardShowValue.text
# 	print scrollSpeed.text
			
	

 
# 十字交互体验优化
# pageScroller.content.on Events.DragMove, ->
# 	if Math.abs(pageScroller.content.draggable.offset.x)>40*n
# 		homeScroll.content.draggable.enabled = false
# 	else
# 		homeScroll.content.draggable.enabled = true	
# 
# pageScroller.content.on Events.DragEnd, ->
# 	homeScroll.content.draggable.enabled = true
	



