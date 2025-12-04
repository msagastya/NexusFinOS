export declare function calculateEMI(principal: number, annualRatePercent: number, tenureMonths: number): number;
export interface EmiSplitInput {
    principalOutstanding: number;
    annualRatePercent: number;
    emiAmount: number;
    daysInPeriod?: number | null;
}
export interface EmiSplitResult {
    interestComponent: number;
    principalComponent: number;
    newPrincipalOutstanding: number;
}
export declare function splitEmiPayment(input: EmiSplitInput): EmiSplitResult;
