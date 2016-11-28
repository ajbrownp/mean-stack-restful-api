var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema ({
	name: { 
		type: String, 
		required: true
	},
	number: {
		type: Number,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	lastName: { 
		type: String, 
		required: true
	}

});

var model = mongoose.model('Users', UsersSchema);

module.exports = model;