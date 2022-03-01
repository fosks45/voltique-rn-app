import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import {
  Appbar,
  Button,
  IconButton,
  Text,
  Title,
} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  useDrawerStatus
} from '@react-navigation/drawer';

import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBPO89PJzlSmt6v1GEUvXQ7TU27bXHbiOk",
  authDomain: "volt1-f748c.firebaseapp.com",
  projectId: "volt1-f748c",
  storageBucket: "volt1-f748c.appspot.com",
  messagingSenderId: "154022801014",
  appId: "1:154022801014:web:8209495b356175c2e8f957",
  measurementId: "G-3EY3HDTRHH"
};

const app = initializeApp(firebaseConfig);
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const auth = getAuth();

import * as SplashScreen from "expo-splash-screen";

import AboutVoltique from './screens/2-AboutVoltique';
import Login from './screens/1-Login';
import Search from './screens/3-Search';
import AssetInfo from './screens/4-AssetInfo';
import ForgottenPassword from './screens/5-ForgottenPassword';

const AppHeader = ({navigationProps, title, add}) => {
  const isDrawerOpen = useDrawerStatus();
  return (
    <Appbar.Header  
      style={{
        backgroundColor: '#fad482',
        elevation: 0,
        height: 70,
        marginBottom: 0,
        shadowOpacity: 0,
      }}
    >
      <Appbar.Action icon={isDrawerOpen ? "menu" :"close"} onPress={()=> navigationProps.openDrawer()} />
      <Appbar.Content titleStyle={{color: '#262626', fontSize: 20, fontFamily: 'Gilroy-ExtraBold', }} title={title}/>
      {add &&
        <Appbar.Action icon={"plus"} onPress={()=> showModal} />
      }
    </Appbar.Header>
  );
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = React.useState(false);

  const startAsync = React.useMemo(
    () => () => Asset.fromModule(image).downloadAsync(),
    [image]
  );

  const onFinish = React.useMemo(() => setSplashReady(true), []);

  if (!isSplashReady) {
    return (
      <AppLoading
        autoHideSplash={false}
        startAsync={startAsync}
        onError={console.error}
        onFinish={onFinish}
      />
    );
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
  const animation = React.useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = React.useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = React.useState(
    false
  );

  React.useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        delay:1000,
        duration: 1000,
        toValue:0,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = React.useMemo(() => async () => {
    try {
      await Promise.all([]);
      await SplashScreen.hideAsync();
    } catch (e) {
    } finally {
      setAppReady(true);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
        {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#262626',
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            fadeDuration={500}
            style={{
              height: "100%",
              transform: [
                {
                  scale: animation,
                },
              ],
              width: "100%",
            }}
            onLoadEnd={onImageLoaded}
            source={image}
          />
        </Animated.View>
      )}
    </View>
  );
}

function LoginScreenStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Login}
        name="LoginScreen"
        options={{
          header: ()=>
          <AppHeader
            navigationProps={navigation}
            title='Login'
          />
        }}
      />
    </Stack.Navigator>
  );
}

function AboutVoltiqueScreenStack({ navigation, route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={AboutVoltique}
        initialParams={{ user: route.params }}
        name="AboutVoltiqueScreen"
        options={{
          header: ()=>
          <AppHeader
            navigationProps={navigation}
            title='About Voltique'
          />
        }}
      />
    </Stack.Navigator>
  );
}

function SearchScreenStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Search}
        name="FindVenues"
        options={{
          title: 'Find venues',
          header: ()=>
          <AppHeader
            navigationProps={navigation}
            title='Find venues'
          />
        }}
      />
    </Stack.Navigator>
  );
}

