using System;
using System.Collections.Generic;
using System.Text;

namespace VehicleInheritance.Entities.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }

        protected Vehicle()
        {
            Random random = new Random();
            Id = random.Next(999999);
        }
        protected Vehicle(string manufacturer, string model)
        {
            Random random = new Random();      
           
            Manufacturer = manufacturer;
            Model = model;
        }

        public void PrintInfo()
        {
            Console.WriteLine($"ID: {Id}, Manufacturer: {Manufacturer}, Model: {Model}");
        }
    }
   
}
