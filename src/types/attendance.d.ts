export type SemesterType = "FIRST_SEMESTER" | "SECOND_SEMESTER";
export type PeriodType = "PERIOD_1" | "PERIOD_2" | "PERIOD_3" | "PERIOD_4" | "PERIOD_5" | "PERIOD_6" | "PERIOD_7" | "PERIOD_8";
export type AttendanceState = "출석" | "결석" | "지각" | "조퇴";
export interface PeriodAttendanceDto {
    period: PeriodType;
    state: AttendanceState;
}
export interface Attendance {
    id: number;
    studentId: number;
    year: number;
    semester: SemesterType;
    date: string;
    periodAttendanceDtos: PeriodAttendanceDto[];
}
export interface AddAttendanceProps {
    year: number;
    semester: SemesterType;
    date: string;
    periodAttendanceDtos: PeriodAttendanceDto[];
}
export interface UpdateAttendanceProps {
    year: number;
    semester: SemesterType;
    date: string;
    periodAttendances: PeriodAttendanceDto[];
}
