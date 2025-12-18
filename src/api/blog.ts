import request from "@/http";
import type { Category } from "@/types/blog.d";

export const getCategoryList = (params: { page: number; pageSize: number; keyword?: string }) => {
    return request<{
        list: Category[];
        total: number;

    }>({
        url: "/category",
        method: "get",
        params,
    });
};