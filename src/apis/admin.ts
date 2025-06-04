import tokenInstance from "./tokenInstance";
import { ApiResponse } from "../types/common";
import { UserInfo } from "../types/members";

export const getAdminMembersByRole = async ({
  role,
}: {
  role: string;
}): Promise<UserInfo[]> => {
  console.log(role);
  const response = await tokenInstance.get<ApiResponse<UserInfo[]>>(
    `/rest-api/v1/admin`,
    {
      params: {
        role,
      },
    },
  );

  return response.data.ieduPage.contents;
};
