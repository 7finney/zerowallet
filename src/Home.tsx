import React, { useEffect, useState } from "react";
import { ToastAndroid, View } from "react-native";
import { List, Button } from 'react-native-paper';
import { listAccounts, createKeyPair } from './utils/sign';
import { IAccount } from "./types";
import { NetworkList } from  "./components/NetworkList";
import { AccountsList } from "./components/AccList";

export const HomeScreen = () => {
    const handleCreate = () => {
        console.log('Will create new account');
        createKeyPair("");
    }
    return (
        <View>
            <NetworkList />
            <AccountsList />
            <Button icon="ethereum" mode="contained" onPress={handleCreate}>
                Create New Account
            </Button>
        </View>
    )
}