import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  constructor() { }

  startScan = async () => {
    await BarcodeScanner.hideBackground(); // make background of WebView transparent
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
      return result.content;
    }
  };

  prepare = () => {
    BarcodeScanner.prepare();
  };

  stopScan = async () => {
    await BarcodeScanner.showBackground();
    await BarcodeScanner.stopScan();
  };
}

