import {ComponentFixture, TestBed} from '@angular/core/testing';
import {aru-pg-finishComponent} from "./aru-pg-finish.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('AruPgFinishComponent', () => {
  let fixture: ComponentFixture<AruPgFinishComponent>;
  let component: AruPgFinishComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AruPgFinishComponent],
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

    fixture = TestBed.createComponent(AruPgFinishComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
