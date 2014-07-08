/*
 * EnhancedTreePanel
 * 1. Search node by text in tree
 * 2. stateful
 * 3. new method such as collapseRootChildren(..), findNode(...), etc.
 */

Ext.define('MyApp.ux.tree.EnhancedTreePanel', {
	extend : 'Ext.tree.Panel',

	// requires : [ 'Ext.ux.NodeDisabled' ],
	// plugins : [ {
	// ptype : 'nodedisabled',
	// preventSelection : false
	// } ],

	_doNodeReloadAndExpand : function(nodeId, remindingIds) {
		var me = this;
		if (remindingIds.length === 0) {
			console.log('select', nodeId);
			me.getSelectionModel().select(me.findNode(nodeId));
			return;
		}
		console.log('nodeId ', nodeId);
		console.log('remindingIds ', remindingIds);

		var node = this.getRootNode().findChild('id', nodeId, true);
		if (!node) {
			console.warn('cant find node', nodeId);
			return;
		}
		node.set('loaded', false);
		node.collapse();
		node.expand(false,

		function() {
			var nextFolder = remindingIds.shift();
			me._doNodeReloadAndExpand(Ext.String.filenameAppend(nodeId, nextFolder), remindingIds);
		});

	},

	/**
	 * Async reload adn expend node from lowerNodeId to upperNodeId. upperNodeId = null means just expand one node (lowerNodeId)
	 */
	nodeReloadAndExpand : function(lowerNodeId, upperNodeId) {
		console.log('lowerNodeId, upperNodeId', lowerNodeId, upperNodeId);
		if (!upperNodeId) {
			upperNodeId = lowerNodeId;
		}

		var folders = lowerNodeId.replace(upperNodeId, '').split(MyApp.Const.Folder.SEPARATOR);
		folders.shift(); // pop the first ''
		console.log('folders', folders);
		this._doNodeReloadAndExpand(upperNodeId, folders);

	},

	collapseRootChildren : function(callback, scope) {
		this.getRootNode().collapseChildren(true, callback, scope);
	},
	// tree search [START]
	// searching : false,
	// restoreExpandingState : function() {
	// var me = this;
	// if (me.expandedNodes && me.expandedNodes.length != 0) {
	// this.getRootNode().cascadeBy(function(node) {
	// if (Ext.Array.contains(me.expandedNodes, node.get('id'))) {
	// node.expand();
	// } else {
	// node.collapse();
	// }
	// });
	// }
	// },
	// setNodeVisible : function(node, matched) {
	// try {
	// var view = this.getView();
	// if (!view)
	// return;
	// var el = Ext.fly(view.getNodeByRecord(node));
	// if (!el)
	// return;
	// el.setVisibilityMode(Ext.Element.DISPLAY);
	// el.setVisible(matched);
	// node.data.displayed = matched;
	// } catch (e) {
	// console.warn(e);
	// }
	// },
	// isTextMatched : function(nodeText, filterString) {
	// filterString = filterString.toLowerCase();
	// nodeText = nodeText.toLowerCase();
	//
	// // Match Pattern 1: filtered by exact same text
	// // return (nodeText.indexOf(filterString) > -1) ? true : false;
	//
	// // Match Pattern 2: filtered by union
	// var filterwords = filterString.split(' ');
	// for ( var i = 0; i < filterwords.length; ++i) {
	// if (nodeText.indexOf(filterwords[i]) > -1) {
	// return true;
	// }
	// }
	// return false;
	// },
	// checkVisibityCascade : function(rootNode) {
	// var me = this;
	// var filterString = Ext.String.trim(this.down('#filterString').getValue());
	// // restore expanding state for the whole tree
	// if (filterString == '') {
	// if (rootNode.data.id == me.getRootNode().data.id) {
	// me.searching = false;
	// rootNode.cascadeBy(function() {
	// me.setNodeVisible(this, true);
	// });
	// me.restoreExpandingState();
	// }
	// return;
	// }
	// me.searching = true;
	// var removeMap = new Ext.util.HashMap();
	//
	// // It's assumed tree traversal is implemented by DFS
	// rootNode.cascadeBy(function() {
	// // 1. make all nodes visible
	// me.setNodeVisible(this, true);
	// // 2. Check which nodes should be invisible
	// if (!me.isTextMatched(this.data.text, filterString)) {
	// removeMap.add(this.data.id, this);
	//
	// } else {
	// // make invisible parent nodes which have visible children visible
	// this.bubble(function() {
	// this.expand();
	// removeMap.removeAtKey(this.data.id);
	// });
	// }
	// });
	//
	// removeMap.each(function(id, node, length) {
	// me.setNodeVisible(node, false);
	// });
	//
	// removeMap.clear();
	// },
	// checkVisibityBubble : function(rootNode) {
	// // rootNode can be any node in the tree, not just the root of whole tree
	// var me = this;
	// var filterString = Ext.String.trim(this.down('#filterString').getValue());
	//
	// if (!me.isTextMatched(rootNode.data.text, filterString)) { // not matched
	// // The rootNode is set invisible, then check if the parent need to be set invisible
	// rootNode.bubble(function() {
	// var parent = this;
	//
	// if (parent.data.id != me.getRootNode().data.id) {
	// me.setNodeVisible(parent, false);
	// }
	//
	// Ext.each(parent.childNodes, function(child) {
	// if (child.data.displayed === true) {
	// console.log('set visible', parent.data.text, ' having displayed child', child.data.text);
	// me.setNodeVisible(parent, true);
	// parent.expand();
	// return false;
	// }
	// });
	// });
	// } else {
	// rootNode.bubble(function() {
	// me.setNodeVisible(this, true);
	// });
	// // FIXME tree index isn't recalculated if we don't delay 0 sec to expand
	// var task = new Ext.util.DelayedTask(function() {
	// rootNode.bubble(function() {
	// this.expand();
	// });
	// });
	// task.delay(0);
	// }
	// },
	// dockedItems : [ {
	// xtype : 'toolbar',
	// dock : 'top',
	// items : [ {
	// hidden : true, // disable the search function
	// xtype : 'textfield',
	// flex : 1,
	// itemId : 'filterString',
	// emptyText : Locale.getMsg('view.tree.search'),
	// enableKeyEvents : true,
	// listeners : {
	// keyup : function(view, record, item, index, even) {
	// // // TODO 不要太靈敏
	// // search in tree
	// var tree = this.up('treepanel');
	// tree.checkVisibityCascade(tree.getRootNode());
	// // Never remove root
	// tree.setNodeVisible(tree.getRootNode(), true);
	// }
	// }
	// } ]
	// } ],
	// tree search [END]

	isLoading : false,
	// autoScroll : true,
	animate : false,
	split : true,
	collapsible : true,
	hideCollapseTool : true,
	useArrows : true,
	isConsideredEvent : null, // should be overrided
	onCreateNodeCompleted : null,
	onUpdateNodeCompleted : null,
	onDestroyNodeCompleted : null,
	findNode : function(id) {
		var root = this.getRootNode();
		if (id === root.get('id')) {
			return root;
		}
		return root.findChild('id', id, true);
	},
	// handleEvent : function(e) {
	// var me = this;
	//
	// if (!me.isConsideredEvent(e.type)) {
	// return;
	// }
	//
	// if (me.treeReady) {
	// if (e.method === 'created') {
	// me.handleCreateEvent(e);
	// } else if (e.method === 'updated') {
	// me.handleUpdateEvent(e);
	//
	// } else if (e.method === 'destroyed') {
	// me.handleDestroyEvent(e);
	// } else {
	// console.error('ERROR: No such event method');
	// }
	// }
	// },

	// handleUpdateEvent : function(e) {
	//
	// var me = this, node, parent, oldParent, bigNode;
	//
	// console.debug(Ext.ClassManager.getName(me) + '\t\taction=' + e.method + '\ttype=', e.type + '\tid=', e.id
	// + '\tstate=', e.state + '\tparentId=' + e.parentId);
	//
	// node = me.findNode(e.id);
	// if (node == null) {
	// console.debug('node not exist');
	// return;
	// }
	//
	// var previousState = node.get('state');
	// // Check if need to reload tree panel when cluster state change
	// if (previousState !== e.state && e.type === Vos.Node.CLUSTER) {
	// if (Ext.Array.contains([ Vos.Node.CLUSTER_SYNCHRONIZING, Vos.Node.CLUSTER_CREATING,
	// Vos.Node.CLUSTER_DESTROYING, Vos.Node.CLUSTER_SR_RECOVERY, Vos.Node.CLUSTER_RECOVER_TO_LOCAL,
	// Vos.Node.CLUSTER_RECOVER_TO_REMOTE ], previousState)) {
	// console.debug('reload tree', me);
	// me.store.load();
	// me.checkVisibityCascade(node);
	// return false;
	// }
	// }
	//
	// var nodeTextChanged = node.data.text !== e.name;
	// node.set({
	// text : e.name,
	// tag : e.tag,
	// master : e.master
	// });
	//
	// // TODO remove this commit
	// // make this node not to show dirty flag
	// node.commit();
	// // update state, set icon and disable nodes
	// node.setState(e.state);
	//
	// parent = me.findNode(e.parentId);
	// if (parent != null) {
	// // move to new parent
	// if (e.parentId !== node.parentNode.data.id) {
	// console.debug('node move to new parent');
	//
	// // //Expand parent to notify user
	// // if(!parent.isExpanded()) {
	// // parent.expand();
	// // }
	//
	// oldParent = node.parentNode;
	// // linear search for node bigger than updated node
	// bigNode = parent.findChildBy(function() {
	// return this.compare(node) > -1;
	// });
	// // will do linear again to insert node
	// parent.insertBefore(node, bigNode);
	// // workaround for updating old parent node's CSS
	// oldParent.commit();
	// }
	// }
	//
	// // update event handler
	// if (me.onUpdateNodeCompleted != null)
	// me.onUpdateNodeCompleted(e, node);
	// },
	destroyNode : function(data) {
		// data = {id:'xx'}
		var me = this, parent, selectedNode;

		// console.debug(Ext.ClassManager.getName(me) + '\t\taction=' + e.method + '\ttype=', e.type + '\tid=', e.id + '\tstate=', e.state + '\tparentId='
		// + e.parentId);

		var node = me.findNode(data.id);
		if (node != null) {
			parent = node.parentNode;
			node.remove();
			if (parent != null) {
				// workaround for updating parent node's CSS
				parent.commit();
				// selectedNode = me.getSelectionModel().getSelection()[0];
				// // change tree focus on deleted node's parent if user
				// // don't select other node yet
				// if (selectedNode != null && selectedNode.get('id') === e.id) {
				// console.debug('change tree focus on deleted node parent');
				// me.getSelectionModel().select(parent);
				// }

			}
		} else {
			console.debug('node not exist');
			return;
		}
	},
	/**
	 * create folders by path and expand them without loading data from server
	 */
	createPath : function(path) {
		// console.log('createPath', path);

		var me = this;
		var newNode;
		var folders = path.split(MyApp.Const.Folder.SEPARATOR);
		folders.shift(); // remove the empty folder
		path = '';

		var i = 0, ln = folders.length;
		for (; i < ln; ++i) {
			path = Ext.String.filenameAppend(path, folders[i]);
			// console.log('create path, folders[i]', path, folders[i]);
			newNode = me.createNode({
				id : path,
				name : folders[i]
			});
			if (newNode) {
				newNode.parentNode.set('loaded', true);
				newNode.parentNode.expand();
			}
		}
		me.getSelectionModel().select(newNode);
		me.getView().refresh();

	},
	// crete folder node
	createNode : function(data) {
		// data = {id:'xx', name:'zz', qtip:'yy'}

		var me = this, parent, node, bigNode, newNode;

		// if node already exist, skip to add
		if (me.findNode(data.id) != null) {
			// console.log('node already exist, skip to add', data.id);
			return;
		}
		parent = me.findNode(Ext.String.filenameFolder(data.id));
		if (!parent) {
			console.log('parent not exist', data.id);
			return;
		}

		node = {
			id : data.id,
			text : data.name,
			qtip : data.qtip,
			leaf : false
		};

		// linear search for node bigger than new node
		bigNode = parent.findChildBy(function() {
			return this.get('text') > node.text;
		});

		if (bigNode) {
			newNode = parent.insertBefore(node, bigNode);
		} else {
			newNode = parent.appendChild(node);
		}

		me.getView().refresh(); // FIXME workaround: after append child node, selection css will be missing

		console.log('appendChild', newNode.getId());

		return newNode;
	},
	initComponent : function() {
		var me = this;

		me.callParent(arguments);

		// tree search [START]
		// me.on({
		// afteritemexpand : function(node) {
		// me.checkVisibityCascade(node);
		// },
		// iteminsert : function(parent, node) {
		// // delay 0 sec for bug 5579
		// var task = new Ext.util.DelayedTask(function() {
		// me.checkVisibityBubble(node);
		// });
		// task.delay(0);
		// },
		// itemremove : function(parent, node, isMove) {
		// me.checkVisibityBubble(parent);
		// }
		// });
		// me.getStore().on({
		// update : function(store, node, operation, modifiedFieldNames) {
		// // console.log('[update]', node, operation, modifiedFieldNames);
		// if (operation === 'edit') {
		// Ext.each(modifiedFieldNames, function(fileldName) {
		// if (fileldName === 'text') {
		// // console.log('[text change]', node.data.text);
		// me.checkVisibityBubble(node);
		// return false;
		// }
		// });
		// }
		// },
		// // // FIX for TreePanel double click expands not expansible node
		// beforeexpand : function(node) {
		// return node.isExpandable();
		// }
		// });
		// tree search [END]

		// me.on({
		// viewready : function(panel, eOpts) {
		// // FIXME: expand root after panel is activated, workaround for
		// // ExtJS bug
		// me.getRootNode().expand();
		// me.getSelectionModel().select(me.getRootNode());
		// me.treeReady = true;
		// }
		// });
		// me.getStore().on({
		//
		// // if tree is still loading, don't reload immediately.
		// // Otherwise,
		// // the tree index will be broken.
		// beforeload : function() {
		// if (me.isLoading) {
		// var task = new Ext.util.DelayedTask(function() {
		// me.getStore().load();
		// });
		// task.delay(500);
		// return false;
		// }
		// me.isLoading = true;
		// },
		// // initialize nodes for each time reloading
		// load : function(store, node, records, successful, eOpts) {
		//
		// var works = [], ids = null, root = store.getRootNode();
		// if (!me.expandedNodes) {
		// // first time loading remember all expanded nodes
		// ids = [];
		// works.push(function(node) {
		// if (node.get('expanded')) {
		// ids.push(node.get('id'));
		// }
		// });
		// } else {
		// // reloading, expand all previously expanded nodes
		// works.push(function(node) {
		// if (Ext.Array.contains(me.expandedNodes, node.get('id'))) {
		// node.expand();
		// }
		// });
		// }
		// // set icon and disable nodes
		// // works.push(function(node) {
		// // node.setState();
		// // });
		//
		// // run works
		// root.cascadeBy(function(node) {
		// for ( var i = 0; i < works.length; i++) {
		// works[i](node);
		// }
		// });
		//
		// if (!me.expandedNodes) {
		// me.expandedNodes = Ext.Array.unique(ids);
		// }
		//
		// me.isLoading = false;
		//
		// // Vos.view.TreeEventHandler.push(null);
		//
		// // tree search [START]
		// // me.checkVisibityCascade(me.getRootNode());
		// // tree search [END]
		//
		// },
		// expand : function(node, eOpts) {
		// // remember expanded nodes for reloading
		// if (!me.searching) {
		// if (me.expandedNodes && !Ext.Array.contains(me.expandedNodes, node.get('id'))) {
		// me.expandedNodes.push(node.get('id'));
		// }
		// }
		// },
		// collapse : function(node, eOpts) {
		// // remember expanded nodes for reloading
		// if (!me.searching) {
		// Ext.Array.remove(me.expandedNodes, node.get('id'));
		// }
		// }
		// });
	}
});
