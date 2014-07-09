set ssrPath=%CD%
set webapp=%CD%\..


copy /Y %webapp%\WEB-INF\jsp\loadjs_dev.jspf %webapp%\
cd %webapp%
sencha  --time compile -classpath=ext/src,js page -in loadjs_dev.jspf -out WEB-INF\jsp\loadjs.jspf -yui
move /Y %webapp%\WEB-INF\jsp\all-classes.js %webapp%\
del %webapp%\loadjs_dev.jspf


 
:: set timestamp=%Date:~0,4%-%Date:~5,2%-%Date:~8,2%_%time:~-11,2%h%time:~-8,2%m%time:~-5,2%s
:: cd %ssrPath%
:: ssr.exe -f %webapp%\WEB-INF\jsp\loadjs.jspf -a -s all-classes.js -r all-classes.js?timestamp=%timestamp%
:: del %webapp%\WEB-INF\jsp\loadjs.jspf.bak*

pause

