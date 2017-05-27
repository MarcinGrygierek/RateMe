using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rate.ME.Models;

namespace Rate.ME.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly RateMeDbContext _ratesDb;

        public ValuesController(RateMeDbContext database)
        {
            _ratesDb = database;
        }
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return _ratesDb.BusinessClient.Select(x => x.ToString()).ToArray();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
