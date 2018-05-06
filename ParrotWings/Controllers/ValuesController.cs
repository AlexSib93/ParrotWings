using ParrotWings.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ParrotWings.Controllers
{
    public class ValuesController : ApiController
    {
        PWContext db = new PWContext();

        // GET api/values
        public IEnumerable<Transaction> Get()
        {
            return db.Transactions;
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "UndalObject";
        }

        // POST api/values
        [HttpPost]
        public People Post()//[FromBody]string value)
        {
            People p1 = new People()
            {
                Name = "Alex",
                LastName = "Sibiryakov",
                Email = "alexsib93@gmail.com",
                Login = "AlexSib"
            };

            People p2 = new People()
            {
                Name = "Sergey",
                LastName = "Semyonov",
                Email = "sem.ser@yandex.ru",
                Login = "sem.ser"
            };

            People p3 = new People()
            {
                Name = "Petr",
                LastName = "Ivanov",
                Email = "ivanov.p85@gmail.com",
                Login = "ivanov.p"
            };

            db.Peoples.Add(p1);
            db.Peoples.Add(p2);
            db.Peoples.Add(p3);

            db.SaveChanges();

            return p1;
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
