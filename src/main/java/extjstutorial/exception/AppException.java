package extjstutorial.exception;

import java.util.ArrayList;
import java.util.List;

import extjstutorial.utility.constants.ErrorConstants;
import extjstutorial.utility.constants.ErrorKey;

public class AppException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	private ErrorKey errorKey;

	public AppException(ErrorKey errorKey) {
		this.errorKey = errorKey;
	}

	@Override
	public String getMessage() {
		if ((errorKey.getType() & ErrorConstants.TYPE_UI) > 0) {
			return errorKey.toString();
		} else {
			return "internal"; // internal error
		}
	}

}
