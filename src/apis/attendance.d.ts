import { Attendance, AddAttendanceProps, UpdateAttendanceProps } from "../types/attendance";
export declare const getAttendanceByStudent: (studentId: number) => Promise<Attendance[]>;
export declare const getMyAttendance: () => Promise<Attendance[]>;
export declare const getFilteredMyAttendance: (year: number, semester: number, month?: number) => Promise<Attendance[]>;
export declare const getFilteredStudentAttendance: (studentId: number, year: number, semester: number, month?: number) => Promise<Attendance[]>;
export declare const postAttendance: (studentId: number, data: AddAttendanceProps) => Promise<any>;
export declare const updateAttendance: (attendanceId: number, data: UpdateAttendanceProps) => Promise<any>;
export declare const deleteAttendance: (attendanceId: number) => Promise<void>;
