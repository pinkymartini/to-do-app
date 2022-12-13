using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Helpers;
using Unnamed.Data;
using Unnamed.Models;

namespace Unnamed.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [AllowAnonymous]
    public class LoginController : Controller
    {
        private IConfiguration _configuration;
        private readonly ToDoListDbContext _db;
       

        public LoginController(IConfiguration configuration, ToDoListDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpPost] 
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            var user = Authenticate(userLogin);
            if (user != null)
            {
                var token = GenerateUserToken(user);
                return Ok(token);
            }
            return NotFound("User not found");
        }

        [HttpGet]
        public string WelcomeScreen()
        {
            return JsonConvert.SerializeObject("Please enter username and password to do operations in the system");
        }

        private string GenerateUserToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];

            var claims = new[]
            {
                new Claim (ClaimTypes.NameIdentifier, user.UserName),
                new Claim(ClaimTypes.Role, user.Role),
                //new Claim(JwtRegisteredClaimNames.Typ,user.Role),
                new Claim("errorMessage", "Invalid username or password"),
               
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(5),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = credentials
                
            };


            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            //var jwtToken = tokenHandler.WriteToken(token);
            var stringToken = tokenHandler.WriteToken(token);


            return JsonConvert.SerializeObject(stringToken);



        }

        //auth for username and password info from userlogin (http)
        private User? Authenticate(UserLogin userLogin)
        {
            //var currentUser = Config.users.FirstOrDefault(o=>
            //o.UserName.ToLower()==userLogin.UserName.ToLower() && 
            //o.Password== userLogin.Password);

            var currentUser = _db.Users.FirstOrDefault(o =>
            o.UserName.ToLower() == userLogin.UserName.ToLower() &&
            o.Password == userLogin.Password);

            if (currentUser != null)
            {
                return currentUser;
            }
            return null;
          
        }
    }
}
