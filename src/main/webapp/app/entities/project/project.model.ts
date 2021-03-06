import { BaseEntity } from './../../shared';

export class Project implements BaseEntity {
    constructor(
        public id?: string,
        public code?: string,
        public name?: string,
        public description?: string,
        public startDate?: any,
        public endDate?: any,
        public url?: string,
    ) {
    }
}
