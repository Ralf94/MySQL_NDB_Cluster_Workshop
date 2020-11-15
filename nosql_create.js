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
        // Ausgabe des gelesenen Datensatzes
        console.log('Found: ' + JSON.stringify(result))
    }
    process.exit(0);
};

// READ
var onInsert = function(err, object, session) {
    console.log('onInsert.');
    if (err) {
        console.log(err);
    } else {
        console.log('Inserted: ' + JSON.stringify(object));
        // READ mit Zugriff über PrimaryKey
        session.find(Student, key, onFind);
    }
};

// INSERT
var onSession = function(err, session) {
    console.log('onSession.');
    if (err) {
    console.log('Error onSession.');
        console.log(err);
        process.exit(0);
    } else {        
       var data = new Student('Thomas', 'Mueller', 'thomas.mueller@bayern.de');
       // 1. INSERT durch direkten Zugriff auf Tabelle
       //session.persist('students', {'firstname' : 'Thomas', 'lastname' : 'Mueller', 'email' : 'thomas.mueller@bayern.de' }, onInsert, data, session);
       // 2. INSERT über TableMapping
       session.persist(data, onInsert, data, session);
    }
};

var Properties = {
    "implementation" : "mysql",
    "database" : "kfru",
    "host" : "localhost",
    "user" : "root",
};
var dbProperties = nosql.ConnectionProperties(Properties);

// Datenbankverbindung herstellen
nosql.openSession(dbProperties, Student, onSession);
