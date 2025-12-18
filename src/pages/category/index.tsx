import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import { getCategoryList } from '@/api/blog';
import { usePagination } from 'ahooks';
import dayjs from 'dayjs';
import type { TableProps } from 'antd';
import type { Category } from '@/types/blog.d';
import type { InputRef } from 'antd';

const columns: TableProps<Category>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '名称',
        dataIndex: 'label',
        key: 'label',
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: '最近更新时间',
        dataIndex: 'update_time',
        key: 'update_time',
        render: (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
]

export default function Category() {
    const [keyword, setKeyword] = useState('');
    const inputRef = useRef<InputRef>(null);
    const handleSearchFn = () => {
        const value = inputRef.current?.input?.value?.trim() || '';
        setKeyword(value);
    }
    const { data, loading, pagination } = usePagination(({ current, pageSize }) => getCategoryList({
        page: current,
        pageSize,
        keyword,
    }), {
        throttleWait: 1000,
        loadingDelay: 500,
        refreshDeps: [keyword],
    });

    return (
        <div>
            <Space>
                <Input
                    placeholder="请输入分类名称"
                    onPressEnter={handleSearchFn}
                    ref={inputRef}
                />
                <Button type="primary" onClick={handleSearchFn}>
                    搜索
                </Button>

            </Space>

            <Table
                style={{ marginTop: 20 }}
                rowKey={(record) => record.id}
                bordered
                loading={loading}
                pagination={pagination}
                columns={columns}
                dataSource={data?.list || []}
            />
        </div>
    );
}