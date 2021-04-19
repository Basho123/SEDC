using System;
using System.Collections.Generic;
using System.Text;

namespace RPSLSgameLibrary.Models
{
    public class Player
    {
        public string Username { get; set; }
        public bool IsHuman { get; set; }
        public int Score { get; set; }

        public Player()
        {

        }
        public Player(string username, bool isHuman, int score)
        {
            Username = username;
            IsHuman = isHuman;
            Score = score;
        }
    }
}
