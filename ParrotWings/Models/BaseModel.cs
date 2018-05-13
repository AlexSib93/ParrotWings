using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

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