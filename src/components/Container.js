import React from "react";
//const Specification = (props) => (

class Container extends React.Component{
    render() {
        return (
            //onSubmit - метод инициирующий отправку данных введеных пользователем в функцию "parcingWeather"
            <form onSubmit={this.props.weatherInf}>
                <input type="text" name="city" placeholder="Enter the city"/>
                <button>Get weather</button>
            </form>
        );
    }
}
export default Container;
