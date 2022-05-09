"use strict";

// const toDate = date => {
//     return new Intl.DateTimeFormat('en-EN', {
//         day: '2-digit',
//         month: 'long',
//         year: 'numeric',
//         // hour: '2-digit',
//         // minute: '2-digit',
//         // second: '2-digit'
//     }).format(new Date(date))
// }
// document.querySelectorAll('.date').forEach(node => {
//     node.textContent = toDate(node.textContent)
// })
var $remembers = document.querySelector('#remembers');

if ($remembers) {
  $remembers.addEventListener('click', function (event) {
    if (event.target.classList.contains('deleteTask')) {
      var id = event.target.dataset.id;
      var csrf = event.target.dataset.csrf;
      fetch('/remembers/remove/' + id, {
        method: 'delete',
        headers: {
          'X-XSRF-TOKEN': csrf
        }
      }).then(function (res) {
        return res.json();
      }).then(function (tasks) {
        if (tasks.length) {
          var html = tasks.map(function (task) {
            return "\n                            <div class=\"eachTask\">\n                                        <div class=\"eachTask__text\">\n                                            ".concat(task.text, "\n                                        </div>\n                                        <div class=\"date eachTask__date\">\n                                            ").concat(toDate(task.date), "\n                                        </div>\n                                        <!-- EDIT BTN -->\n                                        <div>\n                                            <a href=\"/remembers/").concat(task._id, "/edit?allow=true\"\n                                                class=\"eachTask__editBtn\">Edit</a>\n                                        </div>\n                                        <!-- DELETE BTN -->\n                                        <div>\n                                            <button type=\"button\" class=\"deleteTask eachTask__deleteBtn\"\n                                                data-id=\"").concat(task._id, "\" data-csrf=\"").concat(csrf, "\">Delete</button>\n                                        </div>\n                                    </div>\n                                    ");
          }).join('');
          $remembers.querySelector('.remembers__tasks').innerHTML = html;
        } else {
          $remembers.querySelector('.remembers__tasks').innerHTML = "\n                        <div class=\"remembers__noTask\">\n                            <div>There no tasks.</div>\n                            <div>Just write your task and</div>\n                            <div style=\"color:rgb(221, 72, 13)\">Be organized!</div>\n                        </div>\n                        ";
        }
      });
    }
  });
}