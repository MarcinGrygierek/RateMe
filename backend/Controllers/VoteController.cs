using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rate.ME.Models;
using Rate.ME.Repositories;

namespace Rate.ME.Controllers
{
    public class VoteRequestData
    {
        public long UserID { get; set; }
        public long ClientID { get; set; }
        public double ProductQuality {get; set;}
        public double ServiceQuality {get; set;}
        public double RatioQuality {get; set;}
        public string Comment {get; set;}
        public string Token {get; set;}
    }

    public class VoteResponseData
    {
        public string Status {get; set;}
    }

    [Route("api/vote")]
    public class VoteController : Controller
    {
        IVoteRepository _repository;
        ITokenRepository _tokenRepository;
        public VoteController(IVoteRepository repository, ITokenRepository tokenRepository)
        {
            _repository = repository;
            _tokenRepository = tokenRepository;
        }

        [HttpPost]
        public IActionResult Vote([FromBody] VoteRequestData data)
        {
            var token = _tokenRepository.GetToken(x => BitConverter.ToString(x.TokenData).Replace("-", "") == data.Token);
            
            if(token == null) return CreatedAtRoute(data, new { Status = "Error"});

            if(token.ClientId == data.ClientID)
            {
                if(DateTime.Compare(DateTime.Now, Convert.ToDateTime(token.ExpirationDate)) > 1)
                {
                    return CreatedAtRoute(data, new { Status = "Token expired"});
                }
                else
                {
                    Vote vote = new Vote();
                    vote.TokenId = token.Id;
                    vote.ProductRate = data.ProductQuality;
                    vote.RatioRate = data.RatioQuality;
                    vote.ServiceRate = data.ServiceQuality;
                    vote.Comment = data.Comment;
                    _repository.AddVote(vote);
                }
            }
            else
            {
                return CreatedAtRoute(data, new { Status = "Invalid ClientID"});
            }

            return CreatedAtRoute(data, new { StatusCode = "Ok"});
        }
    }
}