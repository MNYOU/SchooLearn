﻿namespace Dal.Entities;

public class Group
{
    // должны быть уникальными: {teacherID, name}
    // то есть толжны быть уникальными в рамках учителя
    // хотя как произодить данную валидацию?
    public long Id { get; set; }
    
    public string Name { get; set; }

    public string? Description { get; set; }
    
    public string InvitationCode { get; set; }

    public long TeacherId { get; set; }
    
    public Teacher Teacher { get; set; }

    public long SubjectId { get; set; }

    public Subject Subject { get; set; }
    
    public ICollection<GroupStudent> GroupsStudent { get; set; }
    
    public ICollection<Task> Tasks { get; set; }
}