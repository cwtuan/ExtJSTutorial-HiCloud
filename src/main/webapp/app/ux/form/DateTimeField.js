Ext.define('MyApp.ux.form.DateTimeField', {
	extend : 'Ext.form.FieldSet',
	alias : 'widget.dateTimeField',
	timeIncrement : null,
	fieldLabel : null,
	name : null,

	columnWidth : 1,
	layout : 'column',
	border : false,
	defaults : {
		labelAlign : 'right'
	},

	initComponent : function() {
		var me = this;
		me.items = [ {
			itemId : 'dateUtil',
			fieldLabel : me.fieldLabel,
			xtype : 'datefield',
			columnWidth : 0.5,
			format : 'Y/m/d',
			minValue : new Date(),
			// value : new Date(),
			allowBlank : true
		}, {
			itemId : 'timeUtil',
			xtype : 'timefield',
			columnWidth : 0.2,
			format : 'H:i',
			increment : me.timeIncrement,
			// value : new Date(),
			allowBlank : true
		}, {
			xtype : 'hiddenfield',
			name : me.name
		} ];

		me.callParent(arguments);

		me.down('datefield').on({
			blur : function(field, The, eOpts) {
				console.log('date blur');
				me.down('hiddenfield').setValue(me.getValue());
			}
		});

		me.down('timefield').on({
			blur : function(field, The, eOpts) {
				console.log('time blur');
				me.down('hiddenfield').setValue(me.getValue());
			}
		});

		// me.getValue();
	},

	getValue : function() {
		var val;
		console.log(this.down('datefield'));
		console.log(this.down('timefield'));
		if (this.down('datefield').rawValue == "" || this.down('timefield').rawValue == "") {
			console.log("one of rawValue is empty");
			return 0;			
		}

		var datetime = this.down('datefield').rawValue + " " + this.down('timefield').rawValue;
		console.log(datetime);
		//Date string to long
		val = Date.parse(datetime, 'Y/m/d H:i');
		console.log(val);

		return val;
	}
});
