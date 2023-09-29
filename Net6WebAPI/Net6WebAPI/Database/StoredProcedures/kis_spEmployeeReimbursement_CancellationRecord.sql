CREATE
	OR
ALTER PROCEDURE kis_spEmployeeReimbursement_CancellationRecord (
	 @employeeReimbursementId AS int 
	)
AS
BEGIN

	UPDATE EmployeeReimbursements SET [ReimbursementStatusId] = 4 WHERE Id = @employeeReimbursementId

END;