using AcademyAppLibrary.Enums;
using AcademyAppLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AcademyAppServices.Models
{
    static public class Assets
    {
        static public bool UsernameExists(string stringToCheck, List<Person> listOfUsers)
        {
            List<Person> userToCheck = listOfUsers
                .Where(user => stringToCheck == user.UserName)
                .ToList();
            return userToCheck.Count > 0 && userToCheck.FirstOrDefault().UserName == stringToCheck;
        }
        static public bool IsValidPassword(string userToCheck, string passwordToCheck, List<Person> listOfUsers)
        {
            List<Person> correctUser = listOfUsers
                                    .Where(user => passwordToCheck == user.Password && userToCheck == user.UserName)
                                    .ToList();
            return correctUser.Count > 0;
        }
        static public Role GetPersonRole(string user, List<Person> listOfUsers)
        {
            Role foundRole = Role.Student;
            foreach (Person item in listOfUsers)
            {
                if (user == item.UserName) foundRole = item.Role;
            }
            return foundRole;
        }
        static public Person getPersonFromUsername(string stringToCheck, List<Person> listOfUsers)
        {
            List<Person> getUser = listOfUsers
                .Where(user => user.UserName == stringToCheck)
                .ToList();
            return getUser.FirstOrDefault();
        }
        static public void RemoveUser(string stringToCheck, List<Person> listOfUsers)
        {          
                List<Person> user = listOfUsers
               .Where(user => stringToCheck == user.UserName)
               .ToList();
                listOfUsers.Remove(user.FirstOrDefault());                
        }
        static public void PromoteUser(string stringToCheck, List<Person> listOfUsers, Role roleToSet)
        {
            List<Person> user = listOfUsers
           .Where(user => stringToCheck == user.UserName)
           .ToList();
           user.FirstOrDefault().Role = roleToSet;                
        }
    }

}
