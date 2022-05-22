using System.Data;
using System.Data.SqlClient;
using Dapper;
using DataAccess.Models;
using MySql.Data.MySqlClient;

namespace DataAccess
{
    public static class Queries
    {
        public async static Task<List<User>> GetUsers()
        {
            var sql = "select * FROM Users;";
            IEnumerable<User> users = new List<User>();
            using (IDbConnection connection = new MySqlConnection(Config.CONNECTION_STRING))
            {
                users = await connection.QueryAsync<User>(sql);
            }

            return users.ToList();
        }

        public async static Task<List<Post>> GetPosts()
        {
            var sql = "select * FROM Posts;";
            IEnumerable<Post> posts = new List<Post>();

            using (IDbConnection connection = new MySqlConnection(Config.CONNECTION_STRING))
            {
                posts = await connection.QueryAsync<Post>(sql);
            }

            foreach (Post post in posts)
            {
                post.Comments = posts.Where(x => x.ParentPostID == post.PostID).ToList();
            }

            posts = posts.Where(x => x.ParentPostID == null);

            return posts.ToList();
        }

        public async static Task<List<Post>> GetPosts(int id)
        {
            var sql = $"select * FROM Posts where @{id} = PostID AND @{id} = ParentPostID;";
            IEnumerable<Post> posts = new List<Post>();

            using (IDbConnection connection = new MySqlConnection(Config.CONNECTION_STRING))
            {
                posts = await connection.QueryAsync<Post>(sql);
            }

            foreach (Post post in posts)
            {
                post.Comments = posts.Where(x => x.ParentPostID == post.PostID).ToList();
            }

            posts = posts.Where(x => x.ParentPostID == null);

            return posts.ToList();
        }

        public async static Task<int> LoginUser(string username, string password)
        {
            var sql = $"CALL sp_CheckLogin({username},{password})";
            using (IDbConnection connection = new MySqlConnection(Config.CONNECTION_STRING))
            {
                return await connection.QuerySingleAsync<int>(sql);
            }
        }

        public async static Task<int> RegisterUser(string username, string password)
        {
            var sql = $"CALL sp_RegisterUser ('{username}','{password}');";
            using (IDbConnection connection = new MySqlConnection(Config.CONNECTION_STRING))
            {
                return await connection.QuerySingleAsync<int>(sql);
            }
        }

        public async static Task MakePost(Post post)
        {
            string parentID = post.ParentPostID == null ? "null" : "'" + post.ParentPostID.ToString() + "'";
            //Console.WriteLine(post.Avatar, post.Content,post.PostID, parentID);
            var sql = $"CALL sp_InsertPost ({parentID},'{post.Username}','{post.Content}','{post.Avatar}');";
            Console.WriteLine(sql);
            using (IDbConnection connection = new MySqlConnection(Config.CONNECTION_STRING))
            {
                await connection.ExecuteAsync(sql);
            }
        }
    }
}