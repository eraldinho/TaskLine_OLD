import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AssemblyFormService {
  public assemblyGroup: FormGroup;

  constructor(private fb: FormBuilder
    ) {
    this.assemblyGroup = fb.group({
      checkComponent: [null, Validators.required],
      assembly: [null, Validators.required],
      cableConnection: [null, Validators.required],
      BIOSUpdate: [null, Validators.required],
      BIOSSetUp: [null, Validators.required],
      LicenceSticker: [null, Validators.required],
      OSVersion: [null, Validators.required],
      OSInstallation: [null, Validators.required],
      OSUpdate: [null, Validators.required],
      drivers: [null, Validators.required],
      drives: [null, Validators.required],
      OSActivation: [null, Validators.required],
      fan: [null, Validators.required],
      USB: [null, Validators.required],
      jack: [null, Validators.required],
      opticalDrive: [null, Validators.required],
      cardReader: [null, Validators.required],
      shutDown: [null, Validators.required],
      packaging: [null, Validators.required],
      softwareValidation: [null, Validators.required],
      checkComponentLog: [null, Validators.required],
      assemblyLog: [null, Validators.required],
      cableConnectionLog: [null, Validators.required],
      BIOSUpdateLog: [null, Validators.required],
      BIOSSetUpLog: [null, Validators.required],
      LicenceStickerLog: [null, Validators.required],
      OSVersionLog: [null, Validators.required],
      OSInstallationLog: [null, Validators.required],
      OSUpdateLog: [null, Validators.required],
      driversLog: [null, Validators.required],
      drivesLog: [null, Validators.required],
      OSActivationLog: [null, Validators.required],
      fanLog: [null, Validators.required],
      USBLog: [null, Validators.required],
      jackLog: [null, Validators.required],
      opticalDriveLog: [null, Validators.required],
      cardReaderLog: [null, Validators.required],
      shutDownLog: [null, Validators.required],
      packagingLog: [null, Validators.required],
      softwareValidationLog: [null, Validators.required],
      assemblyComment: [null, Validators.required]
    });
   }
}