function AssetInfoScreenStack({ navigation, route }) {
  let { asset_id } = route.params;
  console.log('route', route.params)
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={AssetInfo}
        initialParams={{ asset_id: asset_id }}
        name="AssetInfoScreen"
        options={{
          header: () => (
          <AppHeader
            add
            navigationProps={navigation}
            title='Asset Information'
          />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function ForgottenPasswordScreenStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ForgottenPassword}
        name="ForgottenPasswordScreen"
        options={{
          header: ()=>
          <AppHeader
            navigationProps={navigation}
            title='Forgotten Password'
          />
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerContent({...rest}) {
  const { navigation } = rest;
  const { user } = rest;
  const { setUser } = rest;
  
  const signOutApp = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    
  }

  const signIn = () => {
    navigation.navigate('Login')
  }      
  
  return (
    <DrawerContentScrollView {...rest}>
      <SafeAreaView style={styles.drawerContainer}>
        <DrawerItemList {...rest} />
        {/* <View style={styles.userSignInButton}>
          {user && (
            <Button mode="outlined" onPress={()=> signOutApp()} style={styles.buttonSignOut} uppercase={false} labelStyle={{fontFamily: 'Gilroy-ExtraBold', color: '#262626'}}>
              Sign out
            </Button>
          )}
          {!user && (
            <Button mode="contained" onPress={()=> signIn()} style={styles.buttonRegister} uppercase={false} labelStyle={{fontFamily: 'Gilroy-ExtraBold', color: '#fff'}}>
              Sign in
            </Button>
          )}
        </View> */}
        <Text style={styles.appVersion}>Build v1.0.0</Text>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

function App(navigation) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

      } else {
        setLoading(false)
      }
    });
  }, []);
  const [loaded] = useFonts({
    'Gilroy-Light': require('./assets/fonts/Gilroy-Light.ttf'),
    'Gilroy-ExtraBold': require('./assets/fonts/Gilroy-ExtraBold.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <AnimatedAppLoader image={require('./assets/images/splash.png')}>
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerStyle={{
            width: '80%',
          }}
          drawerContent={(props) => (
            <>
            <DrawerContent  user={user} setUser={setUser} {...props} />
            </>
          )}
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#fad482',
              width: 280,
            },
            drawerActiveTintColor: '#262626',
            activeTintColor: '#262626',
            itemStyle: {
              marginHorizontal: 0,
              marginVertical: 0,
              paddingHorizontal: 0,
              paddingVertical: 0,
            },
            labelStyle: {
              color:"#262626",
              fontFamily: 'Gilroy-Light',
              fontSize: 18,
              marginLeft:-20
            },
          }}
          drawerType="slide"
          overlayColor="transparent"
        >
          {/* {!user && (
            <Drawer.Screen
              component={LoginScreenStack}
              name="Login"
              options={{
                drawerLabel: 'Login',
                drawerIcon: ({focused, size}) => (
                  <IconButton
                  color="#262626"
                  icon="login"
                  style={{marginLeft: 5, marginRight: 0}}
                  />
                ),
                headerShown: false,
              }}
            />
          )} */}
         
          <Drawer.Screen
            component={AboutVoltiqueScreenStack}
            name="About Voltique"
            options={{
              drawerLabel: 'About Voltique',
              drawerIcon: ({focused, size}) => (
                <IconButton
                  color="#262626"
                  icon="home"
                  style={{marginLeft: 5, marginRight: 0}}
                />
              ),
              headerShown: false,
            }}
          />
          
          {/* {user && ( */}
            <>
            <Drawer.Screen
              component={SearchScreenStack}
              initialParams={{ user: user }}
              name="Search"
              options={{
              
                drawerLabel: 'Search',
                drawerIcon: ({focused, size}) => (
                  <IconButton
                  color="#262626"
                  icon="account-plus"
                  style={{marginLeft: 5, marginRight: 0}}
                  />
                  ),
                  headerShown: false,
                }}
                />
          

          <Drawer.Screen
            component={AssetInfoScreenStack}
            initialParams={{
              user: user
            }}
            name="Asset Information"
            options={{
              drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
              drawerItemStyle: { height: 0 },
              headerShown: false,
              }}
              />
              </>
          {/* )} */}

          {/* <Drawer.Screen
            component={ForgottenPasswordScreenStack}
            name="Forgotten Password"
            options={{
              drawerLabel: 'Forgotten Password',
              drawerIcon: ({focused, size}) => (
                <IconButton
                  color="#262626"
                  icon="test-tube-empty"
                  style={{marginLeft: 5, marginRight: 0}}
                />
              ),
              headerShown: false,
            }}
          /> */}

        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </AnimatedAppLoader>
  );
}

export default App;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginHorizontal: 20,
    paddingBottom: 10,
  },
  userInfoSectionTitle: {
    color:"#262626",
    fontFamily: 'Gilroy-ExtraBold',
    fontWeight: 'bold',
    marginLeft: 10
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  section: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
 colspanfiftyleft: {
    width: '50%',
  },
  alignleft: {
    color: '#fff',
    textAlign: 'left',
  },
  userRegiserButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingTop: 16
  },
  userSignInButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  buttonSignOut: {
    backgroundColor: '#fff',
    borderColor: '#262626',
    borderWidth: 1,
    fontFamily: 'Gilroy-Light',
    fontSize: 20,
    marginBottom: 15,
    width: '100%',
  },
  buttonRegister: {
    backgroundColor: '#262626',elevation: 0,
    borderColor: '#fff',
    fontFamily: 'Gilroy-Light',
    fontSize: 20,
    marginBottom: 15,
    width: '100%',
  },
  drawerContainer:{
    position: 'relative',
  }, 
  appVersion: {
    color: '#262626',
    fontFamily: 'Gilroy-Light',
    marginHorizontal: 20,
  },
});