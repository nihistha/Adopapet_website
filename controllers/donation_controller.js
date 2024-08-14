const dotenv = require('dotenv');
const { v4 } = require('uuid');
const crypto = require('crypto');
const Order = require('../models/donation_model');

dotenv.config();

class DonationController {
    static createSignature = (message) => {
        const secret = "8gBm/:&EnhH.1/q";
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(message);

        // Get the digest in base64 format
        const hashInBase64 = hmac.digest("base64");
        return hashInBase64;
    }

    static checkout = async (req, res) => {
        try {
            const { totalAmount } = req.body;
            const uid = req.params.pid + "-" + v4() + "-" + req.user.id;
            ;
            const message = `total_amount=${totalAmount},transaction_uuid=${uid},product_code=EPAYTEST`;
            const signature = DonationController.createSignature(message);

            const formData = {
                amount: totalAmount,
                failure_url: `${process.env.BASE_URL}/api/payment/failed`,
                product_delivery_charge: "0",
                product_service_charge: "0",
                product_code: "EPAYTEST",
                signature: signature,
                signed_field_names: "total_amount,transaction_uuid,product_code",
                success_url: `${process.env.BASE_URL}/api/payment/verify-esewa`,
                tax_amount: "0",
                total_amount: totalAmount,
                transaction_uuid: uid,
            };

            res.json({
                message: "Donation Sent Successfully",
                formData,
                payment_method: "esewa",
            });
        } catch (error) {
            console.error('Error during checkout:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static verifyEsewa = async (req, res) => {
        try {
            const { data } = req.query;
            const decodedData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));

            console.log(decodedData);

            if (decodedData.status !== "COMPLETE") {
                return res.status(400).json({ message: "Error in transaction status" });
            }

            const message = decodedData.signed_field_names
                .split(",")
                .map(field => `${field}=${decodedData[field] || ""}`)
                .join(",");

            console.log(message);

            const expectedSignature = DonationController.createSignature(message);

            if (decodedData.signature !== expectedSignature) {
                return res.status(400).json({ message: "Invalid signature" });
            }
            const decodedArray = decodedData.transaction_uuid.split("-");
            const userId = decodedArray[decodedArray.length - 1];

            console.log("The user id is " + userId);

            const user_id = req.user;
            console.log(user_id)

                await Order.create({
                    orderedBy: user_id,
                    price: item.price
                });
            

        } catch (err) {
            console.log(err.message);
            return res.status(400).json({ error: err.message || "No Orders found" });
        }
    }
}

module.exports = DonationController;
