using System;
using System.ComponentModel.DataAnnotations;

namespace Reservas.Models
{
    public class Reserva
    {
        public int Id { get; set; }

        [Required]
        public int ClienteId { get; set; }

        [Required]
        public int ServicioId { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        public Cliente Cliente { get; set; }
        public Servicio Servicio { get; set; }
    }

    public class ReservaCreateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int ClienteId { get; set; }

        [Required]
        public int ServicioId { get; set; }

        [Required]
        public DateTime Fecha { get; set; }
    }

}
