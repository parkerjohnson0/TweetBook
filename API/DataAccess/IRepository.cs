using System.Linq.Expressions;

public interface IRepository<T> where T : class{
    IEnumerable<T> ReadAll();
    IEnumerable<T> Read(Expression<Func<T,bool>> query);
    void Create(T entity);
    void Update(T entity);
    void Delete(int id);
    void Delete(IEnumerable<T> entities);
}
