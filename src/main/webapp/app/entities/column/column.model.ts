import { BaseEntity } from './../../shared';

export class Column implements BaseEntity {
    constructor(
        public id?: string,
        public code?: string,
        public name?: string,
        public min?: number,
        public max?: number,
    ) {
    }
}
