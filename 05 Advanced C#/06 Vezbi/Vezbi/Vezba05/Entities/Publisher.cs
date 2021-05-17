using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace Vezba05.Entities
{
    public delegate void DelegateOneString(string word);
    public class Publisher
    {
        public event DelegateOneString EventHandler;
        public void SendMessage(string message)
        {
            Console.WriteLine($"Message is {message}");
            Thread.Sleep(2000);
            Console.WriteLine($"Sending message to users...");
            EventHandler?.Invoke(message);
        }

        //Has method ComposeMessage - Accepts 3 parameters, trainerName, groupNumber, message. This method will Thread.Sleep(3000)
        //and then call a method SendMessage with a string that says: {trainerName} informs G{groupNumber}: {message}

        public void ComposeMessage(string trainerName, int groupNumber, string message)
        {
            Thread.Sleep(3000);
            SendMessage($"{trainerName} informs G{groupNumber}: {message}");
        }
    }
}
