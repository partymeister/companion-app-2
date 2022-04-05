import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  constructor() { }

  startScan = async () => {
    document.body.style.opacity='0';
    document.body.style.background = 'transparent';
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
      document.body.style.background = '';
      document.body.style.opacity='1';
      return result.content;
    }
  };

  stopScan = async () => {
    await BarcodeScanner.showBackground();
    await BarcodeScanner.stopScan();
  };
}

