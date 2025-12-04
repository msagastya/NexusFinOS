"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEMI = calculateEMI;
exports.splitEmiPayment = splitEmiPayment;
function calculateEMI(principal, annualRatePercent, tenureMonths) {
    if (principal <= 0 || annualRatePercent <= 0 || tenureMonths <= 0) {
        return 0;
    }
    const monthlyRate = annualRatePercent / 12 / 100;
    const r = monthlyRate;
    const n = tenureMonths;
    // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi * 100) / 100;
}
function splitEmiPayment(input) {
    const { principalOutstanding, annualRatePercent, emiAmount } = input;
    const monthlyRate = annualRatePercent / 12 / 100;
    const interestComponent = principalOutstanding * monthlyRate;
    // Ensure components are rounded
    const roundedInterest = Math.round(interestComponent * 100) / 100;
    const principalComponent = emiAmount - roundedInterest;
    const roundedPrincipal = Math.round(principalComponent * 100) / 100;
    const newPrincipalOutstanding = principalOutstanding - roundedPrincipal;
    return {
        interestComponent: roundedInterest,
        principalComponent: roundedPrincipal,
        newPrincipalOutstanding: Math.round(newPrincipalOutstanding * 100) / 100,
    };
}
