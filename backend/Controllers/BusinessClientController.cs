using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rate.ME.Models;
using Rate.ME.Repositories;

namespace Rate.ME.Controllers
{
    [DataContract]
    class BusinessClientInfo
    {
        [DataMember]
        public long ClientID { get; private set;}
        [DataMember]
        public string Description {get; private set;}
        [DataMember]
        public string Name {get; private set;}
        [DataMember]
        public double AverageProductRate {get; private set;}
        [DataMember]
        public double AverageServiceRate {get; private set;}
        [DataMember]
        public double AverageRatioRate {get; private set;}
        [DataMember]
        public List<SimplifiedVote> Votes {get; private set;}

        public BusinessClientInfo(BusinessClient client, IVoteRepository repository, ITokenRepository tokenRepository)
        {
            ClientID = client.Id;
            Name = client.Name;
            Description = client.Description;

            var tokens = tokenRepository.GetTokens(x => x.ClientId == ClientID);

            var votes = repository.GetVotes();
            votes = votes.Where(x => tokens.Any(y => x.TokenId == y.Id));

            Votes = new List<SimplifiedVote>();
            foreach(var element in votes)
            {
                SimplifiedVote vote = new SimplifiedVote();
                vote.Id = element.Id;
                vote.Comment = element.Comment;
                vote.ProductRate = element.ProductRate;
                vote.RatioRate = element.RatioRate;
                vote.ServiceRate = element.ServiceRate;

                Votes.Add(vote);
            }

            try
            {
                AverageProductRate = Votes.Average(x => x.ProductRate);
                AverageServiceRate = Votes.Average(x => x.ServiceRate);
                AverageRatioRate = Votes.Average(x => x.RatioRate);
            }
            catch
            {

            }
        }
    }

    public class SimplifiedVote
    {
        public long Id { get; set; }
        public long TokenId { get; set; }
        public double ProductRate { get; set; }
        public double ServiceRate { get; set; }
        public double RatioRate { get; set; }
        public string Comment { get; set; }
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
