
const Metadata = require('./metadata');
const faker = require('faker');
faker.locale = "ru";


module.exports = () => {
    const data = {
        metadata:Metadata,
        department: [],
        employeer:[] }
    // Create 1000 users

    for (let i = 1; i <= 10; i++) {
        data.department.push({ id: i,
            name: faker.commerce.department(),
        })
    }

    for (let i = 1; i <= 30; i++) {
        data.employeer.push({ id: i,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            "departmentId":Math.floor(Math.random()*20)
        })
    }
    return data
}