using System;
using System.Collections.Generic;
using System.Text;

namespace Vezba05.Entities
{
    public class SubscriberThree
    {
        public void gotMessageThroughFacebook(string message)
        {
            Console.WriteLine($"Subscriber Three received this message through Facebook: {message}");

        }
    }
}
