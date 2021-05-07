using ConsoleE_Shop.Library.Core.Entities;
using ConsoleE_Shop.Library.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleE_Shop.Library.Database
{
    public static class Database
    {
        public static int StoreKeyCount { get; set; }
        public static int IdCount { get; set; }
        public static List<Product> ListOfProducts { get; set; }


        static Database()
        {
            ListOfProducts = new List<Product>();

            ProductAdder("Vitaminka", "Stobi Flips", 5, 40, 10);
            ProductAdder("Vitaminka", "Luna", 5, 400, 80);
            ProductAdder("Soko Stark", "Smoki", 5, 50,10);
            ProductAdder("Soko Stark", "Smoki", 5, 250, 45);
            ProductAdder("Agroplod", "Coffee", 25, 100, 30);
            ProductAdder("Alkaloid", "Salt", 15, 1000, 24);
            ProductAdder("Tuzla", "Salt", 15, 1000, 28);
            ProductAdder("Dauti", "Salt", 15, 900, 21);
        }

        public static void ProductAdder(string vendor, string name, int quantity, int weight, int price)
        {
            for (int i = 0; i < quantity; i++)
            {
                ListOfProducts.Add(new Product(IdCount, StoreKeyCount, vendor, name, weight, price));
                IdCount++;
            }
            StoreKeyCount++;
        }       

        public static Product GetProductByBarcode(int barcode) => ListOfProducts.FirstOrDefault(x => x.Barcode == barcode);

        public static void ListAllProducts()
        {
            ListOfProducts.ForEach(x => x.PrintInfo());
        }

        public static void DisplayByVendor(string vendor)
        {
            List<Product> filteredProducts = ListOfProducts
                                                    .Where(x => x.Vendor.ToLower() == vendor.ToLower())
                                                    .ToList();

            filteredProducts.ForEach(x => x.PrintInfo());
        }

        public static void DisplayAvailableProducts()
        {
            List<Product> oneOfAllProducts = new List<Product>();

            for (int i = 0; i <= StoreKeyCount; i++)
            {
                oneOfAllProducts.Add(ListOfProducts
                                        .Where(x => x.Barcode == i)
                                        .FirstOrDefault());
            }

            foreach (Product item in oneOfAllProducts)
            {
                if (item != null) item.PrintShortInfo();
            }
        }

        public static bool ProductIsAvailable(int barcode)
        {
            Product productToCheck = ListOfProducts
                                              .Where(x => x.Barcode == barcode)
                                              .FirstOrDefault();
            if (productToCheck == null) return false;
            else return true;
        }
    }
}



