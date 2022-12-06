using Unnamed.Data;
using Unnamed.Models;

namespace Unnamed.Testing
{
    public class Config
    {



        public static List<User> users = new List<User>()
        {
            new User(){UserName= "mert_senocak", Password= "1234", Role= "User"},
            new User(){UserName= "aysegul", Password= "e%gh6Y?043", Role= "User"},
            new User(){UserName= "mert_admin", Password= "97213", Role= "Admin"},
            new User(){UserName= "borcelik", Password= "1234", Role= "Admin"},
            new User(){UserName= "sarp", Password= "abV5:,=02", Role= "User"},

        };
    }
}
