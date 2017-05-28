using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rate.ME.Models;
using Rate.ME.Repositories;
using Rate.ME.Utils;

namespace Rate.ME.Controllers
{
    public class LoginRequest
    {
        public string Name {get;set;}
        public string Password {get;set;}
    }
    
    public class LoginSuccesfullResponse
    {
        public long UserID { get; set;}
        public long Token { get; set;}
        public string Status { get; set;}
    }

    [Route("api/login")]
    public class LoginUserController : Controller
    {
        private IUserRepository _repository;
        public LoginUserController(IUserRepository repository)
        {
            _repository = repository;
        }
        [HttpPost]
        public IActionResult Vote([FromBody] LoginRequest loginAttempt)
        {
            User user;

            try
            {
                user = _repository.GetUser(x => x.Name == loginAttempt.Name);
            }
            catch
            {
                return CreatedAtRoute(new { gettedId = loginAttempt.Name }, new { status = "Login failed"});
            }

            try
            {
                if(user.Password == loginAttempt.Password)
                {
                    LoginSuccesfullResponse response = new LoginSuccesfullResponse();
                    response.UserID = user.Id;
                    response.Token = DateTime.Now.Ticks;
                    response.Status = "Ok";

                    return CreatedAtRoute(new { gettedId = loginAttempt.Name }, response);
                }
                else
                {
                    return CreatedAtRoute(new { gettedId = loginAttempt.Name }, new { status = "Bad password"});
                }
            }
            catch
            {
                return CreatedAtRoute(new { gettedId = loginAttempt.Name }, new { status = "Login failed"});
            }
        }
    }
}