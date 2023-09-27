

EXEC kis_spEmployeeReimbursementRetrieveAllCount_Search
EXEC kis_spEmployeeReimbursementRetrieveAllCount_Search @Search = 'Approved'

EXEC kis_spEmployeeReimbursementRetrieveAllCount

EXEC kis_spEmployeeReimbursementRetrieveAll_AutoGenByPage @pageNumber = 1, @pageRows = 10, @sortingColumn = 'TransactionDate', @sortingType = 'ASC'


EXEC kis_spEmployeeReimbursementRetrieveAllBySearch_AutoGenByPage @pageNumber = 1, @pageRows = 10, @search = 'Approved',
@sortingColumn = 'TransactionDate', @sortingType = 'ASC'