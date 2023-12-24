export interface IBooking { 
    userId: string;
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    status: string;
    totalAmountPaid: number;
    transactionMethod: string;
}