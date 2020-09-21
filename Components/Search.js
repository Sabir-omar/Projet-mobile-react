import React from 'react' 
import {StyleSheet,View,Button,TextInput,FlatList,Text,ActivityIndicator} from 'react-native'
import films from '../Helpers/filmsData.js'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'


class Search extends React.Component{

    constructor(props) {
        super(props)
        this.searchedText = ""
        this.page = 0 // Compteur pour connaître la page courante
        this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
        this.state = {
          films: [],
          isLoading: false
        }
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
          this.setState({ isLoading: true })
          getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
              this.page = data.page
              this.totalPages = data.total_pages
              this.setState({
                films: [ ...this.state.films, ...data.results ],
                isLoading: false
              })
          })
        }
    }

    _displayLoading(){
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                  <ActivityIndicator size='large' />
                  {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
                </View>
              )
        }
    }
    _searchTextInputChanged(text){
        this.searchedText=text
    }

    _searchFilm(){
        this.page=0
        this.totalPages=0
        this.setState({
            films:[]
        },()=>{
            console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
        this._loadFilms()
        })
    }

    render(){
        return(
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={()=>this._searchFilm()} onChangeText={(text)=> this._searchTextInputChanged(text)} style={styles.Textinput} placeholder="Titre de film"/>
                <Button style={{height:50}} title="Rechercher" onPress={ () => this._searchFilm()}/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                            this._loadFilms()
                        }
                    }}
                />
              {this._displayLoading()}
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
    },
    loading_container:{
        position:'absolute',
        left:0,
        right:0,
        top:100,
        bottom:0,
        alignItems:'center',
        justifyContent:'center'
    } 
})

export default Search