namespace Net6WebAPI.ViewModels
{
    public class PaginationViewModel<TEntity> where TEntity : class
    {
        public int PageNumber { get; private set; }
        public int PageSize { get; private set; }
        public long Count { get; private set; }
        public IEnumerable<TEntity> Data { get; private set; }
        public PaginationViewModel(int pageNumber, int pageSize, long count, IEnumerable<TEntity> data)
        {
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            this.Count = count;
            this.Data = data;
        }
    }
}
