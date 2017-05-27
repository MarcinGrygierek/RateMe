using Rate.ME.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace Rate.ME.Repositories
{
    public class BusinessClientRepository : IBusinessClientRepository
    {
        private readonly RateMeDbContext _ratesDb;

        public BusinessClientRepository(RateMeDbContext context)
        {
            _ratesDb = context;
        }
        public void AddBusinessClient(BusinessClient client)
        {
            _ratesDb.BusinessClient.Add(client);
            _ratesDb.SaveChanges();
        }

        public BusinessClient GetBusinessClient(Func<BusinessClient, bool> predicate)
        {
            try
            {
                BusinessClient client;
                client = _ratesDb.BusinessClient.Where(predicate).First();
                return client;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<BusinessClient> GetBusinessClients()
        {
            return _ratesDb.BusinessClient;
        }

        public void RemoveBusinessClient(BusinessClient client)
        {
            try
            {
                _ratesDb.BusinessClient.Remove(client);
                _ratesDb.SaveChanges();
            }
            finally
            {

            }
        }

        public void UpdateBusinessClient(BusinessClient client)
        {
            try
            {
                _ratesDb.BusinessClient.Update(client);
                _ratesDb.SaveChanges();
            }
            finally
            {

            }
        }
    }
}
