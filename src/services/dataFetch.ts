export const rickNMorty = async (value:Number) => {
    try {
        const rickNMorty = await fetch(`https://rickandmortyapi.com/api/character/${value}`).then(res => res.json ());
        console.log(rickNMorty);
        
        return rickNMorty;
    } catch (error) {
        console.error(error);   
    }
}

export const getFirstEpisode = async (nameOfFirstEpisode:String) => {
    try {
        const firstEpisode = await fetch(`${nameOfFirstEpisode}`).then(res => res.json());
        return firstEpisode;
    } catch (error) {
        console.error(error);
    }
}