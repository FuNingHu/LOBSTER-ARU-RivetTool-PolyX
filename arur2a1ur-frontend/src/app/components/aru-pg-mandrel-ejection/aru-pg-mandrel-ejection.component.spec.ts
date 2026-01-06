import {ComponentFixture, TestBed} from '@angular/core/testing';
import {aru-pg-mandrel-ejectionComponent} from "./aru-pg-mandrel-ejection.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('AruPgMandrelEjectionComponent', () => {
  let fixture: ComponentFixture<AruPgMandrelEjectionComponent>;
  let component: AruPgMandrelEjectionComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AruPgMandrelEjectionComponent],
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

    fixture = TestBed.createComponent(AruPgMandrelEjectionComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
