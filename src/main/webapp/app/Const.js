Ext.define('MyApp.Const', {
	singleton : true,

	Ftp : {
		PREFIX : '/'
	},

	Invitation : {
		Action : {
			INVITATION_NOT_EXIST : 'INVITATION_NOT_EXIST',
			ABLE_TO_ACCEPT : 'ABLE_TO_ACCEPT',
			NEED_SIGNOUT : 'NEED_SIGNOUT',
			NEED_SIGNIN : 'NEED_SIGNIN',
			EXPIRED : 'EXPIRED',
			ALREADY_ACCEPTED : 'ALREADY_ACCEPTED'
		},
		Status : {
			WAITING : 'WAITING',
			EXPIRED : 'EXPIRED',
			ACCEPT : 'ACCEPT',
			REJECT : 'REJECT'
		}

	},

	Job : {
		Priority : {
			LOW : 'LOW',
			MEDIUM : 'MEDIUM',
			HIGH : 'HIGH'
		},
		Output : {
			JPG : 'jpg',
			BMP : 'bmp',
			PNG : 'png',
			TGA : 'tga',
			TIFF : 'tiff',
			EXR : 'exr',
			ANIMATION : 'animation'
		}
	},

	ViewType : {
		Mission : {
			RUNNING : 'RUNNING',
			HISTORICAL : 'HISTORICAL',
			USER : {
				RUNNING : 'USER_RUNNING',
				HISTORICAL : 'USER_HISTORICAL'
			}

		}
	},
	Mission : {
		Action : {
			RERUN : 'RERUN',
			CANCEL : 'CANCEL',
			HOLD : 'HOLD',
			RESUME : 'RESUME',
			RETRY : 'RETRY' // only retry failed frame
		},

		State : {
			HOLDING : 'HOLDING',
			PAUSE : 'PAUSE',
			CMP : 'CMP',
			DON : 'DON',
			SKP : 'SKP',
			RDY : 'RDY',
			ERR : 'ERR',
			SYS_HOLDING : 'SYS_HOLDING',
			SYS_PAUSE : 'SYS_PAUSE'
		},
		
		RenderMode : {
			STANDARD : 'STANDARD',
			EVALUATION : 'EVALUATION'
		}
	},

	Project : {
		Role : {
			MEMBER : 'MEMBER',
			ADMIN : 'ADMIN',
			OWNER : 'OWNER'
		}
	},

	File : {
		Status : {
			WAITING : 'WAITING', // init state
			UPLOADING : 'UPLOADING',
			PAUSED : 'PAUSED',
			PAUSING : 'PAUSING',
			UPLOAD_FAIL : 'UPLOAD_FAIL',
			COMPLETED : 'COMPLETE',
			DELETED : 'DELETED',
			DOWNLOADING : 'DOWNLOADING',
			DOWNLOAD_PAUSE : 'DOWNLOAD_PAUSE'
		},
		Type : {
			IS_FOLDER : 'IS_FOLDER',
			IS_FILE : 'IS_FILE'
		}
	},

	Asset : {
		Status : {
			FOUND : 'FOUND',
			MISSING : 'MISSING'
		},
		PathType : {
			ABS : 'ABS',
			REL : 'REL'
		}
	},

	Folder : {
		Name : {
			RESOURCE : 'resource',
			ZIP : 'zip',
			LOG : 'log',
			OUTPUT : 'output'
		},
		SEPARATOR : '/'
	},

	User : {
		Role : {
			ADMIN : 'ADMIN',
			VIEWER : 'VIEWER',
			USER : 'USER'
		},

		Status : {
			ACTIVE : 'ACTIVE',
			INACTIVE : 'INACTIVE',
			DELETE : 'DELETE'
		},

		Type : {
			OP : 'OP',
			UP : 'UP'
		},

		DefaultAdmin : 'admin'
	},

	Render : {
		Level : {
			HIGH : 'LEVEL_HIGH',
			MID : 'LEVEL_MID',
			LOW : 'LEVEL_LOW'
		},
		Priority : {
			HIGH : 'HIGH',
			MID : 'MID',
			LOW : 'LOW'
		},
		OS : {
			WIN64 : 'WINDOWS64',
			WIN32 : 'WINDOWS32',
			LINUX : 'LINUX',
			MAC : 'MAC',
			NonSpecified : 'nonSepcified'
		}
	},

	LicenseType : {
		SOFTWARE : 'SOFTWARE',
		ENGINE : 'ENGINE'
	},

	Product : {
		State : {
			ON : 'ON',
			OFF : 'OFF'
		}
	},

	Currency : {
		USD : 'USD',
		NTD : 'NTD'
	},
	DOLLAR_PREFIX : '$',
	DOLLAR_ROUND : 2,

	// splitter
	ITEM_SPLITTER : '###',
	KV_SPLITTER : '@@@',
	// others
	JAVASCRIPT_MAX_NUMBER : 9007199254740992,
	// http://demon.tw/copy-paste/javascript-precision.html

	NotificationType : {
		PROBLEM : 'PROBLEM',		
		SYSTEM : 'SYSTEM',
		SERVICE :'SERVICE',
		POOL_EXPIRATION : 'POOL_EXPIRATION',
		RENDER_FAIL : 'RENDER_FAIL'
	},
	NotificationId : {
		PROBLEM : 'P001',
		SYSTEM_ERROR : 'E001',
		NAGIOS_ERROR : 'N001',
		DB_ERROR : 'N002',
		UP_ERROR : 'N003',
		POOL_EXPIRATION :'X001',
		POOL_EXPIRATION_2 : 'X002',
		POOL_EXPIRATION_3 : 'X003',
		RENDER_ERROR : 'R001',
		RENDER_ERROR_2 : 'R002'
	},
	MonitorStatus : {
		/* Host status */
		UP : 'UP',
		UNREACHABLE : 'UNREACHABLE',
		DOWN : 'DOWN',
		/* Service status */
		OK : 'OK',
		WARNING : 'WARNING',
		CRITICAL : 'CRITICAL',
		UNKNOWN : 'UNKNOWN'
	}

});
