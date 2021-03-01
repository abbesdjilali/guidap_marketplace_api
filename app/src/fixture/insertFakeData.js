const fetch = require('node-fetch');
const {
    data
} = require("./data");
//insert data to database 
const insertCategories = async () => {
    for await (cat of data.categories) {
        await fetch('http://localhost:3000/api/categories', {
            method: "POST",
            body: JSON.stringify(cat),
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJkamlsYWwiLCJlbWFpbCI6ImRqaWxhbGlAZ3VpZGFwLmNvIiwiaWF0IjoxNjE0NTMwMDgwfQ.BBuRaCVQoMowr2VtLV8TTYer2Z2E0Szm1-XpqY6dePw'
            }
        })
    }

}

const insertLeisuresCentres = async () => {
    for await (leisurecentre of data.leisureCentres) {
        await fetch('http://localhost:3000/api/leisurecentre', {
            method: "POST",
            body: JSON.stringify(leisurecentre),
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJkamlsYWwiLCJlbWFpbCI6ImRqaWxhbGlAZ3VpZGFwLmNvIiwiaWF0IjoxNjE0NTMwMDgwfQ.BBuRaCVQoMowr2VtLV8TTYer2Z2E0Szm1-XpqY6dePw'
            }
        })
    }
}
exports.inserDataInDatabase = async () => {
    try {
        await insertCategories()
        await insertLeisuresCentres();
    } catch (error) {
        throw error;
    }
}