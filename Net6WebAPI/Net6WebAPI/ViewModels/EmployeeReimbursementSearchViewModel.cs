using Microsoft.AspNetCore.Mvc;

namespace Net6WebAPI.ViewModels
{
    public class EmployeeReimbursementSearchViewModel
    {
        public int EmployeeId { get; set; }
        public int? ReviewerEmployeeId { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Search { get; set; } = string.Empty;
        public string SortColumn { get; set; } = "TransactionDate";
        public string SortType { get; set; } = "ASC";
    }
}
