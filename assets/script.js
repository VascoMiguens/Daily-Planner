var options = {
  startHour: 1,
  endHour: 24,
};

function generateTimeSlots() {
  for (var hour = options.startHour; hour <= options.endHour; hour++) {
    var rowContainer = $("<div>").addClass(
      "row time-block d-flex justify-content-center"
    );
    rowContainer.attr("data-hour", hour);

    var hourSlot = $("<div>")
      .addClass("col-1 col-sm-1 col-md-1 col-xl-1 d-flex align-items-center")
      .text(moment(hour, "h").format("h A"));
    var taskContainer = $("<div>").addClass(
      "col-8 col-sm-6 col-md-10 col-xl-10"
    );
    taskSlot = $("<textarea>").addClass("col-md-12 description");
    var saveContainer = $("<div>").addClass(
      "saveBtn d-flex justify-content-center align-items-center col-1 col-sm-1 col-md-1 col-xl-1"
    );
    var saveBtn = $("<i>").addClass("fas fa-save");

    rowContainer.append(hourSlot);
    rowContainer.append(taskContainer);
    taskContainer.append(taskSlot);
    rowContainer.append(saveContainer);
    saveContainer.append(saveBtn);

    $(".container").append(rowContainer);
  }
}

function init() {
  generateTimeSlots();
}

init();
