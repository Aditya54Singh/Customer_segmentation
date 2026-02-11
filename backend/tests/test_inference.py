from services.inference import predict_customer_segment

sample_input = {
    "Age": 35,
    "Income": 75000,
    "Total_Spending": 1200,
    "NumWebPurchases": 8,
    "NumStorePurchases": 5,
    "NumWebVisitsMonth": 4,
    "Recency": 20
}

result = predict_customer_segment(sample_input)
print(result)
