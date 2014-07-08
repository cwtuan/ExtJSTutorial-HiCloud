Ext.define('MyApp.store.project.User', {
	extend : 'Ext.data.Store',
	model : 'MyApp.model.project.User',
	sorters : [ 
//	            {
//		sorterFn : function(o1, o2) {
//			var getRank = function(o) {
//				var projectRole = o.get('projectRole');
//
//				if (projectRole === MyApp.Const.Project.Role.OWNER) {
//					return 1;
//				} else if (projectRole === MyApp.Const.Project.Role.ADMIN) {
//					return 2;
//				} else if (projectRole === MyApp.Const.Project.Role.MEMBER) {
//					return 3;
//				} else {
//					throw 'no such projectRole: ' + projectRole;
//				}
//			}, rank1 = getRank(o1), rank2 = getRank(o2);
//			if (rank1 === rank2) {
//				return 0;
//			}			
//			return rank1 < rank2 ? -1 : 1;
//		}
//	},
	{
		property : 'id',
		direction : 'ASC'
	} ]
});
