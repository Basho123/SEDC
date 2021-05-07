using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleE_Shop.Library.Core.Interfaces
{
    public interface IBaseEntity
    {
        int Id { get; set; }
        void PrintInfo();
    }
}
