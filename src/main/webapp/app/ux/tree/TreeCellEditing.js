
//http://www.sencha.com/forum/showthread.php?176031-Tree-rowEditing-or-cellEditing
	
Ext.define('MyApp.ux.tree.TreeCellEditing', {
	alias : 'plugin.treecellediting',
	extend : 'Ext.grid.plugin.CellEditing',

	init : function(tree) {
		var treecolumn = tree.headerCt.down('treecolumn');
		treecolumn.editor = treecolumn.editor || {
			xtype : 'textfield'
		};

		this.callParent(arguments);
	},

	getEditingContext : function(record, columnHeader) {
		var me = this, grid = me.grid, store = grid.store, rowIdx, colIdx, view = grid.getView(), root = grid.getRootNode(), value;

		if (Ext.isNumber(record)) {
			rowIdx = record;
			// record = store.getAt(rowIdx);
			record = root.getChildAt(rowIdx);
		} else {
			// rowIdx = store.indexOf(record);
			rowIdx = root.indexOf(record);
		}
		if (Ext.isNumber(columnHeader)) {
			colIdx = columnHeader;
			columnHeader = grid.headerCt.getHeaderAtIndex(colIdx);
		} else {
			colIdx = columnHeader.getIndex();
		}

		value = record.get(columnHeader.dataIndex);
		return {
			grid : grid,
			record : record,
			field : columnHeader.dataIndex,
			value : value,
			row : view.getNode(rowIdx),
			column : columnHeader,
			rowIdx : rowIdx,
			colIdx : colIdx
		};
	}
});



//var onEdit = function(button, node) {
//    var menu    = button.up(),						
//        node    = node || menu.treeNode,					
//        view    = menu.treeView,
//        tree    = view.ownerCt,
//        selMdl  = view.getSelectionModel(),
//        colHdr  = tree.headerCt.getHeaderAtIndex(0);
//
//    if (selMdl.getCurrentPosition) {					
//        pos = selMdl.getCurrentPosition();
//        colHdr = tree.headerCt.getHeaderAtIndex(pos.column);
//    }
//    treeEditor.startEdit(node, colHdr);					
//};