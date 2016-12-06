var application_root = __dirname,
	express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path');
// mongoose = require('mongoose');

var app = express();
// mongoose.connect('mongodb://localhost/library_database');
// var container = new mongoose.Schema({
// 	modelCell: String
// });
// var ContainerModel = mongoose.model('container', container);

app.configure(function() {
	app.use(bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root, './')));
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});


app.post('/text.htm/fill_bgcolor', function(request, response) {
	for (var i = 0; i < 10000; i++) {
		console.log('run');
	}
	return response.send({
		returncode: -1
	});
});
// app.get('/excel.htm',function(request,response){
// 	return ContainerModel.find(function(err, container) {
// 		if (!err) {
// 			return response.send(container);
// 		} else {
// 			return console.log(err);
// 		}
// 	})
// });
// app.post('/text.htm', function(request, response) {
// 	for(var i =0 ;i<100000;i++){
// 		console.log(i);
// 	}
// 	response.send({
// 		returncode: 200
// 	});
// });
// app.post('/template/merge/cells.html', function(request, response) {
// 	var container = new ContainerModel({
// 		contents: request.body.contents,
// 		completeStatus: request.body.completeStatus
// 	});
// 	container.save(function(err) {
// 		if (!err) {
// 			return console.log(container);
// 		} else {
// 			return console.log(err);
// 		}
// 		return response.send(container);
// 	});
// });
// app.get('/template/merge/cells.html', function(request, response) {
// 	var container = new ContainerModel({
// 		contents: request.body.contents,
// 		completeStatus: request.body.completeStatus
// 	});
// 	container.save(function(err) {
// 		if (!err) {
// 			return console.log(container);
// 		} else {
// 			return console.log(err);
// 		}
// 		return response.send(container);
// 	});
// });

// app.post('/template/cells.htm?m=create', function(request, response) {
// 	var container = new ContainerModel({
// 		contents: request.body.contents,
// 		completeStatus: request.body.completeStatus
// 	});
// 	container.save(function(err) {
// 		if (!err) {
// 			return console.log('has created');
// 		} else {
// 			return console.log(err);
// 		}
// 		return response.send(container);
// 	});
// });


// app.put('/notes/containers/:id', function(request, response) {
// 	console.log('Updating container ' + request.body.id);
// 	return ContainerModel.findById(request.params.id, function(err, container) {
// 		container.contents = request.body.contents;
// 		container.completeStatus = request.body.completeStatus;

// 		return container.save(function(err) {
// 			if (!err) {
// 				console.log('Container updated');
// 			} else {
// 				console.log(err);
// 			}
// 			return response.send(container);
// 		});
// 	});
// });
// app.delete('/notes/containers/:id', function(request, response) {
// 	console.log('Deleting Container with id: ' + request.params.id);
// 	return ContainerModel.findById(request.params.id, function(err, container) {
// 		return container.remove(function(err) {
// 			if (!err) {
// 				console.log('Container removed');
// 				return response.send('');
// 			} else {
// 				console.log(err);
// 			}
// 		});
// 	});
// });

var port = 4711;

app.listen(port, function() {
	console.log('express server listening on port %d in %s mode', port, app.settings.env)
});