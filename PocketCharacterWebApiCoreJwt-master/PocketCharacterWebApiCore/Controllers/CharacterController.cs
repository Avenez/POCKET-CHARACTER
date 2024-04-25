using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Security.AccessControl;
using System.Security.Claims;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using PocketCharacterWebApiCore.Models;

namespace PocketCharacterWebApiCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CharacterController : ControllerBase
    {
        private readonly PocketCharacterContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public CharacterController(PocketCharacterContext context, IWebHostEnvironment hostEnvironment
            )
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }

        // GET: api/Character
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Character>>> GetCharacters()
        {
            return await _context.Characters
                .Select(x => new Character()
                {
                    IdCharacter = x.IdCharacter,
                    IdUser = x.IdUser,
                    ImageName = x.ImageName,
                    ImageFile = x.ImageFile,
                    ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName),
                    Name = x.Name,
                    Race = x.Race,
                    RaceType = x.RaceType,
                    SubRace = x.SubRace,
                    Lv = x.Lv,
                    Bc = x.Bc,
                    Backgorund = x.Backgorund,
                    Class = x.Class,
                    SubClass = x.SubClass,
                    SubClassType = x.SubClassType,
                    FightingStyle = x.FightingStyle,
                    Str = x.Str,
                    Dex = x.Dex,
                    Con = x.Con,
                    Int = x.Int,
                    Wis = x.Wis,
                    Cha = x.Cha,
                    Ca = x.Ca,
                    Tpcm = x.Tpcm,
                    Tpcd = x.Tpcd,
                    Tpci = x.Tpci,
                    ToolProf = x.ToolProf,
                    AbilitiesProf = x.AbilitiesProf,
                    AbilitiesMastery = x.AbilitiesMastery,
                    SavingProf = x.SavingProf,
                    Visible = x.Visible,

                })
                .ToListAsync();
        }

        // GET: api/[controller]/UserCharacters/{idUser}
        [HttpGet]
        [Route("UserCharacters/{idUser}")]
        public async Task<ActionResult<IEnumerable<Character>>> GetUserCharacters(int idUser)
        {
            // Recupera tutti i personaggi associati all'idUser fornito
            var characters = await _context.Characters
                                          .Where(c => c.IdUser == idUser)
                                          .ToListAsync();

            if (characters == null || characters.Count == 0)
            {
                return NotFound("Nessun personaggio trovato per l'utente specificato.");
            }

            return characters;
        }

        
        //[AllowAnonymous]
        [HttpGet]
        [Route("UserCharactersWithImage/{idUser}")]
        public async Task<ActionResult<IEnumerable<Character>>> GetUserCharactersWithImage(int idUser)
        {
            // Recupera tutti i personaggi associati all'idUser fornito
            var characters = await _context.Characters
                                          .Where(c => c.IdUser == idUser)
                                          .Select(x => new Character()
                                          {
                                              IdCharacter = x.IdCharacter,
                                              IdUser = x.IdUser,
                                              ImageName = x.ImageName,
                                              ImageFile = x.ImageFile,
                                              ImageSrc = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/Images/{x.ImageName}",
                                              Name = x.Name,
                                              Race = x.Race,
                                              RaceType = x.RaceType,
                                              SubRace = x.SubRace,
                                              Lv = x.Lv,
                                              Bc = x.Bc,
                                              Backgorund = x.Backgorund,
                                              Class = x.Class,
                                              SubClass = x.SubClass,
                                              SubClassType = x.SubClassType,
                                              FightingStyle = x.FightingStyle,
                                              Str = x.Str,
                                              Dex = x.Dex,
                                              Con = x.Con,
                                              Int = x.Int,
                                              Wis = x.Wis,
                                              Cha = x.Cha,
                                              Ca = x.Ca,
                                              Tpcm = x.Tpcm,
                                              Tpcd = x.Tpcd,
                                              Tpci = x.Tpci,
                                              ToolProf = x.ToolProf,
                                              AbilitiesProf = x.AbilitiesProf,
                                              AbilitiesMastery = x.AbilitiesMastery,
                                              SavingProf = x.SavingProf,
                                              Visible = x.Visible,
                                          })
                                          .ToListAsync();

            if (characters == null || characters.Count == 0)
            {
                return NotFound("Nessun personaggio trovato per l'utente specificato.");
            }

            return characters;
        }


        //---------------------------CHARACTER WITH IMAGE----------------------

        [HttpGet]
        [Route("CharacterById/{idCharacter}")]
        public async Task<ActionResult<Character>> GetCharacterById(int idCharacter)
        {
            // Recupera il personaggio associato all'idCharacter fornito
            var character = await _context.Characters
                                          .FirstOrDefaultAsync(c => c.IdCharacter == idCharacter);

            if (character == null)
            {
                return NotFound("Nessun personaggio trovato con l'ID specificato.");
            }

            // Costruisci l'oggetto Character da restituire
            var characterResponse = new Character()
            {
                IdCharacter = character.IdCharacter,
                IdUser = character.IdUser,
                ImageName = character.ImageName,
                ImageFile = character.ImageFile,
                ImageSrc = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/Images/{character.ImageName}",
                Name = character.Name,
                Race = character.Race,
                RaceType = character.RaceType,
                SubRace = character.SubRace,
                Lv = character.Lv,
                Bc = character.Bc,
                Backgorund = character.Backgorund,
                Class = character.Class,
                SubClass = character.SubClass,
                SubClassType = character.SubClassType,
                FightingStyle = character.FightingStyle,
                Str = character.Str,
                Dex = character.Dex,
                Con = character.Con,
                Int = character.Int,
                Wis = character.Wis,
                Cha = character.Cha,
                Ca = character.Ca,
                Tpcm = character.Tpcm,
                Tpcd = character.Tpcd,
                Tpci = character.Tpci,
                ToolProf = character.ToolProf,
                AbilitiesProf = character.AbilitiesProf,
                AbilitiesMastery = character.AbilitiesMastery,
                SavingProf = character.SavingProf,
                Visible = character.Visible,
            };

            return characterResponse;
        }



        //---------------------------------------------------------------------



        // GET: api/Character/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Character>> GetCharacter(int id)
        {
            var character = await _context.Characters.FindAsync(id);

            if (character == null)
            {
                return NotFound();
            }

            return character;
        }

        //--------------------------------------------------------------------------------------------------


        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCharacter(int id, [FromForm]Character character)
        {
            if (id != character.IdCharacter)
            {
                return BadRequest();
            }

            //------Controllo della presenza di un nuovo file immagine
            if (character.ImageFile != null) 
            {
                if (character.ImageName != null) 
                {
                    DeleteImage(character.ImageName);
                }
                
                character.ImageName = await SaveImage(character.ImageFile);
            }

            _context.Entry(character).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharacterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        //------------------------------------------------------------------------

        public record CharacterPartialDto
            (
                int IdCharacter,
                int? Ca,
                int? Tpcm,
                int? Tpcd,
                int? Tpci
            );


        [AllowAnonymous]
        [HttpPut("{id}/partial")]
        public async Task<IActionResult> PartialUpdateCharacter(int id, CharacterPartialDto data)
        {
            if (id != data.IdCharacter)
            {
                System.Diagnostics.Debug.WriteLine("idCharacter " + data.IdCharacter );
                System.Diagnostics.Debug.WriteLine("idCharacterFromLink " + id);
                System.Diagnostics.Debug.WriteLine("CA " + data.Ca);
                System.Diagnostics.Debug.WriteLine("Tpcm " + data.Tpcm);
                System.Diagnostics.Debug.WriteLine("Tpcd " + data.Tpcd);
                System.Diagnostics.Debug.WriteLine("Tpci " + data.Tpci);
                return BadRequest();
            }

            var existingCharacter = await _context.Characters.FindAsync(id);

            if (existingCharacter == null)
            {
                return NotFound();
            }

            // Modifica solo le proprietà desiderate
            existingCharacter.Ca = data.Ca;
            existingCharacter.Tpcm = data.Tpcm;
            existingCharacter.Tpcd = data.Tpcd;
            existingCharacter.Tpci = data.Tpci;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharacterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        public record CharacterDto(
        int IdUser,
        string? ImageName,
        IFormFile ImageFile,
        string ImageSrc,
        string Name,
        string Race,
        string? RaceType,
        string? SubRace,
        int Lv,
        int Bc,
        string? Backgorund,
        string Class,
        string? SubClass,
        string? SubClassType,
        string? FightingStyle,
        int Str,
        int Dex,
        int Con,
        int Int,
        int Wis,
        int Cha,
        int? Ca,
        int? Tpcm,
        int? Tpcd,
        int? Tpci,
        string? ToolProf,
        string? AbilitiesProf,
        string? AbilitiesMastery,
        string SavingProf,
        bool? Visible
    );



        [AllowAnonymous]
        [Route("CharacterWithImage")]
        [HttpPost]
        public async Task<ActionResult<Character>> PostCharacterWithImage([FromForm] CharacterDto data)
        {
            var character = new Character
            {
                IdUser = data.IdUser,
                Name = data.Name,
                ImageName = data.ImageName,
                ImageFile = data.ImageFile,
                ImageSrc = data.ImageSrc,
                Race = data.Race,
                RaceType = data.RaceType,
                SubRace = data.SubRace,
                Lv = data.Lv,
                Bc = data.Bc,
                Backgorund = data.Backgorund,
                Class = data.Class,
                SubClass = data.SubClass,
                SubClassType = data.SubClassType,
                FightingStyle = data.FightingStyle,
                Str = data.Str,
                Dex = data.Dex,
                Con = data.Con,
                Int = data.Int,
                Wis = data.Wis,
                Cha = data.Cha,
                Ca = data.Ca,
                Tpcm = data.Tpcm,
                Tpcd = data.Tpcd,
                Tpci = data.Tpci,
                ToolProf = data.ToolProf,
                AbilitiesProf = data.AbilitiesProf,
                AbilitiesMastery = data.AbilitiesMastery,
                SavingProf = data.SavingProf,
                Visible = data.Visible
            };



            character.ImageName = await SaveImage(character.ImageFile);
            _context.Characters.Add(character);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }


        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create)) 
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }




        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharacter(int id)
        {
            var character = await _context.Characters.FindAsync(id);
            if (character == null)
            {
                return NotFound();
            }


            DeleteImage(character.ImageName);
            _context.Characters.Remove(character);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CharacterExists(int id)
        {
            return _context.Characters.Any(e => e.IdCharacter == id);
        }

        [NonAction]
        public void DeleteImage(string imageName) 
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
