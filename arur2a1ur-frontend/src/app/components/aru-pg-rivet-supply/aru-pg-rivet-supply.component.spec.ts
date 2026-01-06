import {ComponentFixture, TestBed} from '@angular/core/testing';
import {aru-pg-rivet-supplyComponent} from "./aru-pg-rivet-supply.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('AruPgRivetSupplyComponent', () => {
  let fixture: ComponentFixture<AruPgRivetSupplyComponent>;
  let component: AruPgRivetSupplyComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AruPgRivetSupplyComponent],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader, useValue: {
            getTranslation(): Observable<Record<string, string>> {
              return of({});
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(AruPgRivetSupplyComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
