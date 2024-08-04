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
    public class ClientesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClientesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CrearCliente([FromBody] Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest("Cliente es null");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetClienteById), new { id = cliente.Id }, cliente);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetClienteById(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null)
            {
                return NotFound();
            }

            return cliente;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            return await _context.Clientes.ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarCliente(int id, [FromBody] ClienteUpdateDto clienteDto)
        {
            if (id != clienteDto.Id)
            {
                return BadRequest("ID del cliente no coincide");
            }

            var clienteExistente = await _context.Clientes.FindAsync(id);
            if (clienteExistente == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(clienteDto.Nombre))
            {
                clienteExistente.Nombre = clienteDto.Nombre;
            }

            if (!string.IsNullOrEmpty(clienteDto.Email))
            {
                clienteExistente.Email = clienteDto.Email;
            }

            if (!string.IsNullOrEmpty(clienteDto.NumeroDocumento))
            {
                clienteExistente.NumeroDocumento = clienteDto.NumeroDocumento;
            }

            _context.Entry(clienteExistente).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
