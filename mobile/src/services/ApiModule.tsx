import Api from "./api";

export async function GetAllActivities(): Promise<any> {
    const res = await Api.get("Activity");
    return res.data;
}