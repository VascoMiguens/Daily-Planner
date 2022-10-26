//variable object with the sart and end of the time slots
var options = {
  startHour: 1,
  endHour: 24,
};

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
    var taskContainer = $("<div>").addClass(
      "col-8 col-sm-10 col-md-10 col-xl-10"
    );
    //task description
    var taskSlot = $("<textarea>").addClass("col-md-12 description h-100");
    //save button container
    var saveContainer = $("<div>").addClass(
      "saveBtn d-flex justify-content-center align-items-center col-1 col-sm-1 col-md-1 col-xl-1"
    );
    //save button
    var saveBtn = $("<i>").addClass("fas fa-save");

    //append elements to parents
    rowContainer.append(hourSlot);
    rowContainer.append(taskContainer);
    taskContainer.append(taskSlot);
    rowContainer.append(saveContainer);
    saveContainer.append(saveBtn);
    //append the row container to the main container
    $(".container").append(rowContainer);
  }
}

function updateTaskSlots() {
  var currentHour = moment().hour();

  $(".time-block").each(function () {
    var hour = $(this).attr("data-hour");

    if (hour < currentHour) {
      $(this).find(".description").addClass("past");
    } else if (hour == currentHour) {
      $(this).find(".description").addClass("present");
    } else {
      $(this).find(".description").addClass("future");
    }
  });
}

function init() {
  generateTimeSlots();
  updateTaskSlots();
}

init();
