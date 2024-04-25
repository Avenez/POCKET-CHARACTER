using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PocketCharacterWebApiCore.Models;

public partial class Character
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdCharacter { get; set; }

    public int IdUser { get; set; }

    public string? ImageName { get; set; }

    [NotMapped]
    public IFormFile? ImageFile { get; set; }

    [NotMapped]
    public string ImageSrc { get; set; }

    public string Name { get; set; } = null!;

    public string Race { get; set; } = null!;

    public string? RaceType { get; set; }

    public string? SubRace { get; set; }

    public int Lv { get; set; }

    public int Bc { get; set; }

    public string? Backgorund { get; set; }

    public string Class { get; set; } = null!;

    public string? SubClass { get; set; }

    public string? SubClassType { get; set; }

    public string? FightingStyle { get; set; }

    public int Str { get; set; }

    public int Dex { get; set; }

    public int Con { get; set; }

    public int Int { get; set; }

    public int Wis { get; set; }

    public int Cha { get; set; }

    public int? Ca { get; set; }

    public int? Tpcm { get; set; }

    public int? Tpcd { get; set; }

    public int? Tpci { get; set; }

    public string? ToolProf { get; set; }

    public string? AbilitiesProf { get; set; }

    public string? AbilitiesMastery { get; set; }

    public string SavingProf { get; set; } = null!;

    public bool? Visible { get; set; }

    //public virtual User IdUserNavigation { get; set; } = null!;

    //public Character(int idUser, string? imageName, IFormFile imageFile, string imageSrc, string name, string race, string? raceType,
    //                 string? subRace, int lv, int bc, string? backgroundType, string @class, string? subClass, string? subClassType,
    //                 string? fightingStyle, int str, int dex, int con, int @int, int wis, int cha, int? ca, int? tpcm, int? tpcd,
    //                 int? tpci, string? toolProf, string? abilitiesProf, string? abilitiesMastery, string savingProf, bool? visible)
    //{
    //    IdUser = idUser;
    //    ImageName = imageName;
    //    ImageFile = imageFile;
    //    ImageSrc = imageSrc;
    //    Name = name;
    //    Race = race;
    //    RaceType = raceType;
    //    SubRace = subRace;
    //    Lv = lv;
    //    Bc = bc;
    //    BackgorundType = backgroundType;
    //    Class = @class;
    //    SubClass = subClass;
    //    SubClassType = subClassType;
    //    FightingStyle = fightingStyle;
    //    Str = str;
    //    Dex = dex;
    //    Con = con;
    //    Int = @int;
    //    Wis = wis;
    //    Cha = cha;
    //    Ca = ca;
    //    Tpcm = tpcm;
    //    Tpcd = tpcd;
    //    Tpci = tpci;
    //    ToolProf = toolProf;
    //    AbilitiesProf = abilitiesProf;
    //    AbilitiesMastery = abilitiesMastery;
    //    SavingProf = savingProf;
    //    Visible = visible;
    //}

}
