using Microsoft.AspNetCore.Mvc;
using DataAccess.Models;
using DataAccess;
using System.Linq;
namespace TweetBookAPI
{
    
    [ApiController]
    [Route("tweetbookapi/[controller]")]
    public class PostsController : Controller
    {
        [HttpGet]
        [ActionName("Get")]
        public async Task<List<Post>> GetAll()
        {
           var posts = await Queries.GetPosts();
           return posts;
        }
        [HttpGet("{id}")]
        [ActionName("GetById")]
        public async Task<List<Post>> GetById([FromRoute] int id)
        {
           var posts = await Queries.GetPosts(id);
           return posts;
        }
        [HttpPost]
        public async Task Post([FromBody]Post post)
        {
             await Queries.MakePost(post);
        }

    }
}
