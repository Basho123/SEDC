using System;
using System.Collections.Generic;
using System.Text;

namespace Vezba05.Entities
{
    public class SubscriberTwo
    {
        public void gotMessageThroughEmail(string message)
        {
            Console.WriteLine($"Subscriber Two received this message through E-Mail: {message}");
        }
    }
}
