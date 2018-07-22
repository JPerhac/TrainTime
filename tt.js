// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyBp4rPGCt9rgCprPZt0qkxt3tZdU2ijU2c",
    authDomain: "trainhomework-f395d.firebaseapp.com",
    databaseURL: "https://trainhomework-f395d.firebaseio.com",
    projectId: "trainhomework-f395d",
    storageBucket: "trainhomework-f395d.appspot.com",
    messagingSenderId: "522387888670"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      frequency: trainFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().role;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFrequency);
  
    // Prettify the employee start
    var trainStartPretty = moment.unix(trainStart).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trainMinutes = moment().diff(moment(trainStart, "X"), "minutes");
    console.log(trainMinutes);
  
    // Calculate the total billed rate
    var trainTotal = trainMinutes * trainFrequency;
    console.log(trainTotal);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainStartPretty),
      $("<td>").text(trainMinutes),
      $("<td>").text(trainFrequency),
      $("<td>").text(trainFrequency)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  