set make_dir=%CD%
set webapp=%CD%\..


copy /Y %webapp%\WEB-INF\jsp\loadjs_dev.jspf %webapp%\
cd %webapp%

sencha  --time compile -classpath=ext/src,js page -in loadjs_dev.jspf -out WEB-INF\jsp\loadjs_fake.jspf -yui
del WEB-INF\jsp\loadjs_fake.jspf


move /Y %webapp%\WEB-INF\jsp\all-classes.js %webapp%\all-classes-tmp.js
del %webapp%\loadjs_dev.jspf

cd %make_dir%
node post-compile.js
 
:: set timestamp=%Date:~0,4%-%Date:~5,2%-%Date:~8,2%_%time:~-11,2%h%time:~-8,2%m%time:~-5,2%s

:: ssr.exe -f %webapp%\WEB-INF\jsp\loadjs.jspf -a -s all-classes.js -r all-classes.js?timestamp=%timestamp%
:: del %webapp%\WEB-INF\jsp\loadjs.jspf.bak*

pause

