var algorithms = {
    insertionsort: {
        id: "insertionsort",
        name: "Insertion Sort",
        description: "A simple sort algorithm, works like most people sort cards on their hand."
    },
    mergesort: {
        id: "mergesort",
        name: "Merge Sort",
        description: "A recursive sort algorithm that performs well for large volumes of data.",
    },
    bubblesort: {
        id: "bubblesort",
        name: "Bubble Sort",
        description: "An extremely simple sort algorithm with abysmal performance."
    },
    heapsort: {
        id: "heapsort",
        name: "Heap Sort",
        description: "A well performing sort algorithm that uses a binary heap."
    }
};

var express = require("express");
var app = module.exports = express.createServer();

app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + "/public"));
});

app.configure("development", function() {
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure("production", function() {
    app.use(express.errorHandler());
});

app.get("/", function(req, res) {
    res.render("index", {"algorithms": algorithms});
});

var fs = require("fs");

app.get("/:algorithm", function(req, res) {
    var algorithm = algorithms[req.params.algorithm];
    if (algorithm) {
        algorithm.file = algorithm.id + ".js";
        algorithm.code = fs.readFileSync("public/js/" + algorithm.id + ".js");
        res.render("algorithm", {
            currentAlgorithm: algorithm,
            "algorithms": algorithms
        });
    } else
        res.send(404);
});

app.listen(9280);