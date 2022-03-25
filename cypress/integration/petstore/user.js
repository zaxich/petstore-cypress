/// <reference types = "Cypress" />

//access the file with static data to add user
const dataJson = require("../../fixtures/createuser.json")

//access the file with static data to update user
const updateJson = require("../../fixtures/updateuser.json")

describe('user tests', ()=>{
    // add user
    it('create user', ()=>{
        //create user with list
        cy.request({
            method: "POST",
            url: 'https://petstore.swagger.io/v2/user/createWithList',
            body: dataJson
        }).then((res)=>{
            //check if the status is success
            expect(res.status).to.eq(200)
        }) 
            //get user by username
            .then(()=>{
                cy.request({
                    method: "GET",
                    url: 'https://petstore.swagger.io/v2/user/'+dataJson[0].username,
                }).then((res)=>{
                    //check if the status is success
                    expect(res.status).to.eq(200)
                    //check if the result is the same with the data that's been inputted
                    expect(res.body.id).to.eq(dataJson.id)
                    expect(res.body.username).to.eq(dataJson.username)
                    expect(res.body.firstName).to.eq(dataJson.firstName)
                    expect(res.body.lastName).to.eq(dataJson.lastName)
                    expect(res.body.email).to.eq(dataJson.email)
                    expect(res.body.password).to.eq(dataJson.password)
                    expect(res.body.phone).to.eq(dataJson.phone)
                    expect(res.body.userStatus).to.eq(dataJson.userStatus)
                    //return the username response
                    const username = res.body.username
                    return username
                })
            })

            //update user
            .then((username)=>{
                cy.request({
                    method: "PUT",
                    url: 'https://petstore.swagger.io/v2/user/'+username,
                    body: {
                        "id": updateJson.id,
                        "username": updateJson.username,
                        "firstName": updateJson.firstName,
                        "lastName": updateJson.lastName,
                        "email": updateJson.email,
                        "password": updateJson.password,
                        "phone": updateJson.phone,
                        "userStatus": updateJson.userStatus
                    }
                }).then((res)=>{
                    //check if the status is success
                    expect(res.status).to.eq(200)
                    //check if the result is the same with the data that's been inputted
                    expect(res.body.id).to.eq(updateJson.id)
                    expect(res.body.username).to.eq(updateJson.username)
                    expect(res.body.firstName).to.eq(updateJson.firstName)
                    expect(res.body.lastName).to.eq(updateJson.lastName)
                    expect(res.body.email).to.eq(updateJson.email)
                    expect(res.body.password).to.eq(updateJson.password)
                    expect(res.body.phone).to.eq(updateJson.phone)
                    expect(res.body.userStatus).to.eq(updateJson.userStatus)
                    //return the username response
                    const username = res.body[0].username
                    return username
                }) 
            })

            //delete the updated user
            .then((username)=>{
                cy.request({
                    method: "DELETE",
                    url: 'https://petstore.swagger.io/v2/user/'+username
                }).then((res)=>{
                    //check if the status is success
                    expect(res.status).to.eq(200)
                })

            })

    })

    //user login activities
    it ('login user',()=>{
        //user login
        cy.request({
            method: "GET",
            url: 'https://petstore.swagger.io/v2/user/login?username='+dataJson[0].username+'&password='+dataJson[0].password
        }).then((res)=>{
            //check if the status is success
            expect(res.status).to.eq(200)
        }) 
            //create user after login
            .then(()=>{
                cy.request({
                    method: "POST",
                    url: 'https://petstore.swagger.io/v2/user/',
                    body: {
                        "id": updateJson.id,
                        "username": updateJson.username,
                        "firstName": updateJson.firstName,
                        "lastName": updateJson.lastName,
                        "email": updateJson.email,
                        "password": updateJson.password,
                        "phone": updateJson.phone,
                        "userStatus": updateJson.userStatus
                    }
                }).then((res)=>{
                    
                    //check if the status is success
                    expect(res.status).to.eq(200)
                }) 
            })
            
            //user logout
            cy.request({
                method: "GET",
                url: 'https://petstore.swagger.io/v2/user/logout'
            }).then((res)=>{
                //check if the status is success
                expect(res.status).to.eq(200)
            }) 
    })

})