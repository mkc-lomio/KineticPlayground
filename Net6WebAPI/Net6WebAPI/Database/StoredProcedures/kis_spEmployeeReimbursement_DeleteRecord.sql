CREATE
	OR
ALTER PROCEDURE kis_spEmployeeReimbursement_DeleteRecord (
	 @employeeReimbursementId AS int 
	)
AS
BEGIN

	 DELETE EmployeeReimbursements WHERE Id = @employeeReimbursementId

END;