import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '@env/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CreateElementComponent } from '../create-element/create-element.component';
import { Element } from '@data/schema/element.interface';
import { ElementService } from '@data/service/element.service';
import { ViewElementComponent } from '../view-element/view-element.component';
import { EditElementComponent } from '../edit-element/edit-element.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit {

  public displayedColumns: Array<string> = [
    'name', 'first_status', 'second_status', 'third_status', 'initial_condition', 'type', 'actions'
  ];
  public dataSource: MatTableDataSource<any>;
  public deviceInfo = null;
  public showSpinner: boolean;
  public api = environment.api;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private service: ElementService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private router: Router,
        private activatedroute: ActivatedRoute,

    private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.getNodes();
  }

  getNodes() {
    this.showSpinner = true;
    this.service.getAll(`${this.api}element`).subscribe(
      response => {
        if (response.length > 0) {
          this.dataSource = new MatTableDataSource(response.reverse());
          this.dataSource.paginator = this.paginator;
          this.showSpinner = false;
        }
      },
      _ => {
        this.showSpinner = false;
      }
    );
  }

  openView(id) {
    this.service.ID = id;
    // console.log(  this.requirementService.IPreqI );

    this.router.navigate(['/element/view'], { relativeTo: this.activatedroute });
  }
public goBack() {
    this.router.navigateByUrl('/element', { relativeTo: this.activatedroute });
  }
  openCreate() {
      this.router.navigateByUrl('element/add');

    // const dialogConfig = new MatDialogConfig();

    // this.deviceInfo = this.deviceService.getDeviceInfo();
    // const isMobile = this.deviceService.isMobile();
    // const isTablet = this.deviceService.isTablet();

    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = (isMobile || isTablet) === true ? '80%' : '50%';
    // dialogConfig.height = (isMobile || isTablet) === true ? '85%' : 'auto';
    // const dialog = this.dialog.open(CreateElementComponent, dialogConfig);
    // dialog.afterClosed().subscribe(result => {
    //   if (typeof result === 'object' && result !== undefined) {
    //     const data = this.dataSource.data !== undefined ? this.dataSource.data : [];
    //     data.splice(0, 0, result);
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //   }
    // });
  }

  openEdit(id):void {
    this.service.ID = id;
    // console.log(  this.requirementService.IPreqI );

    this.router.navigate(['/element/edit'], { relativeTo: this.activatedroute });
  }



   

  

  delete(id: number) {
    this.service.delete(`${this.api}element`, id).subscribe(
      _ => {
        this.toast.success('Elemento eliminado correctamente', 'Éxito');
        const data = this.dataSource.data.filter( (x: Element) => x.id !== id);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.toast.error(error.error.message, 'Error');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
