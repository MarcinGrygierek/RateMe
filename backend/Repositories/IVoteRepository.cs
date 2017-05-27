using Rate.ME.Models;
using System.Collections.Generic;
using System;

namespace Rate.ME.Repositories
{
    public interface IVoteRepository
    {
        void AddVote(Vote client);
        void RemoveVote(Vote client);
        IEnumerable<Vote> GetVotes();
        Vote GetVote(Func<Vote, bool> predicate);
        void UpdateVote(Vote client);

    }
}