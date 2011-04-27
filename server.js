var algorithms = {
    insertionsort: {
        name: "Insertion Sort",
        description: "A simple sort algorithm, works like most people sort cards on their hand."
    },
    mergesort: {
        name: "Merge Sort",
        description: "A recursive sort algorithm that performs well for large volumes of data."
    },
    bubblesort: {
        name: "Bubble Sort",
        description: "An extremely simple sort algorithm with abysmal performance."
    },
    heapsort: {
        name: "Heap Sort",
        description: "A well performing sort algorithm that uses a binary heap."
    }
};

var $ = require("jquery");

$.each(algorithms, function (key, value) {
    value.file = key + ".js";
    value.url = "/" + key;
});

var express = require("express"),
    app = module.exports = express.createServer();

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
        algorithm.code = fs.readFileSync("public/js/" + algorithm.file);
        res.render("algorithm", {
            currentAlgorithm: algorithm,
            "algorithms": algorithms
        });
    } else
        res.send(404);
});

app.listen(9280);