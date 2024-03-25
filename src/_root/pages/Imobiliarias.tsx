import insertImovelImage from "@/utils/insertImovelImage"
import { ChangeEvent } from "react"

const handleFileInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files){
      return
    }
    const file = files[0]
    insertImovelImage(file, 'TESTE1')
    console.log("File inserted in Image Bucket")
}

const Imobiliarias = () => {
  return (
    <input type="file" onChange={handleFileInput} />
  )
}

export default Imobiliarias