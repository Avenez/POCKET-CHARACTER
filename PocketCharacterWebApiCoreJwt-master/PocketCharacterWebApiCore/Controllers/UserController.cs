using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PocketCharacterWebApiCore.Models;

namespace PocketCharacterWebApiCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly PocketCharacterContext _context;
        private readonly IConfiguration _config;

        public UserController(PocketCharacterContext context, IConfiguration config)
        {
            _context = context;
            _config = config;

        }



        [Authorize(Roles ="Admin")]
        [HttpGet("GetUsersByRole/{role}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersByRole(string role)
        {
            var users = await _context.Users.Where(u => u.Role == role).ToListAsync();
            return users;
        }

        [Authorize]
        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.IdUser)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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


        // DELETE: api/User/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("UserAndCharacters/{id}")]
        public async Task<IActionResult> DeleteUserAndCharacters(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Elimina tutti i personaggi associati all'utente
            var characters = await _context.Characters.Where(c => c.IdUser == id).ToListAsync();
            _context.Characters.RemoveRange(characters);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.IdUser == id);
        }


        //-----METODI REGISTRAZIONE
        [AllowAnonymous]
        [HttpGet]
        [Route("CheckUsername/{username}")]
        public bool CheckUsername(string username)
        {
            // Controlla se esiste un utente con il nome utente fornito
            bool usernameExists = _context.Users.Any(u => u.Username == username);

            // Restituisci true se il nome utente non esiste, altrimenti false
            return !usernameExists;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("CheckEmail/{email}")]
        public bool CheckEmail(string email)
        {
            // Scrive l'email nella console di debug per scopi di debug
            System.Diagnostics.Debug.WriteLine("email:" + email);

            // Controlla se esiste un utente con l'email fornita
            bool emailExists = _context.Users.Any(u => u.Email == email);

            // Restituisci true se l'email non esiste, altrimenti false
            return !emailExists;
        }

        //----------------------------------------------------------

        [AllowAnonymous]
        [HttpPost]
        [Route("Registration")]
        public string Registration([FromBody] User user)
        {
            string msg;

            if (!ModelState.IsValid)
            {
                msg = "Errore nell'inserimento dei dati";
            }
            else
            {
                if (_context.Users.Any(u => u.Username == user.Username))
                {
                    msg = "Username non disponibile";
                }
                else
                {
                    if (_context.Users.Any(u => u.Email == user.Email))
                    {
                        msg = "Email già in uso";
                    }
                    else
                    {
                        _context.Users.Add(user);
                        _context.SaveChanges();
                        msg = "Registrazione avvenuta";
                    }
                }
            }

            return msg;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            var user = Authenticate(userLogin);

            if (user != null)
            {
                var token = Generate(user);
                return Ok(token);
            }

            return NotFound("user not found");
        }


        private string Generate(User user)
        {
            var key = _config.GetSection("Jwt")["Key"];
            var issuer = _config.GetSection("Jwt")["Issuer"];
            var audience = _config.GetSection("Jwt")["Audience"];
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, user.IdUser.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
            };


            var token = new JwtSecurityToken(issuer,
                audience,
                claims,
                expires: DateTime.Now.AddDays(100),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User Authenticate(UserLogin userLogin) 
        {
            var currentUser = _context.Users
                .FirstOrDefault(u => u.Email == userLogin.Email && u.Password == userLogin.Password);

            if (currentUser != null) {
                return currentUser;
                    }

            return null;
        }


    }
}
