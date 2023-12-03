import { classNames } from "@/utils";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md"

interface PaginationProps {
    currentPage: number,
    totalNoOfPages: number,
    prevPageHandler: () => void,
    nextPageHandler: () => void,
    pageHandler: (page: number) => void
}

export default function Pagination({
    currentPage,
    totalNoOfPages,
    prevPageHandler,
    nextPageHandler,
    pageHandler
}: PaginationProps) {
    const pages = Array.from({ length: totalNoOfPages }).fill(null);
    return (
        <div className="flex items-center  gap-10">
            <span>
                Page {currentPage} of {totalNoOfPages}
            </span>
            <div className="flex items-center gap-2">
                <button className={classNames('flex justify-center items-center w-8 h-8   rounded-md  border border-gray-300', currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : "text-gray-900")} onClick={() => pageHandler(1)}
                    disabled={totalNoOfPages === 1}>
                    <MdOutlineKeyboardDoubleArrowLeft size='20' />
                </button>
                <button className={classNames('flex justify-center items-center w-8 h-8   rounded-md  border border-gray-300', currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : "text-gray-900")} onClick={prevPageHandler}
                    disabled={totalNoOfPages === 1}>
                    <MdOutlineKeyboardArrowLeft size='20' />
                </button>
                {pages?.map((_, index) => {
                    index += 1;
                    return (
                        <button
                            key={index}
                            className={classNames(
                                'flex justify-center items-center w-8 h-8  rounded-md  border border-gray-300',
                                currentPage === index ? 'text-white bg-indigo-600' : 'bg-white'
                            )}
                            onClick={() => pageHandler(index)}
                        >
                            {index}
                        </button>
                    );
                })}
                <button className={classNames('flex justify-center items-center w-8 h-8  rounded-md  border border-gray-300', currentPage === 5 && 'text-gray-300 cursor-not-allowed')} onClick={nextPageHandler} disabled={currentPage === 5}>
                    <MdOutlineKeyboardArrowRight size='20' />
                </button>
                <button className={classNames('flex justify-center items-center w-8 h-8   rounded-md  border border-gray-300', currentPage === 5 ? 'text-gray-300 cursor-not-allowed' : "text-gray-900")} onClick={() => pageHandler(totalNoOfPages)}
                    disabled={currentPage === 5}>
                    <MdOutlineKeyboardDoubleArrowRight size='20' />
                </button>
            </div>
        </div>
    );
}
