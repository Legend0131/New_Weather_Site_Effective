import React from "react";
import Container from "./components/Container"; //component import
import Specification from "./components/Specification"; //component import
import Weather from "./components/Weather";

const API_KEY = "42cf5b186b9d9b71dfacf22fee0e4a58";

class Base extends React.Component{

  state = { //состояния переменных.
    temp: undefined,
    //feels_like: undefined,
    city: undefined,
    pressure: undefined,
    sunrise: undefined,
    sunset: undefined,
    wind_speed: undefined,
    //clouds: undefined,
    //rain: undefined,
    humidity: undefined,
    error: undefined,
    description: undefined, //Облачность или дождь
    day_0: [],
    day_1: [],
    day_2: [],
    day_3: [],
    day_4: [],
    //date_M:[], //dateM - массив состояний.
    //temp_M:[], // "openweathermap" дает странные данные, так что отныне: eve - днем, day - вечером. min - ночью, night - утром.
    //feels_like_M:[]
  }
    //fetch - метод, который считывает все данные, что находятся по указанной ссылке.
    //await - оператор, который не приостонавливает действие своего операнда в функции "async()".
    //async(e) - функция, чтобы убрать обновление страницы при парсинге данных.

    ParcingWeather = async(event) =>{
    event.preventDefault(); //Убирает перезагрузку страницы
    var city = event.target.elements.city.value; //
    const count_days = 5;
    if(city){ //Если в поле города что-то было введено, то устанавливаются соответствия.
      const api_url = await
      //fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+API_KEY+"&units=metric&lang=ru");
        fetch("https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=" + count_days + "&appid=" + API_KEY + "&units=metric");
      const data = await api_url.json(); //преображение информации, которая была в ссылке, в Json формат и записываем ее в переменную data.

      console.log(data);

      //Ниже идет элемент кода овтечающий за коррекртный вывод дат и времени.
      var sunset = data.list[0].sunset; //data.sys.sunset - секунды которые мы получили в data(Json).
      var date = new Date(); //new Date - сегодняшняя дата.
      date.setTime(sunset); //setTime - фунция React, sunset отслеживаемая дата.
      var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();//конструкция для получения корректного времени, которая записывается в sunset_date.

      var sunrise = data.list[0].sunrise; //data.sys.sunset - секунды которые мы получили в data(Json).
      var date = new Date(); //new Date - сегодняшняя дата.
      date.setTime(sunrise); //setTime - фунция React, sunset отслеживаемая дата.
      var sunrise_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();//конструкция для получения корректного времени, которая записывается в sunset_date.

      this.setState({ // This.setState - установка состояния переменных.
        //temp: data.main.temp, //переменная temp принимает значение указаное в пути data(Json), затем ищет main, а в нем находит temp.
        city: data.city.name,
        pressure: data.list[0].pressure,
        sunset: sunset_date, //sunset_date - преобразованные данные из data(Json)
        sunrise: sunrise_date,
        error: undefined,

          day_0:[
              data.list[0].dt,

              data.list[0].temp.night,
              data.list[0].temp.eve,
              data.list[0].temp.day,
              data.list[0].temp.min,

              data.list[0].sunrise,
              data.list[0].sunset,

              data.list[0].pressure,
              data.list[0].humidity,
              data.list[0].speed,
              data.list[0].weather.description

],

          day_1:[
            data.list[1].dt,

            data.list[1].temp.night,
            data.list[1].temp.eve,
            data.list[1].temp.day,
            data.list[1].temp.min,

            data.list[1].sunrise,
            data.list[1].sunset,

            data.list[1].pressure,
            data.list[1].humidity,
            data.list[1].speed,
            data.list[1].weather.description

          ]

      });
    } else{

      this.setState({
        temp: undefined,
        feels_like: undefined,
        city: undefined,
        pressure: undefined,
        sunrise: undefined,
        sunset: undefined,
        wind_speed: undefined,
        clouds: undefined,
        rain: undefined,
        humidity: undefined,
        error: "You need to enter the correct name of the city!"
      });
    }
}

//За вывод информации отвечает как Container, так и Weather, они связаны в App.j.s
    render() {
    return(
        <div className="wrapper">
          <Specification/>
          <Container weatherInf={this.ParcingWeather}/>
          <Weather
          temp={this.state.temp}
          city={this.state.city}
          country={this.state.country}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset}
          error={this.state.error}
          day_1={this.state.day_1}
          />
          <div>Helloworld</div>
        </div>
    )
    }

  /*render(){
    return(
      <div className="wrapper">
        <div className="container">

          <div className="row">

            <div className="col-xs-5">
            <Specification />
            </div>

            <div className="col-xs-7">
            <Container weatherInf={this.ParcingWeather} />
            <Weather
              temp={this.state.temp}
              city={this.state.city}
              pressure={this.state.pressure}
              sunset={this.state.sunset}
              error={this.state.error}
            />
            </div>

          </div>
        </div>
      </div>
    );
  }*/
}
export default Base;