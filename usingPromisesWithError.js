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

function usingPromisesWithError() {
	
	saveAsPromise("Hello Promises", "This is the first blog using a promise")
	.then(function(blog1) {
		console.log("---- THEN NUMBER 1 --------");
		console.log("The blog1 was created, in the following step, an error will be thrown after this step");
		return blog1;
	})
	.then(function(blog1) {
		console.log("---- THEN NUMBER 2 --------");
		return saveAsPromise("Hello Promises 2");
	})
	.then(function(blog2) {
		console.log("---- THEN NUMBER 3 --------");
		console.log("This is never executed");
		return;
	})
	.fail(function(err) {
		console.log("This step is executed when something fails and the following line should print an error");
		console.error(err);
		return;
	});
}

usingPromisesWithError();









