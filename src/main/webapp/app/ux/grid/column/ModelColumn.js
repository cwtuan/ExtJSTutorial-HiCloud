Ext.define('MyApp.ux.grid.column.ModelColumn', {
	extend : 'MyApp.ux.grid.column.ComponentColumn',
	alias : 'widget.ModelColumn',
	link : true,
	initComponent : function() {
		var me = this;
		if (!me.flex) {
			me.width = 200;
		}
		me.dataIndex = Ext.isEmpty(me.modelField) ? 'name' : (me.modelField + 'Name');
		me.callParent(arguments);
	},
	getText : function(record) {
		var me = this;
		return record.get(me.dataIndex);
	},
	onModelClick : function(record) {
		var me = this;
		MyApp.event.Model.fireEvent('select', {
			id : Ext.isEmpty(me.modelField) ? record.get('id') : record.get(me.modelField + 'Id')
		});
	},
	renderer : function(value, meta, record) {
		var me = this;
		if (!Ext.isEmpty(me.getText(record))) {
			if (me.link) {
				var button = {
					xtype : 'button',
					textAlign : 'left',
					componentCls : 'model-link'

				}
				return Ext.applyIf(button, {
					text : me.getText(record),
					icon : me.getIcon(record),
					handler : function() {
						if (me.link) {
							me.onModelClick(record);
						}
					}
				});
			} else {
				return '<img src="' + me.getIcon(record) + '"/> ' + me.getText(record) + '</tpl>';
			}
		}
		return '';
	}
});