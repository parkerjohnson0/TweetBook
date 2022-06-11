using Microsoft.AspNetCore.Mvc;
using DataAccess.Models;
using DataAccess;
using System.Linq;
using System.Text.Json;
using Newtonsoft.Json;

namespace TweetBookAPI
{

    [ApiController]
    [Route("tweetbookapi/[controller]")]
    public class PostsController : Controller
    {
        [HttpGet]
        [ActionName("Get")]
        public async Task<List<Post>> GetAll([FromQuery] int? id)
        {
            List<Post> parent = null;
            var posts = await Queries.GetChildPosts(id);
            if (id is not null)
            {
                parent = await Queries.GetParentPost(id);
                parent[0].Comments = posts;
                return parent;
            }
           return posts;
        }
        //[HttpGet]
        //[ActionName("GetById")]
        //public async Task<List<Post>> GetById([FromRoute] int id)
        //{
        //   var posts = await Queries.GetPosts(id);
        //   return posts;
        //}
        [HttpPost]
        public async Task Post([FromBody]Post post)
        {
             await Queries.MakePost(post);
        }

        [HttpPost("{postID}")]
        public async Task<IActionResult> Delete(string postID)
        {
            //var json = new
            //{
            //    postID = postID
            //};
            try
            {
                int count = await Queries.DeletePost(postID);
                return Ok(count);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
            //return Ok(JsonConvert.SerializeObject(json));
        }
    }
}
