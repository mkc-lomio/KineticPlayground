namespace Net6WebAPI.ViewModels
{
    public class ReimbursementStatusViewModel
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string ModifiedBy { get; set; } = string.Empty;
        public string CreatedBy { get; set;  }  = string.Empty;
        public bool IsActive { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
    }
}
