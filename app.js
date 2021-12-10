const pokemonList = document.getElementById('pokemonList');
const searchBox = document.getElementById('searchBox');
let loadScreen = document.getElementById('loadContainer');

let pokeList = [];
let pokeResults = [];

// listen for keypresses on the filter bar, and update the list of returned
// pokemon based on the input
searchBox.addEventListener('keyup', (input) => {
    inputStr = input.target.value;
    pokeResults = pokeList.filter(pokemon => {
        let validResult = false;
        if(pokemon.name.toLowerCase().includes(inputStr.toLowerCase())) {
            return true;
        } else {
            for(let i=0;i<pokemon.types.length;i++) {
                if (pokemon.types[i].type.name.includes(inputStr)) {
                    return true;
                }
            }
        }
        return false;
    })
    showCards(pokeResults);
});

// populate an array of all pokemon through api calls
const fillPokeList = async () => {
    try {
        let count = 0;
        for (let i = 1; i < 899; i++) {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            pokeList[i] = await res.json();
        }
        loadScreen.style.display = "none";
        showCards(pokeList);
    } catch(err) {
        console.error(err);
    }
};

// display the pokemon as cards on the website
const showCards = (pokemons) => {
    const htmlString = pokemons
        .map((pokemon) => {
        	/* With this I handle one and multiple types element */
        	let types = "Type: ";
        	pokemon.types.map((type, index) =>{
        		if(index == 1){
        			types  =types.replace("Type:", "Types:");
        		}
        		if (index == 0){
        			types += type.type.name;
        		}
        		else{
        			types+= ' ' + type.type.name;
        		}
        		
        	})
            return `
                <li class="pokemon">
                    <img src="${pokemon.sprites.front_default}"></img>
                    <h2>${pokemon.name}</h2>
                    <p>#${pokemon.id}</p>
                    <p>${types}</p>

                </li>
            `;
        })
        .join('');
    pokemonList.innerHTML = htmlString;
};

fillPokeList();