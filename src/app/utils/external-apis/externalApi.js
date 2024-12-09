"use server";

export async function PandaScoreApi(game, size) {
    const access_key = process.env.PANDASCORE_API_ACCESS_KEY;
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${access_key}`
      }
    };
  
    const returnThis = [];
    
    await fetch(`https://api.pandascore.co/${game}/tournaments/upcoming?page[size]=${size}`, options)
      .then(res => res.json())
      .then(res => res.map((i) => returnThis.push({
        'Date': [new Date(i.begin_at), new Date(i.end_at)].map(date => date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })).join(' - '),
        'LeagueName': i.league.name,
        'Prizepool': i.prizepool?.includes('United States Dollar') ? `$${parseInt(i.prizepool.replace('United States Dollar', '')).toLocaleString()}` : (i.prizepool?.includes('South Korean Won') ? `₩${parseInt(i.prizepool.replace('South Korean Won', '')).toLocaleString()}` : (i.prizepool || '$0')),
        'Teams': i.teams.map((team)=>team.acronym).join(', ') || 'Not Available',
        'Type': i.name
        })))
    .catch(err => console.error(err));
  
    return(returnThis);
}
  
export async function RawgApi(game) {
    const access_key = process.env.RAWG_API_ACCESS_KEY;
    
    const returnThis = [];
  
    await fetch(`https://api.rawg.io/api/games/${game}?exclude_additions=true&page_size=10&key=${access_key}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => returnThis.push({
      'Name': res.name,
      'Rating': Math.round(res.rating * 10)/10,
      'Genres': res.genres && res.genres.length > 0 ? (res.genres.map((genre) => genre.name).length > 3 ? (res.genres.map((genre) => genre.name)).slice(0, 3).join(', ') : res.genres.map((genre) => genre.name).join(', ')) : 'Not Available',
      'Released': res.released,
      'Platforms': res.platforms && res.platforms.length > 0 ? (res.platforms.map((platform) => platform.platform.name).length > 3 ? (res.platforms.map((platform) => platform.platform.name)).slice(0, 3).join(', ') : res.platforms.map((platform) => platform.platform.name).join(', ')) : 'Not Available',
      'Stores': res.stores && res.stores.length > 0 ? (res.stores.map((store) => store.store.name).length > 3 ? (res.stores.map((store) => store.store.name)).slice(0, 3).join(', ').replaceAll('Store', '') : res.stores.map((store) => store.store.name).join(', ').replaceAll('Store', '')) : 'Not Available',
      'Developers': res.developers && res.developers.length > 0 ? res.developers.map((i) => i.name).join(', ') : 'Not Available',
      'Description': res.description_raw || 'Not Available'
      }))
    .catch(err => console.error(err));
  
    return(returnThis);
}