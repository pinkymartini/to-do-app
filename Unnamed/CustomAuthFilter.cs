using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

//this is an old way of doing things 
public class CustomAuthFilter : Attribute, Microsoft.AspNetCore.Mvc.Filters.IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        // Get the JWT from the request
        var jwt = context.HttpContext.Request.Headers["Authorization"];

        if (!StringValues.IsNullOrEmpty(jwt) && !string.IsNullOrEmpty(jwt))
        {
            // Read the JWT and get the ClaimsPrincipal
            var principal = new JwtSecurityTokenHandler().ValidateToken(jwt, new TokenValidationParameters
            {
                // Configure the TokenValidationParameters as needed
                // ...
            }, out SecurityToken validatedToken);

            // Get the custom message claim from the ClaimsPrincipal
            var message = principal.Claims.FirstOrDefault(c => c.Type == "message");

            if (message != null)
            {
                // Display the custom message
                context.Result = new ContentResult
                {
                    Content = message.Value,
                    ContentType = "text/plain",
                    
                };
            }
        }
        else
        {
            // Return 401 Unauthorized if the Authorization header is not present
            // context.Result = new UnauthorizedResult();

            context.Result = new ContentResult
            {
                Content = "You are not authorized to access this information.",
                ContentType = "text/plain",
                StatusCode=401
            };




        }
    }
}
