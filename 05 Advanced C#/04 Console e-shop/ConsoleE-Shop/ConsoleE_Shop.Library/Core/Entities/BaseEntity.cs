using ConsoleE_Shop.Library.Core.Interfaces;
using ConsoleE_Shop.Library.Database;
using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleE_Shop.Library.Core.Entities
{    

    public abstract class BaseEntity : IBaseEntity
    {
        public int Id { get; set; }

        public BaseEntity()
        {    
        }

        public abstract void PrintInfo();       
    }
}
