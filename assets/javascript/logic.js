//Train Schedule Logic
//Webpage loads with a header, empty train schedule table, and a add train submission form on the bottom.
//user inputs the information in the add train section and clicks the submit button
//when the submit button has been clicked, the form refreshes and the information provided in the input section is appended to the train schedule table.
//using persistence, the train schedule will remain on the page and the next arival and minutes away fields will be calculated based on the current time. 

$(document).ready(function () {
    //initialize Firebase
    var config = {
        apiKey: "AIzaSyCuWCWlmkx-JKhedUacuo28FOxw9H3gPfs",
        authDomain: "train-scheduler-f9542.firebaseapp.com",
        databaseURL: "https://train-scheduler-f9542.firebaseio.com",
        projectId: "train-scheduler-f9542",
        storageBucket: "train-scheduler-f9542.appspot.com",
        messagingSenderId: "76969361438"
    };

    firebase.initializeApp(config);

    var database = firebase.database();


    //click function to store all of the data entered in the new train section and pushes that information to the database
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();

        //new object variable that stores the values from above into the database variables
        var newTrain = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        };

        //pushes new train input data to the database
        database.ref().push(newTrain);

        //clears out the inputs
        $(".form-control").val("");
      
    })


    //when a new input is added into the database this creates a snapshot of that data
    database.ref().on("child_added", function(childSnapshot){
    

        //creation of variables based on the snapshot of the database
        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequency;

     

        var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        

        var currentTime = moment();

        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

        var timeRemainder = diffTime % frequency;

        var minutesTillTrain = frequency - timeRemainder;

        var nextTrain = moment().add(minutesTillTrain, "minutes").format("LT");

        //new row variable that creates the row and table data that will be appended to the html table
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesTillTrain)
            
        )
        //appends the new row to the table body in the html
        $(".table > tbody").append(newRow)

    })
       
    

   





































});