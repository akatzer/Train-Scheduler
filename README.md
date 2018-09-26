# Train-Scheduler

This application allows users across multiple connections to view the current train schedule as well as add additional trains. 

On page load the user will see the current train schedule (items that have already been submitted and stored on Firebase)

Below the train schedule section is a form that allows the user to add additional trains to the schedule. The user inputs the train name, destination, start time for the first train of the day, and the frequency of the train.

When the user clicks the submit button the information from the form is uploaded to the firebase database, the form is cleared out, and the new train infomation is appended to the train schedule. 

The next arrival time and number of minutes until the next train all both calculated using moment.js.
