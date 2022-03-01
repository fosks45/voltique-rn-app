import React, { useState, useEffect } from 'react';
import { RootTabScreenProps } from '../types';
import { Camera } from 'expo-camera';
import { Input } from '../components/block/Input';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../firebase/config'
import {
  Dimensions, Image, StyleSheet, TouchableOpacity, Vibration, View
} from 'react-native';
import { ImageBackgroundContainer } from '../components/block/Containers/ImageBackgroundContainer';
import { CentredContainer } from '../components/block/Containers/Centred';
import { PaddedContainer } from '../components/block/Containers/Padded';
import { TypographyTitle } from '../components/block/Typography/Title';
import { Table } from '../components/block/Data/Table';
import { useFocusEffect } from '@react-navigation/native';
import { doc, getDoc, query, collection, limit, orderBy, getDocs } from "firebase/firestore";
import { ActivityIndicator } from 'react-native-paper';

const { width } = Dimensions.get('window')
const qrSize = width * 0.6

export default function Search({ navigation }: RootTabScreenProps<'Search'>) {
  const [search, setSearch] = React.useState(''); 
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [assetsTreatment, setAssetsTreatment] = useState([]);
  const [assetID, setAssetID] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      let assetID = '';
    }, [])
  )

  useEffect(() => {
    setScanned(false)
  }, [navigation]);
  
  useEffect(() => {
    (async () => {
      const q = query(collection(db, "organisations/5bVqKwgaN5pF81YTQiAP/assets"))
      const docsSnap = await getDocs(q);
      docsSnap.forEach(async (doc) => {
        let testRef = query(collection(db,'organisations/5bVqKwgaN5pF81YTQiAP/assets/' + doc.id + '/treatment_history'), orderBy("treated", "desc"), limit(1));
        const docsSnaped = await getDocs(testRef);  
        docsSnaped.forEach(docTr => {
          assetsTreatment.push({
            treatmentDate: docTr.data().treated.seconds,
            assetID: doc.id,
            description: doc.data().description,
          })
        })
      });
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const isValidURL = (string) => {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res !== null) {
      return string.split('?')[1].split('&').filter(x=>x.split('=')[0]=='asset_id')[0].split('=')[1]
    } else {
      return string
    }
  };

  const handleBarCodeScanned = async ({ data }) => {
    Vibration.vibrate();
    setScanned(true)
    setAssetID(isValidURL(data))
    const docRef = doc(db, 'organisations/5bVqKwgaN5pF81YTQiAP/assets/' + assetID);
    const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setShowScanner(false);
        setScanned(false)
        onAssetChoice(assetID)
      } else {
        alert("Unable to find asset. Scan the code again or search manually.");
        setShowScanner(false);
        setScanned(false)
      }
  }
      
  const cancelScanner = () => {
    setShowScanner(false);
    setScanned(false)
  };

  if (hasPermission === null) {
    return <TypographyTitle>Requesting for camera permission</TypographyTitle>;
  }
  if (hasPermission === false) {
    return <TypographyTitle>No access to camera</TypographyTitle>;
  }

  const onAssetChoice = (asset) => {
    console.log('Search page', asset)
    navigation.navigate('Asset Information', {asset_id: asset})
  };

  return (
    <>
      <ImageBackgroundContainer>
        <PaddedContainer>
          <CentredContainer>
            <View
              style={{
                alignContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexBasis: 'auto',
                  flexGrow: 1,
                  flexShrink: 0,
                  marginRight: 10
                }}
              >
                <Input
                  error={false}
                  label="Asset ID"
                  onChangeText={search => setSearch(search)}
                  value={search}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#fad482',
                  borderRadius: 100,
                  flexBasis: "auto",
                  flexGrow: 0,
                  flexShrink: 1,
                  padding: 17,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setShowScanner(true)
                  }}
                >
                  <MaterialIcons
                    color="black"
                    name="qr-code-scanner"
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </CentredContainer>

        </PaddedContainer>
        {assetsTreatment &&
          <Table
          onAssetChoice={onAssetChoice}
          listData={assetsTreatment}
          subHeader='Assets'
          />
        }
        {!assetsTreatment &&
          <ActivityIndicator animating={true} color={'#fad482'} />
        }
      </ImageBackgroundContainer>
      {showScanner &&
        <Camera
          autoFocus={Camera.Constants.AutoFocus.on}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={
            [StyleSheet.absoluteFill, styles.container]
          }
        >
          <TypographyTitle
            style={styles.description}
          >
            Scan the asset reference
          </TypographyTitle>
          <Image
            source={require('../assets/images/qr-frame.png')}
            style={styles.qr}
          />
          <TouchableOpacity
            onPress={() => cancelScanner()}
            style={{
              backgroundColor: '#fff',
              borderRadius: 100,
              bottom: 80,
              position:'absolute',
            }}
          >
            <MaterialIcons
              color="#aa2f2f"
              name="cancel"
              size={70}
            />
          </TouchableOpacity>
        </Camera>
      }
    </>
  );
}

const styles = StyleSheet.create({
  paddedContainer: {
    paddingBottom: 40,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 100,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  qr: {
    height: qrSize,
    marginBottom: '20%',
    marginTop: '30%',
    width: qrSize,
  },
  description: {
    color: 'white',
    fontFamily: 'Gilroy-ExtraBold',
    fontSize: width * 0.09,
    marginTop: '10 v%',
    textAlign: 'center',
    width: '70%',
  },
});