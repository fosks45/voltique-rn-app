import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { List } from 'react-native-paper';

interface IProps {
  subHeader: string,
  icon: string,
  listData: any
}

export function IconList({subHeader, listData, icon}: IProps) {
  return (
    <List.Section>
      <List.Subheader style={styles.IconListTitle}>{subHeader}</List.Subheader>
      {Object.keys(listData).map(function(key) {
          return  <List.Item
            description={listData[key].description}
            key={subHeader.replace(/[^A-Z0-9]+/ig, "").toLowerCase + key}
            right={() => <List.Icon color="#fff" icon={icon} />}
            titleStyle={styles.IconListTitle}
            descriptionStyle={styles.IconListDesc}
            title={listData[key].assetID}
            style={styles.IconListItem}
          />
		})}
    </List.Section>
  )
}

const styles = StyleSheet.create({
  IconListItem: {
    marginTop: 0,
    margin: 10,
    padding: 0,
    paddingBottom: 5,
    borderBottomColor: '#4a4a4a',
    borderBottomWidth: 1
  },
  IconListTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  IconListDesc: {
    color: '#fff'
  },
});

      