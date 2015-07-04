function FakeDB() {
	this.blog = {};
}

FakeDB.prototype.get = function get(next) {
	var self = this;
	setTimeout(function() {
		return self.blog();
	}, 1000);
}

FakeDB.prototype.set = function set(data) {
	this.blog = data;
}

FakeDB.prototype.validate = function validate(data) {
	var error = false;
	
	if(!data.title) {
		return "Title is required";
	}
	
	if(!data.body) {
		return "Body is required";
	}
	
	return error;
}

FakeDB.prototype.save = function save(next) {
	var self = this;
	
	var error = self.validate(self.blog);
	if(error) {
		return next(error);
	}
	
	setTimeout(function() {
			return next(false, self.blog);
	}, 1000);
}

module.exports = FakeDB;