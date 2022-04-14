import React from "react";
import Container from "./components/Container"; //component import
import Specification from "./components/Specification"; //component import
import Weather from "./components/Weather"; //component import

const API_KEY = "42cf5b186b9d9b71dfacf22fee0e4a58";

class Base extends React.Component{

  state = { //состояния переменных.
    city: undefined,
    error: undefined,
    day_0: [], //Массивы состояний на каждый из 5 дней.
    day_1: [],
    day_2: [],
    day_3: [],
    day_4: [],
    // "openweathermap" дает странные данные, так что отныне: eve - днем, day - вечером. min - ночью, night - утром.
  }
    //fetch - метод, считывающий данные, что находятся по указанной ссылке.
    //async(e) - функция, чтобы убрать обновление страницы при парсинге данных.
    //await - оператор, который не приостонавливает действие своего операнда в функции "async()".

    ParcingWeather = async(event) =>{
    event.preventDefault(); //Убирает перезагрузку страницы
    var city = event.target.elements.city.value; //
    const count_days = 5;
    if(city){ //Если в поле города что-то было введено, то устанавливаются соответствия.
      const api_url = await
        fetch("https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=" + count_days + "&appid=" + API_KEY + "&units=metric");
      const data = await api_url.json(); //преображение информации, которая была в ссылке, в Json формат и записываем ее в переменную data.

      //console.log(data); //Вывод логов.

        var dt = data.list[0].dt;   //Метод отвечающий за корректный вывод даты для 5 дней.
        var dt_m = [];
        for(i = 0; i < 5; i++ ){
            dt_m[i]=(dt+i*86400)*1000;
            const date = new Date(dt_m[i]);
            dt_m[i] = date.toLocaleDateString();
        }

        //Метод отвечающий за корректный вывод времены восхода солца для 5 дней.
        var sr_m = [];
        for(i = 0; i < 5; i++ ){
            sr_m[i]=data.list[i].sunrise; //data.list[i].sunset - секунды которые мы получили в data(Json).
            const date = new Date(sr_m[i]);
            date.setTime(sr_m[i])   //setTime - фунция React, sr_m[i] отслеживаемая дата.
            sr_m[i] = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }

        //Метод отвечающий за корректный вывод времены захода солца для 5 дней.
        var ss_m = [];
        for(var i = 0; i < 5; i++ ){
            ss_m[i]=data.list[i].sunset;
            const date = new Date(ss_m[i]);
            date.setTime(ss_m[i])
            ss_m[i] = date.getHours() + 12 + ":" + date.getMinutes() + ":" + date.getSeconds();
        }

      this.setState({ // This.setState - установка состояния переменных.
        //temp: data.main.temp, //переменная temp принимает значение указаное в пути data(Json), затем ищет main, а в нем находит temp.
        city: data.city.name, //состояние для "Location"
        dt: dt_m[0], //состояние для "Today's date"
        error: undefined,

          day_0:[
              //data.list[0].weather[0].icon,

              dt_m[0],
              data.list[0].temp.night,
              data.list[0].temp.eve,
              data.list[0].temp.day,
              data.list[0].temp.min,

              data.list[0].weather[0].description,
              data.list[0].speed,
              data.list[0].humidity,
              data.list[0].pressure,
              sr_m[0],
              ss_m[0]
],

          day_1:[
              //data.list[1].weather[0].icon,

              dt_m[1],
              data.list[1].temp.night,
              data.list[1].temp.eve,
              data.list[1].temp.day,
              data.list[1].temp.min,

              data.list[1].weather[0].description,
              data.list[1].speed,
              data.list[1].humidity,
              data.list[1].pressure,
              sr_m[1],
              ss_m[1]
          ],

          day_2:[
              //data.list[2].weather[0].icon,

              dt_m[2],
              data.list[2].temp.night,
              data.list[2].temp.eve,
              data.list[2].temp.day,
              data.list[2].temp.min,

              data.list[2].weather[0].description,
              data.list[2].speed,
              data.list[2].humidity,
              data.list[2].pressure,
              sr_m[2],
              ss_m[2]
          ],

          day_3:[
              //data.list[3].weather[0].icon,

              dt_m[3],
              data.list[3].temp.night,
              data.list[3].temp.eve,
              data.list[3].temp.day,
              data.list[3].temp.min,

              data.list[3].weather[0].description,
              data.list[3].speed,
              data.list[3].humidity,
              data.list[3].pressure,
              sr_m[3],
              ss_m[3]
          ],

          day_4:[
              //data.list[4].weather[0].icon,

              dt_m[4],
              data.list[4].temp.night,
              data.list[4].temp.eve,
              data.list[4].temp.day,
              data.list[4].temp.min,

              data.list[4].weather[0].description,
              data.list[4].speed,
              data.list[4].humidity,
              data.list[4].pressure,
              sr_m[4],
              ss_m[4]
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

   //За вывод информации отвечает как Container, так и Weather, они связаны в App.js.
    render() {
    return(

        <div className="wrapper">
            <div className="centring">

                <Specification/>

                <Container weatherInf={this.ParcingWeather}/>

                <Weather
                    city={this.state.city} //Для "Location"

                    dt={this.state.dt} //Для "Today's date"

                    error={this.state.error}
                    day_0={this.state.day_0}
                    day_1={this.state.day_1}
                    day_2={this.state.day_2}
                    day_3={this.state.day_3}
                    day_4={this.state.day_4}
                />

            </div>
        </div>
        )
    }
}
export default Base;
