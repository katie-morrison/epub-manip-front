import NavField from "./NavField";

function NavContainer(props) {
    return (
        <div>
            {props.navData.map(data => (
                <NavField key={data.id} id={data.id} navFormat={data.format} />
            ))}
        </div>
    )
}

export default NavContainer