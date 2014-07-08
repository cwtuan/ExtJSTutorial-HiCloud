Ext.define('MyApp.util.Format', {
	singleton : true,
	alternateClassName : [ 'MyApp.Format' ],
	usagePercentage : function(value) {
		if (value && !isNaN(value)) {
			// show 100% when larger than 100%, should only happened in some rare cases
			value = value > 100 ? 100 : value;
			value = value.toFixed(2) + ' %';
		} else
			value = null;
		return value;
	},
	highchartsTooltip : function(converter) {

		return function() {
			var s = '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '</b>';
			var ps = this.points;
			if (!Ext.isArray(ps)) {
				ps = [ this.point ];
			}
			$.each(ps, function(i, point) {
				var y = point.y;
				if (converter) {
					y = converter(point.y, 'B', i);
				}
				s += '<br/><span style="color:' + point.series.color + '">' + point.series.name + '</span>: <b>' + y + '</b>';
			});
			return s;
		};
	},
	fullFileNameFromPath : function(path) {
		return path.replace(/^.*(\\|\/|\:)/, '');
	},
	fileName : function(filename) {
		return filename.split(/\.([^\.]+)$/)[0];
	},
	fileExtension : function(filename) {
		return filename.split(/\.([^\.]+)$/)[1];
	},
	getDate : function(timestamp) {
		// TODO i18n. Y/m/d -> m/d/Y for en_US
		return (timestamp == null) || (timestamp == 0) ? '' : Ext.util.Format.date(new Date(timestamp), "Y/m/d H:i:s");
	},
	formatDate : function(date) { // Display week day within a week 
		if (!date) {
			return '';
		}
		date = new Date(date);

		var now = new Date(), d = Ext.Date.clearTime(now, true), notime = Ext.Date.clearTime(date, true).getTime();

		if (notime === d.getTime()) {
			return Locale.getMsg('view.common.today') + ' ' + Ext.Date.format(date, 'g:i a');
		}

		d = Ext.Date.add(d, 'd', -6);
		if (d.getTime() <= notime) {
			return Ext.Date.format(date, 'D g:i a');
		}
		return Ext.Date.format(date, 'Y/m/d g:i a');
	},
	secondsToTime : function(secs) {
		var hours = Math.floor(secs / (60 * 60));
		var divisor_for_minutes = secs % (60 * 60);
		var minutes = Math.floor(divisor_for_minutes / 60);
		var divisor_for_seconds = divisor_for_minutes % 60;
		var seconds = Math.ceil(divisor_for_seconds);
		
		if(hours<10){
			hours = '0'+hours;
			//console.log('hours',hours);
		}
		
		if(minutes<10){
			minutes = '0'+minutes;
		}
		
		if(seconds<10){
			seconds = '0'+seconds;
		}	
		
		var obj = hours + ':' + minutes + ':' + seconds;
		return obj;
	},
	seconds2Time : function(secs) {
		var hours = Math.floor(secs / (60 * 60));
		var divisor_for_minutes = secs % (60 * 60);
		var minutes = Math.floor(divisor_for_minutes / 60);
		var divisor_for_seconds = divisor_for_minutes % 60;
		var seconds = Math.ceil(divisor_for_seconds);	
		
		if(hours != 0){
			hours = hours + Locale.getMsg('view.common.hour');
		}
		else hours = '';
		
        if(minutes != 0){
        	minutes = minutes + Locale.getMsg('view.common.min');
        }
        else minutes = '';
        
        if(seconds != 0){
        	seconds = seconds+Locale.getMsg('view.common.sec');
        }
        else seconds = '';
		//var obj = hours + Locale.getMsg('view.common.hour')+minutes +Locale.getMsg('view.common.min')+ seconds+Locale.getMsg('view.common.sec');
		var obj = hours + minutes + seconds;
		return obj;
	},

	floatRound : function(value, digits) {
		var decimal = Math.pow(10, digits);
		return Math.round(value * decimal) / decimal;
	},
	
	//US
	currency : function(value){
		var currency = MyApp.Config.CURRENCY;
		//console.log(currency);
		if(currency==MyApp.Const.Currency.USD){
			//console.log('USD');
			//console.log('$' + this.floatRound(value, 2));
			return '$' + this.floatRound(value, 2);
		
		}else if(currency==MyApp.Const.Currency.NTD){
			
			return 'NTD' + this.floatRound(value, 0);
			
		}else{
			
			return '$' + this.floatRound(value, 2);
		}
		
		
	},

	alterFilePath : function(filePath, startIdx, endIdx) {
		var splitter;
		console.log(filePath.indexOf('/') != -1);
		if (filePath.indexOf('/') != -1) {
			splitter = '/';
		} else {
			splitter = '\\';
		}
		console.log(splitter);
		var arr = filePath.split(splitter);
		console.log(arr);
		var alterarr = Ext.Array.slice(arr, startIdx, endIdx);
		console.log(alterarr);

		var alterFilePath = '/';

		for ( var i = 0; i < alterarr.length; i++) {
			if (i < alterarr.length - 1) {
				alterFilePath += alterarr[i] + '/';
			} else {
				if (alterarr[i].indexOf('.') != -1) { // if last string contains . means filename
					alterFilePath += alterarr[i];
				} else {
					alterFilePath += alterarr[i] + '/';
				}

			}
		}

		console.log(alterFilePath);
		return alterFilePath;
	},

	alterPath : function(path, startIdx, endIdx) {
		var splitter;
		console.log(path.indexOf('/') != -1);
		if (path.indexOf('/') != -1) {
			splitter = '/';
		} else {
			splitter = '\\';
		}
		console.log(splitter);
		var arr = path.split(splitter);
		console.log(arr);
		var alterarr = Ext.Array.slice(arr, startIdx, endIdx);
		console.log(alterarr);
		var alterPath = '/';

		for ( var i = 0; i < alterarr.length; i++) {

			if (i == (alterarr.length - 1) && alterarr[i].indexOf('.') != -1) {
				console.log('SKIP FILENAME');
				console.log(alterarr[i]);
			} else {
				alterPath += alterarr[i] + '/';
			}

		}
		console.log(alterPath);
		return alterPath;
	},

	retriveFilename : function(fullpath) {
		var splitter;
		console.log(fullpath.indexOf('/') != -1);
		if (fullpath.indexOf('/') != -1) {
			splitter = '/';
		} else {
			splitter = '\\';
		}
		console.log(splitter);
		var arr = fullpath.split(splitter);
		console.log(arr);
		return arr[arr.length - 1];
	},
	
	formatDate : function(date) { // Display week day within a week 
		if (!date) {
			return '';
		}
		date = new Date(date);

		var now = new Date(), d = Ext.Date.clearTime(now, true), notime = Ext.Date.clearTime(date, true).getTime();

		if (notime === d.getTime()) {
			return Locale.getMsg('view.common.today') + ' ' + Ext.Date.format(date, 'g:i a');
		}

		d = Ext.Date.add(d, 'd', -6);
		if (d.getTime() <= notime) {
			return Ext.Date.format(date, 'D g:i a');
		}
		return Ext.Date.format(date, 'Y/m/d g:i a');
	}

});
