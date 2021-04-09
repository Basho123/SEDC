using System;
using System.Collections.Generic;
using System.Text;

namespace VehicleInheritance.Entities.Models
{
    public class Bicycle : WheeledVehicle
    {
        public byte NumberOfSpeedLevels { get; set; }
        public bool IsElectric{ get; set; }
        public Bicycle()
        {

        }

        public Bicycle(byte numberOfSpeedLevels, bool isElectric, string manufacturer, string model) : base(2,"Bicycle")
        {
            IsElectric = isElectric;
            NumberOfSpeedLevels = numberOfSpeedLevels;
            Manufacturer = manufacturer;
            Model = model;
          

        }

        public void Ride()
        {
            Console.WriteLine($"The {Type} is now ridden by someone.");
        }
        public override void Repair()
        {
            Console.WriteLine($"The {Type} has been repaired and it costed 5$");
        }
    }
}
