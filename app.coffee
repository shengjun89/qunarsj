# Preview on a mobile device
BottomBarData = [{src:"images/home.png",name:"首页",current:""},{src:"images/jny.png",name:"行程",current:""},{src:"images/qlg.png",name:"趣浪",current:""},{src:"images/srv.png",name:"客服",current:""},{src:"images/sel.png",name:"我的",current:""}]

currentArr = ["images/home.gif","images/jny.gif","images/qlg.gif","images/srv.gif","images/sel.gif"]

loadcamer = ["images/u54.gif","images/u55.gif","images/u56.gif","images/u54.gif","images/u55.gif"]


sound = new Audio("sounds/Button2.m4a")


n = Screen.width/750
defaultColor = "#7A818D"
primaryColor = "#00BCD4"
MainPageArr = []
for i in [0...BottomBarData.length]
	Page = new Layer
		width: Screen.width
		height: Screen.height
		backgroundColor: "#FFF"
		visible: false
		
	loadView = new Layer
		parent: Page
		width: 120
		height: 120
		x: Align.center
		y: Align.center(-40)
		backgroundColor: null
		scale: 0.8
		image: loadcamer[i]	
# 	StatusBar = new StatusBar	
	MainPageArr.push(Page)

#底部导航

BottomBarNavArr = []
BottomBarNavIconArr = []
BottomBarNavIconCurArr = []
BottomBarNavNamesArr = []
	
BottomBar = new Layer
	width: Screen.width
	height: 96*n
	y: Align.bottom
	backgroundColor: "#FFF"
	opacity: 0.8
	shadowY: -1
	shadowColor: "rgba(0,0,0,0.05)"	
	
for i in [0...BottomBarData.length]
	BottomBarNav = new Layer
		parent: BottomBar
		width: Screen.width/BottomBarData.length
		x: Screen.width/BottomBarData.length*i
		backgroundColor: "#FFF"
		
	BottomBarNavIconCurrent = new Layer
		parent: BottomBarNav
		width: 54*n
		height: 54*n
		x: Align.center()
		y: 4
		backgroundColor: null
		image: 	BottomBarData[i].current
		opacity: 0
		
	BottomBarNavIcon = new Layer
		parent: BottomBarNav
		width: 54*n
		height: 54*n
		x: Align.center()
		y: 4
		backgroundColor: null
		image: 	BottomBarData[i].src
		
	NavName = new TextLayer
		parent: BottomBarNav
		y: 64*n
		width: Screen.width/BottomBarData.length
		fontSize: 19*n
		textAlign: "center"
		color: defaultColor
		text: BottomBarData[i].name	
		
		
	BottomBarNavArr.push(BottomBarNav)
	BottomBarNavIconArr.push(BottomBarNavIcon)
	BottomBarNavIconCurArr.push(BottomBarNavIconCurrent)
	BottomBarNavNamesArr.push(NavName)		
		
		
# 初始化导航样式

BottomBarNavIconArr[0].opacity = 0	
BottomBarNavIconCurArr[0].opacity = 1
BottomBarNavIconCurArr[0].image = currentArr[0]
BottomBarNavNamesArr[0].color = primaryColor
MainPageArr[0].visible = true
for i in [0...BottomBarData.length]
	BottomBarNavArr[i].onTap ->
		sound.play()
		for i in [0...BottomBarData.length]
			BottomBarNavIconArr[i].opacity = 1
			BottomBarNavIconArr[i].scale = 1
			BottomBarNavIconCurArr[i].opacity = 0
			BottomBarNavIconCurArr[i].image = ""
			BottomBarNavNamesArr[i].color = defaultColor		
# 			MainPageArr[i].opacity = 0
			MainPageArr[i].visible = false
# 		print @children[2]
		@children[2].color = primaryColor
		@children[1].opacity = 0
		@children[0].opacity = 1
		@children[0].image = currentArr[@index]
		MainPageArr[@index].visible = true				
