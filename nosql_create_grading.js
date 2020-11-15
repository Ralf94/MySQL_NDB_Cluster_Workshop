var nosql = require('database-jones'); 
const { object } = require('testdouble');

var Student = function(firstname, lastname, email) {
    if (firstname) this.firstname = firstname;
    if (lastname) this.lastname = lastname;
    if (email) this.email = email;
};

var Grading = function(students_id, subject, grade, passed, submission_date) {
    if (students_id) this.students_id = students_id;
    if (subject) this.subject = subject;
    if (grade) this.grade = grade;
    if (passed) this.passed = passed;
    if (submission_date) this.submission_date = submission_date;
};

// CRUD-Operationen: NoSQL-Beispiel über Javascript

var annotations = new nosql.TableMapping('students').applyToClass(Student);
var annotations = new nosql.TableMapping('grading').applyToClass(Grading);

// READ
var onInsert = function(err, object) {
    console.log('onInsert.');
    if (err) {
        console.log(err);
    } else {
        console.log('Inserted: ' + JSON.stringify(object));
    }
}

// INSERT
var onSession = function(err, session) {
    console.log('onSession.');
    if (err) {
    console.log('Error onSession.');
        console.log(err);
        process.exit(0);
    } else {        
       var data = new Grading(1, 'Cloud Computing', 3, 'X', '2021-02-12');
       session.persist(data, onInsert, data);
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
