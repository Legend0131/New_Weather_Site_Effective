import React from "react";

function ListItem(props){ //Функция вывода данных массива в столбик.
    return <p>{props.value}</p>;
}

class Weather extends React.Component {

    render() {
        //Ниже вызовы функции "map", которая в свою очередь вызывает функцию "ListItem"
        const day0 = this.props.day_0;
        const listDay0 = day0.map((day0) =>
            <ListItem key = {day0.id} value = {day0}/>
        );

        const day1 = this.props.day_1;
        const listDay1 = day1.map((day1) =>
            <ListItem key = {day1.id} value = {day1}/>
        );

        const day2 = this.props.day_2;
        const listDay2 = day2.map((day2) =>
            <ListItem key = {day2.id} value = {day2}/>
        );

        const day3 = this.props.day_3;
        const listDay3 = day3.map((day3) =>
            <ListItem key = {day3.id} value = {day3}/>
        );
        const day4 = this.props.day_4;
        const listDay4 = day4.map((day4) =>
            <ListItem key = {day4.id} value = {day4}/>
        );


        return (

            <div>
                {this.props.city && //условие, которое отвечает за проверку наличия значений ниже. Конкретно это условие проверяет есть ли переменная city.
                    <div>
                        <p className="centering">Location: {this.props.city}</p>
                        <p>Today's date: {this.props.dt}</p>


                        <div className="card-group">


                            <div className="card_inf">
                                <div className="card-body">
                                    <h5 className="card-title">&nbsp;</h5>
                                    <p className="card-text card-inf">date:</p>
                                    <p className="card-inf">Temperature in the morning:(&#176;)</p>
                                    <p className="card-inf">Temperature in the day:(&#176;)</p>
                                    <p className="card-inf">Temperature in the evening:(&#176;)</p>
                                    <p className="card-inf">Temperature in the night:(&#176;)</p>
                                    <p className="card-inf">Clouds and precipitation:</p>
                                    <p className="card-inf">Speed of wind:(m/s)</p>
                                    <p className="card-inf">Humidity:(%)</p>
                                    <p className="card-inf">Atmospheric pressure:(mmHg.)</p>
                                    <p className="card-inf">Sunrise:</p>
                                    <p className="card-inf">Sunset:</p>
                                </div>
                            </div>



                            <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Today</h5>
                                        <p className="card-text">{listDay0}</p>
                                    </div>
                            </div>

                            <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Tomorrow</h5>
                                        <p className="card-text">{listDay1}</p>
                                    </div>
                            </div>

                            <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Day after tom</h5>
                                        <p className="card-text">{listDay2}</p>
                                    </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">After 2 days</h5>
                                    <p className="card-text">{listDay3}</p>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">After 3 days</h5>
                                    <p className="card-text">{listDay4}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                }
                <p className="error">{this.props.error}</p>
            </div>

        );
    }
}
export default Weather;