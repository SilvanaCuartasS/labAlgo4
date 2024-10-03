export const rickMorty = async (value:Number) => {
    try {
        const rickNMorty = await fetch(`https://rickandmortyapi.com/api/character/${value}`).then(res => res.json ());
        return rickNMorty;
    } catch (error) {
        console.error(error);
        
    }
}