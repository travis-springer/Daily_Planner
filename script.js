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
    checkLastDate()
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

function checkLastDate() {
    if (localStorage.getItem("lastDate") === null) {
        localStorage.setItem("lastDate", currentDate)
    } else if (localStorage.getItem("lastDate") === currentDate) {
        return;
    } else {
        dayHours = [];
        localStorage.setItem("dayHours", dayHours);
        localStorage.setItem("lastDate", currentDate);
    }
}

startDay();

//Create schedule on page
dayHours.forEach(function (eachHour) {
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    var hourField = $("<div>")
        .text(`${eachHour.hour}:00`)
        .attr({
            "class": "col-md-2 hour"
        });

    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>")
    hourPlan.append(planData);
    planData.attr("id", eachHour.id);
    if (eachHour.hour < currentHour) {
        planData.attr({
            "class": "past notes"
        })
    } else if (eachHour.hour == currentHour) {
        planData.attr({
            "class": "present notes"
        })
    } else if (eachHour.hour > currentHour) {
        planData.attr({
            "class": "future notes"
        })
    }

    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
        });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);

    dayHours.forEach(function (eachHour) {
        $(`#${eachHour.id}`).val(eachHour.notes);
    })

    $(".saveBtn").on("click", function (event) {
        event.preventDefault();
        var saveIndex = $(this).siblings(".description").children(".notes").attr("id");
        dayHours[saveIndex].notes = $(this).siblings(".description").children(".notes").val();
        localStorage.setItem("dayHours", JSON.stringify(dayHours));
    })
})