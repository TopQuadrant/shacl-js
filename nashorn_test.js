load("./dist/shacl_nashorn.js");

var data = "# baseURI: http://datashapes.org/sh/tests/core/targets/targetClass-001.test\n\
# imports: http://datashapes.org/dash\n\
# prefix: ex\n\
\n\
@prefix dash: <http://datashapes.org/dash#> .\n\
@prefix ex: <http://datashapes.org/sh/tests/core/targets/targetClass-001.test#> .\n\
@prefix owl: <http://www.w3.org/2002/07/owl#> .\n\
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n\
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n\
@prefix sh: <http://www.w3.org/ns/shacl#> .\n\
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n\
\n\
<http://datashapes.org/sh/tests/core/targets/targetClass-001.test>\n\
  rdf:type owl:Ontology ;\n\
  rdfs:label \"Test of sh: targetClass 001\" ;\n\
  owl:imports <http://datashapes.org/dash> ;\n\
.\n\
ex:GraphValidationTestCase\n\
  rdf:type dash:GraphValidationTestCase ;\n\
  dash:expectedResult [\n\
      rdf:type sh:ValidationReport ;\n\
      sh:conforms \"false\"^^xsd:boolean ;\n\
      sh:result [\n\
          rdf:type sh:ValidationResult ;\n\
          sh:focusNode ex:InvalidInstance1 ;\n\
          sh:resultPath ex:myProperty ;\n\
          sh:resultSeverity sh:Violation ;\n\
          sh:sourceConstraintComponent sh:MaxCountConstraintComponent ;\n\
          sh:sourceShape ex:MyShape-myProperty ;\n\
        ] ;\n\
    ] ;\n\
.\n\
ex:InvalidInstance1\n\
  rdf:type ex:MyClass ;\n\
  ex:myProperty \"A\" ;\n\
  ex:myProperty \"B\" ;\n\
.\n\
ex:MyClass\n\
  rdf:type rdfs:Class ;\n\
.\n\
ex:MyShape\n\
  rdf:type sh:NodeShape ;\n\
  sh:property ex:MyShape-myProperty ;\n\
  sh:targetClass ex:MyClass ;\n\
.\n\
ex:MyShape-myProperty\n\
  sh:path ex:myProperty ;\n\
  sh:maxCount 1 ;\n\
.\n\
ex:ValidInstance1\n\
  rdf:type ex:MyClass ;\n\
  ex:myProperty \"A\" ;\n\
.\n\
ex:ValidInstance2\n\
  ex:myProperty \"A\" ;\n\
  ex:myProperty \"B\" ;\n\
.\n";


new SHACLValidator().validate(data, "text/turtle", data, "text/turtle", function (e, report) {
    if (e != null) {
        console.log("ERROR");
        console.log(e);
    } else {
        console.log(report.conforms());
        console.log(report.results().length);
        var results = report.results() || [];
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].severity())
            console.log(results[i].sourceShape())
            console.log(results[i].sourceConstraintComponent())
        }
        console.log("FINISHED!");
    }
});
