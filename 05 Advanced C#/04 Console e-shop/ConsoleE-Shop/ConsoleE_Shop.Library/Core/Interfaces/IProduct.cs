using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleE_Shop.Library.Core.Interfaces
{
    public interface IProduct
    {
        int Barcode { get; set; }
        string Vendor { get; set; }
        string ProductName { get; set; }
        int Price { get; set; }
        int Weight { get; set; }
    }
}
