using System;
using System.Collections.Generic;
using System.Text;

namespace Vezba05.Entities
{
    public class SubscriberOne
    {
        public void gotMessageThroughSMS(string message)
        {
            Console.WriteLine($"Subscriber One received this message through SMS: {message}");

        }
    }
}
