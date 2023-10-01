export interface Document {
    _id: string;
    url: string;
    category: string;
    startPeriod: Date;
    endPeriod: Date;
    headerIndex: number;
    data: Object[];
    subtitle: Object;
    importedRows: number;
}
