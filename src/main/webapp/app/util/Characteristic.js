Ext.define('MyApp.util.Characteristic', {
	singleton : true,
	alternateClassName : [ 'MyApp.Characteristic' ],
	config : {
		charMap : new Ext.util.HashMap()		
	},
	constructor : function(config) {
		var chars = [];
		chars.push('fee28150-8df8-4b4b-b090-b1ed637f6958');
		chars.push('4d400fde-1e46-4a3c-a6bf-f6b4efd768aa');
		this.charMap.add('abc', chars);

		this.initConfig(config);
	},	
	
	
	
	getCustomFields : function(productOid){
		
		var me = this;
		var extraFields = [];
		//1. get all chars
		var chars = me.getSpec(productOid);
		
		//2. get all field component
		var customFields = Ext.ClassManager.getNamesByExpression('MyApp.view.queue.characteristics.field.*');		
		console.log(customFields);
		
		//3. convert characteristicId to object which is under 'MyApp.view.queue.characteristics.field.*'
		Ext.each(chars, function(c){
			Ext.each(customFields , function(field){
				console.log(field);
				var obj = Ext.ClassManager.get(field);
				console.log(obj.prototype.characteristicId);
				if(c.id === obj.prototype.characteristicId){
					extraFields.push(obj);
					return false;
				}
			});
			console.log(c);
		});
		
		return extraFields;		
		
	},
	
	// get All common char by productOid  
	getSpec : function(productOid) {
		
		var me = this;
		var chars = [];
		console.log('specId=='+productOid);		
		console.log(me.charMap.containsKey(productOid));
		
		if(me.charMap.containsKey(productOid)){ //get from map
			chars = me.charMap.get(productOid);
			console.log('has Key, get from map');
		}else{ //query from rest
			chars.push('1177771');
			chars.push('23456789123');
			me.charMap.add(productOid, chars);
			console.log('no Key, query from rest');			
		}
		
		console.log(chars);
		return chars;
	
	}
});
