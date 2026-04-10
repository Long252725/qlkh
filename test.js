import axios from 'axios';
import crypto from 'crypto';

// const createPaymentLink = async (orderData) => {
//     const { orderCode, amount, description, cancelUrl, returnUrl } = orderData;
//     const checksumKey = '2b9d1c81d0215c083123bae0a945d2ca4b3251674fe249a379bd54fe719e07b1'; // Lấy từ PayOS Dashboard

//     // 1. Sắp xếp và tạo chuỗi data để ký
//     const dataStr = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
    
//     // 2. Tạo signature dùng HMAC SHA256
//     const signature = crypto
//         .createHmac('sha256', checksumKey)
//         .update(dataStr)
//         .digest('hex');

//     // 3. Gọi API PayOS
//     try {
//         const response = await axios.post('https://api-merchant.payos.vn/v2/payment-requests', {
//             ...orderData,
//             signature: signature
//         }, {
//             headers: {
//                 'x-client-id': '9788cc35-4d8c-4399-aaa3-f1a31b26073c',
//                 'x-api-key': '91bce5de-1aca-4878-b0b0-d50c8a389b33'
//             }
//         });

//         return response.data.data.checkoutUrl; // Đây là link bạn cần trả về cho Client
//     } catch (error) {
//         console.error("Lỗi tạo link PayOS:", error.response.data);
//     }
// };
// createPaymentLink({ orderCode: '2122', amount: 100000, description: 'Thanh toán đơn hàng #2122', cancelUrl: 'https://yourdomain.com/cancel', returnUrl: 'https://yourdomain.com/return' });

let authen = {
    "x-client-id": "9788cc35-4d8c-4399-aaa3-f1a31b26073c",
    "x-api-key": "91bce5de-1aca-4878-b0b0-d50c8a389b33"
}
let orderCode = '212;
let amount = 100000;
let description = 'Thanh toán đơn hàng #2122';
let cancelUrl = 'https://yourdomain.com/cancel'
let returnUrl = 'https://yourdomain.com/return'
const dataStr = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
const signature = crypto
    .createHmac('sha256', '2b9d1c81d0215c083123bae0a945d2ca4b3251674fe249a379bd54fe719e07b1')
    .update(dataStr)
    .digest('hex');

fetch('https://api-merchant.payos.vn/v2/payment-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authen
        },
        body: JSON.stringify({
            orderCode: orderCode, 
            amount: amount, 
            description: description,
            cancelUrl: cancelUrl, 
            returnUrl: returnUrl, 
            signature: signature
        })
    })
    .then(response => {
        // PHẢI RETURN ở đây để .then sau có dữ liệu
        return response.json(); 
    })
    .then(data => {
        // Bây giờ data sẽ hiện ra Object đầy đủ, có checkoutUrl
        console.log("Dữ liệu trả về:", data);
        if(data.code === "00") {
            console.log("Link thanh toán của bạn:", data.data.checkoutUrl);
        } else {
            console.log("Lỗi từ PayOS:", data.desc);
        }
    })
    .catch(err => console.error("Lỗi kết nối:", err));