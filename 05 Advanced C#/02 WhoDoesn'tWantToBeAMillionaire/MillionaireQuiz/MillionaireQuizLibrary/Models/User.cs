using System;
using System.Collections.Generic;
using System.Text;

namespace MillionaireQuizLibrary
{
    public class User
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int Points { get; set; }
        public int TimesUsedHelp { get; set; }
        public bool UsedPhoneHelp { get; set; }
        public bool UsedAudienceHelp { get; set; }
        public bool UsedFiftyFiftyHelp { get; set; }

        public User()
        {
            FirstName = "";
            LastName = "";
            UserName = "";
            Password = "";
            Points = 0;
            TimesUsedHelp = 0;
        }
        public User(string firstName, string lastName, string userName, string password)
        {
            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Password = password;
            Points = 0;
            TimesUsedHelp = 0;
        }

        public User(string firstName, string lastName, string userName, string password, int points, int timesUsedHelp)
        {
            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Password = password;
            Points = points;
            TimesUsedHelp = timesUsedHelp;
        }

    }
}
