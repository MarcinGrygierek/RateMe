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

        [Route("api/request/{userID}/{clientID}")]
        public string Get([FromQuery]long userID, [FromQuery]long clientID)
        {
            BusinessClient client;
            User user;
            TokenData tokenData;
            Token realToken;

            try
            {
                user = _userRepository.GetUser(actualUser => actualUser.Id == userID);
                client = _businessRepository.GetBusinessClient(actualClient => actualClient.Id == clientID);
                tokenData = new TokenData(client, user, DateTime.Now);
                TokenGenerator generator = new TokenGenerator();
                realToken = generator.GenerateTokenForDB(tokenData);
            }
            catch
            {
                return "";
            }

            try
            {
                _repository.AddToken(realToken);
            }
            catch
            {
                return "";
            }

            return BitConverter.ToString(realToken.TokenText).Replace("-", "");
        }
    }
}
        