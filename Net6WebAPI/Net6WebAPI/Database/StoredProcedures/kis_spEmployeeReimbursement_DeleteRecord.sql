CREATE
	OR
ALTER PROCEDURE kis_spEmployeeReimbursement_DeleteRecord (
	 @employeeReimbursementId AS int 
	)
AS
BEGIN

	UPDATE EmployeeReimbursements SET IsActive = 0 WHERE Id = @employeeReimbursementId

END;