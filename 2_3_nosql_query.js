var nosql = require('database-jones'); 

var Student = function(firstname, lastname, email) {
    if (firstname) this.firstname = firstname;
    if (lastname) this.lastname = lastname;
    if (email) this.email = email;
};

var annotations = new nosql.TableMapping('students').applyToClass(Student);

var Properties = {
    "implementation" : "mysql",
    "database" : "kfru",
    "host" : "localhost",
    "user" : "root",
};
var dbProperties = nosql.ConnectionProperties(Properties);

console.log('Openning session');
// Datenbankverbindung herstellen
nosql.openSession(dbProperties, Student).
then(function(session) {
    return session.createQuery(Student); // Tabelle übergeben
}).
then(function(query) {
    query.where(query.firstname.eq('Thomas').and(query.lastname.eq('Mueller')));
    return query.execute( { 'limit' : 1 }); // Query ausführen und Ergebnis zurückgeben
}).
then(console.log, console.trace).
then(nosql.closeAllOpenSessionFactories);

