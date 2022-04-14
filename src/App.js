import React from "react";
import Container from "./components/Container"; //component import
import Specification from "./components/Specification"; //component import
import Weather from "./components/Weather";
import Logo from "./components/Logo";

const API_KEY = "42cf5b186b9d9b71dfacf22fee0e4a58";

class Base extends React.Component{

  state = { //состояния переменных.
    icon: undefined,  //эксп
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

        //var dt = data.city.timezone //Старый метод отвечающий за вывод даты на 0 день.
        //var date = new Date();
        //date.setUTCMilliseconds(dt);
        //var dt_date = date.toDateString();

        var dt = data.list[0].dt;   //Метод отвечающий за корректный вывод даты для всех 5 дней.
        var dt_m = [];
        for(var i = 0; i < 5; i++ ){
            dt_m[i]=(dt+i*86400)*1000;
            const date = new Date(dt_m[i]);
            dt_m[i] = date.toLocaleDateString();
        }

        var sr = data.list[0].sunrise;   //Метод отвечающий за корректный вывод времены восхода солца.
        var sr_m = [];
        for(var i = 0; i < 5; i++ ){
            sr_m[i]=data.list[i].sunrise;
            const date = new Date(sr_m[i]);
            date.setTime(sr_m[i])
            sr_m[i] = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }

        var ss = data.list[0].sunset;   //Метод отвечающий за корректный вывод времены захода солца.
        var ss_m = [];
        for(var i = 0; i < 5; i++ ){
            ss_m[i]=data.list[i].sunset;
            const date = new Date(ss_m[i]);
            date.setTime(ss_m[i])
            ss_m[i] = date.getHours() + 12 + ":" + date.getMinutes() + ":" + date.getSeconds();
        }

      this.setState({ // This.setState - установка состояния переменных.
        //temp: data.main.temp, //переменная temp принимает значение указаное в пути data(Json), затем ищет main, а в нем находит temp.
        city: data.city.name,
        //pressure: data.list[0].pressure,
        //sunset: sunset_date, //sunset_date - преобразованные данные из data(Json)
        //sunrise: sunrise_date,
        dt: dt_m[0], //эксперемент
        error: undefined,

          day_0:[
              //data.list[0].weather[0].icon,

              dt_m[0],
              data.list[0].temp.night,
              data.list[0].temp.eve,
              data.list[0].temp.day,
              data.list[0].temp.min,

              sr_m[0],
              ss_m[0],

              data.list[0].pressure,
              data.list[0].humidity,
              data.list[0].speed,
              data.list[0].weather[0].description

],

          day_1:[
            //data.list[1].dt,
              dt_m[1],

            data.list[1].temp.night,
            data.list[1].temp.eve,
            data.list[1].temp.day,
            data.list[1].temp.min,

              sr_m[1],
              ss_m[1],

            data.list[1].pressure,
            data.list[1].humidity,
            data.list[1].speed,
            data.list[1].weather[0].description

          ],

          day_2:[
              //data.list[1].dt,
              dt_m[2],

              data.list[2].temp.night,
              data.list[2].temp.eve,
              data.list[2].temp.day,
              data.list[2].temp.min,

              sr_m[2],
              ss_m[2],

              data.list[2].pressure,
              data.list[2].humidity,
              data.list[2].speed,
              data.list[2].weather[0].description

          ],

          day_3:[
              //data.list[1].dt,
              dt_m[3],

              data.list[3].temp.night,
              data.list[3].temp.eve,
              data.list[3].temp.day,
              data.list[3].temp.min,

              sr_m[3],
              ss_m[3],

              data.list[3].pressure,
              data.list[3].humidity,
              data.list[3].speed,
              data.list[3].weather[0].description

          ],

          day_4:[
              //data.list[1].dt,
              dt_m[4],

              data.list[4].temp.night,
              data.list[4].temp.eve,
              data.list[4].temp.day,
              data.list[4].temp.min,

              sr_m[4],
              ss_m[4],

              data.list[4].pressure,
              data.list[4].humidity,
              data.list[4].speed,
              data.list[4].weather[0].description

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
            <div className="centring">

            <Specification/>
            <Container weatherInf={this.ParcingWeather}/>

                <Weather
                    city={this.state.city}

                    dt={this.state.dt} //эксперемент

                    error={this.state.error}
                    day_0={this.state.day_0}
                    day_1={this.state.day_1}
                    day_2={this.state.day_2}
                    day_3={this.state.day_3}
                    day_4={this.state.day_4}
                />

            </div>
        </div>








        /*<div className="wrapper">
          <Specification/>
          <Container weatherInf={this.ParcingWeather}/>
          <Weather
          city={this.state.city}

          dt={this.state.dt} //эксперемент

          error={this.state.error}
          day_0={this.state.day_0}
          day_1={this.state.day_1}
          day_2={this.state.day_2}
          day_3={this.state.day_3}
          />

          <Logo

          />

        </div>*/
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
