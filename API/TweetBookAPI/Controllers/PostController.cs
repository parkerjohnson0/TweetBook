using Microsoft.AspNetCore.Mvc;
using DataAccess.Models;
using DataAccess;
using System.Linq;
namespace TweetBookAPI
{
    [Route("posts")]
    public class PostController : Controller
    {
        [HttpGet]
        [ActionName("Get")]
        public async Task<List<Post>> GetAll()
        {
           var posts = await Queries.GetPosts();
           return posts;
        }
        [HttpGet("GetById")]
        [ActionName("GetById")]
        public async Task<List<Post>> GetById([FromRoute] int id)
        {
           var posts = await Queries.GetPosts(id);
           return posts;
        }
        [HttpPost]
        public async Task Post(Post post)
        {
             await Queries.MakePost(post);
        }

    }
}
