using Rate.ME.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace Rate.ME.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly RateMeDbContext _ratesDb;

        public UserRepository(RateMeDbContext context)
        {
            _ratesDb = context;
        }
        public void AddUser(User client)
        {
            _ratesDb.User.Add(client);
            _ratesDb.SaveChanges();
        }

        public User GetUser(Func<User, bool> predicate)
        {
            try
            {
                User client;
                client = _ratesDb.User.Where(predicate).First();
                return client;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<User> GetUsers()
        {
            return _ratesDb.User;
        }

        public void RemoveUser(User client)
        {
            try
            {
                _ratesDb.User.Remove(client);
                _ratesDb.SaveChanges();
            }
            finally
            {

            }
        }

        public void UpdateUser(User client)
        {
            try
            {
                _ratesDb.User.Update(client);
                _ratesDb.SaveChanges();
            }
            finally
            {

            }
        }
    }
}
