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
        public async Task<IActionResult> Register([FromBody] User user)
        {
            RegisterResult response = ValidateInfo(user);
            if (String.IsNullOrEmpty(response.Message))
            {

                 response.UserID = await Queries.RegisterUser(user.Username, user.Password);
            }

            if (response.UserID == -1)
            {
                response.Message = "User already exists";
            }

            return Ok(Json(response));
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

        private RegisterResult ValidateInfo(User user)
        {
            RegisterResult res = new RegisterResult();
            int passLength = 7;
            string msg = "";

            if (user.Password.Length < passLength)
            {
                msg = "Password must be at least 7 characters";
            }
            res.Message = msg;
            return res;
        }

    }
}
