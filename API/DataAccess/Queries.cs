using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Security.Cryptography;
using Dapper;
using DataAccess.Models;
using MySql.Data.MySqlClient;

namespace DataAccess
{
    public static class Queries
    {
        public static async Task<List<User>> GetUsers()
        {
            var sql = "select * FROM Users;";
            IEnumerable<User> users = new List<User>();
            using (IDbConnection connection = new MySqlConnection(Config.CONNECTION_STRING))
            {
                users = await connection.QueryAsync<User>(sql);
            }

            return users.ToList();
        }

        public static async Task<List<Post>> GetPosts()
        {
            var sql = "CALL sp_GetPosts(null);";
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

        public static async Task UpdateAvatar(string fileLocation, int userID)
        {
            var sql = $"CALL sp_UpdateAvatar('{fileLocation}',{userID})";
            using (IDbConnection connection = new MySqlConnection(Config.CONNECTION_STRING))
            {
                await connection.ExecuteAsync(sql);
            }
            
        }
        public static async Task<List<Post>> GetPosts(int id)
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

        public static async Task<User> LoginUser(string username, string password)
        {
            var sql = $"CALL sp_CheckUser('{username}')";
            using (IDbConnection connection = new MySqlConnection(Config.CONNECTION_STRING))
            {
                User result = await connection.QuerySingleAsync<User>(sql);
                byte[] salt = Convert.FromBase64String(result.Salt);
                byte[] key = Convert.FromBase64String(result.Hash);
                using (var deriveBytes = new Rfc2898DeriveBytes(password,salt))
                {
                    byte[] newKey = deriveBytes.GetBytes(20);
                    if (newKey.SequenceEqual(key))
                    {
                        return new User()
                        {
                            Avatar = result.Avatar,
                            Username = result.Username,
                            UserID = result.UserID
                        };
                    }
                }
            }

            return null;
        }

        public static async Task<int> RegisterUser(string username, string password)
        {
            string salt = null;
            string key = null;
            using (var deriveBytes = new Rfc2898DeriveBytes(password, 20))
            {
                salt = Convert.ToBase64String(deriveBytes.Salt);
                 key = Convert.ToBase64String(deriveBytes.GetBytes(20));
            }

            var dict = new Dictionary<string, object>
            {
                { "@Username", username },
                { "@Salt", salt },
                { "@Hash", key }
            };
            var parameters = new DynamicParameters(dict);
            var sql = "CALL sp_RegisterUser (@Username, @Salt, @Hash);";
            using (IDbConnection connection = new MySqlConnection(Config.CONNECTION_STRING))
            {
                try
                {
                    var result = await connection.QuerySingleAsync<int>(sql,parameters);
                    Console.WriteLine(result);
                    return result;
                }
                catch (Exception e)
                {
                   Console.WriteLine(e.Message);
                   return -1;
                   
                }
            }
        }

        public static async Task MakePost(Post post)
        {
            string parentID = post.ParentPostID == null ? "null" : "'" + post.ParentPostID.ToString() + "'";
            //Console.WriteLine(post.Avatar, post.Content,post.PostID, parentID);
            var sql = $"CALL sp_InsertPost ({parentID},'{post.UserID}','{post.Content}');";
            Console.WriteLine(sql);
            using (IDbConnection connection = new MySqlConnection(Config.CONNECTION_STRING))
            {
                await connection.ExecuteAsync(sql);
            }
        }
    }
}