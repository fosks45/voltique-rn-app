import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Chip, DataTable } from 'react-native-paper';
import { TypographyText } from '../../Typography/Text';
import moment from 'moment';

interface IProps {
  listData: any,
  onAssetChoice: any,
  subHeader: string,
}

const numberOfItemsPerPageList = [2, 3, 4];
const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
];

const statusChecker = (dateTreated) => {
  var lastTreated = moment(dateTreated)
  var expired = moment(lastTreated).add(14, 'days')
  var due = moment(lastTreated).add(11, 'days')
  var now = moment();
  if (due < now) {
    return <Chip icon={() => (<Icon name="information-outline" size={16} color="#fff" />
  )}textStyle={styles.DueTitle} style={styles.Due}>Due</Chip>
  } else if (expired < now) {
    return <Chip icon="close-circle-outline" textStyle={styles.UnTreatedTitle} style={styles.UnTreated}>Not Treated</Chip>
  } else {
    return <Chip icon="check-circle-outline" textStyle={styles.TreatedTitle} style={styles.Treated}>Treated</Chip>
  }
 }

export function Table({subHeader, listData, onAssetChoice}: IProps) {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  React.useEffect(() => {
     setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title
          style={{
            flexBasis: 'auto',
            flexGrow: 1,
            flexShrink: 0,
            marginRight: 10
          }}
        >
          <TypographyText>
            Asset ID
          </TypographyText>
        </DataTable.Title>
        <DataTable.Title
          style={{
            flexBasis: 'auto',
            flexGrow: 2,
            flexShrink: 0,
            marginRight: 10
          }}
        >
          <TypographyText>
            Last Treated
          </TypographyText>
        </DataTable.Title>
        <DataTable.Title numeric>
          <TypographyText>Status</TypographyText>
        </DataTable.Title>
      </DataTable.Header>
      {Object.keys(listData).map(function(key) {
        return (
          <DataTable.Row
            key={subHeader.replace(/[^A-Z0-9]+/ig, "").toLowerCase + key}
            onPress={() => {
              onAssetChoice(listData[key].assetID);
            }}
            style={{
              alignContent: "space-between",
              borderBottomColor: 'rgba(255,255,255,.3)',
              flexDirection: "row",
              justifyContent: 'center',
              marginBottom: 2
            }}
          >
            <DataTable.Cell
              style={{
                flexBasis: 'auto',
                flexGrow: 1,
                flexShrink: 0,
                marginRight: 10
              }}
            >
              <TypographyText>{listData[key].assetID}</TypographyText>
            </DataTable.Cell>
            <DataTable.Cell
              style={{
                flexBasis: 'auto',
                flexGrow: 2,
                flexShrink: 0,
                marginRight: 10
              }}
            >
              <TypographyText>{listData[key].treatmentDate ? moment(listData[key].treatmentDate * 1000).format("DD/MM/YYYY, h:mm a") : "Not treated"}</TypographyText>
            </DataTable.Cell>
            <DataTable.Cell
              numeric
                style={{
                  flexBasis: 0,
                  flexGrow: 1,
                  flexShrink: 0,
                  marginRight: 0,
                }}
            >
              {statusChecker(listData[key].treatmentDate * 1000)}
            </DataTable.Cell>
          </DataTable.Row>
        )
      })}
      {/* <DataTable.Pagination
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPage={numberOfItemsPerPage}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
        onItemsPerPageChange={onItemsPerPageChange}
        onPageChange={page => setPage(page)}
        page={page}
        selectPageDropdownLabel={'Rows per page'}
        showFastPaginationControls
      /> */}
    </DataTable>
  )
}

const styles = StyleSheet.create({
  DueTitle: {
    color: '#eee'
  },
  Due: {
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#cc4646'
  },
  UnTreatedTitle: {
    color: '#262626'
  },
  UnTreated: {
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#d4b74d'
  },
  TreatedTitle: {
    color: '#262626'
  },
  Treated: {
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#94cc46'
  },
})