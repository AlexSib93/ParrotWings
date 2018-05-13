using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace ParrotWings.Models
{
    public class BaseModel
    {
        [Key]
        public virtual Guid ID { get; set; }

        public DateTime DtCreaate { get; set; }

        public BaseModel()
        {
            ID = Guid.NewGuid();
            DtCreaate = DateTime.Now;
        }

        public BaseModel(Guid id)
        {
            ID = id;
            DtCreaate = DateTime.Now;
        }
    }
}