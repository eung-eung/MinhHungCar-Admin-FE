'use client'
import { ICarModel } from '@/app/models/CarModel.model'
import { formatCurrency } from '@/app/utils/formatCurrency'
import { Table, TableProps } from 'antd'
import React, { useState } from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Dialog from '@/app/components/Modal'
import EditBrandDialog from './EditBrandDialog'
export default function BrandsTable(
    {
        data,
        total,
        isLoading,
        setCurrentPage,
        setPageLimit,
        setRefresh
    }: {
        data?: ICarModel[],
        isLoading: boolean,
        total: any,
        setCurrentPage: React.Dispatch<React.SetStateAction<any>>,
        setPageLimit: React.Dispatch<React.SetStateAction<any>>,
        setRefresh: React.Dispatch<React.SetStateAction<any>>,
    }
) {
    const [initValue, setInitValue] = useState<any>()
    const onTableChange: TableProps['onChange'] = (pagination, _filters, sorter) => {
        setCurrentPage(pagination.current)
        setPageLimit(pagination.pageSize)
    };
    const handleOpenEditDialog = (id: any, currentPrice: any, brand: any, model: any, year: any) => {
        setOpenEditDialog(true)
        setInitValue({
            id, currentPrice, brand, model, year
        })
    }
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)
    const columns: TableProps<ICarModel>['columns'] = [
        {
            title: "Hãng",
            dataIndex: "brand",
            key: "id"
        },
        {
            title: "Mẫu",
            dataIndex: "model",
            key: "id"
        },
        {
            title: "Năm",
            dataIndex: "year",
            key: "id"
        },
        {
            title: "Giá",
            dataIndex: "based_price",
            key: "id",
            render: (price: number) => formatCurrency(price)
        },
        {
            title: "Số chỗ",
            dataIndex: "number_of_seats",
            key: "id"
        },
        {
            title: "",
            dataIndex: "action",
            key: "id",
            render: (_, record) => <div
                onClick={() => handleOpenEditDialog(record.id, record.based_price, record.brand, record.model, record.year)}
                className='flex items-center justify-center'
                style={{
                    cursor: "pointer",
                    width: '34px',
                    height: '34px',
                    borderRadius: '12px',
                    border: '1px solid',
                    backgroundColor: '#e8ebed1a',
                    borderColor: '#d9dee2',
                    boxShadow: '#f6f7f866 0 2px 0 inset, #e8eaee80 0 -1.5px 0 inset, #dfe2e780 0 1px 2px 0'
                }}>
                <EditRoundedIcon sx={{ color: "#2b27fa", fontSize: "16px" }} />
            </div>
        },
    ]

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                loading={isLoading}
                pagination={{

                    total: total
                }}
                onChange={onTableChange}
            />
            {
                openEditDialog &&
                <Dialog
                    width='45%'
                    loading={false}
                    setOpen={setOpenEditDialog}
                    title={`Cập nhật giá ${initValue.brand} ${initValue.model} ${initValue.year}`}
                    open={openEditDialog}
                    isIntercept={false}
                >
                    <EditBrandDialog
                        value={initValue}
                        setValue={setInitValue}
                        setOpen={setOpenEditDialog}
                        setRefresh={setRefresh}
                    />
                </Dialog>
            }

        </div>
    )
}
