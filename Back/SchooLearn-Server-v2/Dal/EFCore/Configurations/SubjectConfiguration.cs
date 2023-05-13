﻿using Dal.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dal.EFCore.Configurations;

public class SubjectConfiguration : IEntityTypeConfiguration<Subject>
{
    public void Configure(EntityTypeBuilder<Subject> builder)
    {
        builder
            .ToTable("subjects");
        
        builder
            .Property(s => s.Id)
            .HasColumnName("id");

        builder
            .Property(s => s.Name)
            .HasColumnName("name");

        builder
            .Property(s => s.Description)
            .HasColumnName("description");

        builder
            .HasOne(s => s.Teacher)
            .WithMany(t => t.Subjects)
            .HasForeignKey(s => s.TeacherId);
    }
}