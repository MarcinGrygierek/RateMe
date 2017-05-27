using Rate.ME.Models;
using System.Collections.Generic;
using System;

namespace Rate.ME.Repositories
{
    public interface IUserRepository
    {
        void AddUser(User client);
        void RemoveUser(User client);
        IEnumerable<User> GetUsers();
        User GetUser(Func<User, bool> predicate);
        void UpdateUser(User client);

    }
}