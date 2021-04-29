using System;
using System.Collections.Generic;
using System.Text;

namespace RPSLSgameLibrary.Models
{
    public static class Database
    {
        public static List<Player> Players { get; set; } =  new List<Player> {
                new Player("Computer",false,0),
                new Player("Player1",true,0),
            };       

}
}
