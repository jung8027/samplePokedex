import React from 'react'
import {Link} from 'react-router'
import $ from 'jquery'

function Pokemon() {
  this.name = '';
  this.sprites = {front_default:  ''};
  this.abilites = [];
  this.types = [];
  this.stats = [];
}
var PokemonInfo = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function(){
  var pokemonName;
  if(this.props.params.name) { 
    pokemonName = this.props.params.name
    }
    this.getPokemon(pokemonName)
  },

  componentWillReceiveProps: function(nextProps){
    console.log(nextProps)
    this.getPokemon(nextProps.params.name)
  },

  getPokemon: function(pokemonName){
    $.ajax({
        url: "http://pokeapi.co/api/v2/pokemon/"+pokemonName,
        dataType: 'json',
        cache: true,
        success: function(data){
          this.setState({selectedPokemon: data})
        }.bind(this),
        error: function(xhr, status, err) {
           console.log("error")
           console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  },

  render: function() {
    console.log(this.state.selectedPokemon)
    var pokemon;
    if (!this.state.selectedPokemon){
      return null
    };
    var pokemon = this.state.selectedPokemon;
    var types = pokemon.types.map(function(obj, idx){
        return(
          <li key={idx}>
            {obj.type.name}
          </li>
        );
    });

   var stats = pokemon.stats.map(function(obj, index){
     return(
       <li  key = {index}>
            {obj.stat.name} : {obj.base_stat}
       </li>
     );
   });
    return (
      <div>
        <h2>{pokemon.name} </h2>
        <img src={pokemon.sprites.front_default} alt="Pokemon Image" />
        <h4> Type: </h4>
        <ul>
          {types}
        </ul>
        <h4> Stats: </h4>
        <ul>
          {stats}
        </ul>
      </div>
    )
  }
})

module.exports = PokemonInfo
