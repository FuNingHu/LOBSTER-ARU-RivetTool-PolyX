import {ComponentFixture, TestBed} from '@angular/core/testing';
import {aru-pg-riveting-startComponent} from "./aru-pg-riveting-start.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('AruPgRivetingStartComponent', () => {
  let fixture: ComponentFixture<AruPgRivetingStartComponent>;
  let component: AruPgRivetingStartComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AruPgRivetingStartComponent],
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

    fixture = TestBed.createComponent(AruPgRivetingStartComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
