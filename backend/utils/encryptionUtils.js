// utils/encryptionUtils.js
const CryptoJS = require('crypto-js');
const { StatusCodes } = require('http-status-codes');

const CRYPTO_SECRET = process.env.CRYPTO_SECRET;

function sendEncryptedResponse(res, responseData) {
    try {
        // 1. Generate a random initialization vector (IV)
        const iv = CryptoJS.lib.WordArray.random(16);

        // 2. Derive a key using PBKDF2 (you can adjust the iterations and key size)
        const key = CryptoJS.PBKDF2(CRYPTO_SECRET, iv, {
            keySize: 256 / 32,
            iterations: 1000,
        });

        // 3. Encrypt the response data using AES with the derived key and IV
        const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(responseData),
            key,
            { iv: iv }
        ).toString();

        // 4. Create an HMAC for the encrypted data to ensure integrity
        const hmac = CryptoJS.HmacSHA256(encryptedData, key).toString();

        // 5. Send the IV, HMAC, and encrypted data to the client
        return res.status(StatusCodes.OK).json({
            errorCode: 0,
            status: true,
            message: "Operation successful",
            data: {
                iv: iv.toString(CryptoJS.enc.Hex), // Send IV as hex string
                hmac: hmac, // Send HMAC
                encryptedData: encryptedData,
            },
        });
    } catch (error) {
        console.error('Error encrypting response data:', error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errorCode: 5,
            status: false,
            message: "Internal Server Error",
            data: error.message,
        });
    }
}

module.exports = {
    sendEncryptedResponse,
};
