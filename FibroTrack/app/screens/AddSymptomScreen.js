import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../components/AppHeader'
import BackButtonWithSymptom from '../components/BackButtonWithSymptom'
import AppInput from '../components/AppInput'
import AppButton from '../components/AppButton'

const AddSymptomScreen = () => {
  return (
    <View>
      <AppHeader/>
      <BackButtonWithSymptom title="Add Symptom"/>
      <View style={styles.form}>
        <Text>Title *</Text>
        <AppInput placeholder="Symptom name"/>
        <Text>Scale *</Text>
        <AppInput placeholder="0-10"/>
      </View>
      <View style={styles.button}>

      <AppButton text="Save" type='primary'/>
      </View>
    </View>
  )
}

export default AddSymptomScreen

const styles = StyleSheet.create({
    form:{
        width: '80%',
        alignSelf: 'center',

    },
    button:{
        top: 400,
        alignSelf: 'center',
        width: '80%',
    }
})