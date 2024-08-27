import { motion } from "framer-motion"
import Button from "../button"
import { RefObject } from "react"

type Props =   {
  //!useref ile referansı alınan bir elementin tipini 
 //! tanımlarken RefObject  kullanrz
  catalogueRef: RefObject<HTMLDivElement>
}


const Hero = ({catalogueRef}: Props) => {

  //KATALOG ALANINA SÜRÜKLE
  const handleClick = () =>  {
    catalogueRef.current?.scrollIntoView({behavior:"smooth"})
  }
  return (
    <div className="hero">
      <div className="pt-36 padding-x flex-1 max-h-[920px]">
        <h1 className=" hero_title">Özgürlüğü Hisset, Yolculuğa 
          Başla</h1>

          <p className=" hero__subtitle">
          Altın standartta hizmete unutulmaz bir yoculuğa hazır mısın?
          Araç kiralama deneyimini Altın Seçenekleri ile taçlandırarark her anını özel kılabilirsin
          </p>

          <Button title= "Arabaları Keşfet" designs=" mt-10" handleClick={handleClick}/>
      </div>
      
      <div className=" flex justify-center">
        <motion.img 
        initial={{
          translateX:200,
          scale:0.7,
        }}
        animate={{
          translateX:0,
          scale:1,
        }}
        transition={{duration:0.7}}
        
        className=" object-contain" 
        src="/hero.png" 
        alt="bmw m5" />
      </div>
    </div>
  )
}

export default Hero