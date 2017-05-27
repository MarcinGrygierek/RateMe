using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rate.ME.Models;
using Rate.ME.Repositories;

namespace Rate.ME.Controllers
{
    public class VoteController : Controller
    {
        IVoteRepository _repository;
        IVoteRepository _tokenRepository;
        public VoteController(IVoteRepository repository, ITokenRepository tokenRepository)
        {
            _repository = repository;
        }

        [Route("api/vote/")]
        public string Vote()
        {
            //var
            return null; 
        }
    }
}