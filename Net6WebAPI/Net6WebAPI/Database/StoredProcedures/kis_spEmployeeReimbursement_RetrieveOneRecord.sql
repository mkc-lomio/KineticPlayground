CREATE
	OR
ALTER PROCEDURE kis_spEmployeeReimbursement_RetrieveOneRecord (
	 @employeeReimbursementId AS int 
	)
AS
BEGIN

	SELECT TOP 1 Id as EmployeeReimbursementId,  * FROM EmployeeReimbursements WHERE Id = @employeeReimbursementId

END;