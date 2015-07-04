var Database = require("./fakedb");

function saveAsCallback(title, body, next) {
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
		if(err) {
			console.log("Error: " + err);
			return next(err);
		}
		else {
			console.log("Data saved with title " + result.title)
			return next(err, result);			
		}
	});
}

// This doesn't do much
function uslessCallback(message) {
	console.log(message);
	return message;
}

function usingCallbacksRightWithError() {
	
	// save one
	saveAsCallback("Hello World 1", null, function(err, result) {
		if(err) {
			console.log("An error is thrown, the rest of program will not be executed");
			return err;
		}
		else {
			uslessCallback("--- This message should show after the first object was created ---");

			saveAsCallback("Hello World 2", "This is the second blog", function(err, result) {
				console.log("---");
				console.log(result);
				console.log("---");
			
				uslessCallback("--- This message should show after the second object was created ---");
			
				return;
			});
		}
		
	});
}

usingCallbacksRightWithError();









