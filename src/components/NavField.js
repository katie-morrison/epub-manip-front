function NavField(props) {
    return (
        <div className='navField'>
            <label htmlFor={'navFormat' + props.id}>Chapter file name:</label>
            <input id={'navFormat' + props.id} className='navFormat' type='text' defaultValue={props.navFormat}></input>
        </div>
    )
}

export default NavField