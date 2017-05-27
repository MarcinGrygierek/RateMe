using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rate.ME.Models;
using Rate.ME.Repositories;

namespace Rate.ME.Controllers
{
    class BusinessClientInfo
    {
        public long ClientID { get; private set;}
        public string Description {get; private set;}
        public string Name {get; private set;}
        public int AverageProductRate {get; private set;}
        public int AverageServiceRate {get; private set;}
        public int AverageRatioRate {get; private set;}

        public List<Vote> Votes {get; private set;}

        public BusinessClientInfo(BusinessClient client, IVoteRepository repository, ITokenRepository tokenRepository)
        {
            ClientID = client.Id;
            Name = client.Name;
            Description = client.Description;

            var tokens = tokenRepository.GetTokens(x => x.ClientId == ClientID);

            Votes = repository.GetVotes().ToList();
            Votes = Votes.Where(x => tokens.Any(y => x.TokenId == y.Id)).ToList();

            AverageProductRate = Convert.ToInt32(Votes.Average(x => x.ProductRate));
            AverageServiceRate = Convert.ToInt32(Votes.Average(x => x.ServiceRate));
            AverageRatioRate = Convert.ToInt32(Votes.Average(x => x.RatioRate));
        }
    }

    [Route("api/values")]
    public class BusinessClientController : Controller
    {
        private readonly IBusinessClientRepository _repository;
        private readonly IVoteRepository _voteRepository;
        private readonly ITokenRepository _tokenRepository;

        public BusinessClientController(IBusinessClientRepository repository,
        IVoteRepository voteRepository, ITokenRepository tokenRepository)
        {
            _repository = repository;
            _voteRepository = voteRepository;
            _tokenRepository = tokenRepository;
        }

        // GET api/values/{id}
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            BusinessClient client;

            try
            {
                client = _repository.GetBusinessClient(x => x.Id == id);
            }
            catch
            {
                return CreatedAtRoute(new { gettedId = id}, new { status = "Error"});
            }
            BusinessClientInfo info = new BusinessClientInfo(client, _voteRepository, _tokenRepository);

            return CreatedAtRoute(new { gettedId = id}, info);
        }
    }
}
