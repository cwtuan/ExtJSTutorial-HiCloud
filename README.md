ExtJS Tutorial Integrated with HiCloud
==========================
## 1. Basic Info
- ExtJS 4.2.0
- 可以在EntryPointServlet檢查權限: 
<http://localhost:8080/ExtJSTutorial-HiCloud/entrypoint?hnno=xx&locale=xx&sessionid=xx&token=xx&userid=xx>
- HiCloud負責部分：index.jsp -> app.js -> Application.js -> viewport
- viewport將會建立起 MyApp.view.Entry(HiDesk入口)
- ExtJS controller改用event(Ex: projectGrid, userGrid)
- 避免影響到global HiCloud移除ExtOverride, ExtFix
- notifybar改成Ext.Msg.alert? (修改Restful.js)


# 2. Build JS 
## 2.1. Installation:

### Sencha Cmd v4.0.4.84
Download <http://www.sencha.com/products/sencha-cmd/download> and install it.

### rubyinstaller-1.9.3
Download <http://rubyinstaller.org/downloads/> and install it. 

Add C:\Ruby193\bin to your system path.

### rubygems-2.0.3
Donwload <http://rubygems.org/pages/download> and extract it to C:\rubygems-2.0.3

	> cd rubygems-2.0.3
	> ruby setup.rb
	> gem install compass

### NodeJS-v0.10.29
Download <http://nodejs.org/download/> and install it.
 
## 2.2 make
###Dev Mode
修改完js後，F5瀏覽器碼上可看到效果
<http://localhost:8080/ExtJSTutorial-HiCloud/dev>

JS進入點：MyApp.view.Entry



###Production Mode
	> cd D:\ExtJSTutorial-HiCloud\src\main\webapp\make\
	> buildExtJS.bat
Eclipse Refresh專案後，瀏覽器F5 <http://localhost:8080/ExtJSTutorial-HiCloud>，可看到Chrome會印出build時間

JS進入點：<http://localhost:8080/ExtJSTutorial-HiCloud/entrypoint>