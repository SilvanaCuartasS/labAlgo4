import Character from "./components/Character/Character";
import {rickMorty} from "./services/dataFetch"

class AppContainer extends HTMLElement{

    arrayCharacter: Character[] = [];
    dataRickMorty: any[] = [];

    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }

    async connectedCallback(value:Number){

        this.dataRickMorty = await rickMorty(value)

        
        this.render();
    }

    render(){
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML=`
            <h1>aaaa</h1>`;      
        }
    }
}

customElements.define('app-container', AppContainer);