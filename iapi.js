/*
 * Universal IAP Simulator for Stash
 * Targets: Apple, RevenueCat, Adapty, Paddle
 */
console.log("SCRIPT CALISTI:", $request.url);

const url = $request.url;
let obj = JSON.parse($response.body || "{}");

// --- 1. Apple Standard (verifyReceipt) ---
if (url.includes("itunes.apple.com/verifyReceipt")) {
    obj = {
        "status": 0,
        "environment": "Production",
        "receipt": {
            "bundle_id": "com.universal.bypass",
            "in_app": [{
                "product_id": "com.universal.premium",
                "transaction_id": "1000000000000",
                "original_transaction_id": "1000000000000",
                "purchase_date_ms": "1700000000000",
                "expires_date_ms": "2524608000000"
            }]
        }
    };
}

// --- 2. RevenueCat (En Yaygın Altyapı) ---
if (url.includes("api.revenuecat.com/v1/subscribers")) {
    obj.subscriber = obj.subscriber || {};
    obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
    obj.subscriber.entitlements = obj.subscriber.entitlements || {};
    
    const premium_id = "pro_access";
    obj.subscriber.subscriptions[premium_id] = {
        "expires_date": "2050-01-01T00:00:00Z",
        "original_purchase_date": "2024-01-01T00:00:00Z",
        "purchase_date": "2024-01-01T00:00:00Z"
    };
    obj.subscriber.entitlements["pro"] = {
        "expires_date": "2050-01-01T00:00:00Z",
        "product_identifier": premium_id,
        "purchase_date": "2024-01-01T00:00:00Z"
    };
}

// --- 3. Adapty.io (Diğer Popüler Altyapı) ---
if (url.includes("api.adapty.io/v1/sdk/analytics/profiles/")) {
    obj.data = obj.data || {};
    obj.data.attributes = obj.data.attributes || {};
    obj.data.attributes.subscriptions = {
        "premium": {
            "is_active": true,
            "expires_at": "2050-01-01T00:00:00Z",
            "activated_at": "2024-01-01T00:00:00Z"
        }
    };
}


$done({ body: JSON.stringify(obj) });
