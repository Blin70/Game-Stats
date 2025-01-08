"use server";

export async function TRNProfile(game, platform, userIdentifier) {
  const access_key = process.env.TRN_API_KEY;

  const options = {
    method: 'GET',
    next: { tags: ['PlayerData'] },
    headers: {
      "TRN-Api-Key": access_key,
      "Accept": "application/json",
      "Accept-Encoding": "gzip"
    }
  }

  let returnThis = {};

  await fetch(`https://public-api.tracker.gg/v2/${game}/standard/profile/${platform}/${userIdentifier}`, options)
    .then(async res => {
      if(!res.ok){
        throw new Error(JSON.stringify(await res.json()));
      }
      return res.json();
    })
    .then(res => {
      const { 
        data: { 
          userInfo: { pageviews }, 
          platformInfo: { platformSlug, platformUserHandle, avatarUrl },
          metadata,
          segments
        } 
      } = res;
      
      const stats = segments[0]?.stats;
      const steamUsername = metadata?.steamInfo?.displayName;

      returnThis = {
        segments,
        steamUsername,
        stats,
        pageviews,
        platformSlug,
        platformUserHandle,
        avatarUrl,
        level : stats?.level?.displayValue,
        kills : stats?.kills?.displayValue,
        killsPerMatch : stats?.killsPerMatch?.displayValue,
        damage : stats?.damage?.displayValue,
        headshots : stats?.headshots?.displayValue,
        matchesPlayed : stats?.matchesPlayed?.displayValue,
        revives : stats?.revives?.displayValue,
        currentRank : stats?.rankScore?.metadata?.rankName,
        currentRankIcon : stats?.rankScore?.metadata?.iconUrl,
        PeakRank : stats?.lifetimePeakRankScore?.metadata?.rankName,
        PeakRankIcon : stats?.lifetimePeakRankScore?.metadata?.iconUrl,
        PeakRankPlacement : stats?.lifetimePeakRankScore?.rank,
        PeakRankScore : stats?.lifetimePeakRankScore?.displayValue,
      }

    })
  .catch(err => {
    console.error(JSON.parse(err.message).errors.map(error => error.message).join('\n'))
  });

  return returnThis;
}

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