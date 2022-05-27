using Microsoft.AspNetCore.Mvc;
using DataAccess.Models;
using DataAccess;
using System.Linq;
namespace TweetBookAPI
{
    [ApiController]
[Route("api/[controller]")]
    public class LoginController : Controller
    {
        [HttpGet]
        public async Task<List<User>> Get()
        {
           var users = await Queries.GetUsers();
           return users;
        }
        [HttpPost("register")]
        public async Task<int> Register(string username, string password)
        {
            return await Queries.RegisterUser(username, password);
        }

    }
}
