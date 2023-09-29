CREATE
	OR
ALTER PROCEDURE kis_spEmployeeReimbursementRetrieveAllBySearch_AutoGenByPage_ReviewerRole(
	 @reviewerEmployeeId AS INT,
	@pageNumber AS INT
	,@pageRows AS INT
	, @search AS VARCHAR(100) = ''
	,@sortingColumn AS VARCHAR(100) = 'Type'
	,@sortingType AS VARCHAR(100) = 'ASC'
	)
AS
BEGIN

	SELECT * FROM (
     SELECT er.Id AS EmployeeReimbursementId
				,er.ReimbursementTypeId
				,er.EmployeeId
				,er.ReviewerEmployeeId
				,er.ReimbursementStatusId
				,rt.[Name] AS [Type]
				,er.TotalAmount
				,rs.[Description] AS [Status]
				,'' AS Reviewer
				,-- need employee table
				er.TransactionDate
				,er.RequestedDate
				,er.ReviewerRemarks
				,er.ApprovedDate
			FROM EmployeeReimbursements er
			INNER JOIN ReimbursementStatus rs ON rs.Id = er.ReimbursementStatusId
			INNER JOIN ReimbursementTypes rt ON rt.Id = er.ReimbursementTypeId	
			WHERE rs.[Description] LIKE @search + '%' -- NOTE: For temporary. not yet final.
				AND er.IsActive = 1  AND er.ReviewerEmployeeId = @reviewerEmployeeId
	) A
	ORDER BY CASE 
		WHEN @sortingColumn = 'Type'
				AND @sortingType = 'ASC'
				THEN [Type]
			END ASC
		,CASE 
			WHEN @sortingColumn = 'Type'
				AND @sortingType = 'DESC'
				THEN [Type]
			END DESC
		,CASE 
			WHEN @sortingColumn = 'TotalAmount'
				AND @sortingType = 'ASC'
				THEN TotalAmount
			END ASC
		,CASE 
			WHEN @sortingColumn = 'TotalAmount'
				AND @sortingType = 'DESC'
				THEN TotalAmount
			END DESC
		,CASE 
			WHEN @sortingColumn = 'Status'
				AND @sortingType = 'ASC'
				THEN [Status]
			END ASC
		,CASE 
			WHEN @sortingColumn = 'Status'
				AND @sortingType = 'DESC'
				THEN [Status]
			END DESC
		,CASE 
			WHEN @sortingColumn = 'Reviewer'
				AND @sortingType = 'ASC'
				THEN Reviewer
			END ASC
		,CASE 
			WHEN @sortingColumn = 'Reviewer'
				AND @sortingType = 'DESC'
				THEN Reviewer
			END DESC
		,CASE 
			WHEN @sortingColumn = 'TransactionDate'
				AND @sortingType = 'ASC'
				THEN TransactionDate
			END ASC
		,CASE 
			WHEN @sortingColumn = 'TransactionDate'
				AND @sortingType = 'DESC'
				THEN TransactionDate
			END DESC
		,CASE 
			WHEN @sortingColumn = 'RequestedDate'
				AND @sortingType = 'ASC'
				THEN RequestedDate
			END ASC
		,CASE 
			WHEN @sortingColumn = 'RequestedDate'
				AND @sortingType = 'DESC'
				THEN RequestedDate
		    END DESC
			
	OFFSET(@pageNumber - 1) * @pageRows ROWS
	FETCH NEXT @pageRows ROWS ONLY;

END;