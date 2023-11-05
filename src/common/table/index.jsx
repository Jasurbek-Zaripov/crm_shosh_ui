import {Table} from "antd";
import {useTranslation} from "react-i18next";


function TableCommon({columns, data, summary, bordered, scroll, className, pagination}) {


    const {t} = useTranslation();
    return (
        <>
            <Table
                pagination={false}
                className={className}
                columns={columns}
                dataSource={data}
                bordered={bordered}
                tableLayout="none"
                scroll={scroll}
                summary={summary}
            />
        </>
    );
}

export default TableCommon;
