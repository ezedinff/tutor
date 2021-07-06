export const confirmPaymentForm = [
    {
        name: "name",
        label: "Deposited By(name)",
        type: "text"
    },
    {
        name: "transaction_number",
        label: "Transaction Reference Number",
        type: "text"
    },
    {
        name: "deposited_date",
        label: "Payment Date",
        type: "date"
    }
];


export const bankDepositForm = [
    {
        name: "bank",
        label: "Select a Bank",
        type: "select",
        options: ['Dashen', 'Hibret', 'Abyssinia', 'CBE', 'Zemen']
        .map((bank) => ({label: `${bank} Bank`, value: `${bank} Bank`}))
    }
];

export const paymentOptionform = [
    {
        name: "payment_option",
        lable: "Select Payment Options",
        type: "radio",
        options: [
            {label: "Online Payment", value: "online"},
            {label: "Bank Deposit", value: "bank_deposit"}
        ]
    }
]