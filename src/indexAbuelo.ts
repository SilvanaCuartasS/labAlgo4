import Character, {Attribute} from "./components/Character/Character";
import {rickNMorty} from "./services/dataFetch"
import {getFirstEpisode} from "./services/dataFetch"

class AppContainer extends HTMLElement{

    arrayCharacter: Character[] = [];
    dataRickMorty: any[] = [];
    dataNameFistEpisode: any[] = [];

    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }

    async connectedCallback(value:Number){
        this.render();
        this.inputValue();
    }

    inputValue() {

        const form = this.shadowRoot?.querySelector(".form") as HTMLFormElement;
        const input = this.shadowRoot?.querySelector(".input") as HTMLInputElement;

        form?.addEventListener("submit", async (event) => {
            event.preventDefault();

            const valueInput = Number(input.value);
            console.log(valueInput);

            if (valueInput > 0) {

                // Limpia los personajes de los arreglos anteriores
                this.arrayCharacter = [];
                this.dataRickMorty = [];
                this.dataNameFistEpisode = [];

                // Obtiene nuevos personajes
                for (let i = 1; i <= valueInput; i++) {

                    const characterData = await rickNMorty(i);
                    const characterNameFirstEpisode = await getFirstEpisode(characterData.episode[0]);
                    this.dataRickMorty.push(characterData);
                    this.dataNameFistEpisode.push(characterNameFirstEpisode.name) 

                }
                this.createCardsRickAndMorty();
                
                this.renderCharacters();
            }
        });
    }

    createCardsRickAndMorty() {
        let count = 0;
        this.dataRickMorty.forEach((element) => {
        const card = this.ownerDocument.createElement('character-component') as Character;
        card.setAttribute(Attribute.image, element.image)
        card.setAttribute(Attribute.name, element.name)
        card.setAttribute(Attribute.status, element.status)
        card.setAttribute(Attribute.species, element.species)
        card.setAttribute(Attribute.type, element.type)
        card.setAttribute(Attribute.origin, element.origin.name)
        card.setAttribute(Attribute.firstepisode, this.dataNameFistEpisode[count]);
        this.arrayCharacter.push(card);
        
        count ++;
    })

    
}

    render(){
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML=`
        <link rel="stylesheet" href="../src/Style.css">
        <div class="header">
        <h1>Rick and Morty Cards</h1>
        <form class="form">
            <input class="input" type="number" placeholder="Select the number" min="1" max="20" step="1">
        </form>
        </div>
        <div class="cardsDiv"></div>

           ` 
    }

} renderCharacters() {

    const container = this.shadowRoot?.querySelector('.cardsDiv');
    if (container) {
        
        // Limpia el contenido antes de renderizar
        container.innerHTML = '';

        this.arrayCharacter.forEach((element) => {
            container?.appendChild(element);
        });
    }
}
}

customElements.define('app-container', AppContainer);