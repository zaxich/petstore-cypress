/// <reference types = "Cypress" />

//access the file with static data to add store
const dataJson = require("../../fixtures/createstore.json")

describe('store tests', ()=>{
    // add order for pet pet
    it('add order', ()=>{
        //add new order for pet pet
        cy.request({
            method: "POST",
            url: 'https://petstore.swagger.io/v2/store/order',
            body: {
                //use data from accessed file 
                "id": dataJson.id,
                "petId": dataJson.petId,
                "quantity": dataJson.quantity,
                "shipDate": dataJson.shipDate,
                "status": dataJson.status,
                "complete": dataJson.complete
            }
        }).then((res)=>{
            //check if the status is success
            expect(res.status).to.eq(200)
            //check if the result is the same with the data that's been inputted
            expect(res.body.id).to.eq(dataJson.id)
            expect(res.body.petId).to.eq(dataJson.petId)
            expect(res.body.quantity).to.eq(dataJson.quantity)
            expect(res.body.shipDate).to.eq(dataJson.shipDate)
            expect(res.body.status).to.eq(dataJson.status)
            expect(res.body.complete).to.eq(dataJson.complete)

            //return the id response
            const id = res.body.id
            return id
        }) 

            //get order detail based on order id
            .then((id)=>{
                cy.request({
                    method: "GET",
                    url: 'https://petstore.swagger.io/v2/store/order/'+id,
                }).then((res)=>{
                    //check if the status is success
                    expect(res.status).to.eq(200)
                    //check if the result is the same with the data that's been inputted
                    expect(res.body.id).to.eq(dataJson.id)
                    expect(res.body.petId).to.eq(dataJson.petId)
                    expect(res.body.quantity).to.eq(dataJson.quantity)
                    expect(res.body.shipDate).to.eq(dataJson.shipDate)
                    expect(res.body.status).to.eq(dataJson.status)
                    expect(res.body.complete).to.eq(dataJson.complete)
                    //return the id response
                    const id = res.body.id
                    return id
                })
            })

            //delete the first pet data from the result where status is the previous pet id's status
            .then((id)=>{
                cy.request({
                    method: "DELETE",
                    url: 'https://petstore.swagger.io/v2/store/order/'+id
                }).then((res)=>{
                    //check if the status is success
                    expect(res.status).to.eq(200)
                })

            })

            //get pet order by status 
            .then(()=>{
                cy.request({
                    method: "GET",
                    url: 'https://petstore.swagger.io/v2/store/inventory'
                }).then((res)=>{
                    //check if the status is success
                    expect(res.status).to.eq(200)
                })
            }) 

    })

})