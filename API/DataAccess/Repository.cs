using System.Linq.Expressions;

namespace DataAccess
{

    public interface Repository<T> where T : class{
        IEnumerable<T>ReadAll();
        IEnumerable<T>Read(Expression<Func<T,bool>> query);
    }
}
