using System;
using System.Collections.Generic;
using System.Text;

namespace RPSLSgameLibrary.Models
{
    public class Database
    {
        public List<Player> Players { get; set; }


        public Database()
        {

            Players = new List<Player>()
            {
                new Player("Computer",false,0),
                new Player("Player1",true,0),
            };
        }
    }
}
