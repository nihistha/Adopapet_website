const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTA5MzZlMmM0NzYyY2JkODJjMjNlOSIsImlhdCI6MTcyMzgyNzMxNH0.XLwjHb3XeZIQSn8gc3v398tsdUdbyqpvHWYKqg8dA1Q" 

describe("User API", () => {
    // let token;
    let userId;
 
    it('POST /api/user/create | Response with message',async()=>{
        const response = await request(app)
        .post('/api/user/create')
        .send({
            "fullname" : "hi",
            "phonenumber" : "9823943929",
            "email": "hi@gmail.com",
            "password" : "123328993"
        });
        if(!response.body.success){
          expect(response.body.message).toEqual('User Already Exists')
        }else{
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toEqual("User Created Successfully")
        }
        
      })
 
    it("Create User | Missing Fields", async () => {
        const response = await request(app).post("/api/user/create").send({
            fullname: "John Doe",
            email: "johndoe@example.com",
            password: "password123", 
        });
 
        expect(response.statusCode).toBe(400);
        expect(response.body.sucess).toBe(false);
        expect(response.body.message).toBe("Please enter all fields");
    });
 
    // it("Login User | Successful Login", async () => {
    //     const response = await request(app).post("/api/user/login").send({
    //         email: "johndoe@example.com",
    //         password: "password123",
    //     });
 
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.success).toBe(true);
    //     expect(response.body.message).toBe("Login successful");
    //     expect(response.body.userData).toHaveProperty("email", "johndoe@example.com");
    //     token = response.body.token;
    // });
 
    // it("Login User | Incorrect Password", async () => {
    //     const response = await request(app).post("/api/user/login").send({
    //         email: "johndoe@example.com",
    //         password: "wrongpassword",
    //     });
 
    //     expect(response.statusCode).toBe(401);
    //     expect(response.body.success).toBe(false);
    //     expect(response.body.message).toBe("Incorrect password");
    // });
 
    it("Login User | Email Not Registered", async () => {
        const response = await request(app).post("/api/user/login").send({
            email: "nonexistent@example.com",
            password: "password123",
        });
 
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("This Email is not registered");
    });
 
    it("Get User | Fetch User Data", async () => {
        const response = await request(app)
            .get("/api/user/getUser")
            .set("authorization", `Bearer ${token}`);
 
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty("email", "suyog@gmail.com");
    });
 
    it("Update User | Successful Update", async () => {
        const response = await request(app)
            .put(`/api/user/update-user`)
            .set("authorization", `Bearer ${token}`)
            .send({
                fullname: "John Updated",
            });
 
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("fullname", "John Updated");
    });
 
 
    it("Forgot Password | Valid Email", async () => {
        const response = await request(app)
            .post("/api/user/forgot_password")
            .send({ email: "suyog@gmail.com" });
 
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Password reset OTP sent");
    });
 
    it("Forgot Password | Email Not Registered", async () => {
        const response = await request(app)
            .post("/api/user/forgot_password")
            .send({ email: "nonexistent@example.com" });
 
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("User not found");
    });
 
    it("Forgot Password | Missing Email", async () => {
        const response = await request(app)
            .post("/api/user/forgot_password")
            .send({});
 
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Email is required");
    });
 
    it("Verify OTP and Reset Password | Valid OTP and New Password", async () => {
        const response = await request(app)
            .post("/api/user/verify_otp")
            .send({
                email: "johndoe@example.com",
                otp: "123456", // Use a valid OTP generated for the test
                newPassword: "newPassword123"
            });
 
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Password reset successful");
    });
 
    it("Verify OTP and Reset Password | Invalid OTP", async () => {
        const response = await request(app)
            .post("/api/user/verify_otp")
            .send({
                email: "johndoe@example.com",
                otp: "000000", // Use an invalid OTPnewPassword: "newPassword123"
            });
 
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid OTP");
    });
});

