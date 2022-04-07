import {Injectable} from '@angular/core';
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {Device} from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  constructor() {
  }

  startScan = async () => {
    const info = await Device.getInfo();

    if (info.platform === 'android') {
      const granted = await this.hasPermission();
      if (!granted) {
        return;
      }
    }

    this.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
      this.showBackground();
      return result.content;
    }
  };

  showBackground() {
    const appRoot = document.getElementsByTagName('app-root')[0] as HTMLElement;
    appRoot.style.opacity = '1';
    document.body.style.background = '';

    document.getElementById('bc-close').remove();

    BarcodeScanner.showBackground();
  }

  hideBackground() {
    const appRoot = document.getElementsByTagName('app-root')[0] as HTMLElement;
    appRoot.style.opacity = '0';
    document.body.style.background = 'transparent';

    const node = document.createElement("div");
    node.id = 'bc-close';
    node.style.background = 'rgb(229, 85, 74)';
    node.style.position = 'absolute';
    node.style.width = '100%';
    node.style.height = '100px';
    node.style.opacity = '1';
    node.style.textAlign = 'center';
    node.style.verticalAlign = 'middle';
    node.style.paddingTop = '65px';

    const textnode = document.createTextNode("Close");
    node.appendChild(textnode);

    node.addEventListener('click', () => {
      this.stopScan();
    });

    document.getElementById('barcodeScannerCloseButton').appendChild(node);

    BarcodeScanner.hideBackground();
  }

  stopScan = async () => {
    this.showBackground();
    await BarcodeScanner.stopScan();
  };

  async hasPermission(): Promise<boolean> {
    return (await BarcodeScanner.checkPermission({force: true})).granted;
  }
}

