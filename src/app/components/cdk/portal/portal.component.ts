import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {TemplatePortal} from '@angular/cdk/portal';


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit, AfterViewInit {

  templatePortal!:TemplatePortal<any>;

  @ViewChild('templateA') templateA!: TemplateRef<any>
  @ViewChild('templateB') templateB!: TemplateRef<any>

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setTemplateA()
  }

  setTemplateA(): void{
    this.templatePortal = new TemplatePortal(this.templateA,this.viewContainerRef);
  }
  setTemplateB(): void{
    this.templatePortal = new TemplatePortal(this.templateB,this.viewContainerRef);
  }

}
