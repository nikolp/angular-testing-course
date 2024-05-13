import { ComponentFixture, TestBed, fakeAsync, flush, flushMicrotasks, tick, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { DemoDropdownsComponent } from './demo-dropdowns.component';
import { CoursesModule } from '../courses/courses.module';
import { By } from '@angular/platform-browser';
import { DropdownService } from '../courses/services/dropdown.service';
import { of, timer } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { delay, map } from 'rxjs/operators';


describe('DemoDropdownsComponent', () => {

    let component: DemoDropdownsComponent;
    let fixture: ComponentFixture<DemoDropdownsComponent>;
    let el: DebugElement;
    let dropdownService: any;


    beforeEach(waitForAsync(() => {
        const dropdownServiceSpy = jasmine.createSpyObj('DropdownService', ['getOptions1', 'getOptions2'])

        TestBed.configureTestingModule({
            imports: [
                CoursesModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: DropdownService, useValue: dropdownServiceSpy}
            ]
        })
        .compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(DemoDropdownsComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            dropdownService = TestBed.inject(DropdownService);
        });
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should populate dropdown 1 - synhronous', () => {
        dropdownService.getOptions1.and.returnValue(of([
            {value: 'a', label: 'a'},
            {value: 'b', label: 'b'},
            {value: 'c', label: 'c'}
            ]));
        dropdownService.getOptions2.and.returnValue(of([
            {value: '1', label: '1'}
        ]));
        fixture.detectChanges();

        const dropDowns = el.queryAll(By.css("mat-select"));
        expect(dropDowns.length).toBe(2);
        const dropDown1 = dropDowns[0];

        // To show the items you have to actually click on the dropdown
        dropDown1.nativeElement.click();
        fixture.detectChanges();

        const options1 = dropDown1.queryAll(By.css("mat-option"));
        expect(options1.length).toBe(3);
        expect(options1[0].nativeElement.textContent).toBe(" a ");
        expect(options1[1].nativeElement.textContent).toBe(" b ");
        expect(options1[2].nativeElement.textContent).toBe(" c ");
        
        // similar to above but more digging into implementation details
        // const optionValues1 = dropDown1.queryAll(By.css(".mdc-list-item__primary-text"));
        // expect(optionValues1.length).toBe(3);
        // expect(optionValues1[0].nativeElement.textContent).toBe(" a ");
        // expect(optionValues1[1].nativeElement.textContent).toBe(" b ");
        // expect(optionValues1[2].nativeElement.textContent).toBe(" c ");
    });

    it('should populate dropdown 1 after a delay waitForAsync', waitForAsync(() => {
        dropdownService.getOptions1.and.returnValue(
            of([
            {value: 'a', label: 'a'},
            {value: 'b', label: 'b'},
            {value: 'c', label: 'c'}
            ]).pipe(delay(1000)));
        dropdownService.getOptions2.and.returnValue(of([
            {value: '1', label: '1'}
        ]));
        fixture.detectChanges();  // handle box2 whose data arrived immediately

        const dropDowns = el.queryAll(By.css("mat-select"));
        expect(dropDowns.length).toBe(2);
        const dropDown1 = dropDowns[0];

        fixture.whenStable().then(
            () => {
                // handle box1 whose data just arrived
                fixture.detectChanges();
                dropDown1.nativeElement.click();
                fixture.detectChanges();
                const options1 = dropDown1.queryAll(By.css("mat-option"));
                expect(options1.length).toBe(3);
                expect(options1[0].nativeElement.textContent).toBe(" a ");
            }
        )

    }));

    it('should populate dropdown 1 after a delay fakeAsync', fakeAsync(() => {
        const delayMs: number = 500;
        const data1 = [
            {value: "a", label: "a"}, 
            {value: "b", label: "b"},
            {value: "c", label: "c"}];
        dropdownService.getOptions1.and.returnValue(
            // timer returns the value 0 after the given delay
            // then we take that value and ignore it, 
            // we re-map it to return the data we really want for our Observable
            timer(delayMs).pipe(map(() => data1)));

        dropdownService.getOptions2.and.returnValue(of([
            {value: '1', label: '1'}
        ]));
        fixture.detectChanges();  // handle box2 whose data arrived immediately

        const dropDowns = el.queryAll(By.css("mat-select"));
        expect(dropDowns.length).toBe(2);
        const dropDown1 = dropDowns[0];

        // simulate passage of time enough for data1 to arrive
        tick(delayMs);
        fixture.detectChanges();
        dropDown1.nativeElement.click();
        fixture.detectChanges();
        const options1 = dropDown1.queryAll(By.css("mat-option"));
        expect(options1.length).toBe(3);
        expect(options1[0].nativeElement.textContent).toBe(" a ");
    }));

});