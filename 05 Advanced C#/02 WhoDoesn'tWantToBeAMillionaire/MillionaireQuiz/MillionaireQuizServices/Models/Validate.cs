using MillionaireQuizLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace MillionaireQuizServices
{
    public static class Validate
    {
        public static bool UsernameExistance(string userToValidate) => Database.Users.FirstOrDefault(x => x.UserName == userToValidate) != null;      
        public static bool UsernameLength(string userToValidate) => userToValidate.Length >= 6;
        public static bool PasswordIsValid(string passwordToValidate)=> !passwordToValidate.Contains(';') && !passwordToValidate.Contains(',') && passwordToValidate.Length >= 6;                  
    }
}
