"use client"

import { TOTAL_ITEMS_PER_PAGE } from '@/constants';
import { difference } from "@/utils";
import { useLayoutEffect, useRef, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
export default function Table({ data, currentPage }: any) {

    const [tableData, setTableData] = useState(data)
    const checkbox = useRef<HTMLInputElement>(null)
    const [checked, setChecked] = useState(false)
    const [indeterminate, setIndeterminate] = useState(false)
    const [selectedRows, setSelectedRows] = useState<any | []>([])
    const [sortType, setSortType] = useState('asc')
    const [query, setQuery] = useState('')
    const [editItem, setEditItem] = useState<any | null>(null);



    useLayoutEffect(() => {
        const isIndeterminate = selectedRows.length > 0 && selectedRows.length < tableData.length
        setChecked(selectedRows.length === tableData.length)
        setIndeterminate(isIndeterminate)
        if (checkbox.current) {
            checkbox.current.indeterminate = isIndeterminate
        }
    }, [selectedRows])

    function toggleAll() {
        const rows = tableData.slice((currentPage - 1) * TOTAL_ITEMS_PER_PAGE, TOTAL_ITEMS_PER_PAGE * currentPage)

        setSelectedRows(checked || indeterminate ? [] : rows)
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    const checkHandler = (e: any, item: any) => {
        const isChecked = e.target.checked
        const rows = isChecked ? [...selectedRows, item]
            : selectedRows.filter((row) => row !== item)

        setSelectedRows(rows)

    }

    const deleteTableRow = (id: number) => {
        const updatedTableData = tableData.filter((item) => item.id !== id)
        setTableData(updatedTableData)
    }
    const handleSave = (id: number) => {
        const updatedTableData = tableData.map((item: any) =>
            item.id === id ? editItem : item
        );

        setTableData(updatedTableData);
        setEditItem(null);
    };


    const deleteMultipleRows = () => {
        const updatedTableData = difference(tableData, selectedRows)
        setTableData(updatedTableData)
        toggleAll()
    }
    const getSortedTableData = (data, sortType) => {
        if (sortType === 'asc') {
            return [...data].sort((a, b) => a.id - b.id)
        }
        if (sortType === 'desc') {
            return [...data].sort((a, b) => b.id - a.id)
        }
        return data
    }

    const getFilteredData = (data, query) => {
        return query === "" ? data : data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    }

    const sortedData = getSortedTableData(tableData, sortType)
    const foundData = getFilteredData(sortedData, query)

    return (
        <>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <div className="w-full max-w-lg lg:max-w-xs">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <IoIosSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="search"
                                name="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Search"
                                type="search"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-red-500 p-2 text-center text-sm font-semibold leading-6 text-white "
                        onClick={deleteMultipleRows}
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
                                                name='all-select'
                                                type="checkbox"
                                                ref={checkbox}
                                                checked={checked}
                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                onChange={toggleAll}
                                            />
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            <div className='flex gap-2'>
                                                <span>Id</span>
                                                <div >
                                                    {sortType === 'asc' ? <button onClick={() => setSortType('desc')}><TiArrowSortedUp size='20' /></button> :
                                                        <button onClick={() => setSortType('asc')}>
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
                                    {foundData
                                        ?.slice(
                                            (currentPage - 1) * TOTAL_ITEMS_PER_PAGE,
                                            currentPage * TOTAL_ITEMS_PER_PAGE
                                        ).map((item: any) => (
                                            <tr key={item.email} className={`${selectedRows.includes(item) ? 'bg-gray-200' : null}`} >
                                                <td className="relative px-7 sm:w-12 sm:px-6">
                                                    <input
                                                        type="checkbox"
                                                        value={item.id}
                                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        checked={selectedRows.includes(item)}
                                                        onChange={(e) => checkHandler(e, item)}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {item.id}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {item.id === editItem?.id ? (
                                                        <input
                                                            className="rounded border 
                                                            px-2 py-1 text-md text-gray-900
                                                            border-gray-300"
                                                            value={editItem?.name}
                                                            onChange={(event) =>
                                                                setEditItem({
                                                                    ...editItem,
                                                                    name: event.target.value,
                                                                })
                                                            }
                                                        />
                                                    ) : (
                                                        item.name
                                                    )}

                                                </td>

                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {item.id === editItem?.id ? (
                                                        <input
                                                            className="rounded border 
                                                            px-2 py-1 text-md text-gray-900 border-gray-300"
                                                            value={editItem?.email}
                                                            onChange={(event) =>
                                                                setEditItem({
                                                                    ...editItem,
                                                                    email: event.target.value,
                                                                })
                                                            }
                                                        />
                                                    ) : (
                                                        item.email
                                                    )}

                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {item.id === editItem?.id ? (
                                                    <input
                                                        className="rounded border 
                                                        px-2 py-1 text-md text-gray-900 border-gray-300"
                                                        value={editItem?.role}
                                                        onChange={(event) =>
                                                            setEditItem({
                                                                ...editItem,
                                                                role: event.target.value,
                                                            })
                                                        }
                                                    />
                                                ) : (
                                                    item.role
                                                )}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-3 pr-4  text-sm font-medium sm:pr-3">
                                                    {item.id === editItem?.id ? <button
                                                        className="text-gray-800 hover:text-gray-900 border border-gray-300 rounded p-2 "
                                                        onClick={() => handleSave(item.id)}
                                                    >
                                                        <FaCheck size='20' className="text-green-500" />
                                                    </button>
                                                        : <div className='flex gap-4'>
                                                            <button className="text-gray-800 hover:text-gray-900 border border-gray-300 rounded p-2 "
                                                                onClick={() => setEditItem(item)}

                                                            >
                                                                <FaRegEdit size='20' />
                                                            </button>
                                                            <button className="text-red-500 hover:text-red-600 border border-gray-300 rounded p-2  " onClick={() => deleteTableRow(item.id)}>
                                                                <AiOutlineDelete size='20' />

                                                            </button>
                                                        </div>}
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