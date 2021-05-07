using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ConsoleE_Shop.Library.Database;

namespace ConsoleE_Shop.Library.Core.Entities
{
    public static class ShoppingCart
    {
        public static List<Product> ShoppingCartProducts { get; set; } = new List<Product>();
        public static void AddItem(int barcode, int amount)
        {
            for (int i = 0; i < amount; i++)
            {
                if (Database.Database.ProductIsAvailable(barcode))
                {
                    ShoppingCartProducts.Add(Database.Database.GetProductByBarcode(barcode));
                    Database.Database.ListOfProducts.Remove(Database.Database.GetProductByBarcode(barcode));
                }
                else break;
            }
        }

        public static Product GetProductByBarcode(int barcode) => ShoppingCartProducts.FirstOrDefault(x => x.Barcode == barcode);
        public static void RemoveItem(int barcode)
        {

            if (ProductIsAvailable(barcode))
            {
                Database.Database.ListOfProducts.Add(GetProductByBarcode(barcode));
                ShoppingCartProducts.Remove(GetProductByBarcode(barcode));
            }
            else return;        
        }

        public static bool ProductIsAvailable(int barcode)
        {
            Product productToCheck = ShoppingCartProducts
                                              .Where(x => x.Barcode == barcode)
                                              .FirstOrDefault();
            if (productToCheck == null) return false;
            else return true;
        }

        public static void Clear()
        {
            ShoppingCartProducts.Clear();
        }

        public static void DisplayAll()
        {
            Console.WriteLine();
            Console.WriteLine("════════════════════════════");
            if (ShoppingCartProducts.Count == 0) Console.WriteLine("No products to show");
            else
            {
                ShoppingCartProducts.ForEach(x => x.PrintShortInfo());
                int totalRecepit = ShoppingCartProducts.Sum(x => x.Price);
                Console.WriteLine("---------------");
                Console.WriteLine("TOTAL {0}.00 MKD", totalRecepit);
            }

          
            Console.WriteLine("════════════════════════════");
        }
    }
}
