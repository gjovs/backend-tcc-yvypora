// Interface to Kafka Message associated to Purchase well succedded

export interface IPaymentMessage {
    succeeded: boolean;
    intent_payment_id: string;   
}

