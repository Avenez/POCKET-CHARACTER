using System;
using System.Collections.Generic;

namespace PocketCharacterWebApiCore.Models;

public partial class Background
{
    public int IdBackground { get; set; }

    public string? Name { get; set; }

    public string? SkillOne { get; set; }

    public string? SkillTwo { get; set; }

    public string? Description { get; set; }

    public string? Equip { get; set; }

    public string? Feature { get; set; }

    public string? FeatureDescription { get; set; }
}
