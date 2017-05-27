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
    public class SimplifiedBusinessClient
    {
        public long ClientID {get; set;}
        public string Name {get; set;}
        public string Description {get; set;}
    }

    [Route("api/search")]
    public class BusinessSearchController : Controller
    {
        private readonly IBusinessClientRepository _repository;

        public BusinessSearchController(IBusinessClientRepository repository)
        {
            _repository = repository;
        }

        // GET api/search/{text}
        [HttpGet("{text}")]
        public IActionResult Get(string text)
        {
            BusinessClient[] clients;
            List<SimplifiedBusinessClient> foundClients = new List<SimplifiedBusinessClient>();

            try
            {
                clients = _repository.GetBusinessClients(x => x.Name.Contains(text)).ToArray();
            }
            catch
            {
                return CreatedAtRoute(new { searchText = text }, new { status = "Error"});
            }

            foreach(var element in clients)
            {
                var foundClient = new SimplifiedBusinessClient();

                foundClient.ClientID = element.Id;
                foundClient.Description = element.Description;
                foundClient.Name = element.Name;

                foundClients.Add(foundClient);

            }

            return CreatedAtRoute(new { searchText = text }, foundClients);
        }
    }
}
