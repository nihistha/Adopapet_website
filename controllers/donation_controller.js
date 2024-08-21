const crypto = require("crypto");
const User = require("../models/user_model");
const { v4 } = require("uuid");
const donation_model = require("../models/donation_model");

exports.checkout = async (req, res, next) => {
  const { amount } = req.body;
  console.log(amount)
  const uid = "abcd"+"-"+ v4() + "-" + req.user.id;
  
  const signature = this.createSignature(
    `total_amount=${amount},transaction_uuid=${uid},product_code=EPAYTEST`,
  );
  const formData = {
    amount: amount,
    failure_url: "http://localhost:3000",
    product_delivery_charge: "0",
    product_service_charge: "0",
    product_code: "EPAYTEST",
    signature: signature,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: "http://localhost:5500/api/payment/verify-esewa",
    tax_amount: "0",
    total_amount: amount,
    transaction_uuid: uid,
  };

  res.json({
    message: "Order Created Sucessfully",
    formData,
    payment_method: "esewa",
  });
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { data } = req.query;
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf-8"),
    );
    console.log(decodedData);

    if (decodedData.status !== "COMPLETE") {
      return res.status(400).json({ message: "errror" });
    }
    const message = decodedData.signed_field_names
      .split(",")
      .map((field) => `${field}=${decodedData[field] || ""}`)
      .join(",");
    console.log(message);

    const decodedArray = decodedData.transaction_uuid.split("-");
    const userId = decodedArray[decodedArray.length - 1];

    if (decodedData.status !== "COMPLETE") {
      console.log("The status is not complete");
      return res.redirect(`http://localhost:3000/dashboard`);
    }
    const amount = parseFloat(
        decodedData.total_amount.replace(/,/g, ""),
      );

    const donation = new donation_model({
      userId:userId,
      amount,
    });

    // await newInvestor.save();

    res.redirect("http://localhost:3000/dashboard");
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};

exports.createSignature = (message) => {
  const secret = "8gBm/:&EnhH.1/q";
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);

  // Get the digest in base64 format
  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
};

exports.getDonations=()=>{
  try{
  const donation = donation_model.find()
  res.status(201).json({
    "success": true,
    "message": "Donation fetched successfully",
    "donations": donation
})
} catch (error) {
console.log("error")
}
}