import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ColumnCustom } from './column-custom.model';
import { ColumnCustomPopupService } from './column-custom-popup.service';
import { ColumnCustomService } from './column-custom.service';
import { ColumnCustomComponent } from './column-custom.component';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { BoardCustom } from '../board-custom';
import { BoardCustomService } from '../board-custom/board-custom.service';
import {IssueCustom} from '../issue-custom';

@Component({
    selector: 'jhi-column-custom-dialog',
    templateUrl: './column-custom-dialog.component.html',
    providers: [ColumnCustomComponent ],
})
export class ColumnCustomDialogComponent implements OnInit {

    columncustom: ColumnCustom;
    isSaving: boolean;
    startDateDp: any;
    endDateDp: any;

    boards: BoardCustom[];
    scrumboards: BoardCustom[];
    board_issues: IssueCustom[];
    columnCustoms: ColumnCustom[];

    // Get the board related to this column
    parentBoard: BoardCustom;
    // Get the boardname chosen from list (combobox)
    boardname: string;
    // boardcode: string;

    numColumnsParentBoard: number;

    now = new Date();

    constructor(
        public activeModal: NgbActiveModal,
        private columncustomService: ColumnCustomService,
        private eventManager: JhiEventManager,
        private boardSce: BoardCustomService,
        // private comp: ColumnCustomComponent
    ) {
        this.scrumboards = new Array<BoardCustom>();
    }

    ngOnInit() {
        this.isSaving = false;
        this.loadAttributes();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    findBoard() {
        let index = 0;
        let found = false;

        while (index < this.boards.length && found === false)  {
            if ((this.boards[index]).name === this.boardname) {
                found = true;
                this.parentBoard = this.boards[index]
                console.log('parentboard' + this.boards[index].type)
                // this.boardcode = this.boards[index].code;
                this.columncustom.board = this.boards[index];
            } else {
                index = index + 1;
            }
        }
        console.log('aff' + this.columncustom.board.name);

        this.numColumnsParentBoard = 0;
        // tslint:disable-next-line:prefer-const
        for (let column of this.columnCustoms) {
            if ((column.board !== null) && (column.board.code === this.parentBoard.code)) {
                this.numColumnsParentBoard++;
            }
        }
        console.log('Num' + this.numColumnsParentBoard + this.parentBoard.code);
    }

    /**
     * This function retrieves all existing Epics, Types and Priorities
     *
     * @private
     * @memberof ColumnCustomDialogComponent
     */
    private loadAttributes() {
        this.boardSce.getBoardCustoms()
        .then((boards) => this.boards = boards );
        this.columncustomService.getColumnCustoms()
        .then((columnCustoms) => this.columnCustoms = columnCustoms );
    }

    /**
     * Use ElasticSearch to find element by request
     *
     * @param {string} req
     * @memberof ColumnCustomDialogComponent
     */
    findByname(name: string) {
        this.columncustomService.findByRequest(name);
        // console.log(this.comp.columncustoms);
    }

    save() {
        this.isSaving = true;
        if (this.columncustom.id !== undefined) {
            this.subscribeToSaveResponse(
                this.columncustomService.update(this.columncustom));
        } else {
            // Activate last created Column by default
            // this.columncustom.isActive = true;
            this.subscribeToSaveResponse(
                this.columncustomService.create(this.columncustom));
        }
    }

    private subscribeToSaveResponse(result: Observable<ColumnCustom>) {
        result.subscribe((res: ColumnCustom) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ColumnCustom) {
        this.eventManager.broadcast({ name: 'columncustomsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

}

@Component({
    selector: 'jhi-column-custom-popup',
    template: ''
})
export class ColumnCustomPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private columncustomPopupService: ColumnCustomPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.columncustomPopupService
                    .open(ColumnCustomDialogComponent as Component, params['id']);
            } else {
                this.columncustomPopupService
                    .open(ColumnCustomDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
