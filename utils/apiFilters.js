class APIFilters {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        // this.query = this.query.find(JSON.parse(this.queryString.filter));

        const queryCopy = {...this.queryString};

        // Advance filter using: lt, lte, gt, gte
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        console.log(queryStr);


        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
}

module.exports = APIFilters;