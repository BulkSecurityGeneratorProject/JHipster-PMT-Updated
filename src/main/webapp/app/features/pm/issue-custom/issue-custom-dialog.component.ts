import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IssueCustom } from './issue-custom.model';
import { IssueCustomPopupService } from './issue-custom-popup.service';
import { IssueCustomService } from './issue-custom.service';
import { EpicService, Epic } from '../../../entities/epic';
import { IssuePriorityService, IssuePriority } from '../../../entities/issue-priority';
import { IssueTypeService, IssueType } from '../../../entities/issue-type';
import { IssueCustomComponent } from './issue-custom.component';
import 'rxjs/add/observable/throw';

@Component({
    selector: 'jhi-issue-custom-dialog',
    templateUrl: './issue-custom-dialog.component.html',
    providers: [IssueCustomComponent ],
})
export class IssueCustomDialogComponent implements OnInit {

    issuecustom: IssueCustom;
    isSaving: boolean;
    createdDateDp: any;
    dueDateDp: any;
    types: IssueType[];
    priorities: IssuePriority[];
    epics: Epic[];
    typename: string;
    priorityname: string;
    epicname: string;

    constructor(
        public activeModal: NgbActiveModal,
        private issuecustomService: IssueCustomService,
        private eventManager: JhiEventManager,
        private typeSce: IssueTypeService,
        private prioritySce: IssuePriorityService,
        private epicSce: EpicService,
        // private comp: IssueCustomComponent
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.loadAttributes();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    findEpic() {
        // this.issuecustom.epic = this.epicSce.findByRequest('name=' + this.epicname);
        // console.log(this.issuecustom.epic.name);

        let index = 0;
        let found = false;
        while (index < this.epics.length && found === false)  {
            if ((this.epics[index]).name === this.epicname) {
                found = true;
                this.issuecustom.epic = this.epics[index];
            } else {
                index = index + 1;
            }
        }
        console.log('aff' + this.issuecustom.epic.name);
    }

    findType() {
        // this.issuecustom.type = this.typeSce.findByRequest('name=' + this.typename);
        // console.log(this.typename);
        // console.log(this.issuecustom.type + 'type');

        let index = 0;
        let found = false;
        while (index < this.types.length && found === false)  {
            if ((this.types[index]).name === this.typename) {
                found = true;
                this.issuecustom.type = this.types[index];
            } else {
                index = index + 1;
            }
        }
        console.log('aff' + this.issuecustom.type.name);
    }

    findPriority() {
        // this.issuecustom.priority = this.prioritySce.findByRequest('name=' + this.priorityname);
        // console.log(this.issuecustom.priority.name + 'prio');

        let index = 0;
        let found = false;
        while (index < this.priorities.length && found === false)  {
            if ((this.priorities[index]).name === this.priorityname) {
                found = true;
                this.issuecustom.priority = this.priorities[index];
            } else {
                index = index + 1;
            }
        }
        console.log('aff' + this.issuecustom.priority.name);
    }

    save() {
        this.isSaving = true;
        if (this.issuecustom.id !== undefined) {
            this.subscribeToSaveResponse(
                this.issuecustomService.update(this.issuecustom));
        } else {
            this.subscribeToSaveResponse(
                this.issuecustomService.create(this.issuecustom));
        }
    }

    private subscribeToSaveResponse(result: Observable<IssueCustom>) {
        result.subscribe((res: IssueCustom) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: IssueCustom) {
        this.eventManager.broadcast({ name: 'issuecustomListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    /**
     * This function retrieves all existing Epics, Types and Priorities
     *
     * @private
     * @memberof IssueCustomDialogComponent
     */
    private loadAttributes() {
        this.epicSce.getEpics()
        .then((epics) => this.epics = epics );
        this.typeSce.getTypes()
        .then((types) => this.types = types );
        this.prioritySce.getPriorities()
        .then((priorities) => this.priorities = priorities );
    }

    /**
     * Use ElasticSearch to find element by request
     *
     * @param {string} req
     * @memberof IssueCustomDialogComponent
     */
    findByname(name: string) {
        this.issuecustomService.findByRequest(name);
        // console.log(this.comp.issuecustoms);
    }

}

@Component({
    selector: 'jhi-issue-custom-popup',
    template: ''
})
export class IssueCustomPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private issuecustomPopupService: IssueCustomPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.issuecustomPopupService
                    .open(IssueCustomDialogComponent as Component, params['id']);
            } else {
                this.issuecustomPopupService
                    .open(IssueCustomDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
