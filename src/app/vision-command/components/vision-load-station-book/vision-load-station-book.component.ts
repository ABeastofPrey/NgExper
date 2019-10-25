import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService, DataService } from '../../../../../../core/services';
import { TPVariable } from '../../../../../../core/models/tp/tp-variable.model';
import { AddVarComponent } from '../../../../add-var/add-var.component';

@Component({
  selector: 'app-vision-load-station-book',
  templateUrl: './vision-load-station-book.component.html',
  styleUrls: ['./vision-load-station-book.component.scss']
})
export class VisionLoadStationBookComponent implements OnInit {
  public form = this.formBuilder.group({
      configFilePath: ["", Validators.required],
      assignedTo: [""]
  });
  files: any[] = [];
  selectedVariable: TPVariable;

  private readonly defaultRootFolder = "SSMC";
  private readonly defaultConfigFile = "VJOB.DAT";
  private readonly defaultConfigExtension = "DAT";

  constructor(public dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dataService: DataService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
    ) { 
    }

  get longVariables(): TPVariable[] {
    return this.dataService.longs.filter(x => !x.isArr);
  }

  ngOnInit() {
    this.form.patchValue({ configFilePath: this.defaultRootFolder + "/" + this.defaultConfigFile });
    this.api.getFiles(this.defaultConfigExtension).then(result => {
      this.files = result.map(f => {
        return { fileName: f.fileName, displayPath: this.defaultRootFolder + "/" + f.fileName };
      });
    });
  }

  selectItem(item: any) {
    this.form.patchValue({ configFilePath: item.displayPath });
  }

  selectVariable(variable: TPVariable) {
    this.form.patchValue({ assignedTo: variable }); 
  }

  createVariable(): void {
    const option = {
      hasBackdrop: false,
      data: {
        hotVariableOption: [0, 0, 1, 0, 0],
        varType: "LONG"
      }
    };
    this.dialog.open(AddVarComponent, option).afterClosed().subscribe(addedVar => {
      this.selectedVariable = this.longVariables.find(x => x.name === addedVar);
      this.cd.detectChanges();
    });
  }

  submitForm({ value, valid }: FormGroup): void {
    let { configFilePath, assignedTo } = value;

    if (valid) {
      const command = assignedTo ? `${assignedTo.name} = VLoadStationBook("${configFilePath}")` :
        `?VLoadStationBook("${configFilePath}")`;
      this.dialogRef.close(command);
    }
  }

}
