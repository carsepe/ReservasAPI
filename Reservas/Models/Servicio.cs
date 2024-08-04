using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Reservas.Models
{
    public class Servicio
    {
        public int Id { get; set; }

        [Required]
        public string Nombre { get; set; }

        [JsonIgnore] // Ignorar la propiedad de navegación en la serialización JSON
        public List<Reserva> Reservas { get; set; } = new List<Reserva>();
    }
}
