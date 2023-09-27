using Dapper;
using Microsoft.AspNetCore.Mvc;
using Net6WebAPI.ViewModels;
using System.Data;
using System.Data.SqlClient;

namespace Net6WebAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeReimbursementController : ControllerBase
    {

        private readonly ILogger<EmployeeReimbursementController> _logger;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString = "";

        public EmployeeReimbursementController(ILogger<EmployeeReimbursementController> logger,
            IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _connectionString = _configuration["ConnectionString:SQLPlaygroundDB"];
        }


        [HttpPost("paginated-data", Name = "GetPaginatedEmployeeReimbursement")]
        public async Task<ActionResult<PaginationViewModel<EmployeeReimbursementViewModel>>> GetPaginatedEmployeeReimbursement(
       [FromBody] EmployeeReimbursementSearchViewModel searchViewModel
            )
        {
            try
            {
                int dataCount = 0;
                IEnumerable<EmployeeReimbursementViewModel> employeeReimbursements = new List<EmployeeReimbursementViewModel>();

                if (string.IsNullOrEmpty(searchViewModel.Search))
                {
                    var proc = string.Format(@"kis_spEmployeeReimbursementRetrieveAllCount");

                    var result = await this.ExecuteSQL<int>(proc, null);
                    dataCount = result.ToList().FirstOrDefault();
                }
                else
                {
                    var proc = string.Format(@"kis_spEmployeeReimbursementRetrieveAllCount_Search");

                    var param = new DynamicParameters();
                    param.Add("@search", searchViewModel.Search);

                    var result = await this.ExecuteSQL<int>(proc, param);
                    dataCount = result.ToList().FirstOrDefault();
                }
                
                if (dataCount == 0) return NotFound();

                if (string.IsNullOrEmpty(searchViewModel.Search))
                {
                    var proc = string.Format(@"kis_spEmployeeReimbursementRetrieveAll_AutoGenByPage");

                    var param = new DynamicParameters();
                    param.Add("@pageNumber", searchViewModel.PageNumber);
                    param.Add("@pageRows", searchViewModel.PageSize);
                    param.Add("@sortingColumn", searchViewModel.SortColumn);
                    param.Add("@sortingType", searchViewModel.SortType);

                    employeeReimbursements = await this.ExecuteSQL<EmployeeReimbursementViewModel>(proc, param);
                }
                else
                {
                    var proc = string.Format(@"kis_spEmployeeReimbursementRetrieveAllBySearch_AutoGenByPage"); 
                    
                    var param = new DynamicParameters();
                    param.Add("@pageNumber", searchViewModel.PageNumber);
                    param.Add("@pageRows", searchViewModel.PageSize);
                    param.Add("@search", searchViewModel.Search);
                    param.Add("@sortingColumn", searchViewModel.SortColumn);
                    param.Add("@sortingType", searchViewModel.SortType);
           

                    employeeReimbursements = await this.ExecuteSQL<EmployeeReimbursementViewModel>(proc, param);
                }

                return new PaginationViewModel<EmployeeReimbursementViewModel>(searchViewModel.PageNumber, searchViewModel.PageSize, dataCount, employeeReimbursements);
            }
            catch
            {
                return NotFound();
            }
        }

        private async Task<IEnumerable<T>> ExecuteSQL<T>(string sql, DynamicParameters? parameters)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<T>(sql, parameters, commandType: CommandType.StoredProcedure);
                connection.Close();
                connection.Dispose();
                return result;
            }
        }


    }
}