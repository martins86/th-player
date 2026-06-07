import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashScreen } from './splash-screen';

describe('SplashScreen', () => {
  let component: SplashScreen;
  let fixture: ComponentFixture<SplashScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplashScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(SplashScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Deve criar o SplashScreen com sucesso', () => {
    // Assert
    expect(component).toBeTruthy();
  });
});
