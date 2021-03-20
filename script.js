var currentTime = moment().local();
var currentDate = moment(currentTime).format("dddd, MMM Do YYYY");
var currentHour = moment(currentTime).format("H");

var dayStart = 8;
var dayLength = 9;
var hourID = 0;
var dayHours = [];

//Set current date
$("#currentDay").text(currentDate);

//Create dayHours array
function startDay() {
    if (localStorage.getItem("dayHours") === null) {
        for (i = 0; i < dayLength; i++) {
            var hourInfo = { id: hourID, hour: dayStart, notes: "" };
            dayHours.push(hourInfo);
            dayStart++;
            hourID++;
        }
        localStorage.setItem("dayHours", JSON.stringify(dayHours));
        return;
    } else {
        var storedNotes = JSON.parse(localStorage.getItem("dayHours"));
        dayHours = storedNotes;
        return;
    }
}

startDay();

//Create schedule on page
dayHours.forEach(function (eachHour) {
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    var hourLabel = $("<div>")
        .text(`${eachHour.hour}:00`)
        .attr({
            "class": "col-md-2 hour"
        });

    var hourDesc = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var hourNote = $("<textarea>")
    hourDesc.append(hourNote);
    hourNote.attr("id", eachHour.id);
    if (eachHour.hour < currentHour) {
        hourNote.attr({
            "class": "past notes"
        })
    } else if (eachHour.hour == currentHour) {
        hourNote.attr({
            "class": "present notes"
        })
    } else if (eachHour.hour > currentHour) {
        hourNote.attr({
            "class": "future notes"
        })
    }

    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
        });
    savePlan.append(saveButton);
    hourRow.append(hourLabel, hourDesc, savePlan);

    dayHours.forEach(function (eachHour) {
        $(`#${eachHour.id}`).val(eachHour.notes);
    })
})

//Save button function
$(".saveBtn").on("click", function (event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".notes").attr("id");
    dayHours[saveIndex].notes = $(this).siblings(".description").children(".notes").val();
    localStorage.setItem("dayHours", JSON.stringify(dayHours));
})
