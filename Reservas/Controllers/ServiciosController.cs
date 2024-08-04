using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reservas.Data;
using Reservas.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Reservas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiciosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServiciosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CrearServicio([FromBody] Servicio servicio)
        {
            if (servicio == null)
            {
                return BadRequest("Servicio es null");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Servicios.Add(servicio);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetServicioById), new { id = servicio.Id }, servicio);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Servicio>> GetServicioById(int id)
        {
            var servicio = await _context.Servicios.FindAsync(id);

            if (servicio == null)
            {
                return NotFound();
            }

            return servicio;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Servicio>>> GetServicios()
        {
            return await _context.Servicios.ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarServicio(int id, [FromBody] Servicio servicio)
        {
            if (id != servicio.Id)
            {
                return BadRequest("ID del servicio no coincide");
            }

            var servicioExistente = await _context.Servicios.FindAsync(id);
            if (servicioExistente == null)
            {
                return NotFound();
            }

            servicioExistente.Nombre = servicio.Nombre;

            _context.Entry(servicioExistente).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarServicio(int id)
        {
            var servicio = await _context.Servicios.FindAsync(id);
            if (servicio == null)
            {
                return NotFound();
            }

            _context.Servicios.Remove(servicio);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
