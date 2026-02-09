// Stash Response Script - LocalIAP Simulator
// Hedef URL genelde Apple için: /verifyReceipt

let body = $response.body;
let obj = JSON.parse(body);

// Apple/Google'dan gelen hata kodunu '0' (Başarılı) yapıyoruz
obj.status = 0;

// İhtiyaca göre sahte makbuz verileri eklenir
obj.receipt = {
    "bundle_id": "com.targetapp.identifier",
    "in_app": [{
        "product_id": "premium_full_access",
        "purchase_date_ms": "1739142400000",
        "transaction_id": "888888888888888",
        "quantity": "1"
    }]
};

// Değiştirilmiş veriyi geri gönderiyoruz
$done({ body: JSON.stringify(obj) });