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
        public long UserID { get; set; }
        public long ClientID { get; set; }
    }

    public class HashRequestResponse
    {
        public string HashText {get; set;}
        public string Status {get; set;}
    }

    public class ClientInfoResponse
    {
        public long ID {get; set;}
        public string Description {get; set;}
        public string Name {get; set;}
        public string Status {get; set;}
    }

    [EnableCors("MyPolicy")]
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

        [HttpGet("api/info/{token}")]
        public IActionResult GetInfo(string token)
        {
            ClientInfoResponse response = new ClientInfoResponse();
            response.Status = "Error";
            var realToken = _repository.GetToken(x => BitConverter.ToString(x.TokenData).Replace("-", "") == token);

            if(realToken == null) return CreatedAtRoute(new { status = "Error"}, response);

            var client = _businessRepository.GetBusinessClient(x => realToken.ClientId == x.Id);

            if(client == null) return CreatedAtRoute(new { status = "Error"}, response);

            response.Status = "Ok";
            response.Description = client.Description;
            response.Name = client.Name;
            response.ID = client.Id;

            return CreatedAtRoute(new { status = "Ok"}, response);
        }

        [Route("api/code")]
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
                user = _userRepository.GetUser(actualUser => actualUser.Id == data.UserID);
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
        