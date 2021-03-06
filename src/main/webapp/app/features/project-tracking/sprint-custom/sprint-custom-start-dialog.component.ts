import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {SprintCustom} from './sprint-custom.model';
import {SprintCustomPopupService} from './sprint-custom-popup.service';
import {SprintCustomService} from './sprint-custom.service';
import {Observable} from 'rxjs/Observable';
import {BoardCustom} from '../board-custom/board-custom.model';

@Component({
    selector: 'jhi-sprint-custom-start-dialog',
    templateUrl: './sprint-custom-start-dialog.component.html'
})
export class SprintCustomStartDialogComponent implements OnInit {

    sprintcustom: SprintCustom;
    sprintcustoms: SprintCustom[];
    isSaving: boolean;

    constructor(
        private sprintcustomService: SprintCustomService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private sprintcustomSce: SprintCustomService,
        private router: Router,
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    ngOnInit() {
        this.isSaving = false;
        this.sprintcustomService.getSprintCustoms()
            .then((sprints) => this.sprintcustoms = sprints );
        this.verifyDates(this.sprintcustom);
    }

    private subscribeToSaveResponse(result: Observable<BoardCustom>) {
        result.subscribe((res: BoardCustom) =>
            this.onSaveSuccess(res));
    }

    private onSaveSuccess(result: BoardCustom) {
        this.eventManager.broadcast({ name: 'sprintcustomsListModification', content: 'OK'});
    }

    verifyDates(sprint) {
        this.sprintcustomService.find(sprint.id).subscribe((sprintcustom) => {
            if (sprint.startDate) {
                sprint.startDate = {
                    year: sprintcustom.startDate.getFullYear(),
                    month: sprintcustom.startDate.getMonth() + 1,
                    day: sprintcustom.startDate.getDate()
                };
            }
            if (sprint.endDate) {
                sprint.endDate = {
                    year: sprintcustom.endDate.getFullYear(),
                    month: sprintcustom.endDate.getMonth() + 1,
                    day: sprintcustom.endDate.getDate()
                };
            }
        });
    }
    confirmStart(sprint: SprintCustom) {
        console.log(sprint.isActive);

        this.verifyDates(sprint);

        setTimeout(() => {

            sprint.isActive = true;

            for (let sp of this.sprintcustoms) {
                if (sp.board.name === sprint.board.name) {
                    if (sp.id !== sprint.id) {
                        sp.isActive = false;
                        console.log('name : ' + sp.name)
                        // Make the other sprints not active
                        this.verifyDates(sp);
                        console.log('I am here ' + sp.code)

                        setTimeout(() => {
                            if (sp.id !== undefined) {
                                this.subscribeToSaveResponse(
                                    this.sprintcustomSce.update(sp));
                            }
                        }, 1000);
                    }
                }
            }

            // Make the chosen sprint active
            this.sprintcustomService.update(sprint).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'sprintcustomsListModification',
                    content: 'Started an sprint'
                });
                //
                // location.reload();
                this.router.navigate(['/boardcustoms/agile', this.sprintcustom.board.id]);

                this.activeModal.dismiss(true);
            });
            console.log(sprint.isActive);
            this.eventManager.broadcast({ name: 'boardcustomsListModification', content: 'OK'});
            this.eventManager.broadcast({ name: 'boardcustomsAgileModification', content: 'OK'});

            this.activeModal.dismiss('started');

        }, 1000);
    }
}

@Component({
    selector: 'jhi-sprint-custom-start-popup',
    template: ''
})
export class SprintCustomStartPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sprintcustomService: SprintCustomService,
        private sprintcustomPopupService: SprintCustomPopupService
    ) {}

    ngOnInit() {
        /*
        this.routeSub = this.route.params.subscribe((params) => {
            this.sprintcustomPopupService
                .open(SprintCustomStartDialogComponent as Component, params['id']);
        });
*/
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sprintcustomPopupService
                    .open(SprintCustomStartDialogComponent as Component, params['id']);
            } else {
                this.sprintcustomPopupService
                    .open(SprintCustomStartDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
