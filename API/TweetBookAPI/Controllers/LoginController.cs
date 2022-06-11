using Microsoft.AspNetCore.Mvc;
using DataAccess.Models;
using DataAccess;
using System.Linq;
namespace TweetBookAPI
{
    [ApiController]
[Route("tweetbookapi/[controller]")]
    public class LoginController : Controller
    {
        [HttpGet]
        public async Task<List<User>> Get()
        {
           var users = await Queries.GetUsers();
           return users;
        }
        [HttpPost("Register")]
        public async Task<int> Register([FromBody] User user)
        {
            return await Queries.RegisterUser(user.Username, user.Password);
        }
        [HttpPost("LoginByToken")]
        public async Task<IActionResult> LoginByToken([FromBody] User  user)
        {
            try
            {
                var result = await Queries.LoginUserByToken(user.UserID);
                return Ok(result);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            try
            {
                var result = await Queries.LoginUser(user.Username, user.Password);
                return Ok(result);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
        }

    }
}
