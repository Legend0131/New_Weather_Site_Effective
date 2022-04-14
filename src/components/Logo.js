import React from "react";
import Weather from "./Weather";

import sun from './sun.jpg';
import cloud from './sun.jpg';
import cloudAndSun from './sun.jpg';
import cloudAndRain from './sun.jpg';

class Logo extends React.Component {

    render() {



        return(
            <div>
                {this.props.city &&
                    <div>

                        <img src={sun} className="App-logo" alt="logo" />

                    </div>
                }
            </div>
        );
    }

}
export default Logo;