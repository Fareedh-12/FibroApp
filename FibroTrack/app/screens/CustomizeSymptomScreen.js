import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../components/AppHeader'
import BackButtonWithSymptom from '../components/BackButtonWithSymptom'
import {Checkbox,  Center} from 'native-base'
import TrackSymptomComponent from '../components/TrackSymptomComponent'
import AppButton from '../components/AppButton'



const CustomizeSymptomScreen = () => {
  return (
    <View>
      <AppHeader/>
      <BackButtonWithSymptom title="Customize Symptoms"/>
      <TrackSymptomComponent symptom='Fatigue'/>

      <View style={styles.buttonContainer}>
        <AppButton text='Add symptom'/>
        <AppButton text='Save' type="primary"/>
      </View>

    </View>
  )
}

export default CustomizeSymptomScreen

const styles = StyleSheet.create({
    buttonContainer:{
        alignSelf: 'center',
        top: 500,
        width: '80%',
    }
})