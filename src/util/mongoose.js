module.exports = 
{
    multipleMongoToObject : function (mongooses) {
        return mongooses.map(mongooses => mongooses.toObject());
    },

    MongoToObject : function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
