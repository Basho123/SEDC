using AbstractClassesAndInterfacesLibrary.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace AbstractClassesAndInterfacesLibrary.Entities.Interfaces
{
    public class Student : User, IStudent
    {
        public List<string> Grades { get; set; }
        public override void PrintUser()
        {
            Grades.ForEach(x => Console.WriteLine(x));
        }

        public Student()
        {

        }
        public Student(int id, string name, string username, string password, List<string> grades) : base(id, name, username, password)
        {
            Grades = grades;
        }

    }
}
