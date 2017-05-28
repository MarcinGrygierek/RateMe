using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Rate.ME.Models;
using Rate.ME.Repositories;
using Rate.ME.Utils;

namespace Rate.ME.Controllers
{
    public class HashRequestData
    {
        public string UserName { get; set; }
        public long ClientID { get; set; }
    }

    public class HashRequestResponse
    {
        public string HashText {get; set;}
        public string Status {get; set;}
    }

    [EnableCors("MyPolicy")]
    [Route("api/code")]
    public class TokenRequestController : Controller
    {
        private readonly ITokenRepository _repository;
        private readonly IBusinessClientRepository _businessRepository;
        private readonly IUserRepository _userRepository;

        public TokenRequestController(ITokenRepository repository,
        IBusinessClientRepository businessRepository,
        IUserRepository userRepository)
        {
            _businessRepository = businessRepository;
            _repository = repository;
            _userRepository = userRepository;
        }

        [HttpPost]
        public IActionResult GetHash([FromBody] HashRequestData data)
        {
            BusinessClient client;
            User user;
            TokenData tokenData;
            Token realToken;

            HashRequestResponse response = new HashRequestResponse();
            response.HashText = "";
            response.Status = "Error";

            if(data == null) return CreatedAtRoute(data, response);

            try
            {
                user = _userRepository.GetUser(actualUser => actualUser.Name == data.UserName);
                client = _businessRepository.GetBusinessClient(actualClient => actualClient.Id == data.ClientID);
                tokenData = new TokenData(client, user, DateTime.Now);
                TokenGenerator generator = new TokenGenerator();
                realToken = generator.GenerateTokenForDB(tokenData);
            }
            catch
            {
                return CreatedAtRoute(data, response);
            }

            try
            {
                _repository.AddToken(realToken);
                response.HashText = BitConverter.ToString(realToken.TokenData).Replace("-", "");
                response.Status = "Ok";
            }
            catch
            {
                return CreatedAtRoute(data, response);
            }

            return CreatedAtRoute(data, response);
        }
    }
}
        