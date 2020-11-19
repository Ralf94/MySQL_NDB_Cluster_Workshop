var nosql = require('database-jones'); 

var Grading = function(students_id, subject, grade, passed, submission_date) {
    if (students_id) this.students_id = students_id;
    if (subject) this.subject = subject;
    if (grade) this.grade = grade;
    if (passed) this.passed = passed;
    if (submission_date) this.submission_date = submission_date;
};

// CRUD-Operationen: NoSQL-Beispiel über Javascript

var annotations = new nosql.TableMapping('grading').applyToClass(Grading);

var key = { "students_id" : 1,
            "subject": "Datenbanksysteme",
            "grade" : 1};     

var onDelete = function(err, result) {
    console.log('onDelete.');
    if (err) {
        console.log(err);
    } else {
        console.log('To be deleted: ' + JSON.stringify(result));
        console.log('Deleted entry with id=' + JSON.stringify(key));
    }
};
var onSession = function(err, session) {
    console.log('onSession.');
    if (err) {
    console.log('Error onSession.');
        console.log(err);
        process.exit(0);
    } else {
        session.find(Grading, key, onDelete);
        session.remove(Grading, key, onDelete);

    }
};

var Properties = {
    "implementation" : "mysql",
    "database" : "kfru",
    "host" : "localhost",
    "user" : "root",
};
var dbProperties = nosql.ConnectionProperties(Properties);

console.log('Openning session');
// Datenbankverbindung herstellen
nosql.openSession(dbProperties, Grading, onSession);
console.log('Openned session');
