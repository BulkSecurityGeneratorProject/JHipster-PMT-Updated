/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { DashBoardTestModule } from '../../../test.module';
import { ProgramComponent } from '../../../../../../main/webapp/app/entities/program/program.component';
import { ProgramService } from '../../../../../../main/webapp/app/entities/program/program.service';
import { Program } from '../../../../../../main/webapp/app/entities/program/program.model';

describe('Component Tests', () => {

    describe('Program Management Component', () => {
        let comp: ProgramComponent;
        let fixture: ComponentFixture<ProgramComponent>;
        let service: ProgramService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DashBoardTestModule],
                declarations: [ProgramComponent],
                providers: [
                    ProgramService
                ]
            })
            .overrideTemplate(ProgramComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProgramComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProgramService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Program('123')],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.programs[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
