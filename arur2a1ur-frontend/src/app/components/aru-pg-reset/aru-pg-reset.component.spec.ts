import {ComponentFixture, TestBed} from '@angular/core/testing';
import {aru-pg-resetComponent} from "./aru-pg-reset.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('AruPgResetComponent', () => {
  let fixture: ComponentFixture<AruPgResetComponent>;
  let component: AruPgResetComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AruPgResetComponent],
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

    fixture = TestBed.createComponent(AruPgResetComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
