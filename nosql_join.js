var nosql = require('database-jones'); 

function Student() {}
function Grading() {}

var studentMapping = new nosql.TableMapping("students");
studentMapping.applyToClass(Student);

studentMapping.mapOneToMany(
    {
        fieldName: "id",
        target: Grading,
        targetField: "students_id"
    }
);

var gradingMapping = new nosql.TableMapping("grading");
gradingMapping.applyToClass(Grading);
gradingMapping.mapManyToOne(
     {
         fieldName: "students_id",
         target:    Student,
         targetField: "id",
         foreignKey: "fk_grading_students",       
     }
);

var gradingProjection = new nosql.Projection(Grading);
gradingProjection.addFields(["subject", "grade", "passed", "submission_date"]);

var studentProjection = new nosql.Projection(Student);
studentProjection.addRelationship("id", gradingProjection);
studentProjection.addFields(["firstname","lastname"]);

var Properties = {
    "implementation" : "mysql",
    "database" : "kfru",
    "host" : "localhost",
    "user" : "root",
};
var dbProperties = nosql.ConnectionProperties(Properties);

var key = 1;

console.log('Openning session');
nosql.openSession(dbProperties).
  then(function(session) {
    return session.find(studentProjection, key);
  }).
  then(console.log, console.trace).   
  then(nosql.closeAllOpenSessionFactories);  