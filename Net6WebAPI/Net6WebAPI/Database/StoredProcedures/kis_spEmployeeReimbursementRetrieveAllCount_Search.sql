CREATE
	OR
ALTER PROCEDURE kis_spEmployeeReimbursementRetrieveAllCount_Search (
	 @search AS VARCHAR(100) = ''
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
			WHERE rs.[Description] LIKE @search + '%' -- NOTE: For temporary. not yet final.
	) A

END;