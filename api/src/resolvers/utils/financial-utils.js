const dotenv = require('dotenv');
dotenv.config();
export const getMobileCode = (network) => {
    switch (network) {
        case 'MTN':
            return 'mtn';
        case 'Vodafone':
            return 'vod';
        case 'AirtelTigo':
            return 'tgo';
        case 'Airtel':
            return 'tgo';
        case 'Tigo':
            return 'tgo';
        default:
            break;
    }
    return 'mtn';
};
export const padNumbers = (number) => {
    if (!number) {
        return '';
    }
    return number.toString().padStart(12, '0');
};
export const getStreamFinancials = (stream) => {
    const merchantId = process.env.PAYSWITCH_MERCHANT_ID;
    let auth = process.env.PAYSTACK_PRIVATE_KEY;
    const passcode = process.env.PAYSWITCH_PASSCODE;
    switch (stream.toLowerCase()) {
        case 'anagkazo encounter':
            throw new Error('Payment Error' +
                'Anagkazo has a different financial system. Thank you!');
        case 'gospel encounter':
            auth = process.env.PAYSTACK_PRIVATE_KEY_GE;
            break;
        case 'holy ghost encounter':
            auth = process.env.PAYSTACK_PRIVATE_KEY_HGE;
            break;
        case 'first love experience':
            auth = process.env.PAYSTACK_PRIVATE_KEY_FLE;
            break;
        default:
            break;
    }
    return { merchantId, auth, passcode };
};
