
function geocode(endereco: string){
   const base_url = 'https://nominatim.openstreetmap.org/search?'
   const parameters = {
      q: endereco,
      format: 'jsonv2',
      adressdetails: '1',
      limit: '1',
    }
    const queryString = new URLSearchParams(parameters).toString();
   return fetch(`${base_url}${queryString}`)
  }

export default geocode