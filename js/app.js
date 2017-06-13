$(function() {

var model = {
        days: 8,
        students: [],
        init: function(){
            var Student = function(name){
                    this.name = name;
                    this.numMissed = model.getDays();
            };

            students = [
                    new Student("Slappy the Frog"),
                    new Student("Lilly the Lizard")
            ];
        },
        getStudents: function(){
            return students;
        },
        getDays: function(){
            return model.days;
        }
};



var octopus = {
        init: function(){
            model.init();
            view.init();
        },
        getNumDays: function(){
            return model.days;
        },
        getStudents: function(){
            return model.getStudents();
        },
        getStudent: function(studentName){
            var listStudents = this.getStudents();
            pos = listStudents.map(function(e) { return e.name; });
            return listStudents[pos.indexOf(studentName)];
        },
        setNumMissedStudent: function(studentName, newNumMissed){
            var student = this.getStudent(studentName);
            student.numMissed = newNumMissed;
        }
};

var view = {
        init: function(){
            //construct Head of Table
            var headOfTable = $("#students-attendance-table thead tr");
            var days = octopus.getNumDays();
            for (var i = 0; i < days; i++){
                headOfTable.append("<th>" + (i + 1) + "</th>");
            }
            headOfTable.append('<th class="missed-col">Days Missed-col</th>');

            //construct Body of Table
            var bodyOfTable = $("#students-attendance-table tbody");
            var students = octopus.getStudents();
            students.forEach(function(student){
                bodyOfTable.append('<tr class="student"></tr>');
                var trLastChild = bodyOfTable.children('tr:last-child');
                trLastChild.append('<td class="name-col">' + student.name + '</td>');
                for (var i = 0; i < days; i++){
                    trLastChild.append('<td class="attend-col"><input type="checkbox"></td>');
                }
                trLastChild.append('<td class="missed-col">'+ student.numMissed  +'</td>');
            });

            //Listen for Clicks on checkbox
            $allCheckboxes = $('tbody input');
            $allCheckboxes.on('click', function() {
                var studentRows = $('tbody .student'),
                    newAttendance = {};

                 studentRows.each(function() {
                    var name = $(this).children('.name-col').text(),
                        $allCheckboxesStudend =  $(this).children('td').children('input');

                    newAttendance[name] = [];

                    $allCheckboxesStudend.each(function() {
                        newAttendance[name].push($(this).prop('checked'));
                    });

                    var missedCount = 0;
                    for (var i = 0; i < newAttendance[name].length; i++){
                           if(newAttendance[name][i] == false){
                                   missedCount++;
                           }
                    }
                    octopus.setNumMissedStudent(name, missedCount);

                 });
                 view.render();
            });

        },
        render:function(){
            var students = octopus.getStudents();
            console.log(students);
            students.forEach(function(student){
                var studentRow = $('tbody .name-col:contains("' + student.name + '")').parent('tr'),
                    missedCol = $(studentRow).children('.missed-col');
                missedCol.text(student.numMissed);
            });
        }
};

octopus.init();
}());
