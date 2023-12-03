"use client"
import { TOTAL_ITEMS_PER_PAGE, URL } from '@/constants';
import Searchbar from './Searchbar'
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useState } from 'react';
export default function Table({ data, currentPage }: any) {

    const [tableData, setTableData] = useState(data)
    const checkHandler = (element: any, checkedValue: boolean) => {
        const temp = data.map((item: any) => item.id === element.id ? { ...item, checked: checkedValue } : item)
        setTableData(temp)


        const selectAllHandler = (checkedValue: boolean) => {
            const temp = data.map((item: any) => {
                return {
                    ...item,
                    checked: checkedValue
                }
            })
            setTableData(temp)
        }
        return (
            <>
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <Searchbar />
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-red-500 p-2 text-center text-sm font-semibold leading-6 text-white "
                            disabled
                        >
                            <AiOutlineDelete size='20' />
                        </button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full table-fixed divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                                                <input
                                                    type="checkbox"
                                                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    onChange={(event: any) => selectAllHandler(event.target.checked)}
                                                />
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                <div className='flex gap-2'>
                                                    <span>Id</span>
                                                    <div >
                                                        {true ? <button><TiArrowSortedUp size='20' /></button> :
                                                            <button>
                                                                <TiArrowSortedDown size='20' />
                                                            </button>}
                                                    </div>

                                                </div>
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Email
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Role
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {tableData
                                            ?.slice(
                                                (currentPage - 1) * TOTAL_ITEMS_PER_PAGE,
                                                currentPage * TOTAL_ITEMS_PER_PAGE
                                            ).map((item: any) => (
                                                <tr key={item.email} >
                                                    <td className="relative px-7 sm:w-12 sm:px-6">
                                                        <input
                                                            type="checkbox"
                                                            checked={item?.checked}
                                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            onChange={(event: any) => checkHandler(item, event.target.checked)}
                                                        />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {item.id}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {item.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.email}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.role}</td>
                                                    <td className="whitespace-nowrap py-4 pl-3 pr-4  text-sm font-medium sm:pr-3">
                                                        <div className='flex gap-4'>
                                                            <button className="text-gray-800 hover:text-gray-900 border border-gray-300 rounded p-2 ">
                                                                <FaRegEdit size='20' />
                                                            </button>
                                                            <button className="text-red-500 hover:text-red-600 border border-gray-300 rounded p-2 ">
                                                                <AiOutlineDelete size='20' />

                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </ >
        )
    }
}