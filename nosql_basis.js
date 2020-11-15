var nosql = require('database-jones'); 

var Student = function(firstname, lastname, email) {
    if (firstname) this.firstname = firstname;
    if (lastname) this.lastname = lastname;
    if (email) this.email = email;
};

// CRUD-Operationen: NoSQL-Beispiel über Javascript

var annotations = new nosql.TableMapping('students').applyToClass(Student);

var onSession = function(err, session) {
    console.log('onSession.');
    if (err) {
    console.log('Error onSession.');
        console.log(err);
        process.exit(0);
    } else {
        // Implementierung der Übungsaufgaben
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