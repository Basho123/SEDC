using System;
using System.Collections.Generic;
using System.Text;

namespace CinemaniaLibrary.Models
{
    public class Accounts
    {
        List<Employee> ListOfEmployees { get; set; }
        List<User> ListOfUsers { get; set; }
        public Accounts()
        {
        }
        public void SetUsers(List<User> listOfUsers)
        {
            ListOfUsers = listOfUsers;
        }
        public void AddUser(User user)
        {
            ListOfUsers.Add(user);
        }
    }
}
