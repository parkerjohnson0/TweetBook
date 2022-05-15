using Microsoft.AspNetCore.Mvc;
using DataAccess.Models;
using DataAccess;
using System.Linq;
namespace TweetBookAPI
{
    [Route("post")]
    public class PostController : Controller
    {
        [HttpGet]
        public async Task<List<Post>> Get()
        {
           var posts = await Queries.GetPosts();
           return posts;
        }
        [HttpGet]
        public async Task<List<Post>> Get(int id)
        {
           var posts = await Queries.GetPosts(id);
           return posts;
        }

    }
}
