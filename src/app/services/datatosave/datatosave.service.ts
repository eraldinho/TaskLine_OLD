export class DatatosaveService {

  constructor() { }

  mustSave(myArray): boolean {
    for (const control of myArray.controls) {
      if (control.value.code === 'C03C0005') {
        return true;
      } else {
        return false;
      }
    }
  }

}
