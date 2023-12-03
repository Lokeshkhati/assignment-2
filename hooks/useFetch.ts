import { useEffect, useState } from "react";

export interface TableItem {
    id: number,
    name: string,
    email: string,
    role: string

}
export interface TableData {
    data: TableItem[]
}
export const useFetch = (url: string) => {
    const [data, setData] = useState<TableData | []>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const getData = async () => {
        try {
            const response = await fetch(url);
            const data: TableData = await response.json();
            setData(data);
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            setError(error);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return { isLoading, data, error };
};
