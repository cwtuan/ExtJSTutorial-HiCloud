# ExtJS 4.2 #

+ requires 

		A. requires store in grid
		B. 
		@viewport
		// layout
		'Ext.layout.container.Card', 'Ext.layout.container.Border'

+ css/override.css會造成win內的文字很淡 

+ change theme
   
		 修改webapp\bootstrap.css
    
+ make/buildExtJS.bat
+ loadjs_dev的requires、和ExtExtting等，統一寫在My.Application

+ Don't  make autoCreateViewport: true
   
		 createViewport, singin等jsp移除MyApp.event.App.on

- the order of external js : Locale?????

#hicloud integration

- http://localhost:8080/cboss_ui_plugin/sample.entrypoint?hnno=xx&locale=xx&sessionid=xx&token=xx&userid=xx

- extjs, app.js, Application.js, viewport.js是否也要包含在all-classes.js  => NO (可再loadjs加入這些，all-classes移除這些)
bootstrpe.js不會再allclass裡

+ TODO locale-2013-12-11.js打包到最all class前面 (loadjs.jspf)


+ 打包yui->>> script

+ make

		loadJS沒有註冊到class系統，改用script
		//MyApp.ExtOverride.init(MyApp.Config);
		移除all-classes的Ext (找到MyApp.Config，刪除這之前全部code)


##tip
- viewport (hicloud) -> MyApp.view.Entry(hidesk)
- notifybar改成alert?
- controller改用event(Ex: projectGrid, userGrid)
- After make, remove ext from all-classes.js
- 移除ExtOverride, ExtFix

## future work
maintoolbar at left


