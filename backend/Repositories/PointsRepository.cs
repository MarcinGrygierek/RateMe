using Rate.ME.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace Rate.ME.Repositories
{
    public class PointsRepository : IPointsRepository
    {
        private readonly RateMeDbContext _ratesDb;

        public PointsRepository(RateMeDbContext context)
        {
            _ratesDb = context;
        }
        public void AddPoints(Points points)
        {
            _ratesDb.Points.Add(points);
            try
            {
                _ratesDb.SaveChanges();
            }
            finally
            {
                
            }
        }

        public Points GetPoints(Func<Points, bool> predicate)
        {
            try
            {
                Points points;
                points = _ratesDb.Points.Where(predicate).First();
                return points;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<Points> GetAllPoints()
        {
            return _ratesDb.Points;
        }

        public IEnumerable<Points> GetAllPoints(Func<Points, bool> predicate)
        {
            try
            {
                return _ratesDb.Points.Where(predicate).ToArray();
            }
            catch
            {
                return null;
            }
        }

        public void RemovePoints(Points points)
        {
            try
            {
                _ratesDb.Points.Remove(points);
                _ratesDb.SaveChanges();
            }
            finally
            {

            }
        }

        public void UpdatePoints(Points points)
        {
            try
            {
                _ratesDb.Points.Update(points);
                _ratesDb.SaveChanges();
            }
            finally
            {

            }
        }
    }
}
