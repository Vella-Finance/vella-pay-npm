# Vella Checkout

# :rocket: Install

```bash
npm install vella-pay
```

# :computer: Import

```js
// ES6:
import VellaCheckout from 'vella-pay';

```

> If you don't have your API keys, you can sign up for a test account [here](https://app.vella.finance).

# :clapper: Initialize SDK

## With api keys or access credentials
Based on how your account was set up, you will either have a pair or API key or a set of access credentials. Here is how you can use the SDK in both scenarios:
```js
const key = "vk_test_XXXXXXXXX"; // your vella API test/live key
const config = {
  email: 'example@mail.com', // string - customer email
  name: "Tade Ogidan", // string - customer name
  amount: 100.00, //float - amount to pay
  currency: "NGNT", // supported fiat NGNT,USDT,USDC
  merchant_id: "", // string - merchant id
  reference: "" // string - generated reference
};
const vellaSDK = new VellaCheckout(key, config);
vellaSDK.init();
vellaSDK.onSuccess(response => {
  console.log("data", response) // success response with data
})
vellaSDK.onError(error => {
  console.log("error", error) // error response
});
vellaSDK.onClose(() => {
  console.log("widget closed") // trigger close
});;
```

## Support
If you're having trouble with Vella checkout integration, please reach out to us at hello@vella.finance or come chat with us using on https://app.vella.finance. We're happy to help you out with your integration to Vella.