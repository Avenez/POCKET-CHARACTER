using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PocketCharacterWebApiCore.Models;

public partial class PocketCharacterContext : DbContext
{
    public PocketCharacterContext()
    {
    }

    public PocketCharacterContext(DbContextOptions<PocketCharacterContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Background> Backgrounds { get; set; }

    public virtual DbSet<Character> Characters { get; set; }

    public virtual DbSet<MigrationHistory> MigrationHistories { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=Bisio\\SQLEXPRESS;Database=PocketCharacter;Trusted_Connection=true;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Background>(entity =>
        {
            entity.HasKey(e => e.IdBackground).HasName("PK_dbo.Background");

            entity.ToTable("Background");

            entity.Property(e => e.IdBackground)
                .ValueGeneratedNever()
                .HasColumnName("idBackground");
            entity.Property(e => e.SkillOne).HasColumnName("skill_one");
            entity.Property(e => e.SkillTwo).HasColumnName("skill_two");
        });

        modelBuilder.Entity<Character>(entity =>
        {
            entity.HasKey(e => e.IdCharacter);

            entity.ToTable("Character");

            entity.Property(e => e.IdCharacter).HasColumnName("idCharacter");
            entity.Property(e => e.Backgorund).HasMaxLength(200);
            entity.Property(e => e.Bc).HasColumnName("BC");
            entity.Property(e => e.Ca).HasColumnName("CA");
            entity.Property(e => e.Cha).HasColumnName("CHA");
            entity.Property(e => e.Class).HasMaxLength(200);
            entity.Property(e => e.Con).HasColumnName("CON");
            entity.Property(e => e.Dex).HasColumnName("DEX");
            entity.Property(e => e.IdUser).HasColumnName("idUser");
            entity.Property(e => e.Int).HasColumnName("INT");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Race).HasMaxLength(30);
            entity.Property(e => e.Str).HasColumnName("STR");
            entity.Property(e => e.SubClass).HasMaxLength(200);
            entity.Property(e => e.Tpcd).HasColumnName("TPCD");
            entity.Property(e => e.Tpci).HasColumnName("TPCI");
            entity.Property(e => e.Tpcm).HasColumnName("TPCM");
            entity.Property(e => e.Visible).HasColumnName("visible");
            entity.Property(e => e.Wis).HasColumnName("WIS");

            //entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Characters)
            //    .HasForeignKey(d => d.IdUser)
            //    .OnDelete(DeleteBehavior.ClientSetNull)
            //    .HasConstraintName("FK_Character_User");
        });

        modelBuilder.Entity<MigrationHistory>(entity =>
        {
            entity.HasKey(e => new { e.MigrationId, e.ContextKey }).HasName("PK_dbo.__MigrationHistory");

            entity.ToTable("__MigrationHistory");

            entity.Property(e => e.MigrationId).HasMaxLength(150);
            entity.Property(e => e.ContextKey).HasMaxLength(300);
            entity.Property(e => e.ProductVersion).HasMaxLength(32);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.IdUser);

            entity.ToTable("User");

            entity.Property(e => e.IdUser).HasColumnName("idUser");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.Role).HasMaxLength(10);
            entity.Property(e => e.Username).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
