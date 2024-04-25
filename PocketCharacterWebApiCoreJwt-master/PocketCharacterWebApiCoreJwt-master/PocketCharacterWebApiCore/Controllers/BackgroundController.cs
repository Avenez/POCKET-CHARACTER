using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PocketCharacterWebApiCore.Models;

namespace PocketCharacterWebApiCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class BackgroundController : ControllerBase
    {
        private readonly PocketCharacterContext _context;

        public BackgroundController(PocketCharacterContext context)
        {
            _context = context;
        }

        // GET: api/Background
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Background>>> GetBackgrounds()
        {
            return await _context.Backgrounds.ToListAsync();
        }

        // GET: api/Background/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Background>> GetBackground(int id)
        {
            var background = await _context.Backgrounds.FindAsync(id);

            if (background == null)
            {
                return NotFound();
            }

            return background;
        }

        // PUT: api/Background/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBackground(int id, Background background)
        {
            if (id != background.IdBackground)
            {
                return BadRequest();
            }

            _context.Entry(background).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BackgroundExists(id))
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

        // POST: api/Background
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Background>> PostBackground(Background background)
        {
            _context.Backgrounds.Add(background);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BackgroundExists(background.IdBackground))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBackground", new { id = background.IdBackground }, background);
        }

        // DELETE: api/Background/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBackground(int id)
        {
            var background = await _context.Backgrounds.FindAsync(id);
            if (background == null)
            {
                return NotFound();
            }

            _context.Backgrounds.Remove(background);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BackgroundExists(int id)
        {
            return _context.Backgrounds.Any(e => e.IdBackground == id);
        }
    }
}
