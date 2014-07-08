package extjstutorial.utility.constants;

public enum ErrorKey {

	/** Operation Forbidden. **/
	FORBIDDEN(ErrorConstants.TYPE_UI),

	/** U001: Email duplicated. **/
	U001(ErrorConstants.TYPE_UI),
	/** U002: ID duplicated. **/
	U002(ErrorConstants.TYPE_UI),
	/** U003: ID not exists. **/
	U003(ErrorConstants.TYPE_UI + ErrorConstants.TYPE_EMAIL);

	private int type;

	private ErrorKey(int type) {

		this.type = type;
	}

	public int getType() {
		return type;
	}
}
