import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TableCommon from '../../../../common/table';
import styles from './style.module.css';

function ApplictionTable({ id }) {
  const { t } = useTranslation();
  const colums = [
    {
      title: `${t('application_add.23')}`,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: `${t('application_add.24')}`,
      dataIndex: 'document',
      key: 'document',
    },
  ];
  const dataOrders = useSelector(state => state.Order.OrdersGet.data);
  const data = [];
  dataOrders.map(elem =>
    elem.id === id
      ? elem?.users?.map(element =>
          data.push({
            id: 1,
            name: (
              <>
                {element.name} {element.surname} {element.father_name}{' '}
              </>
            ),
            document: (
              <>
                {element.seriya} {element.number}
              </>
            ),
          })
        )
      : null
  );
  return (
    <div className={styles.box}>
      <p>{t('application_add.22')}</p>
      <TableCommon
        columns={colums}
        data={data}
      />
    </div>
  );
}

export default ApplictionTable;
