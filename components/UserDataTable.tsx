'use client'
import { useFetch } from "@/hooks/useFetch"
import Pagination from "./Pagination"
import Table from "./Table"
import { TOTAL_ITEMS_PER_PAGE, URL } from "@/constants"
import { useState } from "react"

const UserDataTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { isLoading, data, error } = useFetch(URL);

    const nextPageHandler = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };
    const prevPageHandler = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };
    const pageHandler = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) return <h1 className="text-center font-bold text-3xl ">Loading...</h1>;
    if (error) return <h1 className="text-red-500 text-center font-bold text-3xl ">{error?.message} </h1>;

    const totalNoOfPages = Math.ceil(data?.length / TOTAL_ITEMS_PER_PAGE)
    return (
        <div className="mx-auto p-8 w-full max-w-7xl">
            <Table data={data} currentPage={currentPage} />
            <div className="flex justify-between mt-4">
                <span>0 of {data?.length} row(s) selected</span>
                <Pagination
                    currentPage={currentPage}
                    totalNoOfPages={totalNoOfPages}
                    nextPageHandler={nextPageHandler}
                    prevPageHandler={prevPageHandler}
                    pageHandler={pageHandler}
                />
            </div>
        </div>
    )
}
export default UserDataTable