var nosql = require('database-jones'); 
const { object } = require('testdouble');

var Student = function(firstname, lastname, email) {
    if (firstname) this.firstname = firstname;
    if (lastname) this.lastname = lastname;
    if (email) this.email = email;
};

// CRUD-Operationen: NoSQL-Beispiel über Javascript

var annotations = new nosql.TableMapping('students').applyToClass(Student);

var key = 1;

var onFind = function(err, result) {
    console.log('onFind.');
    if (err) {
        console.log(err);
    } else {
        console.log('Found: ' + JSON.stringify(result))
    }
    process.exit(0);
};
  
var onUpdate = function(err, session) {
    console.log('onUpdate.');
    if (err) {
        console.log(err);
    } else {
        session.find(Student, key, onFind);
    }
};

var onSession = function(err, session) {
    console.log('onSession.');
    if (err) {
    console.log('Error onSession.');
        console.log(err);
        process.exit(0);
    } else {
        // UPDATE 1 - direkter Zugriff auf Tabellenattribute
        //session.update('students', key, { 'email' : 'thomas@mueller.de' }, onUpdate, session);
        // UPDATE 2 - Zugriff über TableMapping
        var changes = new Student( 'Thomas', 'Mueller', 'thomas@mueller.de');
        session.update(Student, key, changes, onUpdate, session);
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
nosql.openSession(dbProperties, Student, onSession);
console.log('Openned session');