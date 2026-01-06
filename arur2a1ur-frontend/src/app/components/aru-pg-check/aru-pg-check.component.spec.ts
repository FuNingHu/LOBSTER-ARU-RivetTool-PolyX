import {ComponentFixture, TestBed} from '@angular/core/testing';
import {aru-pg-checkComponent} from "./aru-pg-check.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('AruPgCheckComponent', () => {
  let fixture: ComponentFixture<AruPgCheckComponent>;
  let component: AruPgCheckComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AruPgCheckComponent],
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

    fixture = TestBed.createComponent(AruPgCheckComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
