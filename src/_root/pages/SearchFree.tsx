import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { useEffect, useMemo, useState } from 'react'
import UserIcon from '@/lib/map/UserIcon'
import L from "leaflet";
import { supabase } from '@/utils/supabase';
import geocode from '@/utils/geocode';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { FilterValidation } from '@/lib/validation';
import fetchImoveis from '@/utils/fetchImoveis';
import { TipoIcon } from '@/utils/iconsImoveis';


var userMarkers = new L.LayerGroup()
var Markers = new L.LayerGroup()

function LocationButton() {
  const [position, setPosition] = useState<any>(null)
  const map = useMap()

  function PlaceMarkerOnUser() {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 14);
      userMarkers.clearLayers()
      L.marker(e.latlng, {icon:UserIcon}).addTo(userMarkers)
    })
    if (!position) return;
  }
  return(
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control leaflet-bar">
        <button type="button" className='bg-white w-10 h-10' onClick={PlaceMarkerOnUser}>
          target
        </button>
      </div>
    </div>
  )

}


const SearchFree = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof FilterValidation>>({
    resolver: zodResolver(FilterValidation),
    defaultValues: {
      tipo_contrato: "1",
      tipo_imovel: "1",
      qtd_quartos: "0",
      qtd_banheiros: "0",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof FilterValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    Markers.clearLayers()
    console.log(values)
    var markers: {lat: number, lon: number, titulo: string, descricao: string}[] = []
    fetchImoveis(values.tipo_contrato, values.tipo_imovel, values.qtd_quartos, values.qtd_banheiros).then((response) => {
      response.map((res : any) => {
        const pro_data = (geocode(res.endereco))
        pro_data.then(response => response.json()).then(json_data => {
          if (json_data[0]){
            markers.push({lat: json_data[0].lat, lon: json_data[0].lon, titulo:res.titulo , descricao:res.descricao})
          }
        })
      })
      
    })
    setTimeout(() => { 
      console.log(markers);
      markers.map(marker => (L.marker(L.latLng(marker.lat, marker.lon), {icon: TipoIcon((((parseInt(values.tipo_imovel,10)-1)*2)+parseInt(values.tipo_contrato, 10)).toString())}).bindPopup(marker.titulo+': '+marker.descricao).addTo(Markers)))
    }, 10000)
  }
  
  function ImoveisMarkers(){
    const map = useMap()
    Markers.addTo(map)
    userMarkers.addTo(map)
    const [setFetchError] = useState<any>(null)
    const [setImoveis] = useState<any>(null)
  
    useEffect(() => {
  
      const fetchImoveis = async () => {
        const { data, error } = await supabase
         .from('Imoveis')
         .select("*")
  
         if (error) {
          setFetchError("Error")
          console.log(error)
          setImoveis(null)
         }
         if (data) {
          (data.map(res => {
            const promise_data = (geocode(res.endereco))
            promise_data.then((response) => response.json()).then(json_data => {
              if (json_data[0]){
                L.marker(L.latLng(parseFloat(json_data[0]?.lat), parseFloat(json_data[0]?.lon)), {icon: TipoIcon('1')}).bindPopup(res.titulo+': '+res.descricao).addTo(Markers)
              }
            })
            
          }))
          setImoveis(data)
          setFetchError(null)
         }
      }
      fetchImoveis()
    }, [])
    return <></>
  }


  function LimparMarkers(){
    function onClick(){
      Markers.clearLayers()
    }
    return(
      <button className='bg-white w-3/8 p-1 mt-1' onClick={onClick}>Clear All Markers</button>
    )
  }
  function CriarMarkers(){

    function onClick(){
      var markers: {lat: number, lon: number, titulo: string, descricao: string}[] = []
      fetchImoveis(undefined, undefined, '2', undefined).then((response) => {
        response.map((res : any) => {
          const pro_data = (geocode(res.endereco))
          pro_data.then(response => response.json()).then(json_data => {
            if (json_data[0]){
              markers.push({lat: json_data[0].lat, lon: json_data[0].lon, titulo:res.titulo , descricao:res.descricao})
            }
          })
        })
        
      })
      setTimeout(() => { console.log(markers); }, 10000)
    }
    return(
      <button className='bg-white w-3/8 p-1 mt-1' onClick={onClick}>Recreate All Markers</button>
    )
  }

  const [map, setMap] = useState<any>(null)

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[-22.0, -47.9]}
        zoom={13}
        scrollWheelZoom={true}
        ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationButton />
        <ImoveisMarkers />
      </MapContainer>
    ),
    [],
  )


  return (
    <div className=""> 
      <div className='flex justify-between mx-10'>
        <div className='flex-col items-center w-1/3'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-2">
              <FormField
                control={form.control}
                name="tipo_contrato"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Tipo de contrato</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="--" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Venda">Venda</SelectItem>
                        <SelectItem value="Aluguel">Aluguel</SelectItem>
                        <SelectItem value="Temporada">Temporada</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipo_imovel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Tipo de imóvel</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="--" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Casa">Casa</SelectItem>
                        <SelectItem value="Apartamento">Apartamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="qtd_quartos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Quantidade de quartos</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="--" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="qtd_banheiros"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Quantidade de banheiros</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="--" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button type="submit">Filtrar</Button>
            </form>
          </Form>
        </div>
        <div className=" w-7/12">
          {displayMap}
          <div className="flex justify-between">
            {map ? <LimparMarkers /> : null}
            {map ? <CriarMarkers /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFree;