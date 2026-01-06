import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AruAppComponent} from "./AruApp.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('AruAppComponent', () => {
  let fixture: ComponentFixture<AruAppComponent>;
  let component: AruAppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AruAppComponent],
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

    fixture = TestBed.createComponent(AruAppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
