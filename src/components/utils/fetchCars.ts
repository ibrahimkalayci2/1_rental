import { CarType } from "../../types";

const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '3ba2ecae4emsh4f020f8364bd975p145ccajsn9ba5f2a08ea8',
      'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
    },
  };

  //!Fonksiyon asenkron olduğunda ve bir return değerine sahip oldugundan dolayı 
  //!return tipini belirlerken sadece return edilen tipi "CarType[] ifade etmek 
  //!yerine bu fonksiyonun hata da döndürebileceğinden ve asenkron oldugndan 
  //!dolayı bu tipi react ın içerisinde bulunan promise tipine generic olarak
  //! göndererek return tipini belirleik "

  //!ASENKRON BİR FONKSYN VARSA VE RETURN EDİYRSA DİREK YAZAMAZSN

type Parameters = {
  limit: number;
  make?: string;
  model?: string;
  fuel_type?: string;
  year?: string
};

  const fetchCars = async ({ 
    limit, 
    make = "bmw",
    model = "m4",
    fuel_type ="",
    year = "",
   }: Parameters ): Promise<CarType[]> => {
    
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${model}&limit=${limit}&fuel_type=${fuel_type}&year=${year}`;

    const res = await fetch( url, options);
    
    const data = await res.json();
    
    
    return data;
  
  
  }
    
  


export default fetchCars;