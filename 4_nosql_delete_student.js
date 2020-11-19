var nosql = require('database-jones'); 

var Student = function(firstname, lastname, email) {
    if (firstname) this.firstname = firstname;
    if (lastname) this.lastname = lastname;
    if (email) this.email = email;
};

// CRUD-Operationen: NoSQL-Beispiel über Javascript

var annotations = new nosql.TableMapping('students').applyToClass(Student);

var key = 1;     

var onDelete = function(err, result) {
    console.log('onDelete.');
    if (err) {
        console.log(err);
    } else {
        console.log('To be deleted: ' + JSON.stringify(result));
        console.log('Deleted entry with id=' + key);
    }
};
var onSession = function(err, session) {
    console.log('onSession.');
    if (err) {
    console.log('Error onSession.');
        console.log(err);
        process.exit(0);
    } else {
        session.find(Student, key, onDelete);
        session.remove(Student, key, onDelete);

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
