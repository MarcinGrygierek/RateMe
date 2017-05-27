import React from 'react';
import $ from 'jquery';

const MainSwitch = (props) => {
    function toggleActive(e, tab) {
        const target = e.target;
        $('.main-switch-element').removeClass('active');
        $(target).addClass('active');
        console.log(target);
        props.change(tab);
    };

    return (
        <div className="main-switch row">
            <div className="col-xs-6 main-switch-column">
                <a href="#" onClick={ e => toggleActive(e, 'search') } className="main-switch-element active">Wyszukaj</a>
            </div>
            <div className="col-xs-6 main-switch-column">
                <a href="#" onClick={ e => toggleActive(e, 'enter-token') } className="main-switch-element">Wprowadź token</a>
            </div>
        </div>
    );
};

export default MainSwitch;