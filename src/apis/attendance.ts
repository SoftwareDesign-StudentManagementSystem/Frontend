import tokenInstance from "../apis/tokenInstance";
import {
  Attendance,
  AddAttendanceProps,
  UpdateAttendanceProps,
} from "../types/attendance";
import { ApiResponse } from "../types/common";

// 1. 학생의 모든 출결 조회 (학부모/선생님 권한)

export const getAttendanceByStudent = async (
  studentId: number,
): Promise<Attendance[]> => {
  const response = await tokenInstance.get(
    `/rest-api/v1/attendance/${studentId}`,
  );
  console.log(response.data);
  return response.data.ieduPage.contents;
};

// 2. 본인의 모든 출결 조회 (학생 권한)
export const getMyAttendance = async (): Promise<Attendance[]> => {
  const response = await tokenInstance.get<ApiResponse<Attendance[]>>(
    `/rest-api/v1/attendance`,
  );
  return response.data.ieduPage.contents;
};

// 3. (학년/학기/월)로 본인 출결 조회 (학생 권한)
export const getFilteredMyAttendance = async (
  year: number,
  semester: number,
  month?: number,
): Promise<Attendance[]> => {
  const response = await tokenInstance.get<ApiResponse<Attendance[]>>(
    `/rest-api/v1/attendance/filter`,
    {
      params: {
        year,
        semester: semester,
        month,
        // page: 1,
        // size: 9999,
      },
    },
  );
  return response.data.ieduPage.contents;
};

// 4. (학년/학기/월)로 특정 학생 출결 조회 (학부모/선생님 권한)
export const getFilteredStudentAttendance = async (
  studentId: number,
  year: number,
  semester: number,
  month?: number,
): Promise<Attendance[]> => {
  console.log(studentId, year, semester, month);

  const response = await tokenInstance.get<ApiResponse<Attendance[]>>(
    `/rest-api/v1/attendance/filter/${studentId}`,
    {
      params: {
        year,
        semester: semester,
        ...(month ? { month } : {}),
        // page: 1,
        // size: 9999,
      },
    },
  );

  console.log(response.data);

  return response.data.ieduPage.contents;
};

// 5. 출결 생성 (선생님 권한)
export const postAttendance = async (
  studentId: number,
  data: AddAttendanceProps,
): Promise<any> => {
  const response = await tokenInstance.post(
    `/rest-api/v1/attendance/${studentId}`,
    data,
  );
  return response.data;
};

// 6. 출결 수정 (선생님 권한)
export const updateAttendance = async (
  attendanceId: number,
  data: UpdateAttendanceProps,
): Promise<any> => {
  console.log(data);
  const response = await tokenInstance.put(
    `/rest-api/v1/attendance/${attendanceId}`,
    data,
  );
  return response.data;
};

// 7. 출결 삭제 (선생님 권한)
export const deleteAttendance = async (attendanceId: number): Promise<void> => {
  await tokenInstance.delete(`/rest-api/v1/attendance/${attendanceId}`);
};
