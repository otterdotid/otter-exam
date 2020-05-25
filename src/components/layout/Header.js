import React from "react";

const Header = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light nav-custom">
                <div className="mx-auto">
                    <a className="navbar-brand ft-white" href="/">{props.title}</a>
                </div>
            </nav>
        </div>
    )
}

Header.defaultProps = {
    title: "React App"
}

export default Header;