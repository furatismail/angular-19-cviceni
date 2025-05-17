import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BitcoinPriceService {
    private currentPrice = 800000; // Starting price in CZK for Bitcoin

    constructor() { 
        console.log('BitcoinPriceService => init')
    }

    getBitcoinPrice(): Observable<number> {
        console.log('BitcoinPriceService => getBitcoinPrice')
        return interval(2000).pipe(
            map(() => {
                // Randomly adjust the price up or down by a small amount
                const change = (Math.random() - 0.5) * 10000; // Price fluctuates within a range of ±5000 CZK
                this.currentPrice += change;
                return Math.round(this.currentPrice);
            })
        );
    }
}
