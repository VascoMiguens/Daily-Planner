//variable object with the sart and end of the time slots
var options = {
  startHour: 7,
  endHour: 20,
};

var entry = JSON.parse(localStorage.getItem("entry")) || [];

function generateTimeSlots() {
  //loop through every hour and generate the layout
  for (var hour = options.startHour; hour <= options.endHour; hour++) {
    //create a row container for each time slot
    var rowContainer = $("<div>").addClass(
      "row no-gutters time-block d-flex justify-content-center"
    );
    //give a data-hour attribute
    rowContainer.attr("data-hour", hour);

    //time slot
    var hourSlot = $("<div>")
      .addClass(
        "col-1 col-sm-1 col-md-1 col-xl-1 d-flex align-items-center justify-content-center border-top border-dark"
      )
      .text(moment(hour, "h").format("h A"));
    //task container
    var taskContainer = $("<div>").addClass("col-8 col-sm-9 col-md-9 col-xl-9");
    //task description
    var taskSlot = $("<textarea>").addClass("col-md-12 description h-100");
    //save button container
    var saveContainer = $("<div>").addClass(
      "saveBtn d-flex justify-content-center align-items-center col-1 col-sm-1 col-md-1 col-xl-1"
    );
    //save button
    var saveBtn = $("<i>").addClass("fas fa-save");
    saveContainer.on("click", onSaveEntry);
    var removeContainer = $("<div>").addClass(
      "removeBtn d-flex justify-content-center align-items-center col-1 col-sm-1 col-md-1 col-xl-1"
    );
    var removeBtn = $("<i>").addClass("fas fa-trash");
    removeBtn.on("click", removeEntry);

    var object = JSON.parse(localStorage.getItem("entry")) || [];
    for (var i = 0; i < object.length; i++) {
      if (hour == object[i].hour) {
        taskSlot.text(object[i].task);
      } else {
        taskSlot.innerHTML = "";
      }
    }

    //append elements to parents
    rowContainer.append(hourSlot);
    rowContainer.append(taskContainer);
    taskContainer.append(taskSlot);
    rowContainer.append(saveContainer);
    saveContainer.append(saveBtn);
    rowContainer.append(removeContainer);
    removeContainer.append(removeBtn);
    //append the row container to the main container
    $(".container").append(rowContainer);
  }
}

function updateTaskSlots() {
  //current time
  var currentHour = moment().hour();
  $(".time-block").each(function () {
    var hour = $(this).attr("data-hour");
    //if the data-hour attribute is less than the current hour
    if (hour < currentHour) {
      //add class ".past"
      $(this).find(".description").addClass("past");
      //disable textarea from past hours
      $(this).find(".description").attr("readonly", true);
      //if its equal to the current hour
    } else if (hour == currentHour) {
      //add class ".present"
      $(this).find(".description").addClass("present");
      //give a placeholder to the current hour task slot
      $(this).find(".description").attr("placeholder", "Current Hour");
    } else {
      //add class ".future"
      $(this).find(".description").addClass("future");
    }
  });
}

function onSaveEntry(e) {
  //prevent default action
  e.preventDefault();
  //get the previous parent children value
  task = $(e.target).parent().prev().children().val();
  //get the parent's parent data-hour attribute
  hour = $(e.target).parent().parent().attr("data-hour");
  //disable textarea after submission

  //store the textarea disabled value
  disabAttr = "disabled";

  //save the hour, task and textarea attribute into a object
  var taskObj = {
    task: task,
    hour: hour,
    textarea: disabAttr,
  };
  //if textarea is empty
  if ($(e.target).parent().prev().children().val() === "") {
    // alert user to add a task
    window.alert("Add a task please");
    //if what was retrieved from local storage is empty
  } else if (entry === null) {
    //save the entry into local storage
    localStorage.setItem("entry", JSON.stringify(entry));
    //disable textarea
    textarea = $(e.target)
      .parent()
      .prev()
      .children()
      .attr("disabled", "disabled");
  } else {
    //push the new object into the array that was retrieved from the local storage
    entry.push(taskObj);
    //and save it into local storage
    localStorage.setItem("entry", JSON.stringify(entry));
    //disable textarea
    textarea = $(e.target)
      .parent()
      .prev()
      .children()
      .attr("disabled", "disabled");
  }
}

function removeEntry(e) {
  //get the data-hour attribute stored in the parent's parent element
  var target = $(e.target).parent().parent().attr("data-hour");
  //filter out the task to be removed and store it in the temp variable
  var temp = entry.filter((task) => task.hour != target);
  //save the temp array into local storage
  localStorage.setItem("entry", JSON.stringify(temp));
  //reload window to remove the deleted item from the UI
  window.location.reload();
}

function init() {
  generateTimeSlots();
  updateTaskSlots();

  window.setInterval(function () {
    $("#currentDay").html(moment().format("ddd DD/MM/YYYY H:mm:ss"));
  }, 1000);
}

//Maintain the textarea disabled on page refresh
$(window).on("load", function () {
  //for each textarea run the function
  $(".description").each(function () {
    //get the textarea parent hour
    var hour = $(this).parent().parent().attr("data-hour");
    for (var i = 0; i < entry.length; i++) {
      if (entry[i].hour == hour && entry[i].textarea == "disabled") {
        console.log("e igual");
        $(this).attr("disabled", "disabled");
      }
    }
  });
});

init();
