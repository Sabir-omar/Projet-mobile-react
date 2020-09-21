import React from 'react' 
import {StyleSheet,View,Button,TextInput,FlatList,Text} from 'react-native'
import films from '../Helpers/filmsData.js'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSeachedText} from '../API/TMDBApi'


class Search extends React.Component{

    constructor(props){
        super(props)
        this.state={
            films:[],
        }
        this.searchedText=""
    }

    _loadFilms(){
        if (this.searchedText.length>0) {
            getFilmsFromApiWithSeachedText(this.searchedText).then(data=>this.setState({films:data.results}))
        }
    }

    _searchTextInputChanged(text){
        this.searchedText=text
    }

    render(){
        return(
            <View style={styles.main_container}>
                <TextInput onChangeText={(text)=> this._searchTextInputChanged(text)} style={styles.Textinput} placeholder="Titre de film"/>
                <Button style={{height:50}} title="Rechercher" onPress={ () => this._loadFilms()}/>
                <FlatList
                    data={this.state.films}
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