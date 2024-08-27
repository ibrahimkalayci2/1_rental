import { useEffect, useRef, useState } from "react"
import Filter from "./components/filter"
import Header from "./components/header"
import Hero from "./components/hero"
import Searchbar from "./components/searchbar"
import fetchCars from "./components/utils/fetchCars"
import { CarType } from "./types"
import Warning from "./components/warning"
import Card from "./components/card"
import LoadMore from "./components/loadmore"
import { useSearchParams } from "react-router-dom"
import Year from "./components/filter/year"

const Home = () => {
  const [params,setParams] = useSearchParams()

  
  const [cars,setCars] = useState<CarType[] |null> (null)
  
  const [isError, setIsError] = useState<boolean>(false)

  const [limit, setLimit] = useState<number>(5)
  
  useEffect(() => {
    //! URL DEKİ BÜTÜN PARAMETRELERE ERİŞME
    const paramsObj = Object.fromEntries(params.entries())
    console.log(paramsObj)

    fetchCars({limit, ...paramsObj})
    .then((data) => setCars(data))
    .catch((err) => setIsError(true) );
  
  }, [limit,params]);
  
const catalogueRef= useRef<HTMLDivElement>(null)

  return (
    <div className=" min-h-screen text-white bg-[rgb(23,23,23)]">
      
      <Header/>
      <Hero catalogueRef={catalogueRef} />
      
      <div 
      ref={catalogueRef}
      className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Araba Kataloğu</h1>
          <p>Beğenebileceğin arabaları Keşfet</p>
        </div>
        <div className="home__filters">
          <Searchbar/>
          <div className="home__filter-container">
            <Filter/>
            <Year/>
            </div>
        </div>
        {/**
         * araçları listeleme
         * 1 cars null ise -- henuz apiden cevap gelmemiştr
         * 2 iserror true ise -- api den hata gelmiştir
         * 3 cars bos dizi ise -- aranılan kriterlere uygun veri yok
         * 4 cars dolu ise -- api den araclar gelmştr
         */}

          {!cars ? 
          ( <Warning>Yukleniyor..</Warning>
          ) : isError ? ( 
            <Warning>Üzgünüz Bir Sorun Oluştu

          </Warning>
            ) : cars.length < 1 ? ( 
              <Warning>
              Aranılan Kriterlere Uygun Araç Bulunamadı

              </Warning>
          ) : ( 
            cars.length > 1 && (
            <section>
              <div className="home__cars-wrapper">
                {cars.map((car, i) => (
              <Card car={car} key= {i} />
            ) )}
            </div>
            <LoadMore
            limit={limit}
            handleClick={() => {
              setLimit(limit + 5)
            }}
            />
            </section>
          ))}


      </div>
      </div>
  )
}

export default Home