package extjstutorial.model;

import java.io.Serializable;

public class RestTask implements Serializable {

	private static final long serialVersionUID = 5649189052783655255L;
	private Boolean success;
	private String error;
	private Object target;

	public RestTask() {
	}

	/**
	 * 'success'的task
	 * 
	 * @param target
	 */
	public RestTask(Object target) {

		super();
		this.success = true;
		this.target = target;
	}

	/**
	 * For failure rest task
	 * 
	 * @param target
	 * @param e
	 *            
	 */
	public RestTask(Object target, Exception e) {
		super();
		this.success = false;
		this.target = target;
		this.error = e.getMessage();
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public Object getTarget() {
		return target;
	}

	public void setTarget(Object target) {
		this.target = target;
	}

}
