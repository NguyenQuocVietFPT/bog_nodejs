const mongoose = require('mongoose');	
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id : {type: Number},
    name: {type: String, require: true},
    description: {type: String },
    image: {type: String},
    videoId: {type: String, require: true},
    level: {type: String},
    slug : {type: String, slug: 'name', unique: true}
}, {
    timestamps: true,
    _id : false,
});

//Add plugins
CourseSchema.plugin(AutoIncrement);
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, { 
    overrideMethods: 'all' ,
    deletedAt : true,
});

//Custom course schema query function
CourseSchema.query.sortable = function(req) {
   
        if(req.query.hasOwnProperty('_sort')) {
            const currentDefault = ['asc', 'desc'].includes(req.query.type);
            return this.sort({
                [req.query.column] : currentDefault ? req.query.type : 'desc'
            });
        } return this;
};

module.exports = mongoose.model('Course', CourseSchema);