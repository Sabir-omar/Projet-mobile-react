import React from 'react' 
import {StyleSheet,View,Button,TextInput} from 'react-native'

class Search extends React.Component{
    render(){
        return(
            <View style={{marginTop:50}}>
                <TextInput style={styles.Textinput} placeholder="Titre de film"/>
                <Button style={{height:50}} title="Rechercher" onPress={ () => {}}/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    Textinput:{
        marginLeft:5,
        height:50,
        borderColor:'black',
        borderWidth:1 ,
        paddingLeft:5
    }   
})

export default Search