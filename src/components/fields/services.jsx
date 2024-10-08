import React, { useEffect, useState, useRef } from 'react';
import { provinces } from '../../data/provinces';
import { services } from '../../data/services';
import { IoClose } from "react-icons/io5";

const ServicesFields = ({ selectedField, setSelectedField }) => {

  const inputSearchQueryRef = useRef()
  const [searchResult, setSearchResult] = useState([])
  const [cityQuerySearch, setCityQuerySearch] = useState('')

  useEffect(() => {

  }, [selectedField])

  const findById = (array, id) => array?.find(item => item.id === id);

  const fieldHandler = (e) => {
    const { name, value } = e.target;

    if (name === 'service') {
      const service = services.find(service => service.value === value);
      setSelectedField({ serviceId: service.id, provinceId: 1, countyId: 1, cityId: 1, city: provinces[0].counties[0].cities[0] });
    } else if (name === 'province') {
      const province = provinces.find(province => province.value === value);
      const firstCounty = province.counties[0];
      setSelectedField({ serviceId: selectedField.serviceId, provinceId: province.id, countyId: firstCounty.id, cityId: firstCounty.cities[0]?.id, city: firstCounty.cities[0] });
    } else if (name === 'county') {
      const province = findById(provinces, selectedField.provinceId);
      const county = province.counties.find(county => county.value === value);
      setSelectedField({ ...selectedField, countyId: county.id, cityId: county.cities[0]?.id, city: county.cities[0] });
    } else if (name === 'city') {
      const province = findById(provinces, selectedField.provinceId);
      const county = findById(province.counties, selectedField.countyId);
      const city = county.cities.find(city => city.value === value);
      setSelectedField({ ...selectedField, cityId: city.id, city });
    }
  };

  const selectedService = findById(services, selectedField.serviceId);
  const selectedProvince = findById(provinces, selectedField.provinceId);
  const selectedCounty = findById(selectedProvince?.counties, selectedField.countyId);
  const selectedCity = findById(selectedCounty?.cities, selectedField.cityId);

  const searchHandler = (e) => {

    const query = e.target.value;
    setCityQuerySearch(query);

    if (query.length < 3) {
      setSearchResult([]);
      return;
    }

    const searchResults = [];
    for (const province of provinces) {
      for (const county of province.counties) {
        if (county.cities) {
          for (const city of county.cities) {
            if (city.name.includes(cityQuerySearch)) {
              searchResults.push({
                provinceId: province.id,
                countyId: county.id,
                provinceName: province.name,
                countyName: county.name,
                city
              })
            }
          }
        }
      }
    }
    setSearchResult(searchResults);
  };

  const itemSearchClick = (e) => {
    const { dataset } = e.target
    const parsedCity = JSON.parse(dataset.city)

    setSelectedField({ serviceId: parsedCity.city.services[0].serviceId, provinceId: parsedCity.provinceId, countyId: parsedCity.countyId, cityId: parsedCity.city.id, city: parsedCity.city })
    setSearchResult([])
    setCityQuerySearch('')
  }

  const cleanSearchQuery = () => {
    setSearchResult([])
    setCityQuerySearch('')
    inputSearchQueryRef.current.focus()
  }

  return (
    <div className='flex justify-center sm:justify-between items-center flex-wrap sm:flex-nowrap'>
      <div className='flex justify-center sm:justify-start items-center flex-wrap gap-2 w-full sm:w-fit mb-4 sm:mb-0'>
        <select onChange={fieldHandler} value={selectedService?.value} name="service" className='w-[calc(48%)] sm:w-fit p-2 border border-gray-300 rounded-md bg-slate-50'>
          {services.map(service => (
            <option key={service.id} value={service.value}>{service.name}</option>
          ))}
        </select>

        <select onChange={fieldHandler} value={selectedProvince?.value} name="province" className='w-[calc(48%)] sm:w-fit p-2 border border-gray-300 rounded-md bg-slate-50'>
          {provinces.map(province => (
            <option key={province.id} value={province.value}>{province.name}</option>
          ))}
        </select>

        <select onChange={fieldHandler} value={selectedCounty?.value} name="county" className='w-[calc(48%)] sm:w-fit p-2 border border-gray-300 rounded-md bg-slate-50'>
          {selectedProvince?.counties.map(county => (
            <option key={county.id} value={county.value}>{county.name}</option>
          ))}
        </select>

        <select onChange={fieldHandler} value={selectedCity?.value} name="city" className='w-[calc(48%)] sm:w-fit p-2 border border-gray-300 rounded-md bg-slate-50'>
          {selectedCounty?.cities.map(city => (
            <option key={city.id} value={city.value}>{city.name}</option>
          ))}
        </select>
      </div>

      <div className='relative w-full sm:w-fit'>
        <div className='relative'>
          <input type='text' value={cityQuerySearch} ref={inputSearchQueryRef} onChange={searchHandler} className='w-full sm:w-fit p-2 border border-gray-300 rounded-md bg-slate-50' placeholder='جستجوی شهر' />
          {cityQuerySearch.length > 0 && <span onClick={cleanSearchQuery} className='absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer text-md'><IoClose /></span>}
        </div>
        {searchResult.length > 0 && (
          <ul className='absolute top-12 w-full bg-slate-50 border border-gray-300 rounded-md z-20 p-2 pb-0 max-h-[calc(100vh-270px)] sm:max-h-[calc(100vh-100px)] overflow-y-auto'>
            {
              searchResult && searchResult.map((city, index) => {
                return (
                  <li key={index} className='bg-slate-100 hover:bg-slate-200 rounded-md py-3 px-2 mb-3 hover:text-blue-500 hover:cursor-pointer dark:text-black' onClick={itemSearchClick} data-city={JSON.stringify(city)}>
                    {city.city.name}<span className='text-xs opacity-50'>, {city.countyName}, {city.provinceName}</span>
                  </li>
                )
              })
            }
          </ul>
        )}
      </div>

    </div>
  );
};

export default ServicesFields;