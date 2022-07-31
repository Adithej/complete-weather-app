import React, { useState, useEffect } from 'react';
// import axios
import axios from 'axios';

// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
} from 'react-icons/io';
import {
  BsFillCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from 'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb';

const App = () => {
  // api key
  const APIkey = 'bcf2048bc3be154bded8f277f580ba2e';
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Bucharest');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    if (inputValue !== '') {
      setLocation(inputValue);
    }
    document.querySelector('input').value = '';
    e.preventDefault();
  };

  // fetch data
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
        }, 1000);
      })
      .catch((err) => {
        setError(err);
      });
  }, [location]);

  if (!data) {
    return (
      <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <h1>Loading</h1>
      </div>
    );
  }

  console.log(data);

  let icon = '';
  // set icon according to the weather
  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsFillCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy />;
      break;
    case 'Clear':
      icon = <IoMdSunny />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill />;
      break;
    case 'Snow':
      icon = <IoMdSnow />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;
  }

  // const months
  const months = ['January'];
  let date = new Date();

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center pt-24'>
      {/* form */}
      <form>form</form>
      {/* card */}
      <div className='w-full max-w-[450px] bg-black/20 text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        {/* card top */}
        <div className='flex items-center gap-x-5'>
          <div className='text-[87px] text-sky-500'>{icon}</div>
          <div>
            <div className='text-2xl font-semibold'>
              {data.name}, {data.sys.country}
            </div>
            <div>
              {date.getUTCDate()}/{date.getUTCMonth() + 1}/
              {date.getUTCFullYear()}
            </div>
          </div>
        </div>
        {/* card inner */}
        <div className='my-20'>
          <div className='flex justify-center items-center'>
            <div className='text-[144px] leading-none font-light'>
              {parseInt(data.main.temp)}
            </div>
            <div className='text-4xl'>
              <TbTemperatureCelsius />
            </div>
          </div>
          <div className='capitalize text-center'>
            {data.weather[0].description}
          </div>
        </div>
        {/* card bottom */}
        <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <BsEye />
              </div>
              <div>
                Visibility
                <span className='ml-2'>{data.visibility / 1000}km</span>
              </div>
            </div>
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <BsThermometer />
              </div>
              <div className='flex'>
                Feels like
                <div className='flex ml-2'>
                  {parseInt(data.main.feels_like)} <TbTemperatureCelsius />
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <BsWater />
              </div>
              <div>
                Humidity <span className='ml-2'>{data.main.humidity}%</span>
              </div>
            </div>
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <BsWind />
              </div>
              <div>
                Wind <span className='ml-2'>{data.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
