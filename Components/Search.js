import React from 'react' 
import {StyleSheet,View,Button,TextInput,FlatList,Text} from 'react-native'
import films from '../Helpers/filmsData.js'
import FilmItem from './FilmItem'

class Search extends React.Component{
    render(){
        return(
            <View style={styles.main_container}>
                <TextInput style={styles.Textinput} placeholder="Titre de film"/>
                <Button style={{height:50}} title="Rechercher" onPress={ () => {}}/>
                <FlatList
                    data={films}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    main_container:{
        marginTop:50,
        //backgroundColor:'red',
        flex:1
        
    },
    Textinput:{
        marginLeft:5,
        height:50,
        borderColor:'black',
        borderWidth:1 ,
        paddingLeft:5
    }   
})

export default Search