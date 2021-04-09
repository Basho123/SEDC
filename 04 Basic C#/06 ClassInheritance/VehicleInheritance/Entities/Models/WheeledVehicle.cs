using System;
using System.Collections.Generic;
using System.Text;

namespace VehicleInheritance.Entities.Models
{
    public class WheeledVehicle : Vehicle
    {
        public byte NumberOfWheels { get; set; }
        public string Type { get; set; }
        protected WheeledVehicle()
        {
           
        }
        protected WheeledVehicle(byte numberOfWheels,
            string type)
        {
            NumberOfWheels = numberOfWheels;
            Type = type;
        }

        public virtual void Repair()
        {
            Console.WriteLine($"Vehicle has been repaired,  and costed some money");
        }      
    }
}
