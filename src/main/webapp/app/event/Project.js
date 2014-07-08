Ext.define('MyApp.event.Project', {
    extend : 'Ext.util.Observable',
    mixins:['MyApp.event.ModelEvent'],
    singleton : true,
    constructor : function() {
        this.callParent(arguments);
    }
});
