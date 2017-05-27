using Rate.ME.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace Rate.ME.Repositories
{
    public class VoteRepository : IVoteRepository
    {
        private readonly RateMeDbContext _ratesDb;

        public VoteRepository(RateMeDbContext context)
        {
            _ratesDb = context;
        }
        public void AddVote(Vote client)
        {
            _ratesDb.Vote.Add(client);
            _ratesDb.SaveChanges();
        }

        public Vote GetVote(Func<Vote, bool> predicate)
        {
            try
            {
                Vote client;
                client = _ratesDb.Vote.Where(predicate).First();
                return client;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<Vote> GetVotes()
        {
            return _ratesDb.Vote;
        }

        public IEnumerable<Vote> GetVotes(Func<Vote, bool> predicate)
        {
            try
            {
                return _ratesDb.Vote.Where(predicate).ToArray();
            }
            catch
            {
                return null;
            }
        }

        public void RemoveVote(Vote client)
        {
            try
            {
                _ratesDb.Vote.Remove(client);
                _ratesDb.SaveChanges();
            }
            finally
            {

            }
        }

        public void UpdateVote(Vote client)
        {
            try
            {
                _ratesDb.Vote.Update(client);
                _ratesDb.SaveChanges();
            }
            finally
            {

            }
        }
    }
}
