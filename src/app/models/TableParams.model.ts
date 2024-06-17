import { GetProp, TablePaginationConfig } from 'antd';
import { TableProps } from 'antd/lib/table';

export interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}
