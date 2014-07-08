Ext.define('MyApp.event.User', {
    extend : 'Ext.util.Observable',
    mixins:['MyApp.event.ModelEvent'],
    singleton : true,
    constructor : function() {
        this.callParent(arguments);
    }
});
