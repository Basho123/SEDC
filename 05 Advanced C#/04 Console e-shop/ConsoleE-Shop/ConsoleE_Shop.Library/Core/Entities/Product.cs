using ConsoleE_Shop.Library.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleE_Shop.Library.Core.Entities
{
    public class Product : BaseEntity, IProduct
    {
        public int Barcode { get; set; }
        public string Vendor { get; set; }
        public string ProductName { get; set; }
        public int Price { get; set; }
        public int Weight { get; set; }
        public Product()
        {

        }
        public Product(int id, int barcode, string vendor, string name, int weight, int price)
        {
            Barcode = barcode;
            Id = id;
            Vendor = vendor;
            ProductName = name;
            Price= price;
            Weight = weight;
        }

        public void PrintShortInfo()
        {
            Console.WriteLine($"#{Barcode}# {Vendor} {ProductName} {Weight}gr {Price}.00");
        }

     
        public override void PrintInfo()
        {
            Console.WriteLine($"#{Barcode}#/{Id} {Vendor} {ProductName} {Weight}gr {Price}.00");
        }
    }
}
