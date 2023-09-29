namespace Net6WebAPI.ViewModels
{
    public class EmployeeReimbursementPaginateViewModel
    {
        public int EmployeeReimbursementId { get; set; }
        public int ReimbursementTypeId { get; set; }
        public int EmployeeId { get; set; }
        public int ReviewerEmployeeId { get; set; }
        public int ReimbursementStatusId { get; set; }
        public string Type { get; set; } = string.Empty;
        public double TotalAmount { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Reviewer { get; set; } = string.Empty;
        public DateTime TransactionDate { get; set; }
        public DateTime RequestedDate { get; set; }
        public string ReviewerRemarks { get; set; } = string.Empty;
        public DateTime ApprovedDate { get; set; }

    }
}
