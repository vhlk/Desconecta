import Api from "./api";

export async function GetAllActivities(): Promise<any> {
    const res = await Api.get("activity");
    return res.data;
}

export async function GetAllCategories(): Promise<any> {
    const res = await Api.get("categories");
    return res.data;
}