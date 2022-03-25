/// <reference types = "Cypress" />

//access the file with static data to add pet
const dataJson = require("../../fixtures/createpets.json")

describe('pet tests', ()=>{
let testName = ""
let randId = ""

    // add new pet
    it('add pets', ()=>{
        //make random name
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++){
            testName += pattern.charAt(Math.floor(Math.random() * pattern.length));
        }

        //make random pet id
        randId = Math.floor(Math.random() * 100) + 1;

        //add new pet data
        cy.request({
            method: "POST",
            url: 'https://petstore.swagger.io/v2/pet',
            body: {
                //use data from accessed file 
                "id": randId,
                "category": dataJson.category,
                //use random name
                "name": testName,
                "photoUrls": dataJson.photoUrls,
                "tags": dataJson.tags,
                "status": dataJson.status
            }
        }).then((res)=>{
            //check if the status is success
            expect(res.status).to.eq(200)
            //check if the result is the same with the data that's been inputted
            expect(res.body.id).to.eq(randId)
            expect(res.body.category.id).to.eq(dataJson.category.id)
            expect(res.body.category.name).to.eq(dataJson.category.name)
            expect(res.body.name).to.eq(testName)
            expect(res.body.status).to.eq(dataJson.status)
            expect(res.body.tags[0]).has.property("id", dataJson.tags[0].id)
            expect(res.body.tags[0]).has.property("name", dataJson.tags[0].name)
            expect(res.body.tags[1]).has.property("id", dataJson.tags[1].id)
            expect(res.body.tags[1]).has.property("name", dataJson.tags[1].name)
            expect(res.body.photoUrls[0]).to.eq(dataJson.photoUrls[0])
            expect(res.body.photoUrls[1]).to.eq(dataJson.photoUrls[1])

            //return the id response
            const id = res.body.id
            return id
        })
            
            //get data based on pet id
            .then((id)=>{
                cy.request({
                    method: "GET",
                    url: 'https://petstore.swagger.io/v2/pet/'+id,
                }).then((res)=>{
                    //check if the status is success
                    expect(res.status).to.eq(200)

                    //return the status response
                    const status = res.body.status
                    return status
                })
            })

            //find pet data based on status from previous pet id's status
            .then((status)=>{
                cy.request({
                    method: "GET",
                    url: 'https://petstore.swagger.io/v2/pet/findByStatus?status='+status
                }).then((res)=>{
                    //check if the status is success
                    expect(res.status).to.eq(200)
                    
                    //return the status response
                    const petId = res.body[0].id
                    return petId
                })
            })
            //update pet data 
            .then((id)=>{
                let ids = id
                cy.request({
                    method: "PUT",
                    url: 'https://petstore.swagger.io/v2/pet',
                    body: {
                        //use data from accessed file 
                        "id": id,
                        "category": dataJson.category2,
                        //use random name
                        "name": testName,
                        "photoUrls": dataJson.photoUrls,
                        "tags": dataJson.tags,
                        "status": dataJson.status
                    }
                }).then((res)=>{
                    //check if the status is success
                    expect(res.status).to.eq(200)
                    //check if the result is the same with the data that's been inputted
                    expect(res.body.id).to.eq(ids)
                    expect(res.body.category.id).to.eq(dataJson.category2.id)
                    expect(res.body.category.name).to.eq(dataJson.category2.name)
                    expect(res.body.name).to.eq(testName)
                    expect(res.body.status).to.eq(dataJson.status)
                    expect(res.body.tags[0]).has.property("id", dataJson.tags[0].id)
                    expect(res.body.tags[0]).has.property("name", dataJson.tags[0].name)
                    expect(res.body.tags[1]).has.property("id", dataJson.tags[1].id)
                    expect(res.body.tags[1]).has.property("name", dataJson.tags[1].name)
                    expect(res.body.photoUrls[0]).to.eq(dataJson.photoUrls[0])
                    expect(res.body.photoUrls[1]).to.eq(dataJson.photoUrls[1])

                    //return the id response
                    const id = res.body.id
                    return id
                })
            })

            //delete the first pet data from the result where status is the previous pet id's status
            .then((id)=>{
                cy.request({
                    method: "DELETE",
                    url: 'https://petstore.swagger.io/v2/pet/'+id
                }).then((res)=>{
                    //check if the status is success
                    expect(res.status).to.eq(200)
                })

            })

    })

})