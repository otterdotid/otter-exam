import React from "react";

const Header = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="mx-auto">
                    <a className="navbar-brand" href="/">{props.title}</a>
                </div>
            </nav>
        </div>
    )
}

Header.defaultProps = {
    title: "React App"
}

export default Header;