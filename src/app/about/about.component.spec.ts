import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import { AboutComponent } from './about.component';
import { CoursesModule } from '../courses/courses.module';
import { By } from '@angular/platform-browser';


describe('AboutComponent', () => {

    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;
    let el: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CoursesModule]
        })
        .compileComponents()
        .then(() => {

            fixture = TestBed.createComponent(AboutComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;

        });
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should include demo dropdowns', () => {
        expect(component).toBeTruthy();
        const demoDropdowns = el.query(By.css(".demo-dropdowns"));
        expect(demoDropdowns).toBeTruthy();
        const greeting = demoDropdowns.query(By.css("h1"));
        expect(greeting.nativeElement.textContent).toBe("Hello!");
    });

});