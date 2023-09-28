namespace Net6WebAPI.ViewModels
{
    public class EmployeeReimbursementCreateUpdateViewModel
    {
        public int Id { get; set; }
        public int ReimbursementTypeId { get; set; }
        public int EmployeeId { get; set; }
        public int ReviewerEmployeeId { get; set; }
        public int ReimbursementStatusId { get; set; }
        public string AdditionalInfo { get; set; } = string.Empty;
        public double TotalAmount { get; set; }
        public DateTime TransactionDate { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public DateTime RequestedDate { get; set; }
        public bool IsActive { get; set; }
        public string ReviewerRemarks { get; set; } = string.Empty;
    }
}
