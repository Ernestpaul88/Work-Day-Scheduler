$(function () {
    var tasks;
    var todaysDate = moment().format("dddd, MMMM Do");
    $("#currentDay").text(todaysDate);
  
    var createTask = function (taskText, taskTime, taskHour) {
      var currentHour = moment().hour();
  
      //Test
      // var currentHour = 12;
  
      // create elements that make up a task item
      var taskLi = $("<li>").addClass("time-block");
      var taskDiv = $("<div>").addClass("row");
      var taskSpan = $("<span>").addClass("hour col-1").text(taskTime);
      var taskTextArea = $("<textarea></textarea>")
        .addClass("description col-10")
        .val(taskText);
      var taskButton = $("<button></button>").addClass("btn saveBtn col-1");
      var taskIcon = $("<i></i>").addClass("bx bx-archive-out");
  
      //If else if statement to check time block is past present or future.
  
      if (taskHour < currentHour) {
        taskTextArea.addClass("past");
      } else if (taskHour === currentHour) {
        taskTextArea.addClass("present");
      } else if (taskHour > currentHour) {
        taskTextArea.addClass("future");
      }
  
      // append
      taskButton.append(taskIcon);
  
      taskDiv.append(taskSpan, taskTextArea, taskButton);
  
      taskLi.append(taskDiv);
  
      // append to ul list on the page
      $("#list-timeBlocks").append(taskLi);
    };
  
    var loadTasks = function () {
      console.log(JSON.parse(localStorage.getItem("tasks")));
      tasks = JSON.parse(localStorage.getItem("tasks"));
  
      // if nothing in localStorage, create a new object
      if (!tasks) {
        tasks = [
          {
            hour: 9,
            time: moment().set({ hour: 9, minute: 00 }).format("LT"),
            text: "",
          },
          {
            hour: 10,
            time: moment().set({ hour: 10, minute: 00 }).format("LT"),
            text: "",
          },
          {
            hour: 11,
            time: moment().set({ hour: 11, minute: 00 }).format("LT"),
            text: "",
          },
          {
            hour: 12,
            time: moment().set({ hour: 12, minute: 00 }).format("LT"),
            text: "",
          },
          {
            hour: 13,
            time: moment().set({ hour: 13, minute: 00 }).format("LT"),
            text: "",
          },
          {
            hour: 14,
            time: moment().set({ hour: 14, minute: 00 }).format("LT"),
            text: "",
          },
          {
            hour: 15,
            time: moment().set({ hour: 15, minute: 00 }).format("LT"),
            text: "",
          },
          {
            hour: 16,
            time: moment().set({ hour: 16, minute: 00 }).format("LT"),
            text: "",
          },
          {
            hour: 17,
            time: moment().set({ hour: 17, minute: 00 }).format("LT"),
            text: "",
          },
        ];
      }
  
      // loop over object properties
      $.each(tasks, function (index, task) {
        createTask(task.text, task.time, task.hour);
      });
    };
  
    var saveTasks = function () {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    $(".list-group").on("click", "button", function () {
      var timeBlock = $(this).closest(".time-block");
  
      // get the textarea's current value/text
      var text = timeBlock.find("textarea").val().trim();
  
      var index = timeBlock.index();
  
      tasks[index].text = text;
      saveTasks();
    });
  
    // load tasks for the first time
    loadTasks();
  });
  