using Rate.ME.Models;
using System.Collections.Generic;
using System;

namespace Rate.ME.Repositories
{
    public interface IBusinessClientRepository
    {
        void AddBusinessClient(BusinessClient client);
        void RemoveBusinessClient(BusinessClient client);
        IEnumerable<BusinessClient> GetBusinessClients();
        BusinessClient GetBusinessClient(Func<BusinessClient, bool> predicate);
        void UpdateBusinessClient(BusinessClient client);

    }
}