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
        [ActionName("GetAll")]
        public async Task<List<Post>> GetAll()
        {
           var posts = await Queries.GetPosts();
           return posts;
        }
        [HttpGet]
        [ActionName("GetById")]
        public async Task<List<Post>> GetById(int id)
        {
           var posts = await Queries.GetPosts(id);
           return posts;
        }

    }
}
