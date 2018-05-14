namespace ParrotWings.Models
{
    public class Balance : BaseModel
    {
        public People People { get; set; }

        public decimal Value { get; set; }

        public string Comment { get; set; }

        public Transaction Transaction { get; set; }

        public Balance() : base() {
        }

        public Balance(People people, decimal value, string comment)
        {
            Value = value;
            Comment = comment;
            People = people;
        }

        public Balance(People people, decimal value, string comment, Transaction transact)
        {
            Value = value;
            Comment = comment;
            People = people;
            Transaction = transact;
        }
    }
}