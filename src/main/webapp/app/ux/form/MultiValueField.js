Ext.define('MyApp.ux.form.MultiValueField', {//string array to string
	extend: 'Ext.form.field.Text',
    alias: 'widget.multivaluefield',
    width: 0,
    height: 0,    
    split : null,
    
    setValue: function(val) {
        var me = this;
        if(me.split==null){
        	me.split=',';
        }
        if(val!=null && val.length>0){
        	console.log(val);
        }else{
        	console.log('val undefine or null ='+val);
        	me.setRawValue(me.valueToRaw([]));
        }
        
        me.callParent();
    },
    
    getValue: function(){
    	 var me = this;
         //val = me.rawToValue(me.processRawValue(me.getRawValue()));
    	// me.callParent();
    	 console.log('GET VALUE');
    	 console.log(me.value);
    	 var val = me.value;
    	 console.log(val);
    	 
    	 //me.value = val;
    	 return val;
    }
});
