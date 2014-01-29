/**
 * Created by aselims on 1/14/14.
 */

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var DbName = 'EventsDb';

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db(DbName, server, {safe: true});


exports.findAll = function(req, res) {
    db.collection('events', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findOneEvent = function(req, res){
    var id = req.params.id;
    db.collection('events', function(err, collection){
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });

};

exports.addOneEvent = function(req, res){
    var event = req.body;
    console.log("Inserting event: " + JSON.stringify(event));
    db.collection('events', function(err, collection) {
        //collection.insert(docs[[, options], callback])
        collection.insert(event, true, function(err, collection){
            collection.msg = 'success'
            res.send(collection);
            console.log("inserted:" + JSON.stringify(event));
        });
    });
}

exports.updateEvent = function(req, res) {
    var id = req.params.id;
    var event = req.body;
    delete event._id;
    console.log('Updating event: ' + id);
    console.log(JSON.stringify(event));
    db.collection('events', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, event, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating event: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                result.msg = 'success';
                console.log(JSON.stringify(result))
                res.send(result);
            }
        });
    });
}

exports.deleteEvent = function(req, res) {
    var id = req.params.id;
    console.log('Deleting event: ' + id);
    db.collection('events', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                result.msg = 'success';
                console.log(JSON.stringify(result))
                res.send(result);
                
            }
        });
    });
}


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var events = [
        {
            Title: "youcon",
            Description: "A conference for young people",
            Date: '10.2.15',
            Address: 'Osloerstr. 121, Berlin',
            TimeOfCreation: new Date(),
            User: "Selim"
        },
        {
            Title: "youshock",
            Description: "a paly",
            Date: '10.32.154',
            Address: 'hhhh. 121, Berlin',
            TimeOfCreation: new Date(),
            User: "Gold"
        },
        {
            Title: "tech",
            Description: "meeetup fo who dare",
            Date: '10.2.2023',
            Address: 'berlinerstr. 55, Berlin',
            TimeOfCreation: new Date(),
            User: "nilly"
        }
        
   ];

    db.collection('events', function(err, collection) {
        collection.insert(events, {safe:true}, function(err, result) {});
    });

};


