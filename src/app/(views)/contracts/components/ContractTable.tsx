import { IAccount } from '@/app/models/Account.model'
import { ICar } from '@/app/models/Car.model'
import { ICustomerContract } from '@/app/models/CustomerContract'
import { Modal, Skeleton, Spin, Table, TableProps, UploadFile } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import OrderedContractDropdown from './OrderedContractDropdown'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RentingContractDropdown from './RentingContractDropdown'
import { errorNotify, sucessNotify } from '@/app/utils/toast'
import ExpandRowCollateral from './ExpandRowCollateral'
import SwitchIsReturn from './Switch'
import ExpandRowRecievingCar from './ExpandRowRecievingCar'
import CompletedContractDropdown from './CompletedContractDropdown'


export default function ContractTable(
    {
        contractData,
        filter,
        loading,
        setRefresh
    }: {
        contractData?: ICustomerContract[],
        filter: any,
        loading: boolean,
        setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    }) {

    const [customerContractDetail, setCustomerContractDetail] = useState<ICustomerContract>()
    const [expandLoading, setExpandLoaing] = useState<any>({})
    const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]);
    const { t } = useTranslation()
    const axiosAuth = useAxiosAuth()
    const [fileCarCondition, setFileCarCondition] = useState<UploadFile[]>([])

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const columns: TableProps<ICustomerContract>['columns'] = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'customer',
            key: 'id',
            render: (customer: IAccount) => <>{customer.last_name + ' ' + customer.first_name}</>
        },
        {
            title: 'Biển số xe',
            dataIndex: 'car',
            key: 'id',
            render: (car: ICar) => <>{car.license_plate}</>
        },
        {
            title: 'Ngày nhận xe',
            dataIndex: 'start_date',
            key: 'id',
            render: (date) => <p>{new Date(date).toLocaleString()}</p>
        },
        {
            title: 'Ngày trả xe',
            dataIndex: 'end_date',
            key: 'id',
            render: (date) => <p>{new Date(date).toLocaleString()}</p>
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'customer',
            key: 'id',
            render: (customer: IAccount) => <>{customer.phone_number}</>
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'id',
            render: (_, record) => {
                return <div style={{ position: 'relative' }}>
                    {
                        filter === 'ordered' &&
                        <OrderedContractDropdown
                            id={record.id}
                            approveCustomerContract={() =>
                                approveCustomerContract(record.id)
                            }
                            rejectCustomerContract={() => rejectCustomerContract(record.id)}
                        />
                    }
                    {
                        filter === 'completed' &&
                        <>
                            <CompletedContractDropdown
                                id={record.id}
                            />
                        </>
                    }
                    {
                        filter === 'renting' &&
                        <RentingContractDropdown
                            id={record.id}
                        />
                    }

                </div>

            }

        },
    ]

    useEffect(() => {
        const timeoutID = setTimeout(() => setExpandLoaing(false), 1000)
        return () => {
            clearTimeout(timeoutID);
        };
    }, [expandedRowKeys])

    const approveCustomerContract = async (id: any) => {
        const { confirm, error } = Modal
        try {
            const contractResponse = await axiosAuth.get("/admin/contract/" + id)
            const contractDetail: ICustomerContract = contractResponse.data.data

            if (contractDetail.collateral_type === "cash"
                && contractDetail.receiving_car_images.length < 1
            ) {
                errorNotify("Vui lòng thêm ảnh trước khi bàn giao")
                return
            }
            if (contractDetail.collateral_type === "motorbike"
                &&
                (
                    contractDetail.receiving_car_images.length < 1
                    || contractDetail.collateral_asset_images.length < 1
                )) {
                errorNotify("Vui lòng thêm ảnh trước khi bàn giao")
                return
            }
            confirm({
                title: 'Bạn có muốn đưa vào đang thuê?',
                onOk: async () => {
                    try {
                        const response = await axiosAuth.put('/admin/contract', {
                            customer_contract_id: id,
                            action: "approve"
                        })

                        if (response.status === 200) {
                            setRefresh(prev => !prev)
                            sucessNotify('Cập nhật hợp đồng thành công')
                            setExpandedRowKeys([])
                        }
                    } catch (e: any) {
                        console.log(e);
                        if (e.response.data.error_code == 10032) {
                            error({
                                title: 'Chiếc xe này đã dừng hoạt động, vui lòng thay xe hoặc hoàn trả thế chấp',
                            })
                        }
                    }
                },
                onCancel: () => {

                }
            })
        } catch (error) {
            console.log(error);

        }


    }

    const rejectCustomerContract = (id: any) => {
        const { confirm } = Modal
        confirm({
            title: "Bạn có muốn từ chối hợp đồng này?",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    const response = await axiosAuth.put("/admin/contract", {
                        customer_contract_id: id,
                        action: "reject"
                    })
                    if (response.status === 200) {
                        sucessNotify("Đã từ chối hợp đồng thành công")
                        setRefresh(prev => !prev)
                    }
                } catch (error) {
                    errorNotify("Đã có lỗi, vui lòng thử lại")
                }


            }
        })
    }
    const getDataForExpand = async (id: any) => {
        const response = await axiosAuth.get(
            '/admin/contract/' + id
        )
        setCustomerContractDetail(response.data.data)
        setFileList(
            response.data
                .data.collateral_asset_images.map((img: any) =>
                ({
                    url: img.url,
                    status: 'done',
                    uid: img.id,
                    isUpload: true
                })))

        setFileCarCondition(
            response.data
                .data.receiving_car_images.map((img: any) =>
                ({
                    url: img.url,
                    status: 'done',
                    uid: img.id,
                    isUpload: true
                })))
    }
    return (
        <Table
            loading={loading}
            onRow={(record, index) => {
                return {
                    style: {
                        background: record.id === expandedRowKeys[0] ? '#c1c5ff6b' : 'white',
                    }
                }
            }}
            rowKey={(record) => record.id}
            expandable={{
                expandedRowKeys: expandedRowKeys,
                onExpand: async (expanded, record) => {
                    const keys = []
                    setExpandLoaing(true)
                    if (expanded) {
                        keys.push(record.id);
                        getDataForExpand(record.id)
                    }
                    setExpandedRowKeys(keys);
                },
                expandedRowRender: (record) => {
                    return (
                        <>
                            {
                                expandLoading &&
                                <div className='flex justify-center'><Spin /></div>
                            }
                            {
                                !expandLoading &&
                                <>
                                    {
                                        record.collateral_type !== 'cash'
                                        &&
                                        <ExpandRowCollateral
                                            getDataForExpand={getDataForExpand}
                                            id={record.id}
                                            expandLoading={expandLoading}
                                            fileList={fileList}
                                            status={record.status}
                                            setFileList={setFileList}
                                        />
                                    }

                                    {
                                        expandLoading
                                        && <Skeleton.Image active />
                                    }
                                    <SwitchIsReturn
                                        isReturn={record.is_return_collateral_asset}
                                    />
                                    <ExpandRowRecievingCar
                                        id={record.id}
                                        fileList={fileCarCondition}
                                        status={record.status}
                                        expandLoading={expandLoading}
                                        setFileCarCondition={setFileCarCondition}
                                        getDataForExpand={getDataForExpand}
                                    />
                                </>

                            }
                        </>
                    )
                },
            }}
            columns={columns}
            dataSource={contractData}

        />
    )
}
