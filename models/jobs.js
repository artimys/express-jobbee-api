const mongoose = require('mongoose');
const validator = require('validator')
const slugify = require('slugify');
const geoCoder = require('../utils/geocoder');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter job title'],
        trim: true,
        maxlength: [100, 'Job title cannot exceed 100 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please enter job description'],
        maxlength: [1000, 'Job description cannot exceed 1000 characters']
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    address: {
        type: String,
        required: [true, 'Please enter job address']
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    company: {
        type: String,
        required: [true, 'Please enter company name']
    },
    industry: {
        type: [String],
        required: [true, 'Please enter industry'],
        enum: {
            values: [
                'Business',
                'Information Technology',
                'Banking',
                'Education/Training',
                'Telecommunication',
                'Others'
            ],
            message: 'Please select correct industry for this job'
        }
    },
    jobType: {
        type: String,
        required: [true, 'Please enter job type'],
        enum: {
            values: [
                'Permanent',
                'Temporary',
                'Internship'
            ],
            message: 'Please select correct job type for this job type'
        }
    },
    minEducation: {
        type: String,
        required: [true, 'Please enter education'],
        enum: {
            values: [
                'Bachelors',
                'Masters',
                'PhD'
            ],
            message: 'Please select correct options for education'
        }
    },
    positions: {
        type: Number,
        default: 1
    },
    experience: {
        type: String,
        required: [true, 'Please enter experience'],
        enum: {
            values: [
                'No Experience',
                '1 Year - 2 Years',
                '2 Year - 5 Years',
                '5 Years+'
            ],
            message: 'Please select correct options for experience'
        }
    },
    salary: {
        type: Number,
        required: [true, 'Please enter salary amount']
    },
    postingDate: {
        type: Date,
        default: Date.now
    },
    lastDate: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 7)
    },
    applicationsApplied: {
        type: [Object],
        select: false
    }

});


// Create job slug before saving
jobSchema.pre('save', function(next) {
    // creating slug before saving to DB
    this.slug = slugify(this.title, { lower: true });
    next();
});

// Setup location
jobSchema.pre('save', async function(next) {
    const loc = await geoCoder.geocode(this.address);

    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    }
});



module.exports = mongoose.model('Job', jobSchema);