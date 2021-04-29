using AbstractClassesAndInterfacesLibrary.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace AbstractClassesAndInterfacesLibrary.Entities
{
    public class Teacher : User, ITeacher
    {
        public string Subject { get; set; }
        public override void PrintUser()
        {
            Console.WriteLine(Subject);
        }

        public Teacher() 
        {

        }
        public Teacher(int id, string name, string username, string password, string subject):base(id,name,username,password)
        {
            Subject = subject;
        }
    }
}
