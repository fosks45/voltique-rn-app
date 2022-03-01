import React, { useState, useEffect } from 'react';
import {
  Appbar,
  Avatar,
  Button,
  IconButton,
  Text,
  Title,
  Modal,
  Portal,
  Paragraph,
  List
} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootTabScreenProps } from '../types';
import { ImageBackgroundContainer } from '../components/block/Containers/ImageBackgroundContainer';
import { TypographyParagraph } from '../components/block/Typography/Paragraph';
import { TypographyTitle } from '../components/block/Typography/Title';
import { CentredContainer } from '../components/block/Containers/Centred';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { PaddedContainer } from '../components/block/Containers/Padded';
import { app, db } from '../firebase/config'
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { TypographyText } from '../components/block/Typography/Text';
import { IconList } from '../components/block/List/Icon';
import { doc, getDoc, query, collection, limit, orderBy, getDocs } from "firebase/firestore";
import { Chip, DataTable } from 'react-native-paper';
import moment from 'moment';
import {
  StyleSheet
} from 'react-native';

let treatmentHistory = [
  {
    treated: 1645778769, 
    treatmentVolume: 0.28760159970534
  },
  {
    treated: 1645778100, 
    treatmentVolume: 0.23
  },
  {
    treated: 1645777540, 
    treatmentVolume: 0.23
  }
]


const AddTreatment = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};


export default function AssetInfo({ navigation, route }: RootTabScreenProps<'AssetInfo'>) {
  const [assetsTreatment, setAssetsTreatment] = useState([]);
  const [assetID, setAssetID] = useState([]);

  const isFocused = useIsFocused();
 
  useEffect(() => {
    setAssetID(route.params.asset_id);
    console.log('Stu-here', assetID)
  }, [isFocused]);


   useEffect(() => {
    (async () => {      
      console.log('kdkedkde')
      const q = query(collection(db, "organisations/5bVqKwgaN5pF81YTQiAP/assets/" + assetID))
      const docsSnap = await getDocs(q);
  
      docsSnap.forEach(async (doc) => {
        // console.log(doc.data())
        let testRef = query(collection(db,'organisations/5bVqKwgaN5pF81YTQiAP/assets/' + assetID + '/treatment_history'));
        const docsSnaped = await getDocs(testRef);  
        docsSnaped.forEach(docTr => {
          assetsTreatment.push({
            treatmentHistory: docTr.data(),
            assetID: doc.id,
            description: doc.data().description,
          })
        })
      });
    })();
  }, [assetID]);

  useEffect(() => {
    (async () => {
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
        } else {
          alert("Unable to find asset. Scan the code again or search manually.");
          navigation.navigate('Search')
        }
      })
    }, [assetID]);

  return (
    <>
    
      <ImageBackgroundContainer>
        <PaddedContainer>
          <CentredContainer>
            <Chip  icon={() => (<Icon name="alert-circle-outline" size={16} color="#fff" />)} textStyle={styles.DueTitle} style={styles.Due}>Not Treated</Chip>
            <TypographyTitle>Asset ID: {assetID} </TypographyTitle>
            <TypographyParagraph>A unique cost-effective formula that achieves a high level of disinfection, targeting and incessantly killing all strains of pathogens including Coronavirus.</TypographyParagraph>
          </CentredContainer>
        </PaddedContainer>
        <DataTable>
              <DataTable.Header>
                <DataTable.Title
                  style={{
                    flexBasis: 'auto',
                    flexGrow: 2,
                    flexShrink: 0,
                  }}
                >
                  <TypographyText>
                    Treated on
                  </TypographyText>
                </DataTable.Title>
                <DataTable.Title
                  numeric
                  style={{
                    flexBasis: 'auto',
                    flexGrow: 2,
                    flexShrink: 0,
                  }}
                >
                  <TypographyText>
                    Volume (Litres)
                  </TypographyText>
                </DataTable.Title>
              </DataTable.Header>
              {Object.keys(treatmentHistory).map(function(key) {
                return (
                  <DataTable.Row
                    key={"treatmenthistory" + key}
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
                        flexGrow: 2,
                        flexShrink: 0,
                        marginRight: 10
                      }}
                    >
                      <TypographyText>
                        {moment(treatmentHistory[key].treated * 1000).format("DD/MM/YYYY, h:mm a")}
                      </TypographyText>
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
                      <TypographyText>
                        {(treatmentHistory[key].treatmentVolume).toFixed(2)}
                      </TypographyText>
                    </DataTable.Cell>
                  </DataTable.Row>
                )
              })}
            </DataTable>
      </ImageBackgroundContainer>
    </>
  );
}

const styles = StyleSheet.create({
  DueTitle: {
    color: '#eee',
    fontSize: 18,
    paddingTop: 2,
  },
  Due: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#cc4646'
  },
  UnTreatedTitle: {
    color: '#262626',
    fontSize: 18,
    paddingTop: 2,
  },
  UnTreated: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
    flex: 1,
    backgroundColor: '#d4b74d'
  },
  TreatedTitle: {
    color: '#262626',
    fontSize: 18,
    paddingTop: 2,
  },
  Treated: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#94cc46'
  },
})