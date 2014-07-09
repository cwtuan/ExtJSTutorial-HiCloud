var Locale={langUrls:["app/locale/lang_en_US.properties","app/locale/lang_zh_CN.properties","app/locale/lang_zh_TW.properties"],hasKey:function(e){return this.map[e]!=null},getMsg:function(e){if(this.map[e]){var t=[],n;if(arguments.length==1){return this.map[e]}else{for(n=1;n<arguments.length;n++){t.push(arguments[n])}return this.map[e].replace(/\{(\d+)\}/g,function(e,n){return t[n]})}}return e+".UNDEFINED"},setLanguage:function(e){this._setCookie("lang",e)},_setCookie:function(e,t){document.cookie=e+"="+escape(t)},_getCookie:function(e){var t=e+"=",n=t.length,r=document.cookie.length,i=0,s=0;while(i<r){s=i+n;if(document.cookie.substring(i,s)==t){return this._getCookieVal(s)}i=document.cookie.indexOf(" ",i)+1;if(i===0){break}}return null},_getCookieVal:function(e){var t=document.cookie.indexOf(";",e);if(t==-1){t=document.cookie.length}return unescape(document.cookie.substring(e,t))},getLanguage:function(){var e=this._getQueryParam(location.search,"lang")||this._getCookie("lang")||this._guessLanguage();return this._formatLang(e)},_guessLanguage:function(){return navigator.language||navigator.browserLanguage||navigator.userLanguage},load:function(){var e=this;this.map={};var t;if(window.XMLHttpRequest){t=new XMLHttpRequest}else{t=new ActiveXObject("Microsoft.XMLHTTP")}t.onreadystatechange=function(){if(t.readyState==4&&t.status==200){var n=t.responseText.split(/\r\n|\r|\n/g);for(var r=0;r<n.length;++r){var i=n[r].indexOf("=");var s=n[r].substr(0,i);var o=n[r].substr(i+1);if(s&&o){o=o.replace(/\r/g,"");o=o.replace(/\n/g,"");e.map[s]=o}}}};var n=e.getLanguage();for(var r=0,i=e.langUrls.length;r<i;r++){if(e.langUrls[r].indexOf(n)!==-1){t.open("GET",e.langUrls[r]+"?"+this._getRandParam(),false);t.send();return}}t.open("GET",e.langUrls[0]+"?"+this._getRandParam(),false);t.send()},_getRandParam:function(){return"_rand="+(new Date).getTime()},_formatLang:function(e){var e=e.split("_");if(e.length==1){e=e[0].split("-")}return e[0].toLowerCase()+"_"+e[1].toUpperCase()},_getQueryParam:function(e,t){e=location.search.split("?")[1];if(e){var n=e.split("&");if(n){for(var r=0;r<n.length;++r){var i=n[r].split("=");if(i[0]===t)return i[1]}}}return null}};Locale.load();