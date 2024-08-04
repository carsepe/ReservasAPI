using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Reservas.Models
{
    public class Cliente
    {
        public int Id { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string NumeroDocumento { get; set; }

        [JsonIgnore] // Ignorar la propiedad de navegación en la serialización JSON
        public List<Reserva> Reservas { get; set; } = new List<Reserva>();
    }

    public class ClienteUpdateDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string NumeroDocumento { get; set; }
    }
}
