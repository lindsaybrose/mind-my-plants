import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/HapticTab";
import { useColorScheme } from "@/hooks/useColorScheme";
import "../../global.css";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import { useRole } from "../contexts/role";
import NewHeader from "../Header";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { userType } = useRole();
  const showView = userType === "sitter";

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { fontSize: 10, fontFamily: "PT Sans", fontWeight: 700 },
        tabBarActiveBackgroundColor: "rgb(106, 153, 78)",
        
        // headerTitle: 'Mind My Plants',
        // headerTitleAlign: 'center',
        // headerTitleStyle: {fontSize: 30, fontWeight: 'bold'},
        // headerStyle: {backgroundColor: 'green'},
        // headerTintColor: 'white',
        // headerLeft: () => <Button title='Home' onPress={() => {router.push('/')}}></Button>,

        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarStyle: { backgroundColor: "#D77F33", height: 55 },
          headerBackground: (props) => <NewHeader {...props}/>,
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-assistant"
              size={24}
              color="rgb(254, 250, 224)"
            />
          ),
        }}
      />
      {showView ? (
        <Tabs.Screen
          name="myjobs"
          options={{
            title: "My Jobs",
            headerBackground: (props) => <NewHeader {...props}/>,
          headerTitle: '',
          headerLeft: () => (
            <AntDesign className="ml-4 mt-1" 
            name="leftcircleo" size={32} color="white" onPress={() => {router.push('/')}} />),
            tabBarStyle: { backgroundColor: "#D77F33", height: 55 },
            tabBarIcon: ({ color }) => (
              <FontAwesome6
                name="hand-holding-droplet"
                size={24}
                color="rgb(254, 250, 224)"
              />
            ),
          }}
        />
      ) : (
        <Tabs.Screen
          name="myjobs"
          options={{
            headerBackground: (props) => <NewHeader {...props}/>,
          headerTitle: '',
          headerLeft: () => (
            <AntDesign className="ml-4 mt-1" 
            name="leftcircleo" size={32} color="white" onPress={() => {router.push('/')}} />),
            tabBarStyle: { backgroundColor: "#D77F33", height: 55 },
            href: null,
          }}
        />
      )}
      <Tabs.Screen
        name="jobs/index"
        options={{
          title: "Jobs",
          headerBackground: (props) => <NewHeader {...props}/>,
          headerTitle: '',
          headerLeft: () => (
            <AntDesign className="ml-4 mt-1" 
            name="leftcircleo" size={32} color="white" onPress={() => {router.push('/')}} />),
          tabBarStyle: { backgroundColor: "#D77F33", height: 55 },
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="clipboard-list"
              size={24}
              color="rgb(254, 250, 224)"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          headerBackground: (props) => <NewHeader {...props}/>,
          headerTitle: '',
          headerLeft: () => (
            <AntDesign className="ml-4 mt-1" 
            name="leftcircleo" size={32} color="white" onPress={() => {router.push('/')}} />),
          tabBarStyle: { backgroundColor: "#D77F33", height: 55 },
          tabBarIcon: ({ color }) => (
            <Feather name="send" size={24} color="rgb(254, 250, 224)" />
          ),
        }}
      />

      <Tabs.Screen
        name="jobs/layout"
        options={{
          headerBackground: (props) => <NewHeader {...props}/>,
          headerTitle: '',
          headerLeft: () => (
            <AntDesign className="ml-4 mt-1" 
            name="leftcircleo" size={32} color="white" onPress={() => {router.push('/')}} />),
          tabBarStyle: { backgroundColor: "#D77F33", height: 55 },
          href: null,
        }}
      />
      <Tabs.Screen
        name="jobs/JobCard"
        options={{
          headerBackground: (props) => <NewHeader {...props}/>,
          headerTitle: '',
          headerLeft: () => (
            <AntDesign className="ml-4 mt-1" 
            name="leftcircleo" size={32} color="white" onPress={() => {router.push('/')}} />),
          tabBarStyle: { backgroundColor: "#D77F33", height: 55 },
          href: null,
        }}
      />
      <Tabs.Screen
        name="jobs/sitters/[userId]/[jobId]"
        options={{
          headerBackground: (props) => <NewHeader {...props}/>,
          headerTitle: '',
          headerLeft: () => (
            <AntDesign className="ml-4 mt-1" 
            name="leftcircleo" size={32} color="white" onPress={() => {router.push('/jobs')}} />),
          tabBarStyle: { backgroundColor: "#D77F33", height: 55 },
          href: null,
        }}
      />
      <Tabs.Screen
        name="jobs/[userId]/[jobId]"
        options={{
          headerBackground: (props) => <NewHeader {...props}/>,
          headerTitle: '',
          headerLeft: () => (
            <AntDesign className="ml-4 mt-1" 
            name="leftcircleo" size={32} color="white" onPress={() => {router.push('/jobs')}} />),
          tabBarStyle: { backgroundColor: "#D77F33", height: 55 },
          href: null,
        }}
      />
      <Tabs.Screen
        name="jobs/addjobs"
        options={{
          headerTitle: '',
          headerBackButtonDisplayMode: true,
          tabBarStyle: { backgroundColor: "#D77F33", height: 55 },
          href: null,
          headerBackground: (props) => <NewHeader {...props}/>,
          headerLeft: () => (
            <AntDesign className="ml-4 mt-1" 
            name="leftcircleo" size={32} color="white" onPress={() => {router.push('/jobs')}} />)
        }}
      />
      <Tabs.Screen
        name="Careguides/index"
        options={{
          headerBackground: (props) => <NewHeader {...props}/>,
          headerTitle: '',
          headerLeft: () => (
            <AntDesign className="ml-4 mt-1" 
            name="leftcircleo" size={32} color="white" onPress={() => {router.push('/')}} />),
          tabBarStyle: { backgroundColor: "#D77F33", height: 55 },
          href: null,
        }}
      />
      <Tabs.Screen
        name="Careguides/[guide]"
        options={{
          headerBackground: (props) => <NewHeader {...props}/>,
          headerTitle: '',
          headerLeft: () => (
            <AntDesign className="ml-4 mt-1" 
            name="leftcircleo" size={32} color="white" onPress={() => {router.push('/')}} />),
          tabBarStyle: { backgroundColor: "#D77F33", height: 55 },
          href: null,
        }}
      />
    </Tabs>
  );
}


