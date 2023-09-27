export interface EmployeeReimbursementModel {
    employeeReimbursementId : number,	
    reimbursementTypeId : number,	
    employeeId : number,	
    reviewerEmployeeId : number,	
    reimbursementStatusId : number,	
    type:string,	
    totalAmount:number,	
    status:string,
    reviewer:string,	
    transactionDate:Date,
    requestedDate:Date
  }