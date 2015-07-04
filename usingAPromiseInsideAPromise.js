var Q = require("q");
var Database = require("./fakedb");

function saveAsPromise(title, body) {
	var d = Q.defer();
	console.log("New database instantiated");
	var db = new Database();
	
	var data = {
		title: title,
		body: body
	}
	
	console.log("Setting data");
	db.set(data);
	
	console.log("About to save data");
	db.save(function(err, result) {
		if(err) d.reject(err);
		else {
			console.log("Data saved with title " + result.title)
			d.resolve(result);
		}
	});
	
	return d.promise;
}

// This doesn't do much
function uslessCallback(message) {
	console.log(message);
	return message;
}

function usingPromisesAsAPromise() {
	var d = Q.defer();
	
	saveAsPromise("Hello Promises", "This is the first blog using a promise")
	.then(function(blog1) {
		console.log("---- THEN NUMBER 1 --------");
		console.log("Printing the title of blog1 since I have access to it: " + blog1.title);
		return blog1;
	})
	.then(function(blog1) {
		console.log("---- THEN NUMBER 2 --------");
		uslessCallback("Second step, I still have access to the blog1 that the previous step gave me");
		uslessCallback("Using the function uslessCallback to print the title of blog1: " + blog1.title);
		return;
	})
	.then(function() {
		console.log("---- THEN NUMBER 3 --------");
		uslessCallback("I don't have access to blog1 in this step since the previous step didn't return anything");
		uslessCallback("But in this step I will call saveAsPromise to create the blog2, and since saveAsPromise returns");
		uslessCallback("an object (the blog object) it will be available to the next step");
		return saveAsPromise("Hello Promises 2", "This is the second time I call a method that will return a promise");
	})
	.then(function(blog2) {
		console.log("---- THEN NUMBER 4 --------");
		uslessCallback("As promised, I called saveAsPromise in the previous step and I have now access to blog2");
		uslessCallback("Printing the title and the body");
		uslessCallback("Title: " + blog2.title);
		uslessCallback("Returning the blog2 so I can access it in the next then");
		return blog2;
	})
	.then(function(blog2) {
		console.log("------ THEN NUMBER 6 ------");
		uslessCallback("Since I have access to the blog2, I can finish printing the body");
		uslessCallback("Body: " + blog2.body);
		console.log("======================= Finishing one execution of usingPromisesAsAPromise ===============================");
		d.resolve();
	})
	.fail(function(err) {
		console.log(err);
		d.reject(err);
	});
	
	return d.promise;
}

// calling usingPromisesAsAPromise twice
usingPromisesAsAPromise()
.then(usingPromisesAsAPromise)
.fail(function(err) {
	console.log(err);
});









