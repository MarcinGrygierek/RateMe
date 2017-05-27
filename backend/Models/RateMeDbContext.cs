using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Rate.ME.Models
{
    public partial class RateMeDbContext : DbContext
    {
        public virtual DbSet<BusinessClient> BusinessClient { get; set; }
        public virtual DbSet<Points> Points { get; set; }
        public virtual DbSet<Token> Token { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Vote> Vote { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
            optionsBuilder.UseSqlite(@"Datasource=database");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BusinessClient>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Email).IsRequired();

                entity.Property(e => e.IsVerified)
                    .IsRequired()
                    .HasColumnType("BOOLEAN");

                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<Points>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.TokenId).HasColumnName("TokenID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Token)
                    .WithMany(p => p.Points)
                    .HasForeignKey(d => d.TokenId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Points)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<Token>(entity =>
            {
                entity.HasIndex(e => e.TokenData)
                    .HasName("sqlite_autoindex_Token_2")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ClientId).HasColumnName("ClientID");

                entity.Property(e => e.ExpirationDate)
                    .IsRequired()
                    .HasColumnType("DATETIME");

                entity.Property(e => e.TokenData).IsRequired();

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.Token)
                    .HasForeignKey(d => d.ClientId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Email).IsRequired();

                entity.Property(e => e.Name).IsRequired();

                entity.Property(e => e.Password).IsRequired();
            });

            modelBuilder.Entity<Vote>(entity =>
            {
                entity.HasIndex(e => e.TokenId)
                    .HasName("sqlite_autoindex_Vote_2")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Comment).IsRequired();

                entity.Property(e => e.ProductRate).HasColumnType("DOUBLE");

                entity.Property(e => e.RatioRate).HasColumnType("DOUBLE");

                entity.Property(e => e.ServiceRate).HasColumnType("DOUBLE");

                entity.Property(e => e.TokenId).HasColumnName("TokenID");

                entity.HasOne(d => d.Token)
                    .WithOne(p => p.Vote)
                    .HasForeignKey<Vote>(d => d.TokenId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}