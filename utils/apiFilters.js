class APIFilters {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryCopy = {...this.queryString};

        // Remove fields from query
        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach(el => delete queryCopy[el]);

        // Advance filter using: lt, lte, gt, gte
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        // console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');

            console.log(sortBy);

            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-positingDate');
        }
        return this;
    }
}

module.exports = APIFilters;