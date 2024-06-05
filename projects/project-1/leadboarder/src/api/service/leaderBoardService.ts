import axiosLB from "../base";

export interface ILeadBoarder {
  id: string;
  name: string;
  late_minute: number;
  late_count: number;
}
export const leaderBoardService = {
  getList: async (): Promise<ILeadBoarder[]> => {
    const res = await axiosLB.get("lead-boarder");
    return res.data;
  },
};
