import './header.css'

interface HeaderProps {
    title: string;
    logoSrc: string;
}

function Header({ title, logoSrc }: HeaderProps) {
    return (
        <div className="header">
            <a className="logo">
                <img src={logoSrc} alt="logo"/>
            </a>
            <h1>{title}</h1>
        </div>
    )
}
export default Header