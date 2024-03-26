import L from "leaflet"

export function TipoIcon(tipo:string){
    var caminho_imagem: string;
    switch (tipo) {
        case "1":
            caminho_imagem = "/aluguel_casa.png"
            break;
    
        case "2":
            caminho_imagem = "/aluguel_apto.png"
            break;

        case "3":
            caminho_imagem = "/temporada_casa.png"
            break;

        case "4":
            caminho_imagem = "/temporada_apto.png"
            break;

        case "5":
            caminho_imagem = "/venda_casa.png"
            break;

        case "6":
            caminho_imagem = "/venda_apto.png"
            break;
        
        default:
            caminho_imagem = "/Icone Maps Usuário.png"
            break;
    }
    return (
        L.icon({
            iconUrl: caminho_imagem,
            // shadowUrl: 'leaf-shadow.png',

            iconSize:     [160, 160], // size of the icon
            // shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [80, 80], // point of the icon which will correspond to marker's location
            // shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        })
    )
};