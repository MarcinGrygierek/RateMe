using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rate.ME.Models;
using Rate.ME.Repositories;

namespace Rate.ME.Controllers
{
    [Route("api/[controller]")]
    public class TokenRequestController : Controller
    {
        private readonly TokenRepository _repository;

        TokenRequestController(TokenRepository repository)
        {
            _repository = repository;
        }
    }
}
        