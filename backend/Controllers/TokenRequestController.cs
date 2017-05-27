using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rate.ME.Models;
using Rate.ME.Repositories;

namespace Rate.ME.Controllers
{
    [Route("api/tokenrequest")]
    public class TokenRequestController : Controller
    {
        private readonly ITokenRepository _repository;

        public TokenRequestController(ITokenRepository repository)
        {
            _repository = repository;
        }

        //api/tokenrequest
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var data = _repository.GetTokens();
            return data.Select(x => BitConverter.ToString(x.TokenText));
        }
    }
}
        