import styled from "styled-components";

const AttendanceList = () => {
  const attendanceData = [
    {
      date: "3/25",
      periods: ["O", "O", "△", "O", "O", "O", "O", "O"],
    },
    {
      date: "3/26",
      periods: ["O", "O", "O", "O", "O", "O", "O", "O"],
    },
    {
      date: "3/27",
      periods: ["O", "△", "△", "O", "O", "O", "O", "X"],
    },
    {
      date: "3/28",
      periods: ["O", "O", "O", "O", "X", "X", "O", "O"],
    },
    {
      date: "3/29",
      periods: ["O", "O", "O", "O", "O", "O", "O", "O"],
    },
  ];

  return (
    <AttendanceTableWrapper>
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            {[...Array(8)].map((_, i) => (
              <th key={i}>{i + 1}교시</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attendanceData.slice(0, 3).map((day, index) => (
            <tr key={index}>
              <td
                onClick={() => {
                  alert(day.date + "눌림");
                }}
              >
                {day.date}
              </td>
              {day.periods.map((status, i) => (
                <td key={i}>{status}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </AttendanceTableWrapper>
  );
};

export default AttendanceList;

const AttendanceTableWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #f1f2f8;
    padding: 10px;
    text-align: center;
    font-size: 14px;
  }

  th {
    font-weight: bold;
    background-color: #f7f9fc;
  }
`;
