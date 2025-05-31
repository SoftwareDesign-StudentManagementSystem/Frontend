export declare const postReportRequest: (reportData: {
    studentIdList: number[];
    year: number;
    semester: "FIRST_SEMESTER" | "SECOND_SEMESTER";
    reportFormat: string;
    grade: boolean;
    attendance: boolean;
    counsel: boolean;
    feedback: boolean;
    specialty: boolean;
}) => Promise<any>;
