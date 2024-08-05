using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reservas.Data;
using Reservas.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Reservas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservasController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ReservasController> _logger;

        public ReservasController(AppDbContext context, ILogger<ReservasController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CrearReserva([FromBody] ReservaCreateDto reservaDto)
        {
            _logger.LogInformation("Iniciando creación de reserva");

            if (reservaDto == null)
            {
                _logger.LogWarning("Reserva es null");
                return BadRequest("Reserva es null");
            }

            _logger.LogInformation($"Verificando existencia del cliente con ID {reservaDto.ClienteId}");
            var cliente = await _context.Clientes.FindAsync(reservaDto.ClienteId);
            if (cliente == null)
            {
                _logger.LogWarning("Cliente no encontrado");
                return BadRequest("Cliente no encontrado");
            }

            _logger.LogInformation($"Verificando existencia del servicio con ID {reservaDto.ServicioId}");
            var servicio = await _context.Servicios.FindAsync(reservaDto.ServicioId);
            if (servicio == null)
            {
                _logger.LogWarning("Servicio no encontrado");
                return BadRequest("Servicio no encontrado");
            }

            var reserva = new Reserva
            {
                ClienteId = reservaDto.ClienteId,
                ServicioId = reservaDto.ServicioId,
                Fecha = reservaDto.Fecha,
                Cliente = cliente,
                Servicio = servicio
            };

            _logger.LogInformation("Agregando reserva a la base de datos");
            _context.Reservas.Add(reserva);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Reserva creada exitosamente");
            return CreatedAtAction(nameof(GetReservaById), new { id = reserva.Id }, reserva);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reserva>> GetReservaById(int id)
        {
            _logger.LogInformation($"Obteniendo reserva con ID {id}");
            var reserva = await _context.Reservas
                .Include(r => r.Cliente)
                .Include(r => r.Servicio)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (reserva == null)
            {
                _logger.LogWarning("Reserva no encontrada");
                return NotFound();
            }

            return reserva;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReservas()
        {
            _logger.LogInformation("Obteniendo todas las reservas");
            return await _context.Reservas
                .Include(r => r.Cliente)
                .Include(r => r.Servicio)
                .ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarReserva(int id, [FromBody] ReservaCreateDto reservaDto)
        {
            // Cambia esto:
            // if (id != reservaDto.ClienteId)
            // A esto:
            if (id != reservaDto.Id)
            {
                return BadRequest("ID de la reserva no coincide");
            }

            var reservaExistente = await _context.Reservas.FindAsync(id);
            if (reservaExistente == null)
            {
                return NotFound();
            }

            var cliente = await _context.Clientes.FindAsync(reservaDto.ClienteId);
            var servicio = await _context.Servicios.FindAsync(reservaDto.ServicioId);

            reservaExistente.ClienteId = reservaDto.ClienteId;
            reservaExistente.ServicioId = reservaDto.ServicioId;
            reservaExistente.Fecha = reservaDto.Fecha;
            reservaExistente.Cliente = cliente;
            reservaExistente.Servicio = servicio;

            _context.Entry(reservaExistente).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarReserva(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);
            if (reserva == null)
            {
                return NotFound();
            }

            _context.Reservas.Remove(reserva);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
