using System;
using System.Collections.Generic;
using System.Text;
using VehicleInheritance.Entities.Enums;

namespace VehicleInheritance.Entities.Models
{
    public class Car : WheeledVehicle
    {
        public EngineType TypeOfEngine { get; set; }
        public byte FuelConsumption { get; set; }
        public byte NumberOfDoors { get; set; }
        public short MaxSpeed { get; set; }

        public Car()
        {

        }    
        public Car(EngineType typeOfEngine, byte fuelConsumption, byte numberOfDoors, short maxSpeed, string manufacturer, string model) : base(4, "Car")
        {
            Manufacturer = manufacturer;
            Model = model;
            TypeOfEngine = typeOfEngine;
            FuelConsumption = fuelConsumption;
            NumberOfDoors = numberOfDoors;
            MaxSpeed = maxSpeed;
        }

        public virtual void Drive()
        {
            Console.WriteLine($"This {Type} {Manufacturer} {Model} is now driving, it can achieve maximum speed of {MaxSpeed} KM/h");
        }
        public override void Repair()
        {
            Console.WriteLine($"This {Type} {Manufacturer} {Model} is repaired, and it costed 100$");
        }
    }
}
