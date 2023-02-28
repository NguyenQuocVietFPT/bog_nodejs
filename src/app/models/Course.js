const mongoose = require('mongoose');	
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {type: String, require: true},
    description: {type: String },
    image: {type: String},
    videoId: {type: String, require: true},
    level: {type: String},
    slug : {type: String, slug: 'name', unique: true}
}, {
    timestamps: true
});

//Add plugins
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