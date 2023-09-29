CREATE
	OR
ALTER PROCEDURE kis_spEmployeeReimbursementRetrieveAllCount_ReviewerRole 
(
	 @reviewerEmployeeId AS INT
)
AS
BEGIN

	SELECT COUNT(*) As TotalCount FROM (
	 SELECT er.Id AS EmployeeReimbursementId
				,er.ReimbursementTypeId
				,er.EmployeeId
				,er.ReviewerEmployeeId
				,er.ReimbursementStatusId
				,rt.[Name] AS [Type]
				,er.TotalAmount
				,rs.[Description] AS [Status]
				,'' AS Reviewer -- need employee table
				, er.TransactionDate
				,er.RequestedDate
			FROM EmployeeReimbursements er
			INNER JOIN ReimbursementStatus rs ON rs.Id = er.ReimbursementStatusId
			INNER JOIN ReimbursementTypes rt ON rt.Id = er.ReimbursementTypeId
			WHERE  er.IsActive = 1 AND  er.ReviewerEmployeeId = @reviewerEmployeeId

	) A

END;