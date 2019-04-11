export class DatatosaveService {

  constructor() { }

  mustSave(myArray): boolean {
    let mustsave = false;
    for (const control of myArray.controls) {
      if (control.value.code === 'C03C0005') {
        mustsave = true;
      }
    }
    return mustsave;
  }

}
